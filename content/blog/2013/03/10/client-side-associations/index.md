---
title: Client side associations
date: "2013-03-10T15:50:03.284Z"
---

Something that I have seen and heard was how to work with associations. This is a loaded topic but in an application I am working on I have worked with something that I don't think is a very known or talked about topic which is working with associations only in the client. It's surprisingly easy.

## Application Need

This doesn't have anything to do with the application I am working on, that's secret but the need of this example application is a user has an address book. Each address book entry has an association to the user the entry is for and also for the owner of the address book. So we will only have 2 models, one for the address book entry and one for the user. The address book entry model has a hasOne association to the user the entry is for and a belongsTo association to the owning user the entry belongs to. Likewise, the user model has a hasMany association to the address book entries (owner has many entries) and a belongsTo association to the address book entry (user belongs to an entry). The user model could also have a hasMany providing an association that the user could belong to many entries but for this example let's not get all carried away.

So can you picture the models that we could setup for our Ext JS 4 application? Let's take a look at the models:

```js
Ext.define('MyApp.model.User', {
    extend : 'Ext.data.Model',

    fields : [
        'id',
        'firstName',
        'lastName'
    ],

    associations : [
        {
            type           : 'hasMany',
            model          : 'MyApp.model.Address',
            getterName     : 'getAddresses',
            associationKey : 'AddressBook'
        },
        {
            type           : 'belongsTo',
            model          : 'MyApp.model.Address',
            getterName     : 'getAddress',
            associationKey : 'Address'
        }
    ]
});

Ext.define('MyApp.model.Address', {
    extend : 'Ext.data.Model',

    fields : [
        'id',
        'userid',
        'ownerid'
    ],

    associations : [
        {
            type           : 'hasOne',
            model          : 'MyApp.model.User',
            getterName     : 'getUser',
            associatedName : 'User',
            associationKey : 'User'
        },
        {
            type           : 'belongsTo',
            model          : 'MyApp.model.User',
            getterName     : 'getOwner',
            associatedName : 'Owner',
            associationKey : 'Owner'
        }
    ]
});
```

First I want to show how to load an adress book for some user. Here is a sample JSON that we will use:

```json
{
    "success" : true,
    "total"   : 5,
    "data"    : [
        {
            "id"      : 1,
            "userid"  : 2,
            "ownerid" : 1,
            "User"    : {
                "id"        : 2,
                "firstName" : "Person",
                "lastName"  : "A",
                "email"     : "personA@mitchellsimoens.com"
            },
            "Owner"   : {
                "id"        : 1,
                "firstName" : "Mitchell",
                "lastName"  : "Simoens",
                "email"     : "mitchellSimoens@mitchellsimoens.com"
            }
        },
        {
            "id"      : 2,
            "userid"  : 3,
            "ownerid" : 1,
            "User"    : {
                "id"        : 3,
                "firstName" : "Person",
                "lastName"  : "B",
                "email"     : "personB@mitchellsimoens.com"
            },
            "Owner"   : {
                "id"        : 1,
                "firstName" : "Mitchell",
                "lastName"  : "Simoens",
                "email"     : "mitchellSimoens@mitchellsimoens.com"
            }
        },
        {
            "id"      : 3,
            "userid"  : 4,
            "ownerid" : 1,
            "User"    : {
                "id"        : 4,
                "firstName" : "Person",
                "lastName"  : "C",
                "email"     : "personC@mitchellsimoens.com"
            },
            "Owner"   : {
                "id"        : 1,
                "firstName" : "Mitchell",
                "lastName"  : "Simoens",
                "email"     : "mitchellSimoens@mitchellsimoens.com"
            }
        },
        {
            "id"      : 4,
            "userid"  : 5,
            "ownerid" : 1,
            "User"    : {
                "id"        : 5,
                "firstName" : "Person",
                "lastName"  : "D",
                "email"     : "personD@mitchellsimoens.com"
            },
            "Owner"   : {
                "id"        : 1,
                "firstName" : "Mitchell",
                "lastName"  : "Simoens",
                "email"     : "mitchellSimoens@mitchellsimoens.com"
            }
        },
        {
            "id"      : 5,
            "userid"  : 6,
            "ownerid" : 1,
            "User"    : {
                "id"        : 6,
                "firstName" : "Person",
                "lastName"  : "E",
                "email"     : "personE@mitchellsimoens.com"
            },
            "Owner"   : {
                "id"        : 1,
                "firstName" : "Mitchell",
                "lastName"  : "Simoens",
                "email"     : "mitchellSimoens@mitchellsimoens.com"
            }
        }
    ]
}
```

