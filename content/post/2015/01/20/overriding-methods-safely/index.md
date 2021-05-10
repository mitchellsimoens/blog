---
title: Overriding methods safely
date: "2015-01-20T18:30:03.284Z"
---

In the article [Abstract vs Override](https://sencha.guru/2014/12/04/abstract-vs-override/), I talked about how to use overrides in an application to globally change [Ext JS](http://www.sencha.com/products/extjs) to work for your application. I was recently asked for the best way to override a method by a colleague and that made me think that talking about some techniques may help. It's not enough to know how to do it, but to know some real-world techniques is helpful.

### Introduction

There are a couple use cases for overriding, most popular is to globally change the behavior or to fix a bug. If you're not familiar with other programming languages that have a class structure with inheritance, the best way to think of a class structure is a tree struture or like a file system. A class (called a subclass) can extend another class (called a superclass) where the subclass will inherit all members (configs, properties and methods) from the superclass. Overriding allows you to hook into any of these classes to override that member.

### `Ext.define` vs `Ext.override`

First, let's look at the anatomy of how to override. In previous Ext JS versions you could use `Ext.override`:

    Ext.override(Ext.Component, {
        foo : 'bar'
    });

Or the class has a static `override` method also:

    Ext.Component.override({
        foo : 'bar'
    });

And while this still works, it's better to use `Ext.define`:

    Ext.define('Override.Component', {
        override : 'Ext.Component',

        foo : 'bar'
    });

While this is more characters, it comes with two benefits:

- Similar API to using `Ext.define` to extend a class.
- Override can be dynamically loaded and required using Cmd or plain `Ext.Loader` and then can also be organized in a file system.

It's recommended to use `Ext.define` and defining one override per file. Cmd has the ability to auto-include overrides for you and include them when you build an application.

### Overriding Properties

One of the basic and simplest usages of an override is overriding properties. Looking at the previous code snippets, we actually see how to override properties. Of course in that snippet the override didn't actually override anything, it added a property onto `Ext.Component`. Looking at the API documentation for `Ext.Component` we can see many properties/configs such as the `hideMode` config which will control how the component is hidden. By default it's value is `display` which will hide the component but using the CSS `display:none` style which will cause the space taken up by the component not to be reserved. If we change `hideMode` to `visibility` then when the component is hidden the space is still reserved for the component it's just not visible due to now using the CSS `visibility:hidden` style. We can override this to affect any `Ext.Component` or subclass like so:

    Ext.define('Override.Component', {
        override : 'Ext.Component',

        hideMode : 'visibility'
    });

Now when we hide a component, the space where the component was is still reserved for the component, you just cannot visually see the component anymore. Of course beware, this will override every single `Ext.Component` and subclass.

### Overriding Methods

Let's say we have a `Foo` class that has a `someMethod` method defined on it:

    Ext.define('Foo', {
        someMethod : function() {
            console.log('Foo', 'someMethod');
        }
    });

If we instantiate `Foo` and execute the `someMethod`, we will get `Foo someMethod` logged out to the console.

We find that there is a bug in it but we don't have control over the `Foo` class, say it's in some third party code where we cannot edit the source so we need to override the `someMethod` method. We can do this just like how we overrode a property:

    Ext.define('Override.Foo', {
        override : 'Foo',

        someMethod : function() {
            console.log('Override.Foo', 'someMethod');
        }
    });

Now if we instantiate `Foo` and execute `someMethod`, we will only get `Override.Foo someMethod` logged out to the console. We will **not** see the `Foo someMethod` logged because we overrode the method; it's like the `someMethod` defined in the `Foo` class never existed.

#### Using `callParent`

In the last override, we overrode the `someMethod` method on the `Foo` class to fix a bug. It's possible that the fix to the bug still needs to call the method that is being overridden, maybe we need to still have the `Foo someMethod` logged out. This is where the `callParent` method comes in, it tracks what method was overridden to make it still executable:

    Ext.define('Override.Foo', {
        override : 'Foo',

        someMethod : function() {
            console.log('Override.Foo', 'someMethod');

            this.callParent();
        }
    });

So now if we instantiate `Foo` and execute `someMethod` we will get `Override.Foo someMethod` logged to the console but we will also get `Foo someMethod` logged out thanks to the `this.callParent();` call.

#### Using `callSuper`

Ext JS has a large class system where there are multiple levels of inheritance. There may be a time when one class extends another class and the subclass calls it's superclass' method. Say we need to override the subclass' method to fix a bug but instead of calling the overridden method using `callParent` we need to skip that method and call the superclass' method. This is where `callSuper` comes in handy. First, let's look at a `Bar` class that extends `Foo` and uses `callParent`:

    Ext.define('Bar', {
        extend : 'Foo',

        someMethod : function() {
            console.log('Bar', 'someMethod');

            this.callParent();
        }
    });

If we instantiate `Bar` and execute `someMethod` we will get all `Bar someMethod`, `Override.Foo someMethod` and `Foo someMethod` logged out to the console. Remember, we still have `Override.Foo` override in place.

Let's see what `callSuper` does when we override the `someMethod` on `Bar` with this override:

    Ext.define('Override.Bar', {
        override : 'Bar',

        someMethod : function() {
            console.log('Override.Bar', 'someMethod');

            this.callSuper();
        }
    });

Now if we instantiate `Bar` and execute `someMethod` we should **not** see the `Bar someMethod` logged to the console because `this.callSuper();` should skip that method. And sure enough, we see `Override.Bar someMethod`, `Override.Foo someMethod` and `Foo someMethod` logged to the console.

#### Difference of `callParent` vs `callSuper`

The difference between `callParent` and `callSuper` is what method ends up being executed. `callParent` will always call the method being overridden where `callSuper` will skip the method being overridden and call a superclass' method.

### Overriding Singletons

I'm a big fan of having a singleton class to manage certain things like application configs. Let's say we have something like this for a singleton (simplified than what I have):

    Ext.define('MyApp.Config', {
        singleton : true,

        config : {
            configs : null
        },

        constructor : function() {
            this.initConfig();
            this.callParent();
        },

        get : function(key) {
            return this.getConfigs()[key];
        }
    });

Without our code we can do things like `MyApp.Config.get('foo')`. But there in an issue with the `get` method, what if `this.getConfigs()` returns a non-Object such as the `get` method was executed before an Xhr call finishes and therefore `this.getConfigs()` will return `null`. We need to handle this case.

For demonstration purposes, say we cannot edit the source for `MyApp.Config` and therefore we need to use an override. Of course, if you have control over the file, edit the source instead of creating an override.

    Ext.define('Override.Config', {
        override : 'MyApp.Config',

        get : function(key) {
            var configs = this.getConfigs();

            return configs ? configs[key] : null;
        }
    });

Now when we use `MyApp.Config.get('foo')` we are protected from whether or not there are configs. `callParent` and `callSuper` work just like overrides on class definitions:

    Ext.define('Override.Config', {
        override : 'MyApp.Config',

        get : function(key) {
            return this.getConfigs() ?
                this.callParent([key]) :
                null;
        }
    });

This override will execute `this.callParent([key])` if `this.getConfigs()` returns truthy else will return `null`.

### More Reading

I also split off some more reading about `callParent` and `callSuper` in another blog: [What is callParent and callSuper](https://sencha.guru/2015/01/20/what-is-callparent-callsuper/).
