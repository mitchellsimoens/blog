---
title: Requiring classes
date: "2015-05-21T14:41:03.284Z"
---

Since Ext JS 4 came out, Ext JS supported loading classes on demand during development. You do this using the [`requires`](http://docs.sencha.com/extjs/latest/apidocs/#!/api/Ext.Class-cfg-requires) property in your [`Ext.define`](http://docs.sencha.com/extjs/latest/apidocs/#!/api/Ext-method-define) statement or using [`Ext.require`](http://docs.sencha.com/extjs/latest/apidocs/#!/api/Ext-method-require). Furthermore, ever since Sencha Cmd was released, it will check out these means of requiring classes and create a build of only those classes that are required.

### `requires` property

As mentioned, when using `Ext.define` you should use the `requires` property to require classes. Let's look at a sample class without the requires property:

```js
Ext.define('MyApp.view.user.Form', {
    extend : 'Ext.form.Panel',
    xtype  : 'myapp-user-form',

    items : [
        {
            xtype : 'fieldset',
            title : 'Details',
            items : [
                {
                    xtype      : 'textfield',
                    fieldLabel : 'Name',
                    name       : 'name'
                },
                {
                    xtype      : 'textfield',
                    fieldLabel : 'Email',
                    name       : 'email',
                    vtype      : 'email'
                }
            ]
        }
    ]
});
```

If we use this class in our application things may work depending on if the classes are required elsewhere. However, your application will be changing as time goes on so this may work now but may break a production build later. For this reason, I tend to make sure each class requires that classes it uses. The requires property would then look like this:

```js
Ext.define('MyApp.view.user.Form', {
    extend : 'Ext.form.Panel',
    xtype  : 'myapp-user-form',

    requires : [
        'Ext.form.field.Text',
        'Ext.form.FieldSet'
    ],

    items : [
        {
            xtype : 'fieldset',
            title : 'Details',
            items : [
                {
                    xtype      : 'textfield',
                    fieldLabel : 'Name',
                    name       : 'name'
                },
                {
                    xtype      : 'textfield',
                    fieldLabel : 'Email',
                    name       : 'email',
                    vtype      : 'email'
                }
            ]
        }
    ]
});
```

Now I know that no matter what else goes on in my application, this class will be safe as far as what it needs.

Remember, your `MyApp.Application` class can use the requires property also for any classes that need to be there for startup. For example, that's where I put my [utility singletons](https://sencha.guru/2015/03/23/use-of-a-base-url-in-a-utility-class/).

### `Ext.require`

If you're not using MVC/MVVM and therefore don't have an Application class, well, first shame on you! Ext JS doesn't require the MVC/MVVM pattern but I very much recommend it. Anyway, to require classes before `Ext.onReady` executes you can use `Ext.require` to require classes much the same way:

```js
Ext.require('Ext.form.FieldSet');
// or use an array:
Ext.require([
    'Ext.form.field.Text',
    'Ext.form.FieldSet'
]);
```

### `requires` vs `uses`

The `requires` property will ensure those classes are loaded and defined before the class being required is defined. Cmd will use the `requires` to build a dependency map and include the files in order based on the requires. However, in development the `requires` property may cause synchronous loading so that your code will work (this depends on if `Ext.onReady` or `Ext.application`'s [`launch`](http://docs.sencha.com/extjs/latest/apidocs/#!/api/Ext.app.Application-method-launch) method has executed) which can slow things down. This is where the [`uses`](http://docs.sencha.com/extjs/latest/apidocs/#!/api/Ext.Class-cfg-uses) property can be used. This is what the `uses` property looks like:

```js
Ext.define('MyApp.view.user.Form', {
    extend : 'Ext.form.Panel',
    xtype  : 'myapp-user-form',

    uses : [
        'Ext.form.field.Text',
        'Ext.form.FieldSet'
    ],

    items : [
        {
            xtype : 'fieldset',
            title : 'Details',
            items : [
                {
                    xtype      : 'textfield',
                    fieldLabel : 'Name',
                    name       : 'name'
                },
                {
                    xtype      : 'textfield',
                    fieldLabel : 'Email',
                    name       : 'email',
                    vtype      : 'email'
                }
            ]
        }
    ]
});
```

The difference between `uses` and `requires` is unlike how `requires` will load it's classes before the `MyApp.view.user.Form` is defined, `uses` will define `MyApp.view.user.Form` even if the classes are not loaded. `Ext.form.field.Text` and `Ext.form.FieldSet` may be loaded and defined after `MyApp.view.user.Form` is defined since `MyApp.view.user.Form` doesn't require them to be loaded before it is defined.

### Many requires

Requiring a class many times will not affect performance, if a class is already defined it will not be loaded again and will be skipped. Also, requiring classes on the fly like this is only for development. When you do a build with Sencha Cmd, Cmd will remove these automatically for you so in a production build this code will simply not be there. So I play it safe and add all the classes in the requires.

I will say that having knowledge of what classes are then requiring other classes helps. So if I require `Ext.form.field.Text`, I know that it already requires `Ext.form.field.VTypes`. Since I use the `vtype` config, I do need `Ext.form.field.VTypes` to be loaded but my code doesn't have to require it since `Ext.form.field.Text` is already requiring it. The [API docs](http://docs.sencha.com/extjs/latest/apidocs/#!/api/Ext.form.field.Text) denote what it's requiring on the right.

### Other means of requiring

Ext JS also has other means of requiring classes for you. If you [extend](http://docs.sencha.com/extjs/latest/apidocs/#!/api/Ext.Class-cfg-extend) a class, Ext JS will require that class for you as expected. If you define [`mixins`](http://docs.sencha.com/extjs/latest/apidocs/#!/api/Ext.Class-cfg-mixins), those too will also be required for you.
