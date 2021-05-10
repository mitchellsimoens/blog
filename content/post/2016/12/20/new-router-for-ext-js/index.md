---
title: New Router for Ext JS
date: "2016-12-20T17:34:03.284Z"
---

When Fiddle 1 was being developed back in 2013, Ext JS 5 was in development. At that time, Ext JS did not have a router but Fiddle did. It was obvious that users of Ext JS would benefit so the router was implemented in Ext JS from what Fiddle did. Fast forward to today and we have a new support portal and a new fiddle and there are many things I needed from the router that the router simply did not support. So those new web apps are using a highly overridden router; wouldn't it be great if Ext JS' router would get an update with some of these new things? I thought so, so the next major version of Ext JS has an updated router and I'd like to take a minute to describe some of the updates.

### Update (02-13-2016)

This will be part of the Ext JS 6.5 release. I do not have a release date to provide at this time.

# Mixin
One thing I've seen many people ask for is a mixin to allow any class to use routes. This can be either because you aren't using an architecture (MVC or MVVM) or your application is structured to use utility singletons. Regardless the reasoning, we will have `Ext.route.Mixin` so that you can use the router wherever you want... even a store if that's your thing.

# Global befores
The support portal requires a user to be logged in, fiddle wants to know the session state up-front. Therefore, the routes need to not fire before the session is checked. The way I was doing this was to have a shared before action but this didn't scale very well. What is needed is a global means to have a before action to delay all routes. The router now has a wildcard route concept that will always fire before all routes:

    routes : {
        '*' : {
            before : 'onBeforeRoute'
        }
    }

And like any other before, you just need to execute that `action.resume()` or `action.stop()`. A great place for this would be in your `Application` class.

# Promise support in befores
One drawback to how befores work is the `action` argument is always the last argument which is important for routes having variable number of url parameters. It's not that it's hard to get the last argument, it's just a bit ugly to always have that code. Also, if you've follow me on [twitter](https://www.twitter.com/LikelyMitch), you may have noticed that I used to hate promises but now am a lover. So you can now use promises and `resolve()` or `reject()` to resume or stop the route's execution:

    onBeforeRoute : function() {
        return new Ext.Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 500);
        });
    }

Now you don't need to find that last argument and some Ext JS classes support promises in their API so it feels much more natural. But the choice is yours, just don't choose both. :)

# Named routes
The support portal and fiddle use multiple tokens in the document fragment. In fiddle, you may see `view/editor&fiddle/abc` and there are two tokens/routes there: `view/editor` and `fiddle/abc`. Click on the search icon on the left and it updates to `view/search&fiddle/abc`. To do this with out-of-the-box router in Ext JS 5 or 6, you'd have to manually parse out the string and replace the single token, definitely not developer friendly.

To solve this, a route can be named. So for this example, I could have this:

    routes : {
        'fiddle/:id' : {
            action : 'onFiddleChange',
            name   : 'fiddle'
        },
        'view/:type' : {
            action : 'onViewChange',
            name   : 'view'
        }
    }

In fiddle, I now can use `redirectTo` with an `Object` to update that one view token but leave the fiddle one alone:

    this.redirectTo({
        view : 'view/search'
    });

If I wanted to remove the fiddle token but leave the view one intact, just pass `null`:

    this.redirectTo({
        fiddle : null
    });

and the document fragment will then be `view/editor`. You can still pass a `String` to `redirectTo` if you want to completely replace the entire document fragment like you would in Ext JS 5 and 6.

**Note:** If you do not specify a name in the route object, it will default to the url provided. So the name of this route would be `view/:type`:

    routes : {
        'view/:type' : 'onViewChange'
    }

but that's not really friendly but can be useful.

# New `Action` class
In a route's before function, you may have used or seen the `action` argument. Before, this was just an `Object` literal with a `resume` and `stop` function. We are now elevating this to a class to add additional functionality and is really much more than that old `Object` literal. The job of the `Action` class is more of a runner when a route is being executed. An `Action` may have multiple `before` and `action` functions that need to be executed in sequence.

Within a `before` action, you can now add a `before` or `action` as you please:

    action.before((action) => {
        action.resume();
    });

You can also add handlers when the `Action` class has either been fully resolved or if it was stopped by using the `then` method:

    action.then(function() {}, function() {});

# Suspend/Resume the router
This is one feature I didn't have a need for personally but I have been asked about it and it's simple to implement. If you want to suspend the router completely during some task, you will be able to:

    Ext.route.Router.suspend();
    Ext.route.Router.resume();

Boom! Done! Exactly like [suspendEvents](http://docs.sencha.com/extjs/6.2.1/classic/Ext.mixin.Observable.html#method-suspendEvents) and [resumeEvents](http://docs.sencha.com/extjs/6.2.1/classic/Ext.mixin.Observable.html#method-resumeEvents), you can also tell the `suspend` method to queue the routes while the router is suspended or discard the routes when the `resume` method is executed:

    Ext.route.Router.suspend(false); //will not queue routes while is suspended
    Ext.route.Router.resume(true);   //will dump the queue before it is resumed

# Unit tests
In today's Sencha, having unit tests is a priority. We now have over a hundred unit tests for the 4 classes. Do note, you can never say you have enough unit tests so the number will be growing (100% code coverage !== no bugs).
