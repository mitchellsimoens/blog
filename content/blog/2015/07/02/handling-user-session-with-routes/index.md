---
title: Handling user session with routes
date: "2015-07-02T20:38:03.284Z"
---

I'd like to first state that there are literally thousands of ways to handle this and is dependent on how you handle user sessions within your application.

### Simple Beginnings

In almost every Ext JS application I've built I've had to deal with user sessions. Most apps require login before entering the application (like the [support portal](https://support.sencha.com), new one on the way too!), some allow you to use parts of the app without a login (like [Sencha Fiddle](https://fiddle.sencha.com), new on on the way too!). At the start of the application I check to see if there is an active user session from the server. I personally use Ext.Direct to do this but I'll stick with a plain `Ext.Ajax` request:

```js
Ext.Ajax.request({
    url     : '/session',
    failure : function() {},
    success : function(response) {
        MyApp.user = Ext.decode(response.responseText);
    }
});
```

This code is simplified and not complete but what's happening is when the request succeeds decode the JSON and set it to the `user` property on the `MyApp` namespace. If the request fails (returning a 403 for example), there is no session. I'll state again, this code is simplified and not complete, just showing an example and saving it to `MyApp.user` for ease of retrieval. (and yes, you can use promises with Ext JS 6 instead of callbacks but that has nothing to do with this)

When an application starts, it may have a hash in the URI and therefore Ext JS is going to take action on it. This will likely be before the above `Ext.Ajax.request` is finished which would cause an issue. If the user is already logged in, then the route may be ok to execute but if there is no session, you need to prevent the route from executing and redirect them to the login. For this, I use the `before` config on my routes and check `MyApp.app` and take appropriate action. Here is a simple controller to show this:

```js
Ext.define('MyApp.view.MainController', {
    extend : 'Ext.app.ViewController',
    alias  : 'controller.myapp-main',

    routes : {
        'user' : {
            before : 'checkSession',
            action : 'showUser'
        }
    },

    checkSession : function() {
        var args   = Ext.Array.slice(arguments),
            action = args[args.length - 1];

        if (MyApp.user) {
            action.resume();
        } else {
            action.stop();

            this.redirectTo('login');
        }
    },

    showUser : function() {}
});
```

Inspecting this controller, we have a single route with the `before` and `action` configs. In the before, we get the action argument (it'll always be the last argument but some routes may have many arguments), check if `MyApp.user` exists and if so then resume the action. If it's not, we stop it and then redirect the app to the `#login` hash.

So now, the `user` route requires a user session. If you have a route that doesn't require a user session, you can simply remove not have the `before` config and it will execute regardless of the `checkSession` method.

**Side Note:** Each action would need to have the `before` config. We do have some feature requests to help in this area to have a single before action that will execute for all routes.

### More Advanced

That's great but a keen mind will understand that if the `Ext.Ajax.request` finishes after the `checkSession` method executes from an initial route execution, the action will be stopped regardless if that user session check was successful. Not good. For this I set a property signifying the app is ready and fire an event on the application instance. This way the `checkSession` method can tell if the app is actually ready to handle things. First, let's look at how the `Ext.Ajax.request` would be changed to do this:

```js
launch : function() {
    Ext.Ajax.request({
        url     : '/session',
        scope   : this,
        failure : function() {
            this.onUser();
        },
        success : function(response) {
            this.onUser(
                MyApp.user = Ext.decode(response.responseText);
            );
        }
    });
},

onUser : function(user) {
    this.appready = true;
    this.fireEvent('appready', this, user);
}
```

This would be code you can have in your `app/Application.js`. In the `failure` and `success` callbacks, I execute the `onUser` method. In this method, I set the `appready` property to `true` so anything can check `MyApp.app.appready` to see if it's ready. Along with the property, the application also will fire the `appready` event passing the application (it's a convention to pass the class firing the event as the first parameter) and the user if one was set. So now we can react to both the property and event in our `before` action:

```js
checkSession : function() {
    var me     = this,
        args   = Ext.Array.slice(arguments),
        action = args[args.length - 1],
        app    = MyApp.app;

    if (app.appready) {
        if (MyApp.user) {
            action.resume();
        } else {
            action.stop();

            me.redirectTo('login');
        }
    } else {
        app.on(
            'appready',
            Ext.Function.bind(me.checkSession, me, args),
            me,
            { single : true }
        );
    }
}
```

In this new `checkSession` method I do a few things. First I set an `app` variable to `MyApp.app`, this is your application instance where we set the `appready` property. If the `appready` property is `true` then we know the user session check has already happened and therefore we can check the `user` property and resume/stop the action. If the `appready` property is `false` then we need to add a listener to the `appready` event. The reason I use `Ext.Function.bind` is because I need to control what arguments are passed when the event is fired so that the `action` argument is the last argument. With this function binding, I know the arguments will be the same as when it originally was executed. And lastly I make sure that when the event is first listened to it will remove itself with the `single` event option.

So now if the `MyApp.app.appready` property is `false`, the user session request is still happening. When that request finishes, successful or not, the `checkSession` method listen for the `appready` event to fire signifying the user session was completed.

###Even More Advanced

To go a step further, I often have to deal with different user types like normal user and admin. Admins should have access to certain parts of the application a user should not and therefore we need to stop a user trying to gain access. For this, I have a separate method that will look like `checkSession` but will check what kind of user is present:

```js
checkIsAdmin : function() {
    var me     = this,
        args   = Ext.Array.slice(arguments),
        action = args[args.length - 1],
        app    = MyApp.app;

    if (app.appready) {
        if (MyApp.user) {
            if (MyApp.user.user_type === 'admin') {
                action.resume();
            } else {
                action.stop();

                me.redirectTo('home');
            }
        } else {
            action.stop();

            me.redirectTo('login');
        }
    } else {
        app.on(
            'appready',
            Ext.Function.bind(me.checkSession, me, args),
            me,
            { single : true }
        );
    }
}
```

In this before action the difference is within the first conditional. If `MyApp.user` is `truthy` then we need to check the type of user. If the user is an admin, resume the action. If not, stop the action and send the user back to `#home`. Now, to not have duplicate code you can have a shared method:

```js
handleSessionCheck : function(beAdmin, args) {
    args = Ext.Array.slice(args);

    var me     = this,
        action = args[args.length - 1],
        app    = MyApp.app;

    if (app.appready) {
        if (MyApp.user) {
            if (!beAdmin || MyApp.user.user_type === 'admin') {
                action.resume();
            } else {
                action.stop();

                me.redirectTo('home');
            }
        } else {
            action.stop();

            me.redirectTo('login');
        }
    } else {
        app.on(
            'appready',
            Ext.Function.bind(me.handleSessionCheck, me, [beAdmin, args]),
            me,
            { single : true }
        );
    }
},

checkSession : function() {
    this.handleSessionCheck(false, arguments);
},

checkIsAdmin : function() {
    this.handleSessionCheck(true, arguments);
}
```

As you can see, `checkSession` and `checkIsAdmin` both simply execute the `handleSessionCheck` method but pass whether or not the user is required to be an admin and the arguments. `handleSessionCheck` looks very similar to the old `checkIsAdmin` method except for a couple different changes. First is the conditional check the user type, it first checks if `beAdmin` is falsey, if so then it will allow the route to be resumed other wise it'll check if the user is an admin. The other change is to the `Ext.Function.bind` in the `appready` event listener. I changed the function being bound and also the third argument is now an array of the `handleSessionCheck` arguments. This allows code reuse in a dynamic fashion which is good!

### Conclusion

Being able to handle user sessions with routes really isn't hard but there isn't a decent example that I've seen. The code snippets I provided are simplified but should show the techniques I employ in my Ext JS application.
