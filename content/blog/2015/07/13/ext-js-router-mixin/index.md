---
title: Ext JS Router Mixin!
date: "2015-07-13T15:56:03.284Z"
---

Ever since I was able to implement a router into Ext JS (beginning with 5.0.0) it has been one of the best feature adds for application developers. It may not be flashy or spoken about a lot but it one of those missing features that should be a requirement for single page web applications. If you don't have it in your Ext JS application, you should drop everything and implement it. :)

Using it a lot myself and hearing of others using it, there are a few improvements to the Router to make it much better. It's incredibly useful now, it can be much more useful. I'm currently rewriting the support portal (in internal testing currently) and Sencha Fiddle (almost ready for internal testing) and I'm testing some overrides for many of the improvements. One such improvement is implementing the listening of routes and the `redirectTo` method as a mixin so you can literally work with the Router in any class such as a utility singleton.

All the router functionality is meant to work within a controller whether if be a global controller (extending `Ext.app.Controller`) or a view controller (extending `Ext.app.ViewController`) and since I wrote it I knew it was all implemented in the `Ext.app.BaseController`. So all I have to do is get the code from `BaseController` onto a mixin class and Ext JS has a method that makes this extremely easy. You'll be surprised how easy this was:

    Ext.define('Ext.app.route.Mixin', {
        extend : 'Ext.Mixin',

        requires : [
            'Ext.app.BaseController'
        ],

        mixinConfig : {
            id : 'route'
        },

        config : {
            routes : null
        }
    }, function(Mixin) {
        Mixin.borrow(Ext.app.BaseController, ['redirectTo', 'updateRoutes', 'getBefore', 'isActive']);
    });

The important part here is the third argument I pass into `Ext.define` which is a callback method that gets called when the class I'm defining is defined. In this method, I use the [`borrow`](http://docs.sencha.com/extjs/6.0/6.0.0-classic/#!/api/Ext.Base-static-method-borrow) method which will take an array of strings that are members (can be methods or properties) to take the 4 methods from `BaseController` and apply them onto my mixin class. Now, any class I mix in this mixin class, they will get those 4 methods and therefore will be able to use the router as if the class was a controller.

Let's look at how to then implement it. First, this class needs to be placed where it can be loaded. For this, since I use Sencha Cmd for all my apps, there is a way to include this without requiring it. Any class placed in the `overrides` directory will automatically be included regardless if it's an override or not. So I place this class in the `overrides/app/route/Mixin.js` and after a `sencha app watch` (or a build or refresh) and this mixin will automatically be included in my app. I do this because when this gets implemented into the framework, I don't have to look for any requires throughout my app, I can just remove the file.

Next, we need to add the mixin into a class. For this I create a ViewRouter utility class for starters:

    Ext.define('Fiddle.util.ViewRouter', {
        singleton : true,

        mixins : [
            'Ext.app.route.Mixin'
        ],

        config : {
            routes : {
                'home'            : 'onHome',
                'view/:view:item' : {
                    action     : 'onView',
                    conditions : {
                        //make :item optional
                        ':item' : '(?:(?:/){1}([a-z]+))?'
                    }
                }
            }
        },

        onHome : function() { /* */ },

        onView : function(view, item) { /* */ }
    });

Just like you'd expect, you can listen for routes as if this singleton was a controller. You can also use `this.redirectTo('foo')` in this class to redirect the app to a hash also.

# Disclaimer

Writing about this here makes no promise of it actually being implemented into Ext JS. I do want to but do not make any promise of if or when. If implemented, this will be 100% backwards compatible with Ext JS 5 and 6 applications where you would be handling the routes within a controller.