So we have a `success` and `total` property and our actual data is within the `data` property. I much prefer to be within a nesting like this as I believe everything should be setup for paging. Anyway so looking at the actual data we have the `userid`, which is the user ID that belongs to this entry, the `ownerid`, which is the user ID that owns this entry, the `User` which holds the associated data of the user that belongs to this entry and `Owner` which holds the associated data of the user that owns this entry. We are setup quite nice for what we need! All is left is to create a store that can use the `MyApp.model.Address` model and read this data and setup the associations.

```js
new Ext.data.Store({
    autoLoad  : true,
    model     : 'MyApp.model.Address',
    proxy     : {
        type        : 'ajax',
        url         : 'address_book.json',
        reader      : {
            type : 'json',
            root : 'data'
        },
        extraParams : {
            ownerid  : 1
        }
    },
    listeners : {
        load : function (store, recs) {
            var rec   = recs[0],
                user  = rec.getUser(),
                owner = rec.getOwner();

            console.log(user);
            console.log(owner);
        }
    }
});
```

Execute that and the store will automatically load the JSON file and further more has a `load` listener to just console out the user and owner. All works well right? Remote loading association is actually quite easy if you know the configs of associations and how to use it.

## Back to the blog needs

So let's get back to the need of this blog which is client side association, we want to create a store that does not load data remotely but has it all locally for some means, for this blog post just for fun. Let's look at the store we will use for this, we will use the same models as above:

```js
var addressBook = new Ext.data.Store({
    model     : 'MyApp.model.Address',
    proxy     : {
        type   : 'memory',
        reader : {
            type : 'json',
            root : 'data'
        }
    },
    listeners : {
        load : function (store, recs) {
            var rec   = recs[0],
                user  = rec.getUser(),
                owner = rec.getOwner();

            console.log(user);
            console.log(owner);
        }
    }
});
```

Kept everything pretty much the same but removed the `autoLoad` config from the store, changed the proxy `type` to `'memory'` and removed the `url` config from the proxy all to make this store 100% be local only and not have any unneeded items. Many would try to use the store's `add` method like this:

```js
store.add([
    {
        "id"      : 1,
        "userid"  : 2,
        "ownerid" : 1,
        "User"    : {
            "id"        : 2,
            "firstName" : "Person",
            "lastName"  : "A",
            "email"     : "personA@mitchellsimoens.com"
        },
        "Owner"   : {
            "id"        : 1,
            "firstName" : "Mitchell",
            "lastName"  : "Simoens",
            "email"     : "mitchellSimoens@mitchellsimoens.com"
        }
    },
    {
        "id"      : 2,
        "userid"  : 3,
        "ownerid" : 1,
        "User"    : {
            "id"        : 3,
            "firstName" : "Person",
            "lastName"  : "B",
            "email"     : "personB@mitchellsimoens.com"
        },
        "Owner"   : {
            "id"        : 1,
            "firstName" : "Mitchell",
            "lastName"  : "Simoens",
            "email"     : "mitchellSimoens@mitchellsimoens.com"
        }
    },
    {
        "id"      : 3,
        "userid"  : 4,
        "ownerid" : 1,
        "User"    : {
            "id"        : 4,
            "firstName" : "Person",
            "lastName"  : "C",
            "email"     : "personC@mitchellsimoens.com"
        },
        "Owner"   : {
            "id"        : 1,
            "firstName" : "Mitchell",
            "lastName"  : "Simoens",
            "email"     : "mitchellSimoens@mitchellsimoens.com"
        }
    },
    {
        "id"      : 4,
        "userid"  : 5,
        "ownerid" : 1,
        "User"    : {
            "id"        : 5,
            "firstName" : "Person",
            "lastName"  : "D",
            "email"     : "personD@mitchellsimoens.com"
        },
        "Owner"   : {
            "id"        : 1,
            "firstName" : "Mitchell",
            "lastName"  : "Simoens",
            "email"     : "mitchellSimoens@mitchellsimoens.com"
        }
    },
    {
        "id"      : 5,
        "userid"  : 6,
        "ownerid" : 1,
        "User"    : {
            "id"        : 6,
            "firstName" : "Person",
            "lastName"  : "E",
            "email"     : "personE@mitchellsimoens.com"
        },
        "Owner"   : {
            "id"        : 1,
            "firstName" : "Mitchell",
            "lastName"  : "Simoens",
            "email"     : "mitchellSimoens@mitchellsimoens.com"
        }
    }
]);
```

