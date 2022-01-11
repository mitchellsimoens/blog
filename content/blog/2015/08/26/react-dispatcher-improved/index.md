---
title: React dispatcher, improved
date: "2015-08-26T19:41:03.284Z"
---

[React](https://facebook.github.io/react/) is a very fast view layer and that's it. Ok, we all know that (I hope). React doesn't handle any business logic for user interactions. For example, if someone clicks on a button React doesn't do anything. For that, you would need to use a dispatcher (or some other means).

## Improved event handling

Luckily, [Facebook](https://www.facebook.com/) also has [Flux](https://facebook.github.io/flux/) which has a [dispatcher](https://facebook.github.io/flux/docs/dispatcher.html#content) class where you can register callback listeners for when something is dispatched. Here's a simple example of this (taken from their documentation):

```js
var flightDispatcher = new Dispatcher();

flightDispatcher.register(function(payload) {
    if (payload.actionType === 'city-update') {
        CityStore.city = payload.selectedCity;
    }
});

flightDispatcher.dispatch({
    actionType: 'city-update',
    selectedCity: 'paris'
});
```

Ok, that's pretty simple. However, in practice I don't like one thing and that is when something is dispatched, **ALL** registered callbacks will execute. Each callback has to check if they care about the dispatched event. This seams quite wasteful and unneeded logic in the callback especially since you will likely have lots of registered callbacks. Sure, you can build something on top of it:

```js
function callbackCreatorThing(property, value, callback) {
    return function(payload) {
        if (payload[property] === value) {
            callback(payload);
        }
    }
}

flightDispatcher.register(
    callbackCreatorThing('actionType', 'city-update', function(payload) {
        CityStore.city = payload.selectedCity;
    })
);
```

So I created a function factory that will call the actual callback when `payload.actionType` is equal to `city-update`. Ok, so that's not the end of the world and of course there are many other ways to do it but still... more work than you should have to do. I come from an [Ext JS](https://www.sencha.com/products/extjs/) world where things are event driven meaning you add a listener for when a certain event is driven. So I'd do something like this in Ext JS:

```js
cls.on('city-update', function(payload) {
    CityStore.city = payload.selectedCity;
});

cls.fireEvent('city-update', payload);
```

So when the `fireEvent` is called, only those listeners listening to that event will be fired. So I need this:

```js
flightDispatcher.register('city-update', function(payload) {
    CityStore.city = payload.selectedCity;
});

flightDispatcher.dispatch('city-update', {
    selectedCity: 'paris'
});
```

So I have to create my own dispatcher class (which is very easy). While I'm at it, why not extend this and allow certain actions to be dispatched and registered so a user can really get fine grained:

```js
flightDispatcher.register('city', 'update', function(payload, listener) {
    CityStore.city = payload.selectedCity;
});

flightDispatcher.dispatch('city', 'update', {
    selectedCity: 'paris'
});
```

Here, the event is `city` and the action being taken is `update`. I even get access to the listener. In fact, we could support all three cases:

```js
flightDispatcher.register('city', 'update', function(payload, listener) {
    CityStore.city = payload.selectedCity;
});
flightDispatcher.register('city', function(payload, listener) {
    //something happened to a city
});
flightDispatcher.register(function(payload, listener) {
    //something happened
});

flightDispatcher.dispatch('city', 'update', {
    selectedCity: 'paris'
});
```

There are valid reasons to have catch all listeners like what Flux has.

## Event Class

So the listening to dispatched events has been improved. However, there is one more thing that I like in Ext JS: the separate event (`Ext.event.Event`) class. This class holds many things but one thing I use a lot is the ability to stop an event in a listener. Maybe some business logic says that the user isn't able to update a city, then you should be able to stop an event from firing other listeners. For this, I created a separate Event class which the Dispatcher creates when it finds all the listeners for the event and action being dispatched. So now you can do this:

```js
flightDispatcher.register('city', 'update', function(e) {
    e.stop();
});
flightDispatcher.register('city', function(e) {
    //something happened to a city
});
```

In the first registered callback, I stop the event from firing so the second registered callback will not be executed. This gives further control over the flow of the events in an application.

## Conclusion

Using React with Flux versus using Ext JS shows how mature Ext JS is, it's been around for almost 10 years now so I'd expect it to be. However, this doesn't mean that some ideas from Ext JS cannot be applied to a React application.

I've quickly put the code up on [GitHub](https://github.com/mitchellsimoens/react-idispatcher) and [npm](https://www.npmjs.com/package/react-idispatcher). The dispatcher class is a singleton (I create an instance and return it in `module.exports` as there really should only be one message bus.
