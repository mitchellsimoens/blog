---
title: Store Listeners
date: "2014-12-18T14:21:03.284Z"
---

No doubt, you likely have a store or two in your Ext JS/Touch application. Have you had to add a listener to the store to do something? Maybe update a component when the store loads? Or take any action based on it? Like anything, there's a good way to do it but there may be a better way. Let's discuss some of these ways.

*Disclaimer: Some of these techniques use private methods and therefore need to use at your own risk. I have used them and feel confident they will not change but it always could.*

#### Listening to a store load in a component

One of the most popular components in Ext JS is the grid (`Ext.grid.Panel`) and it so happens to use a store which likely loads data remotely. A configuration I have in my abstract grid class for my projects (for more on abstracts, please see my blog on [Abstract vs Override](https://sencha.guru/2014/12/04/abstract-vs-override/)) is to automatically setup a paging toolbar. With it, I like to hide the paging toolbar when there is only one page of data. So with that requirement, I need to take action on when the store loads to then show or hide the paging toolbar.

First, let's look at an example abstract grid that will setup the paging toolbar:

    Ext.define('Abstracts.grid.Panel', {
        extend : 'Ext.grid.Panel',
        xtype  : 'abstracts-gridpanel',

        config : {
            autoHidePaging : true,
            pageable       : true
        },

        initComponent : function() {
            var me = this,
                dockedItems = me.dockedItems || [],
                pageable = me.getPageable();

            me.initStore();

            if (pageable) {
                dockedItems.push(pageable);
            }

            me.dockedItems = dockedItems;

            me.callParent();
        },

        applyPageable : function(pageable, oldPageable) {
            if (pageable) {
                if (!Ext.isObject(pageable)) {
                    pageable = {};
                }

                Ext.applyIf(pageable, {
                    dock  : 'bottom',
                    store : this.initStore()
                });
            }

            return Ext.factory(pageable, Ext.toolbar.Paging, oldPageable);
        },

        initStore : function() {
            var me = this,
                store = me.store;

            if (store && !store.isStore) {
                store = me.store = Ext.data.StoreManager.lookup(store);

                //overwrite this method to simply return the store
                me.initStore = me.getStore;
            }

            return store;
        }
    });

This is just a snippet but will add a paging toolbar to the grid with the benefit of automatically setting the grid's store on the toolbar. If we use it now, the grid will work and display the paging toolbar and allow users to navigate within the pages.

Now we need to work with our requirement to show/hide the toolbar dependant on number of pages available. I'm sure most would add a load listener to the store like this:

    store.on('load', me.handleStoreLoad);

and then in the handleStoreLoad method take action which would work but there is a better way. We know the grid already takes action on store loading right? Otherwise how could it display the data? So isn't there already a load listener somewhere? Yes there is! `Ext.grid.Panel` extends `Ext.panel.Table` which sets a load listener to execute a `onStoreLoad` method. Instead of adding our own listener, why not just take advantage of this function? First, we need to understand the method. On `Ext.panel.Table`, it's defined as such:

    // template method meant to be overriden
    onStoreLoad: Ext.emptyFn,

So it's just a template method not doing anything. Checking `Ext.grid.Panel` it doesn't override it so there is no ancestor that does anything with the method and therefore we now know that we don't need to execute `this.callParent` when we override it. So we can add our `onStoreLoad` method to show and hide the paging toolbar as such:

    onStoreLoad : function(store) {
        if (this.getAutoHidePaging()) {
            var toolbar = this.getPageable();

            if (toolbar) {
                if (store.getTotalCount() / store.pageSize <= 1) {
                    //only one page of data available
                    toolbar.hide();
                } else {
                    //more than one page is available
                    toolbar.show();
                }
            }
        }
    }

We just acted on a store load without setting our own store load listener and taking advantage of the class system.

#### Listening within a store

What if we wanted to do something within a subclass of `Ext.data.Store` when the store loads? We could do this:

    Ext.define('MyApp.store.Users', {
        extend : 'Ext.data.Store',
        alias  : 'myapp-users',

        proxy : {
            type : 'ajax',
            url  : 'foo.json'
        },

        constructor : function(config) {
            this.callParent([config]);

            this.on('load', this.doSomething);
        },

        doSomething : function() {}
    });

Where we set a listener but like what we did with the grid, we can do some research to see if we can do something without setting an event listener. Without going into details on the process a store and proxy go through to load, the proxy is what does the actual request and the store is just a holder of records. But the store has to take action when the proxy finishes it's loading so it can add the records to it's internal collection. The method on the store is cleverly named `onProxyLoad` which is also where the load event is actually fired. So we can then hook into this method like such:

    Ext.define('MyApp.store.Users', {
        extend : 'Ext.data.Store',
        alias  : 'myapp-users',

        proxy : {
            type : 'ajax',
            url  : 'foo.json'
        },

        onProxyLoad : function(operation) {
            this.callParent([operation]);

            this.doSomething();
        },

        doSomething : function() {}
    });

And now `doSomething` will execute whenever the proxy returns it's loading without setting any listener.

#### Conclusion

I hope this method of reacting to store loads can be thought of for other functions not just store loading. Overriding methods can perform better than listening to events but do have some drawbacks. When overriding methods, you always need to make sure to research that method so you will not break anything.
