---
title: Package Loading on the Fly
date: "2017-04-12T14:37:03.284Z"
---

**Note** This blog is talking about features that are not yet released and can change at any time prior to launch.

## Story

Back in 2011, I was part of a contract for a very large financial company. This company had several departments (each department had to have it's own PO too, silos are fun) but the company was wanting a single business to business (b2b) application that all it's internal departments would take part of to interface with external businesses.

This application would be in the millions of lines of code and we had to support IE6. At the time, Ext JS 3 was a very stable platform, however, serving a single JavaScript file that contained millions of lines of code to IE6 was just not going to work. Furthermore, we didn't want to split the single file into loading several files at startup; basically we didn't want startup time to be huge while it loads all that code. So we engineered a means of module loading so we only load what we need at any given time. Architecting this large application into modules was a good idea anyway to keep one silo'd department from working on the same code as another silo'd department.

Ext JS never supported this module loading, that's about to change. Together with Sencha Cmd 6.5, Ext JS applications will have support for module loading! I wanted to take a moment to discuss how to get this to work, it's actually really simple. Sencha Cmd supports the concept of packages and each package can require or even extend another package, these packages are key to this loading as each package can be chosen to be loaded on the fly. In `app.json`, there is a new `uses` entry that is an array just like `requires`. This means, the application will use the package but it's not required to be bundled within the application. Cmd can then build the package as part of an application build but keep the package's source separate from the application so that you can load it on demand.

## Let's Code

First, we need to grab a copy of Ext JS 6.2 (this may change to 6.5 but currently I'm using the latest 6.2.2 nightly build) and use Sencha Cmd **6.5** (6.5.0 will be the minimum version required for Cmd) to generate a modern toolkit Ext JS application. *For this test, I'm using Ext JS 6.2.2.309 and Cmd 6.5.0.146*

    sencha --sdk /path/to/ext generate app -modern MyApp /path/to/MyApp

Let's get into the application and run a dev build:

    cd /path/to/MyApp
    sencha app build --dev

If you load up the application (http://localhost/MyApp for me) you will see a tab panel with bottom tabs, first tab has a grid with the others having some simple lorem ipsum text. We now need to require the `package-loader` package that Cmd will download and install into your application automatically. To do this, we just need to add that package to the `requires` array in `app.json` which will look like:

    "requires": [
        "font-awesome",
        "package-loader"
    ],

We need to now refresh the application:

    sencha app refresh

If you look at `/path/to/MyApp/packages/remote` you will see the `package-loader` package now. Right now, we don't have any packages to load so let's generate a package for three of the tabs (Users, Groups and Settings):

    sencha generate package -require Users \
        then generate package -require Groups \
        then generate package -require Settings

**Note** the `-require` switch is there to prevent Cmd from adding the new packages to the `requires` array.

If you were to look in `/path/to/MyApp/packages/local` you will now see all three packages listed there now. In each package, let's add a main view and let's call them all `MyApp.view.<pkgname>.Main` where `<pkgname>` is the package name so we'd have `MyApp.view.groups.Main`, `MyApp.view.settings.Main` and `MyApp.view.users.Main`. Here is the source with the file location for the three views:

    // /path/to/MyApp/package/local/Groups/src/Main.js
    Ext.define('MyApp.view.groups.Main', {
        extend : 'Ext.Component',
        xtype  : 'myapp-groups-main',

        html    : 'This is the <strong>groups</strong> view!',
        padding : 20
    };

    // /path/to/MyApp/package/local/Settings/src/Main.js
    Ext.define('MyApp.view.settings.Main', {
        extend : 'Ext.Component',
        xtype  : 'myapp-settings-main',

        html    : 'This is the <strong>settings</strong> view!',
        padding : 20
    });

    // /path/to/MyApp/package/local/Users/src/Main.js
    Ext.define('MyApp.view.users.Main', {
        extend : 'Ext.Component',
        xtype  : 'myapp-users-main',

        html    : 'This is the <strong>users</strong> view!',
        padding : 20
    });

Ok, very simple views but just enough to hopefully show a couple things. First, I want to point out that I am nesting the classes within the package in both the class name and xtype/alias. This is more optional but I think it's important to do so for architecture purposes. I also named each class `Main`, this is a common pattern for the entry class for applications and packages but you can name it whatever you want. I'd pick something common for all your packages so the logic within your app is minimal.

At this point, the application doesn't know about these packages let alone the class within each. Like I mentioned before, we need to add the packages to the `uses` array in `app.json`, I like to place this array next to the `requires` array just to keep similar things close to each other so I'd have:

    "requires": [
        "font-awesome",
        "package-loader"
    ],

    "uses": [
        "Groups",
        "Settings",
        "Users"
    ],

Let's run another build with a tweak to tell Cmd to look for the `uses` array:

    sencha app build --dev --uses

You will see this will take a bit more time as it has to build those three packages and then build the app so essentially we are building four apps. It's not only bundling the JavaScript sources, it will also use fashion to compile the `scss` files into a CSS file. Now that all the bootstrap data has been generated, we can now start using that `package-loader` package to load our package's JavaScript and CSS files. Let's prepare first by editing `/path/to/MyApp/app/view/main/Main.js` to add an `activate` listener and make the `items` array be:

    items: [{
        title: 'Home',
        iconCls: 'x-fa fa-home',
        layout: 'fit',
        items: [{
            xtype: 'mainlist'
        }]
    }, {
        title: 'Users',
        iconCls: 'x-fa fa-user',
        layout: 'fit',
        pkg: 'Users'
    }, {
        title: 'Groups',
        iconCls: 'x-fa fa-users',
        layout: 'fit',
        pkg: 'Groups'
    }, {
        title: 'Settings',
        iconCls: 'x-fa fa-cog',
        layout: 'fit',
        pkg: 'Settings'
    }],

    listeners: {
        activeitemchange: 'onItemActivate'
    }

Let's pause and see what we are expecting here. The first tab (`Home`) will use `mainlist` which is `List.js` in the application, this isn't going to use the package loading but could if you choose too. The other three tabs have removed the `bind` statement and added the `layout` and `pkg` configs. The `layout` config is an Ext JS config as we need the tab to be present so the user can click on something but there are no items or anything as when we load the associated package (defined by the `pkg` custom config) we are going to add the `Main` view to this tab so fit layout is needed in this case. The listener is there to tell the controller about the tab change so that we can decide if we need to load the package or not.

If you were to look at the app, the `Home` tab stayed the same but the other three tabs will show a blank screen because the tabs have no child items. We need to edit `/path/to/MyApp/app/view/main/MainController.js` to require the `Ext.Package` class that comes from the `package-loader` package by adding this:

    requires: [
        'Ext.Package'
    ],

Now we need to handle the `activeitemchange` event. For this, let's a couple methods to `MainController`:

    onItemActivate: function (tabpanel, tab) {
        var pkg = tab.pkg;

        if (pkg) {
            if (Ext.Package.isLoaded(pkg)) {
                this.handlePackage(pkg);
            } else {
                tabpanel.setMasked({
                    message: 'Loading Package...'
                });

                Ext.Package
                    .load(pkg)
                    .then(this.handlePackage.bind(this, pkg));
            }
        }
    },

    handlePackage: function (pkg) {
        var tabpanel = this.getView(),
            tab = tabpanel.child('[pkg=' + pkg + ']');

        tabpanel.setMasked(null);

        //only add item if the item isn't already added
        if (!tab.hasPkgItem) {
            tab.hasPkgItem = true;

            tab.add({
                xclass: 'MyApp.view.' + pkg.toLowerCase() + '.Main'
            });
        }
    }

In `onItemActivate`, if the tab has the `pkg` property, we need to check to see if the package is loaded or not. If it is, go ahead and jump to `handlePackage` but if not then we need to tell `Ext.Package` to load the package and then go to `handlePackage`. If a load is required, I like to mask the app so we don't get racing conditions because the user clicked on something else. Within `handlePackage`, we have to get the tab, unmask the tab panel and check if the tab has the `Main` class already. For performance, I tend to set a property on the tab that can easily be checked. If it hasn't been set, then we need to add the item with the generated class name; this is where having a common name format can help but this will depend on what your application is doing.

Now if you load the app and click through the tabs, you will notice when a tab is first activated, it will load the bundled JavaScript and CSS assets and will then add the `Main` view to the appropriate tab and that's it!

## Summary

This was a simple example of how Sencha Cmd 6.5 and Ext JS are employing this dynamic package loading. Once Sencha Cmd 6.5 is released, we will have examples that are similar to this along with guides about some other Cmd commands instead of just the `sencha app build --dev --uses` that we used to accomplish some other things like working with packages in development without rerunning builds all the time.

Imaging the possibilities with this. Startup times will improve since you can load only the core of the application and then load what you need as the user uses the application. I work a lot with user sessions and different permissions so I can see my server disallowing loading of a package based on the session since you cannot trust the client giving better security. Lots of great things now come from this and we hope you enjoy it!
