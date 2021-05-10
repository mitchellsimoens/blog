---
title: Delaying launch for stores to load
date: "2015-07-02T13:07:03.284Z"
---

A common request I hear from many people is how to delay the application's `launch` method from being executed. First, let's investigate the problem. Say you have a normal `app/Application.js` that looks like:

    Ext.define('Fiddle.Application', {
        extend : 'Ext.app.Application',

        name : 'Fiddle',

        stores : [
            'Store1',
            'Store2',
            'Store3'
        ],

        launch : function() {
            var store1 = Ext.getStore('Store1'),
                store2 = Ext.getStore('Store2'),
                store3 = Ext.getStore('Store3');

            console.log('store1 isLoaded', store1.isLoaded());
            console.log('store2 isLoaded', store2.isLoaded());
            console.log('store3 isLoaded', store3.isLoaded());

            Ext.Msg.alert('Fiddle', 'All stores are loaded!');
        }
    });

In the `launch` method you have some code that depends on the stores being loaded. Ok, this example just has some `console.log`s so use your imagination some. I could add logic to the launch method and execute some other method on this class sure but there may be a more elegant way. If you were to run this right now, your `Ext.Msg.alert` would happen but all the `console.log`s would show `false` for the `isLoaded` method calls because the load hasn't happened yet. So what we need to do is add `load` listeners to the stores and only execute the `launch` method when all stores have loaded.

What I like to do is keep `app/Application.js` looking like it is and create an override on the `Ext.app.Application` class. What this override will do is change the `launch` method so that we can check if the stores have loaded. When they have all loaded, then execute the original `launch` method.

Let's take a look at a [Sencha Fiddle](https://fiddle.sencha.com) as an example:

<iframe style="border:0;width:600px;height:600px;" src="https://fiddle.sencha.com/fiddle/pq4"></iframe>

Looking at the different files, we have the 3 stores defined. `Store1` and `Store3` have `autoLoad` set to `true` but `Store2` does not so we only need to wait for `Store1` and `Store3` to load.

If you want, you can take a peak at `overrides/app/Application.js` to see how I take control of the `launch` method. Here's a rundown. The `launch` method gets transformed in the cleverly named `transformLaunch` method into a function that checks if all stores are loaded. The other method that is important is the `isStoreLoaded` method, this is important because this tells the override if the store has loaded in order to add the `load` listener and to tell if all stores have loaded. You may need to add additional logic dependent on your application's situation. If you need to modify that logic, I like to keep the override like it is and add that logic into my `app/Application.js` class so the logic is upfront in the app.