This will load models into the store but if you inspect any of the model instances you will notice that it will not have the associations setup. This is because of one important thing that everyone needs to know. To get associations to work properly, the reader that is attached to the proxy has to be involved in reading the data to setup the associations. The reader is the sleeper, the key to the whole process and `store.add(...);` does not include the reader which is why the above `store.add(...);` does not work for the associations. So what does? The `loadRawData` method on the store does include the reader so will this work? Let's look at how to use the `loadRawData` method with the `addressBook` store above:

```js
addressBook.loadRawData({
    "success" : true,
    "total"   : 5,
    "data"    : [
        {
            "id"      : 1,
            "userid"  : 2,
            "ownerid" : 1,
            "User"    : {
                "id"        : 2,
                "firstName" : "Person",
                "lastName"  : "A",
                "email"     : "personA@mitchellsimoens.com"
            },
            "Owner"   : {
                "id"        : 1,
                "firstName" : "Mitchell",
                "lastName"  : "Simoens",
                "email"     : "mitchellSimoens@mitchellsimoens.com"
            }
        },
        {
            "id"      : 2,
            "userid"  : 3,
            "ownerid" : 1,
            "User"    : {
                "id"        : 3,
                "firstName" : "Person",
                "lastName"  : "B",
                "email"     : "personB@mitchellsimoens.com"
            },
            "Owner"   : {
                "id"        : 1,
                "firstName" : "Mitchell",
                "lastName"  : "Simoens",
                "email"     : "mitchellSimoens@mitchellsimoens.com"
            }
        },
        {
            "id"      : 3,
            "userid"  : 4,
            "ownerid" : 1,
            "User"    : {
                "id"        : 4,
                "firstName" : "Person",
                "lastName"  : "C",
                "email"     : "personC@mitchellsimoens.com"
            },
            "Owner"   : {
                "id"        : 1,
                "firstName" : "Mitchell",
                "lastName"  : "Simoens",
                "email"     : "mitchellSimoens@mitchellsimoens.com"
            }
        },
        {
            "id"      : 4,
            "userid"  : 5,
            "ownerid" : 1,
            "User"    : {
                "id"        : 5,
                "firstName" : "Person",
                "lastName"  : "D",
                "email"     : "personD@mitchellsimoens.com"
            },
            "Owner"   : {
                "id"        : 1,
                "firstName" : "Mitchell",
                "lastName"  : "Simoens",
                "email"     : "mitchellSimoens@mitchellsimoens.com"
            }
        },
        {
            "id"      : 5,
            "userid"  : 6,
            "ownerid" : 1,
            "User"    : {
                "id"        : 6,
                "firstName" : "Person",
                "lastName"  : "E",
                "email"     : "personE@mitchellsimoens.com"
            },
            "Owner"   : {
                "id"        : 1,
                "firstName" : "Mitchell",
                "lastName"  : "Simoens",
                "email"     : "mitchellSimoens@mitchellsimoens.com"
            }
        }
    ]
});
```

Execute that and the `load` event fired so the `load` listener executes which will show that the association getter methods are there and return the proper data just like the remote loading example. Awesome! Something to add to this is we really don't need the add method on the store as we can pass a second argument to the `loadRawData` method which will tell it to append the model instances created by the data you pass in to the current dataset of the store, pretty much exactly what the `add` method does just with passing the data to the reader. The `add` method can still be used as reading the data via the reader comes with a little overhead as it executes more code but it's really minimal (depending on our data structure of course). This append argument is used like this:

```js
store.loadRawData(data, true);
```

## Client side model associations

So we have a store being able to read associated data purely locally using the `loadRawData` method. But that's not the full story of client side association handling. Models can live outside stores meaning you can create model instances by themselves. Let's look at how we can do that:

```js
var data = {
    "id"      : 1,
    "userid"  : 2,
    "ownerid" : 1,
    "User"    : {
        "id"        : 2,
        "firstName" : "Person",
        "lastName"  : "A",
        "email"     : "personA@mitchellsimoens.com"
    },
    "Owner"   : {
        "id"        : 1,
        "firstName" : "Mitchell",
        "lastName"  : "Simoens",
        "email"     : "mitchellSimoens@mitchellsimoens.com"
    }
};

var address_entry = Ext.create('MyApp.model.Address', data);

console.log(address_entry);
```

