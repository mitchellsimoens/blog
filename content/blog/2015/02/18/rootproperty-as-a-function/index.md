---
title: rootProperty as a function!
date: "2015-02-18T20:02:03.284Z"
---

When I design an endpoint to return some JSON data for consumption in a grid, I always nest the data in the `data` property so that I can provide a total count in order to support pagination. So most of my server side scripts are setup to nest data. Something like this:

```json
{
    "success": true,
    "total": 4375,
    "data": [...]
}
```

I setup my store to read this via something like this:

```js
Ext.define('MyApp.view.Foo', {
    extend : 'Ext.data.Store',

    proxy : {
        type   : 'ajax',
        url    : '/foo',
        reader : {
            rootProperty : 'data'
        }
    }
});
```

However, when using `Ext.data.TreeStore`, it wants to use the same property to find the children of nodes. By default, it uses the `children` property and you can change this by using the `rootProperty` like we have above (there are a couple different ways really). So if you have your nodes nested within the `data` property but still use `children` to have your child nodes in, it won't find any child nodes because you have two different roots, `data` and `children`.

So how can we handle this use case? Well, first I'd say fix your server to not nest the data so that things will work great within Ext JS. But let's be real for a second, the people in charge of your server-side code are likely a bit reluctant to change. You can buy them a steak dinner and they may still not change, you just have to deal with it.

Don't worry, Ext JS actually has a way to handle this. If you look at the [documentation](http://docs.sencha.com/extjs/5.1/5.1.0-apidocs/#!/api/Ext.data.reader.Reader-cfg-rootProperty) for the `rootProperty` config it says that it accepts a string for a value. Well, that's not entirely true and the docs will get fixed to reflect this but the `rootProperty` can actually accept a function and you return child nodes from the data provided. Let's look at some sample data:

```json
{
    "data" : [
        {
            "text"     : "Foo",
            "expanded" : true,
            "children" : [
                {
                    "text" : "Bar",
                    "leaf" : true
                }
            ]
        }
    ]
}
```

So we have our child nodes nested within the `data` property but we also use `children` to denote our child nodes. We can define out `rootProperty` to work with this like:

```js
rootProperty : function(node) {
    return node.data || node.children;
}
```

With this it returns `node.data` if it's truthy or it will return `node.children`. So if `data` exists, return it, else return `children`. It's as easy as that! Here's a live [fiddle](https://fiddle.sencha.com/#fiddle/iga):

<iframe src="https://fiddle.sencha.com/fiddle/iga" style="border: 0; width: 600px; height: 600px;"></iframe>
