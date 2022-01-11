---
title: Fullscreen Madness!
date: "2012-02-10T11:47:03.284Z"
---

Sencha Touch 2 is a fantastic framework, my favorite to work with and most likely will be until Sencha Touch 3 comes out (no public dates yet :) ). I'm a mobile developer at heart I guess or maybe I just like that I don't have to worry about IE. Either case Sencha Touch 2 is fantastic and by looking at the popularity in the <a href="http://www.sencha.com/forum/forumdisplay.php?89-Sencha-Touch-2.x-Forums">Sencha Touch 2 forums</a> I'm not the only one loving it! Helping people out a lot, I'm noticing a lot of people using the `fullscreen` config option where they shouldn't which makes me think that the function of the `fullscreen` config isn't explained very well. Today, I hope to change this.

## `Ext.Viewport`

Before we dive into what the `fullscreen` config does, I want to make you aware of a critical piece of the puzzle. When you launch a Sencha Touch 2 app, the framework creates a component that will act as the viewport for your app. The instance is saved to `Ext.Viewport`. Quick explanation of what `Ext.Viewport` is is it's an `Ext.Container` using card layout. Bit more info is you may have noticed the classes in the `Ext.viewport` namespace (remember JavaScript is case-sensitive so `Ext.Viewport` !== `Ext.viewport`). `Ext.viewport.Android` and `Ext.viewport.Ios` both extend `Ext.viewport.Default` and help setup the viewport based on what platform is currently viewing your application. `Ext.viewport.Viewport` acts as a factory for creating the correct viewport class. Each platform has it's own quirks and issues and this helps navigate around these to provide better performance.

You can configure the `Ext.Viewport` by using the viewport config in <a href="http://docs.sencha.com/touch/2-0/#!/api/Ext-method-setup">`Ext.setup`</a> or the viewport config in <a href="http://docs.sencha.com/touch/2-0/#!/api/Ext-method-application">`Ext.application`</a>. Each link links to the online API Docs and there are examples for this so I don't have to show that code.

To sum `Ext.Viewport` up... `Ext.Viewport` is an `Ext.Container` and by default it uses card layout.

## `fullscreen` Config!

First, let's look at a small code snippet and then break it down:

```js
new Ext.Container({
    fullscreen : true,
    html       : 'Do you seem my size?',
    items      : [
        {
            xtype  : 'toolbar',
            docked : 'top',
            title  : 'Top Toolbar'
        },
        {
            xtype  : 'toolbar',
            docked : 'bottom',
            title  : 'Bottom Toolbar'
        }
    ]
});
```

I added the two toolbars so you can visually see the size of the `Ext.Container` we created. The important part we need to talk about is that `fullscreen` config. So you noticed that the `Ext.Container` took 100% of the height and width but how did it do that? Remember `Ext.Viewport`? When you create a component (using the `new` keyword like I did or `Ext.create`) with the `fullscreen` config set to `true` (defaults to `false`) it actually fires a `fullscreen` event on itself. Within `Ext.viewport.Default`, it has a listener for `fullscreen` events and when it captures one, it will take that component and add it as an item of `Ext.Viewport`. Since by default `Ext.Viewport` uses card layout the `Ext.Container` that was just added as an item will take up 100% of the height and width because that's what card layout does.

To recap this, `Ext.Viewport` listens for `fullscreen` events and adds that `Ext.Component` as an item.

## Multiple `fullscreen`s

What happens when we have two or more components using `fullscreen` set to `true`? Well, it keeps adding those components and adds them as a child item but you will only be able to see one at a time as that is how card layout works. You can use the `setActiveItem` method on `Ext.Viewport` to navigate through your "fullscreen" components:

```js
new Ext.Container({
    fullscreen : true,
    html       : 'Do you seem my size?',
    items      : [
        {
            xtype  : 'toolbar',
            docked : 'top',
            title  : 'Top Toolbar',
            items  : [
                {
                    text    : 'Go 2nd',
                    ui      : 'confirm',
                    handler : function() {
                        Ext.Viewport.setActiveItem(1);
                    }
                }
            ]
        },
        {
            xtype  : 'toolbar',
            docked : 'bottom',
            title  : 'Bottom Toolbar'
        }
    ]
});

new Ext.Container({
    fullscreen : true,
    html       : 'Second One'
});
```

So we have two `Ext.Containers` using `fullscreen` set to `true`. The active item will be the first container as `Ext.Viewport` won't change the active item, it will just add it as an item. I added a button to the top toolbar of the first container that simple executes `Ext.Viewport.setActiveItem(1)` which will switch to the item at index 1 of `Ext.Viewport` which is the second container.

## Summary

We quickly learned what `Ext.Viewport` is and how to configure it. We then dove into how the `fullscreen` config works behind the scenes and then saw how we can use multiple items with the `fullscreen` config set to `true`.
