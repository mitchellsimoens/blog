---
title: Loading Ext.Direct api
date: "2015-09-22T14:58:03.284Z"
---

Personally, I use a technology called Ext.Direct for my projects. Ext.Direct is platform and language agnostic remote procedure call protocol. I'm not going to go into the features and benefits of using Ext.Direct in this post, I'll save it for a different post but you can check out the [spec](http://docs.sencha.com/extjs/latest/direct/specification.html) we released.

### Bad Ways

Lately, I've seen a few methods people are using to load the api descriptor and I'd like to show them and discuss why they are a bad idea and then of course show the proper way. First means of loading the api I recently saw is this:

    Ext.define('MyApp.DirectAPI', {
        requires: ['Ext.direct.*', 'Ext.Ajax']
    }, function() {
        Ext.Ajax.request({
            url: "/DirectApi",
            async: false,
            success: function(xhr) {
                Ext.globalEval(xhr.responseText);
            },
            failure: function(xhr) {
                throw "Direct API load failed with error code " + xhr.status + ": " + xhr.statusText;
            }
        });
        Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);
    });

What this is doing is if the application requires `MyApp.DirectAPI` it will then do a synchronous ajax call, eval the response and then add the provider.

Another means I saw is:

    Ext.define('MyApp.DirectAPI', {
        requires: ['Ext.direct.*']
    }, function() {
        Ext.Loader.loadScriptsSync('api.php');
        /*
        Add provider. Name must match settings on serverside
        */
        Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);
    });

This is basically the same thing as the first code, just uses `Ext.Loader.loadScriptsSync` instead of `Ext.Ajax.request`. The only difference is the `loadScriptsSync` does the eval for you, both use `XMLHttpRequest`.

### The Why

So these techniques work but why are they bad? The main issue in both is the use of a synchronous call. Let's look at this from a user standpoint. The user has to wait for the application to load (Ext JS apps are normally larger), then the browser locks up for a period of time and then the application renders. What would you do if every time you visit an app you had a period where it locks up the entire browser? Honestly, I wouldn't use it or if I had to I'd complain about it. Networks fail, servers can be complex and slow. If the call to load the Ext.Direct api took 10 seconds, you'd have 10 seconds where the user is sitting looking at the screen with a browser that cannot do anything. I've forced closed apps for that before. In fact, at one client an async request took over a minute to complete and I fought to have them fix that, their solution was for me to raise the timeout. People need to look at the issue and see the proper way to fix issues, not just what's fast and easy.

### The Proper Way

If you are using [Sencha Cmd](https://www.sencha.com/products/extjs/#sencha-cmd) (which I would highly recommend), instead of the code ways above all you have to do is add the script to the `app.json`'s `js` array:

    "js": [
        {
            "path": "app.js",
            "bundle": true
        },
        {
            "path": "/direct/api",
            "remote": true
        }
    ]

Now, after you run a `sencha app watch` or `sencha app build`, Ext JS will automatically create a `<script>` tag to load the direct api and defer the application's `launch` method from executing until it has loaded. Then in the `launch` method you can then use the `Ext.direct.Manager.addProvider`.

If you're not using Sencha Cmd, then all you have to do is add a `<script>` to your index.html and your application's `launch` method or `Ext.onReady` will defer till it loads:

    <script type="text/javascript" charset="UTF-8" src="/direct/api"></script>

Without doing anything on the server, the application will still wait for the direct api to load so you still will have that issue to contend with but the browser will not be locked up. If the person wants to close the browser for whatever reason or open a new tab to do something else they can. So the difference is if the browser will be locked up or not, I'd choose not to lock the user's browser up. Even if the load takes < 1 second, since there is a way not to do it I wouldn't.
