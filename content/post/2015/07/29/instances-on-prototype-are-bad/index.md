---
title: Instances on prototype are bad!
date: "2015-07-29T16:56:03.284Z"
---

I've been seeing something a lot lately and I wanted to take a quick second to talk about it. This is creating instances and placing them on the prototype and all the issues this can cause and it may not be obvious to the developer. Let's take a look at such a case:

```js
Ext.define('MyApp.view.Main', {
    extend : 'Ext.grid.Panel',
    xtype  : 'myapp-main',

    requires : [
        'MyApp.store.Foo',
        'MyApp.store.Bar'
    ],

    store : Ext.create('MyApp.store.Foo'),

    columns : [
        {
            text      : 'Foo',
            dataIndex : 'foo',
            flex      : 1,
            editor    : new Ext.form.field.ComboBox({
                store : {
                    type : 'myapp-bar'
                }
            })
        }
    ]
});
```

Here, I am creating two store instances and placing them on the prototype; yes, this code does have missing bits to not have super long code. I use `Ext.create` to create an instance of the `MyApp.store.Foo` class and using the `new` keyword to create a `ComboBox` instance as the editor of a column and in the `ComboBox` I specify the store using a config object that will use the `MyApp.store.Bar` via it's alias.

Let's first look at the `store : Ext.create('MyApp.store.Foo'),` line and why it's bad. Even though `MyApp.view.Main` is requiring `MyApp.store.Foo`, which is proper, the `Ext.create` call will be executed by the browser right away before anything else happens, even before the `MyApp.view.Main` class is defined. This is because the browser evaluates the code in that file when the file is downloaded, all prototype members are evaluated to create the object literal being passed into the `Ext.define` call. This means the `Ext.create` call will be executed before the requires is even required. Therefor `Ext.create` will then synchronously load the `MyApp.store.Foo` class and create an instance and place it on the `store` member of that object. This is bad for a couple reasons:

 - The class is synchronously loaded and therefor affects startup performance
 - You expect a new store class to be created for each `MyApp.view.Main` instance creation however all `MyApp.view.Main` instances will share the same `MyApp.store.Foo` store instance because the instance is set onto the prototype. This means if you sort/filter one instance, any and all other instances of `MyApp.view.Main` will reflect that sort/filter even if the instance of `MyApp.view.Main` is created later. It's sharing the store instance.

To fix this part of the code, it should be using a config object:

```js
store : {
    type : 'myapp-foo'
    //xclass : 'MyApp.store.Foo' //or using xclass
}
```

This way, each time an instance of `MyApp.view.Main` is created, a new instance of `MyApp.store.Foo` is created. If you do want to share a store instance, I'd suggest adding the store to your application's `stores` config and then setting the `store` config on `MyApp.view.Main` to the appropriate `storeId` your global store is given.

Next, let's look at the `ComboBox`. Let's assume `Ext.form.field.ComboBox` has already been defined (otherwise you'd get a nice syntax error) the underlying issue is the same as with the `Ext.create` usage, the browser will try to create an instance of `Ext.form.field.ComboBox` which will then try to create an instance of the store before the `MyApp.view.Main` is ever defined which then means those two stores being required are not even requested to be required. You'll then get a nice pretty error from Ext JS like this:

    [Ext.createByAlias] Unrecognized alias: store.myapp-bar

This error is basically saying the `MyApp.store.Bar` store has not been defined yet which is to be expected since the `ComboBox` is being instantiated before the store is ever required.

To fix this part of the code, you simply use a config object for the `ComboBox`:

```js
columns : [
    {
        text      : 'Foo',
        dataIndex : 'foo',
        flex      : 1,
        editor    : {
            xtype  : 'combobox',
            store  : {
                type : 'myapp-bar'
            }
        }
    }
]
```

Now, when the `MyApp.view.Main` is instantiated, when that `Foo` column is instantiated it will create an instance of the `ComboBox` properly.

### Conclusion

I never create an instance and place it on the prototype. There are much better ways to have a global instance of something.
