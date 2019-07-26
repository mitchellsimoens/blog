---
title: Saving hierarchical data in MySQL with Node.js
date: "2015-07-03T13:13:03.284Z"
---

I have a need that I've solved before but have never been happy with my solutions. So today I decided to give it another go. It's taking hierarchical data (tree data) and saving it into a MySQL database. Searching around, there wasn't a solution that I liked. Some were SQL only but didn't seem to fit how I am presented with data. Some were using server-side frameworks, however, I'm not using any.

### Server Overview

When I said I'm not using any server-side framework it's not 100% true. I am using [ExpressJS](http://expressjs.com/) which is a framework but not in the sense of a framework that manages data; it's much more of a framework around creating a server. There isn't an MVC aspect of it. I've built my own framework to be custom to the projects I own within [Sencha](https://www.sencha.com/) and I name it node-sencha (not on npm currently) and reflects the API of Ext JS. So I basically have a pretty bare bones setup that I've built on top. For communication with my MySQL databases I use the [mysql](https://www.npmjs.com/package/mysql) module. I feel using ExpressJS and mysql module is a very common setup so I won't go into it more than just that. Technically, the mysql module isn't required for this but it's serving as an important piece on how I construct the SQL queries.

### Pre-Thoughts

I've seen some solutions that had some pros and cons and some of the cons were that it was very expensive. I control both the client (which is Ext JS) and the server so I can do things any way I want (some would be jealous, some would be scared :) ). Starting off I decided to go ahead and send the full tree when saving regardless of if the nodes had been changed or not. This is great for its total ease but something I'll definitely have to revisit at a later time to better the performance and not have unneeded queries.

For saving tree data you need to deal with creating, updating and deleting nodes. Since I'm going to have the full tree, this will be easy to do all three actions in a single MySQL transaction. The only hard part is dealing with the parent-to-child relationship where the parent may or may not already exist.

### Ext JS

When using `Ext.data.TreeStore` and the related classes, Ext JS will create IDs for each node that you create on the client. I can use this to determine if the node passed to the server is a phantom (does not exist in the db) or not. Ext JS does set the `phantom` property on the model but using the ID is a single way to handle create vs update. The data I send back to the server is like this:

    [
        {
            "id"       : "Model-1",
            "text"     : "Parent 1.1",
            "children" : [
                {
                    "id"   : "Model-3",
                    "text" : "Leaf 1.1"
                }
            ]
        },
        {
            "id"       : "Model-2",
            "text"     : "Parent 1.2",
            "children" : [
                {
                    "id"   : "Model-4",
                    "text" : "Leaf 1.2"
                }
            ]
        }
    ]

Each node is an Object in the JSON and each node can have a `children` property and can nest as many children. If we look at the `id` property, it's in a format that has the Ext JS model's class name and an auto-incremented number joined by a hyphen. This is Ext JS creating a client side ID for a phantom record. In the database, I expect only integers for IDs so if it's a string and has a hyphen, chances are it's a phantom. Right there is how I determine if the node needs to be created or updated. In the database I also have a `parentid` field in the table so that a child can relate to its parent. You can see there is no `parentid` because on the server I can just get it from when I iterate through things. The trick there is to determine if the parent is phantom or not and getting the ID when the parent is being created.

### Server Stuff

On the server, I pass the data to a `Tree` function and execute the `save` method on it:

    var Tree = require('./Tree');

    new Tree(data).save(function() { /* */ });

In the `Tree.js` file, I start with code like this:

    var mysql       = require('mysql'),
        phantomIdRe = /-/g;

    function Tree(data) {
        this.data    = data;
        this.sqls    = [];
        this.inserts = [];
        this.vars    = {};
        this.realIds = [];

        return this;
    }

    Tree.prototype.isArray = function(value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    };

    Tree.prototype.isIdPhantom = function(id) {
        return typeof id === 'string' && id.indexOf('-') > -1;
    };

    Tree.prototype.parsePhantomId = function(id) {
        return id.replace(phantomIdRe, '_');
    };

    Tree.prototype.save = function(callback) {
        var data    = this.data,
            sqls    = this.sqls,
            inserts = this.inserts,
            tree;

        this.parseChildren(data);

        if (this.realIds && this.realIds.length) {
            //delete any nodes that were not passed
            sqls.unshift('DELETE FROM my_table WHERE id NOT IN(?);');
            inserts.unshift(this.realIds);
        }

        //execute the sqls
        console.log(mysql.format(sqls.join(''), inserts));

        callback();
    };

    module.exports = Tree;

Nothing special so far, the `isIdPhantom` function will do the checking if the id has a hyphen. The `parsePhantomId` will replace hyphens with underscores, more about that later. The `save` method is what really kicks things off. It first executes the `parseChildren` method which allows for recursion:

    Tree.prototype.parseChildren = function(children, parent) {
        if (!this.isArray(children)) {
            children = children.children;
        }

        var i        = 0,
            length   = children.length,
            parentid = parent && parent.id,
            node;

        if (length) {
            for (; i < length; i++) {
                node = children[i];

                this.parseNode(node, parentid);

                if (node.children) {
                    this.parseChildren(node.children, node);
                }
            }
        }
    };

The important part here is it'll call `parseChildren` if the current node has any children but also the new `parseNode` method which does the real "magic". Hope I'm not loosing you yet, here's `parseNode` and it's a little long:

    Tree.prototype.parseNode = function(node, parentid) {
        var sqls    = this.sqls,
            inserts = this.inserts,
            vars    = this.vars,
            id      = node.id,
            parentVar;

        if (parentid) {
            if (this.isIdPhantom(parentid)) {
                parentVar = vars[parentid];

                if (!parentVar) {
                    //no variable means it wasn't a phantom
                    parentVar = '?';
                    inserts.push(parentid);
                }
            } else {
                //wasn't a phantom
                parentVar = '?';
                inserts.push(parentid);
            }
        } else {
            //is a root child node
            parentVar = '?';
            inserts.push(null);
        }

        if (this.isIdPhantom(id)) {
            sqls.push('INSERT INTO my_table (`parentid`, `text`) VALUES (' + parentVar + ', ?);');

            inserts.push(
                node.text
            );

            if (node.children) {
                id = this.parsePhantomId(id);

                //create the mapping of the phantom id to the SQL variable
                vars[node.id] = '@' + id;

                //use SET query to set the variable to the last inserted id
                sqls.push('SET @' + id + ' = LAST_INSERT_ID();');
            }
        } else {
            this.realIds.push(id);

            sqls.push('UPDATE my_table SET `parentid` = ' + parentVar + ', `text` = ?  WHERE id = ?;');

            inserts.push(
                node.text,
                id
            );
        }
    };

So let's take this slowly. First, we have to check if the `parentid` exists for the sake of if the node has a parent or if it's a root child. This is also where we check if the parent is being created or updated. This also exposes the trick of handling create vs update, I use SQL variables. We'll talk about that more in a bit. If the parent wasn't a phantom (it already exists in the db) then we can set the `parentVar` variable to the `?` so that the mysql module can insert the parent's id into the ending SQL query. If the parent is a phantom, then we are going to use the assigned SQL query for the parent node.

Next, we handle the current node. We first check if the node's `id` designates it as a phantom or not. If it does then we add the INSERT SQL query to the array of queries but we use that `parentVar` that is either `?` or the SQL variable. If the node has children, then we need to assign that node a SQL safe variable (using the `parsePhantomId` method that replaces hyphens with underscores), cache that SQL variable to the `vars` Object for lookup in child nodes and then add the SET SQL query that will set the SQL variable to the last insert id from the last INSERT query. So now we see something like this:

    INSERT INTO my_table (`parentid`, `text`) VALUES (?, ?);
    SET @Model_1 = LAST_INSERT_ID();
    INSERT INTO my_table (`parentid`, `text`) VALUES (@Model_1, ?);
    SET @Model_3 = LAST_INSERT_ID();
    INSERT INTO my_table (`parentid`, `text`) VALUES (@Model_3, ?);

So now you can start to understand what I'm building. Using SQL variables to cache that real last insert id in the db will allow the whole tree data to be saved to the db in a single transaction. Of course if the node already exists I use an UPDATE instead of an INSERT and of course I don't need to set a SQL variable since the parent exists. So I could have something like this if the first node existed:

    UPDATE my_table SET `parentid` = ?, `text` = ? WHERE id = ?;
    INSERT INTO my_table (`parentid`, `text`) VALUES (@Model_1, ?);
    SET @Model_3 = LAST_INSERT_ID();
    INSERT INTO my_table (`parentid`, `text`) VALUES (@Model_3, ?);

However with a node that already exists, I do cache the real id to the `realIds` array so that I can delete all existing nodes that do not match those IDs since I expect the entire tree data to be sent back to the server.

### Conclusion

I hope I didn't loose you, it can be hard to blog about something like this and not just dump a bunch of code on you. I wanted to show that with a single flat array of SQL queries you can save a hierarchical tree structured data in a way where it can account for if the node and its parent are already existing in the database or not with the use of SQL variables. I'm really enjoying the actual simplicity of this and is thus far really working well. Like I said at the start, I am sending the entire data tree back which isn't optimal but for a start is perfect. I'd have to deal with deletes and specifying the parent's id on the client with the nodes being sent to the server to help with the relationship.

Just in case the broken up code is a bit hard to follow, here is the `Tree.js` file I have:

    var mysql       = require('mysql'),
        phantomIdRe = /-/g;

    function Tree(data) {
        this.data    = data;
        this.sqls    = [];
        this.inserts = [];
        this.vars    = {};
        this.realIds = [];

        return this;
    }

    Tree.prototype.isArray = function(value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    };

    Tree.prototype.isIdPhantom = function(id) {
        return typeof id === 'string' && id.indexOf('-') > -1;
    };

    Tree.prototype.parsePhantomId = function(id) {
        return id.replace(phantomIdRe, '_');
    };

    Tree.prototype.save = function(callback) {
        var data    = this.data,
            sqls    = this.sqls,
            inserts = this.inserts,
            tree;

        this.parseChildren(data);

        if (this.realIds && this.realIds.length) {
            sqls.unshift('DELETE FROM my_table WHERE id NOT IN(?);');
            inserts.unshift(this.realIds);
        }

        //execute the sqls
        console.log(mysql.format(sqls.join(''), inserts));

        callback();
    };

    Tree.prototype.parseChildren = function(children, parent) {
        if (!this.isArray(children)) {
            children = children.children;
        }

        var i        = 0,
            length   = children.length,
            parentid = parent && parent.id,
            node;

        if (length) {
            for (; i < length; i++) {
                node = children[i];

                this.parseNode(node, parentid);

                if (node.children) {
                    this.parseChildren(node.children, node);
                }
            }
        }
    };

    Tree.prototype.parseNode = function(node, parentid) {
        var sqls    = this.sqls,
            inserts = this.inserts,
            vars    = this.vars,
            id      = node.id,
            parentVar;

        if (parentid) {
            if (this.isIdPhantom(parentid)) {
                parentVar = vars[parentid];

                if (!parentVar) {
                    //no variable means it wasn't a phantom
                    parentVar = '?';
                    inserts.push(parentid);
                }
            } else {
                //wasn't a phantom
                parentVar = '?';
                inserts.push(parentid);
            }
        } else {
            //is a root child node
            parentVar = '?';
            inserts.push(null);
        }

        if (this.isIdPhantom(id)) {
            sqls.push('INSERT INTO my_table (`parentid`, `text`) VALUES (' + parentVar + ', ?);');

            inserts.push(
                node.text
            );

            if (node.children) {
                id = this.parsePhantomId(id);

                //create the mapping of the phantom id to the SQL variable
                vars[node.id] = '@' + id;

                //use SET query to set the variable to the last inserted id
                sqls.push('SET @' + id + ' = LAST_INSERT_ID();');
            }
        } else {
            this.realIds.push(id);

            sqls.push('UPDATE my_table SET `parentid` = ' + parentVar + ', `text` = ? WHERE id = ?;');

            inserts.push(
                node.text,
                id
            );
        }
    };

    module.exports = Tree;
