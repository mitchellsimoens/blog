---
title: Build configs using Sencha Command
date: "2012-06-19T11:08:03.284Z"
---

Many times when developing a Sencha Touch 2 app I often have to call remote data with a `Store` to fill `List`s. Simple thing to build a `Store` with a `Proxy` pointing to some server side script or `JSON` file. Simple stuff. Lately I have been using <a href="http://nodejs.org/" title="Node.js" target="_blank">Node.js</a> for many of my servers but this can still be used if you are using <a href="http://www.apache.org/" title="Apache" target="_blank">Apache</a> + <a href="http://www.php.net/" title="PHP" target="_blank">PHP</a> or <a href="http://www.silkjs.org/" title="SilkJS" target="_blank">SilkJS</a> or whatever. I test the server code locally but of course when I deploy I will have the remote server setup and want to use the remote server for production and local server for development as I'm sure many are also doing. Before starting, this is assumed you have a fresh app created using Sencha Command via:

```sh
cd /path/to/sencha-touch-2.0.1.1/
sencha app create Test ../Test
```

Since I have different environments with different a different base url for each environment I create a `Config` utility class to easily change the base url for when I deploy. This utility class looks like this in a simple form:

```js
Ext.define('Test.util.Config', {
    singleton : true,

    config : {
        baseUrl : 'http://www.mitchellsimoens.com/'
    },

    constructor : function(config) {
        this.initConfig(config);

        this.callParent([config]);
    }
});
```

So this will create a `Test.util.Config` singleton class which we can execute the `Test.util.Config.getBaseUrl()` in your `Store`s like so:

```js
Ext.define('Test.store.Users', {
    extend : 'Ext.data.Store',

    requires : [
        'Test.model.User'
    ],

    config : {
        autoLoad : true,
        model    : 'Test.model.User',
        proxy    : {
            type  : 'ajax',
            url   : Test.util.Config.getBaseUrl() + 'get/users'
        }
    }
});
```

When the `Users.js` file is evalutaed by the browser it will execute the `Test.util.Config.getBaseUrl()` and so the url that is on the prototype is actually `'http://www.mitchellsimoens.com/get/users'` which is fantastic. To make this work your `app.js` file should look like (removed some code):

```js
Ext.Loader.setPath('Test', 'app');

Ext.require([
    'Test.util.Config'
]);

Ext.application({
    //..

    stores : [
        'Users'
    ]
});
```

So we have an application with a `Users Store` and a `Config` utility class and the Users store is autoLoading from `http://www.mitchellsimoens.com/get/users` but we are still in development so we want to hit `localhost` not `www.mitchellsimoens.com`. We could just change the `baseUrl` config in `Test.util.Config` but that's manual and there is an automatic way for when you do a build and that is using `//&#60;debug&#62;` and `//&#60;/debug&#62;`. When you do any build:

```sh
cd /path/to/Test
sencha app build [testing|production|package|native]
```

Anything between the `//&#60;debug&#62;` and `//&#60;/debug&#62;` will automatically get removed. Get where I am going? So instead of manually changing the `baseUrl`, just do something like:

```js
Ext.define('Test.util.Config', {
    singleton : true,

    config : {
        baseUrl : 'http://www.mitchellsimoens.com/'
    },

    constructor : function (config) {
        this.initConfig(config);

        this.callParent([config]);
    }
//<debug>
},
function () {
    this.setConfig({
        baseUrl : 'http://localhost/'
    });
//</debug>
});
```

What this will do is when the `Ext.define` is finished creating the class definition and creating the singleton class it will execute the callback function which we are using to set the `baseUrl` config to `'http://localhost/'` which is overriding the `'http://www.mitchellsimoens.com/'`. And since we wrapped the new code in `//&#60;debug&#62;` and `//&#60;/debug&#62;` it will remove this override when we do any of the builds automatically switching the `baseUrl` for us not manually.

Further more, when you use `requires` and `uses` properties when creating class definitions you can remove those lines saving some space as they should all be within the built `app.js` file. So our `Users Store` we have above could be:

```js
Ext.define('Test.store.Users', {
    extend : 'Ext.data.Store',

    //<debug>
    requires : [
        'Test.model.User'
    ],
    //</debug>

    config : {
        autoLoad : true,
        model    : 'Test.model.User',
        proxy    : {
            type  : 'ajax',
            url   : Test.util.Config.getBaseUrl() + 'get/users'
        }
    }
});
```

And that will remove the `requires` property when you do a build saving 3 lines (plus the two for the debug comments) as it's not needed in a production build.

This is a trick of the trade that I found when developing Sencha Touch 2 apps using Sencha Command and one trick that I am really loving!
