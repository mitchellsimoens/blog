---
title: A Naming Strategy
date: "2014-12-19T17:06:03.284Z"
---

A common method when developing an application is to be event driven. This allows your code to be very flexible. Not being event driven can lead to code that is very intimate to the current state of your application. Change or add something later on and you must go through your application and change the different parts where as being event driven allows an event to be fired and forgotten about. Anything listening to that event can then take action on that event but not be dependant on what fired the event.

A simple example is an email application.  Say a user sends an email, when the email has been sent and the server returns success, the callback may fire an event to tell anything in the application that the user sent an email. The Sent folder list may listen to this event in order to reload the list. This email may have been sent from different forms, a create email form may be different than a quick reply form but that doesn't matter, either form may fire the same event and the Sent folder list doesn't care where it came from. This is flexibility and in my eyes, creates much safer code.

## Adding listeners in Ext JS

Ext JS allows many different ways to add listeners but today I want to speak about `mon` and `on` and the differences. First, let's start with `on`.

### `on`

The simplest of the two is the `on` method which can simply add an event listener:

    component.on('foo', someFunc, component);

You can also pass an object for a convenient way to add multiple listeners:

    component.on({
        scope : component,
        foo   : someFunc,
        bar   : someOtherFunc
    });

This will add listeners for the `foo` and `bar` events and scope them to the `component` variable. In Ext JS 4 and newer, listeners defined this way will automatically get removed when the component is destroyed thanks to the `clearListeners` method being executed in the `destroy` method of `Ext.Component`.

### `mon`

`mon` works just like `on` when defining a listener only the first argument must be a class to add the listeners too. That's a bit confusing of a statement right? Let's look at an example:

    component.mon(subClass, 'foo', someFunc, component);

What this is doing, is adding a listener for the `foo` event that will be fired on the `subClass` variable. Once fired, it will execute the `someFunc` function scoped to the `component` variable but the listener is added to the `component` but the event will be fired on the `subClass`.

The benefit here is the component can listen to an event on something else but when the component is destroyed, this listener is removed. The component may be destroyed but the `subClass` variable may still live on; the component is managing the `foo` event listener.

Like the `on` method, you can also pass an object:

    component.mon(subClass, {
        scope : component,
        foo   : someFunc,
        bar   : someOtherFunc
    });

### Difference

Let's think of an `Ext.Component` instance that wants to listen to a `store` load. You can use `on` like this:

    store.on('load', this.onStoreLoad, this);

However, when the `Ext.Component` is destroyed, the listener will not be removed because the event listener is on the `store` not the `Ext.Component`. This causes a memory leak and the next `store` load after the component is destroyed will likely throw an error, both bad things. This is where `mon` would be a better use:

    this.mon(store, 'load', this.onStoreLoad, this);

This adds a `load` listener on the store but is being managed by the `Ext.Component`. When the `Ext.Component` is destroyed, the listener is removed. The `store` is then free to live on and fire it's `load` event without errors being thrown and no memory leaks are present.
