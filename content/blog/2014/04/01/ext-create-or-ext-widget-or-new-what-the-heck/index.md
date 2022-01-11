---
title: Ext.create or Ext.widget or new... what the heck?
date: "2014-04-01T09:14:03.284Z"
---

There has been a conversation going on in a private forum on the Sencha Forums where it discusses what to use and what to recommend in regards to how to create an instance of a class in Ext JS (which spills over to Sencha Touch as well). You can use `Ext.create`, `Ext.widget` or the `new` keyword and the end result is the same. So which should you use? If you ask me, it depends on the situation but the more important thing to me is knowing what happens under the hood with each method. The more you understand about the framework the better off you will be (so long as you don't get overwhelmed which I will try not to do :) ). I'm not trying to sway you to use one method, I want you to know what happens under the hood and some drawbacks I see from each method.

## The `new` keyword

The simplest, most performant form of creating an instance is using the `new` keyword:

```js
new Ext.Component({
    html : 'Hello there'
});
```

This is the most performant means of creating an instance so why not always use it? Why have the other means? The first drawback of using the `new` keyword is that the class must always be loaded. In production this isn't an issue as all classes should be loaded in a single (minified/obfuscated) file but in development the class may not be loaded. If the class isn't loaded, a syntax error will be thrown. I would argue that you should setup your requires properly and this problem is now moot.

I personally always use the new keyword even when saving a couple CPU cycles doesn't matter. To me it's simpler and cleaner, the others are just a waste of extra code in a production build where performance really matters.

## `Ext.create`

The most common (and the officially recommended means by Sencha) to create an instance is using `Ext.create`:

```js
Ext.create('Ext.Component', {
    html : 'Hello there'
});
```

Not too different of a syntax from using the `new` keyword but there is more going on under the hood than just instantiating. The big drawback by using the `new` keyword is the class must already be loaded, `Ext.create` can be used even if the class has not been loaded, this is the reason why you pass in a string so it can look up if the class is loaded. If the class is not loaded, then `Ext.create` leans on `Ext.Loader` to synchronously load the class and then instantiate it.

Couple things here that are not optimal. First is the check to see if the class has been loaded. This is a simple object lookup but one that is not needed in production. The second thing is synchronously loading the class meaning no other javascript will execute while that class is loading meaning your application is frozen. This may not mean much locally as the Xhr completes very fast but I've seen projects where they deploy the development version of an app to a remote server that mimics the production server which may be slow to load the class. Also, when loading a class, `Ext.Loader` has to inspect the class to see if it has any dependencies to load which it will have to synchronously load them as well and the browser will only load 4 things at any given time so you may be waiting for the class and dependencies to load. In production, the loading shouldn't happen as you should have everything compiled into a single file so you are left with the minimal object lookup to get the class from the string which isn't the worst thing in the world.

I do use `Ext.create` when I have a string that I need to instantiate from. Imagine having a tree panel and clicking on a node you have the class name to instantiate. That class name is a string which `Ext.create` can handle.

## `Ext.widget`

The last way to instantiate is using `Ext.widget` (do note this is only for components) which can be used like `Ext.create` (where you pass a string and an optional config object):

```js
Ext.widget('component', {
    html : 'Hello there'
});
```

Or you can just use a config object which requires the `xtype` config:

```js
Ext.widget({
    xtype : 'component',
    html  : 'Hello there'
});
```

This has the same drawbacks and benefits of `Ext.create`. The added drawback is that Ext needs to know about the xtype you are using in some way. This can be from loading the class or from using Sencha Cmd that creates the bootstrap information that tells Ext about the xtypes it finds. Ext keeps an object mapping xtypes to their class so it's a simple object lookup but you also have added code to check if the first argument is a string or an object which isn't that bad of a performance hit at all.

## Summary

Even though I personally use the `new` keyword, I do some times have to use `Ext.create` when I only have a string like I mentioned before. I always make sure the classes I am using are already loaded, I stay away from sync loading at all costs.

I meant this blog not to sway you in any direction but to educate what happens under the hood for better clarification.
