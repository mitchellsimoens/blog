---
title: Use of a base url in a utility class
date: "2015-03-23T12:22:03.284Z"
---

I had an idea the other day and I'm not sure why I hadn't thought of it sooner. For the longest time I've always advocated to have a singleton utility class that holds onto configs like a base url. Then in your store, you can get the base url and prepend it. Something like this:

```js
Ext.define('MyApp.Util', {
    singleton : true,

    config : {
        baseUrl : 'http://foo.com/'
    },

    constructor : function(config) {
        this.initConfig(config);
    }
});

Ext.define('MyApp.store.Foo', {
    extend : 'Ext.data.Store',
    alias  : 'store.myapp-foo',

    requires : [
        'MyApp.Util',
        'MyApp.model.Foo'
    ],

    model : 'MyApp.model.Foo',

    proxy : {
        type : 'ajax',
        url  : MyApp.Util.getBaseUrl() + 'foo.json'
    }
});
```

When the `MyApp.store.Foo` class is loaded by the browser, that `MyApp.Util.getBaseUrl()` is automatically evaluated and if you had `MyApp.Util` loaded prior to the store being loaded, it will concat the `http://foo.com/` and `foo.json` and everything is good. The biggest drawback to this was that you had to require the `MyApp.Uti` class in both the `Ext.application` and the store's `requires` array. (side note, Sencha Cmd may be able to detect `MyApp.Util` but I've seen where this falls down so I'm usually more explicit with my `requires` array) Also, in your code you have to spread the `MyApp.Util.getBaseUrl()` calls around everywhere.

Instead, I had a thought to make this workflow much easier! What if you were able to define your store like this?

```js
Ext.define('MyApp.store.Foo', {
    extend : 'Ext.data.Store',
    alias  : 'store.myapp-foo',

    requires : [
        'MyApp.model.Foo'
    ],

    model : 'MyApp.model.Foo',

    proxy : {
        type : 'ajax',
        url  : 'foo.json'
    }
});
```

No requiring `MyApp.Util`, no `MyApp.Util.getBaseUrl()` spread everywhere. Looks like I can solve both my caveats right? But how can I get the base url in there? Just by this code, there isn't anything that will prepend it. Where's the magic?

The magic is all in the `MyApp.Util` class with a small change. `Ext.data.Connection` (`Ext.Ajax` is an instance off) will fire a `beforerequest` event allowing you to cancel the request or you can also modify the request by changing the params but you can also change the url of the request. So why not have `MyApp.Util` automatically prepend the baseUrl for us? Like so:

```js
Ext.define('MyApp.Util', {
    singleton : true,

    config : {
        baseUrl : 'http://foo.com/'
    },

    constructor : function(config) {
        this.initConfig(config);

        Ext.Ajax.on('beforerequest', this.onBeforeRequest, this);
    },

    onBeforeRequest : function(connection, options) {
        options.url = this.getBaseUrl() + options.url;
    }
});
```

All I did was add the `beforerequest` event listener, and then changed the `options.url` and it will automatically prepend the base url. Here it is in action:

<iframe src="https://fiddle.sencha.com/fiddle/k2p" style="border: 0; width: 600px; height: 600px;"></iframe>

Notice this will of course work with `Ext.Ajax.request` calls, this is what `Ext.data.proxy.Ajax` does under the hood anyway.

There is always a better way to do things and always many different ways to do things. There are more performant ways to do this but I like this approach as it's very logical to me in how it works. I can come back to this code in 2 years and easily pick up what I was doing.