Execute that and see what is in the console. The instance has been created, the data is there for the `userid` and `ownerid` but check to see if the associations were made. They weren't were they and why? Just like the `store.add(...);` call, simply creating a model instance does not run the data through the reader which if we remember from earlier the reader is the key. Unfortunately, as of Ext JS 4.2.0 there is no way to get the associations to work by any means out-of-the-box so now we have to think how to override the framework to do what we want. Setting a breakpoint before the `store.loadRawData` call and following the code as it jumps around the key method on the reader is the `readAssociated` method which is executed like this:

```js
reader.readAssociated(record, data);
```

So you pass in a model instance (`record`) and the data that belongs to the record (`data`). So let's see how we can utilize that method. The `constructor` of `Ext.data.Model` has four arguments: `data`, `id`, `rawData`, and `convertedData`. I don't want to change the default behavior of `Ext.data.Model` so I really want to create a fifth argument of the constructor and further more I just want to create an abstract model for my app. So I need to create an abstract model and change the two current models to extend the abstract model and make the abstract model use the new argument to get the associations to be created. Let's look at the three models:

```js
Ext.define('MyApp.model.Abstract', {
    extend : 'Ext.data.Model',

    requires : 'Ext.data.proxy.Memory',

    proxy : {
        type : 'memory'
    },

    constructor : function (data, id, raw, convertedData, parseAssociation) {
        this.callParent([data, id, raw, convertedData]);

        if (parseAssociation) {
            this.proxy.reader.readAssociated(this, data);
        }
    }
});

Ext.define('MyApp.model.User', {
    extend : 'MyApp.model.Abstract',

    fields : [
        'id',
        'firstName',
        'lastName'
    ],

    associations : [
        {
            type           : 'hasMany',
            model          : 'MyApp.model.Address',
            getterName     : 'getAddresses',
            associationKey : 'AddressBook'
        },
        {
            type           : 'belongsTo',
            model          : 'MyApp.model.Address',
            getterName     : 'getAddress',
            associationKey : 'Address'
        }
    ]
});

Ext.define('MyApp.model.Address', {
    extend : 'MyApp.model.Abstract',

    fields : [
        'id',
        'userid',
        'ownerid'
    ],

    associations : [
        {
            type           : 'hasOne',
            model          : 'MyApp.model.User',
            getterName     : 'getUser',
            associatedName : 'User',
            associationKey : 'User'
        },
        {
            type           : 'belongsTo',
            model          : 'MyApp.model.User',
            getterName     : 'getOwner',
            associatedName : 'Owner',
            associationKey : 'Owner'
        }
    ]
});
```

The important part isn't that we changed the `MyApp.model.User` and `MyApp.model.Address` to extend `MyApp.model.Abstract`. The important part is the `constructor` method of the `MyApp.model.Abstract`. You can see the fifth argument (`parseAssociation`) and the `if` statement checking that argument and executing the `readAssociated` method on the reader (we also specify a default proxy on the abstract) that we pass in `this` (the model instance) and the `data` argument. This should do it right? Time to test:

```js
var data = {
    "id"      : 1,
    "userid"  : 2,
    "ownerid" : 1,
    "User"    : {
        "id"        : 2,
        "firstName" : "Person",
        "lastName"  : "A",
        "email"     : "personA@mitchellsimoens.com"
    },
    "Owner"   : {
        "id"        : 1,
        "firstName" : "Mitchell",
        "lastName"  : "Simoens",
        "email"     : "mitchellSimoens@mitchellsimoens.com"
    }
};

var address_entry = Ext.create('MyApp.model.Address', data, null, null, null, true),
    user          = address_entry.getUser(),
    owner         = address_entry.getOwner();

console.log(address_entry);
console.log(user);
console.log(owner);
```

Looking at the console we see 3 model instances consoled out, first is the address entry model instance and the other two are for the associations. Great! It works!

## Summary

We first looked at how to use associations with remote data. We then spent some time getting a store to locally read data and get the associations to work. Building on that local store, we looked at getting associations to work replacing the `store.add` method. Lastly we got creating single model instances to use the reader to get associations to work.

We have client side associations working within stores and models. We also found out the key to associations is the reader, the reader is where the associations are read and linked.

Happy coding!
