---
title: 6.6 Router Improvements
date: "2017-08-21T18:48:03.284Z"
---

If you know me, you know that the router is very important to every application I build. And like every iteration of Ext JS' router, [Sencha Fiddle](https://fiddle.sencha.com/) is the application that has the most contribution and the most experimentation (Sencha Fiddle has a custom router with overrides to add new features to the Ext JS version it's using) on the router. Once again, with Ext JS 6.6, Sencha Fiddle exposed some features that would be great but it's also talking to the community that has provided many improvements as well. I want to talk about four new features that have landed in 6.6.

# Exit Handler

This feature came from a community member ([LesJ](https://www.sencha.com/forum/member.php?210320-LesJ) from the Sencha Forums).

There are many times when you create things in response to a route being executed that you may need to cleanup. For example, you may have opened an [Ext.window.Window](https://docs.sencha.com/extjs/latest/classic/Ext.window.Window.html) but when the route is executed, you need to close that window. So in your `action` handler, you create the window and likely cache it somewhere and when another route is executed you check to see if any windows are shown and clean that up. Ok, not the end of the world but this means code starts to get ugly and brittle and you start engineering things where Ext JS could make this easy.

With Ext JS 6.6, we are going to make this easy with a new `exit` handler and the use of it is just like the `action` and `before` handler:

    routes : {
        'foo/bar' : {
            action : 'onFoo',
            exit   : 'onExit',
            name   : 'foo'
        }
    },

    onFoo : function () {},

    onExit : function () {}

So now your route can handle when the route no longer recognizes anything in the hash. Internally, each route keeps track of the last token it was executed on which allows it to know if it was being exited which is needed if you use multiple tokens as is the case in my apps like Sencha Fiddle.

# Single Routes

This improvement comes from a need for Sencha Fiddle.

At the start of Sencha Fiddle (and the support portal) I have to check user session and I also wait for certain stores to load before I want to continue with showing views and such. Currently, I have a global route with a before, here is a small example:

    routes : {
        '*' : {
            before : 'onBeforeGlobal'
        }
    },

    onBeforeGlobal : function () {
        return new Ext.Promise(function (resolve, reject) {
            // check if things have finished loading
        });
    }

I have an array of stores I go through and check if it has [loaded](https://docs.sencha.com/extjs/latest/classic/Ext.data.ProxyStore.html#method-isLoaded). However, I felt like this was wasteful because it's going to check if these stores are loaded for each route as the `*` wildcard route fires before all other routes; I only needed it to check upfront. Taking a page out of the Observable listeners where you can pass `single: true`, routes will be able to define their singleness:

    routes : {
        '*' : {
            before : 'onBeforeGlobal',
            single : true
        }
    }

Tough syntax huh? This will remove the route from the router after the `before` and `action` handlers have been executed. Once removed, the route will not longer be connected and will not execute anymore. Perfect!

Or is it? Why wait for a full, successful execution to remove the route? Why not always remove it? Knowing that all applications (or developers) do not have the same requirements, we decided to give a bit more control and so the `single` option can also accept `'before'` and `'after'`. These string values are about when to remove the route.

`'before'` will remove the route before the configured `before` handler is executed. This means the route will always get removed regardless if the `before` action is resolved or rejected.

`'after'` will remove the route right after the `before` handler has been resolved but prior to the `action` handler to be removed. This can be seen as very similar to the `true` value since the `action` handler cannot be stopped (assuming to errors occur), however, the difference is when you have other routes that have a `before`. Those other `before`s may reject which would then not execute our single route's `action` handler from executing which means the route would not get removed.

Kind of hard to grok fully from just text so I'll try another way of explaining it. When you defined the `routes` config, it will actually only create one route instance matching the route name (or pattern) and the `before`/`action` handlers are then added to that route's `handlers` array. So when a hash changes, it finds the matching route instance and then executes it. It creates two arrays: the `before`s and the `action`s. Execution will go through each before in an async stack (each before has to resolve before moving onto the next before) and then it will go through the action stack. So there are three insert points on where the route can be removed: beginning of the before stack, within the before stack after the matching `before` action, and on the end of the action stack. So it's very important to know when you'd want the route to be removed in that execution but the main point is whether to wait for a `before` or all `before`s to resolve.

We picked `true` to remove on the end of the action stack but are still discussing whether it should go on the beginning of the before stack so these values may change. This will be documented in the API Docs when 6.6 is released so I would recommend checking the final docs. Also, comment below if you feel strongly about this. I'll even see if I can create an example and/or image to show this a bit better, I'm still trying to find a great way to explain it with so many duplicate terms.

# Lazy Routes

This feature came out from the [coworkee app](https://github.com/sencha-extjs-examples/Coworkee) that was developed internally among some posts on the forum.

One issue with using routes in ViewControllers is that the ViewController may not be instantiated when the route was already executed. I personally don't spread routes around too much but people have been asking for this and it was easy to implement so ok. People asked for the routes defined on their ViewController to execute if it matches a current hash. We are calling this `lazy` and it can be defined like so:

    routes : {
        'user/:id' : {
            action  : 'onUser',
            lazy    : true,
            name    : 'user'
        }
    }

This means, if the hash is already `#user/1234` when the ViewController is instantiated, this route will execute.

I'm personally not a fan of defining routes all around my application but I do see some value it in since I've built some heinous enterprise UIs and routes may only update a portion of the screen not simply swap out what view is in the center/content region.

# Named Types

This feature came from a mix of things from Fiddle to support tickets to a conversation between Don Griffin and I. This feature also aims to fix two different problems.

Ok, I teased this on Twitter and here is what this was about.

The first "problem" is people currently have to define custom matching RegExp strings to control the format of a url parameter. What I mean is say you have a user route that accepts an ID but that ID will only be numeric so you can define it as such:

    routes : {
        'user/:id' : {
            action     : 'onUser',
            name       : 'user',
            conditions : {
                ':id' : '([0-9]+)'
            }
        }
    },

    onUser : function (id) {}

Now, this route will only execute for hashes where `:id` is numeric such as `user/1234` but will not execute if there are other characters such as `user/1234abc`. One important note to make here is the [defaultMatcher](https://docs.sencha.com/extjs/latest/classic/Ext.route.Route.html#property-defaultMatcher) of a route is `([%a-zA-Z0-9\\-\\_\\s,]+)` so it will accept a few different characters that you may or may not want.

My initial proof of concept had a syntax such as :

    routes : {
        'user/:num' : {
            action : 'onUser',
            name   : 'user'
        }
    }

And that `:num` would automatically use the `([0-9]+)` RegExp. This is pretty simple right? The issue with this syntax is what if you had a `:num` parameter in a route but didn't want that exact RegExp? There was also `:alpha` and `:alphanum`. The chance of collision here was very tiny but if you were one of the unlucky people that would have a name conflict, it likely would be a silent failure and you'd find out about it in production which is not good at all. So we discussed how we can prevent this and a couple different ideas came up like `:$num` or some character to signify this was to be treated as a named type. But we decided on this format:

    routes : {
        'user/:{id:num}' : {
            action : 'onUser',
            name   : 'user'
        }
    },

    onUser : function (params) {
        var id = params.id;
    }

So we surround the parameter name and type in curly braces. Quick note, the type (`:num` in this case) is optional so you can have `:{id}` and the `defaultMatcher` will then be used. Other default types are `:alpha` and `:alphanum`. Also, for `:num` and `:alphanum`, numbers will be cast using `parseFloat` so you can have `#foo/10.4` and 10.4 will be a float instead of just a string.

Also notice in the `onUser` we have `params` which will be an object and the parameter names will not be the key of that object. This was another of the problems where having separate arguments in the functions could get a bit wildly and it can be a good rule of thumb if you have more than 3 arguments, an object will be more friendly. So if you use these new named typed, an object will always be passed to the handlers.

We have some detection if you reuse a param name, an error will be thrown in the console with what name was duplicated and what route this was defined in. So if you have `user/:{id}/:{id}`, you'd get an error in the console such as:

    "id" already defined in route "user/:{id}/:{id}"

Also, if you have a type that is not known, you'll also get an error. So say you have `user/:{id:foo}`, `:foo` is not a default type so you'd get this error:

    Unknown parameter type "foo" in route "user/:{id:foo}"

Since there is a difference between how the parameters are passed to the handlers, we don't want the two syntaxes mixed in a route. The older syntax is called "positional" and the newer being called "named". If you mix these syntaxes like so: `foo/:bar/:{baz}` you will get the error:

    URL parameter mismatch. Positional url parameter found while in named mode in the route "foo/:bar/:{baz}".

A couple thoughts here on the duplicate parameters. Right now, you cannot have duplicate parameter names in the same route. However, we've discussed turning the single value into an array to support duplicate names, however, we don't really think this will be something that many will use and an error may be more helpful. Once again, let us know your thoughts as we can have a config to allow this if people would want it, just provide us with a real world scenario where you'd want it.

You can define your own custom named types via an override. For example, in Sencha Fiddle a fiddle id will only be `[a-z0-9]` and I can have the route defined in a couple places so having a central place to have this and be able to be used anywhere would be a big pro. So you can add one:

    Ext.define('Override.route.Route', {
        override : 'Ext.route.Route',

        config : {
            types : {
                'fiddleid' : {
                    re : '([a-z0-9]+)'
                }
            }
        }
    });

Now I can define routes such as:

    routes : {
        'fiddle/:{id:fiddleid}' : {
            action : 'onFiddle',
            name   : 'fiddle'
        }
    },

    onFiddle : function (params) {
        Ext.Ajax
            .request({
                url : '/fiddle/get/' + params.id
            })
            .then(function (fiddle) {
                // ...
            });
    }

So since we are now parsing parameters and their types, there is one thing that I've seen people ask for and that would be supporting an arbitrary number of parameters in a hash. For example, say you want to support hashes like `#view/foo` and `#view/foo/bar/baz` in a single route. Before, you'd have to do something complex with conditions and if you didn't want to get too complex, you'd have a static number of parameters defined in your pattern like `view/:foo/:bar/:baz` (this isn't a very good, full example of what would be needed). So we are attempting to handle this with this syntax:

    routes : {
        'view/:{args...}' : {
            action : 'onView',
            name   : 'view'
        }
    },

    onView : function (params) {
        // Ext.isArray(params.args) === true
    }

By default, this syntax will match everything (uses `(.+)?`) and split on `/` so that you get an array of values. Like the `:num` and `:alphanum`, this will also attempt to cast numbers into floats. So if you have this hash `#view/foo/12.45/bar`, this is what the params object would be:

    {
        args : [ 'foo', 12.45, 'bar' ]
    }

As you would expect, you don't need to have just the one parameter, you can have other parameters with their own types:

    routes : {
        'view/:{which}/:{amount:num}:{args...}' : {
            action : 'onView',
            name   : 'view'
        }
    }

The params object would then be:

    {
        amount : 12.45,
        args   : [ 'bar' ],
        which  : 'foo'
    }

Most people would be fine with splitting by `/` but if you wanted another character you can override this via:

    Ext.define('Override.route.Route', {
        override : 'Ext.route.Route',

        config : {
            types : {
                '...' : {
                    split : '-'
                }
            }
        }
    });

This also shows there are 3 things you can use when defining your own type. The `...` is just a type defined as such:

    '...': {
        re: '(.+)?',
        split: '/',
        parse: function (values) {
            var length, i, value;

            if (values) {
                length = values.length;

                for (i = 0; i < length; i++) {
                    value = parseFloat(values[i]);

                    if (!isNaN(value)) {
                        values[i] = value;
                    }
                }
            } else if (Ext.isString(values)) {
                // IE8 may have values as an empty string
                // if there was no args that were matched
                values = undefined;
            }

            return values;
        }
    }

Simple to understand, the `re` is the string that will control what pattern will be matched, `split` will turn the value into an array (or undefined if no matches) and `parse` allows you to parse the value into something else.

One type that could be useful and has come up a couple times in the last couple weeks is supporting query parameters in a hash. So you could use something like `#foo?bar&baz=2` and the query string like part would be turned into a nested object. You coul duse this override to support this:

    Ext.define('Override.route.Route', {
        override : 'Ext.route.Route',

        config : {
            types : {
                queryString : {
                    re    : '(?:\\?(.+))?',
                    parse : function (params) {
                        var name, value;

                        if (params) {
                            params = Ext.Object.fromQueryString(params);

                            for (name in params) {
                                value = params[name];

                                if (value) {
                                    if (/^[0-9]+$/.test(value)) {
                                        // let's turn this into a float
                                        params[name] = parseFloat(value);
                                    }
                                }
                                // an empty string would be ?foo
                                // which can be seen as truthy
                                else if (Ext.isString(value)) {
                                    params[name] = true;
                                }
                            }
                        }

                        return params;
                    }
                }
            }
        }
    });

You'd then defined your route as:

    routes : {
        'foo:{query:queryString}'   : {
            action : 'onFoo',
            name   : 'foo'
        }
    }

So if you had the hash as `#foo?bar&baz=2.1` then the params send to the `onFoo` method would be:

    {
        query : {
            bar : true,
            baz : 2.1
        }
    }

# Summary

Once again, Sencha has listened to it's community and along with what we learn as we use the router, the router is only getting better. More and more people are using in different applications and knowing how people use the router has been immensely helpful in crafting new features. Keep letting us know what you'd like. Open a forum thread and get my attention (Twitter is a great way, [@LikelyMitch](https://twitter.com/@LikelyMitch)) and I'd be more than happy to discuss it with you and give my honest personal opinion. :)
