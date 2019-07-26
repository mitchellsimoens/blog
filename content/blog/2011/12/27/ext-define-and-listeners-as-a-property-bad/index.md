---
title: Ext.define and listeners as a property... bad!
date: "2011-12-27T12:01:03.284Z"
---

**Note** As of Ext JS 5 this blog is not true. We have made changes to Ext JS to handle the listeners as a property. In face, for MVVM, this is now the recommended practice. In Ext JS 6, a subclass cannot override the superclass' listeners property.

Recently I have noticed a lot of people on the forums using the `listeners`, in my opinion, the wrong way. Being event driven is a great tactic in application development, one that I often use. Template methods are great and have their uses but for things that are reacting to user interactions, events are going to be your best friend.

Let's look at a quick piece of code. Grids are used a lot and I often create an abstract class to handle all my grids as most of the stuff in grids can be abstracted out instead of having tons of duplicate code.

    Ext.define('MyApp.view.grid.Abstract', {
        extend : 'Ext.grid.Panel',
        alias  : 'widget.myapp-grid-abstract',

        initComponent : function() {
            Ext.apply(this, {
                dockedItems : this.buildDocks(),
                selModel    : this.buildSelModel()
            });

            this.callParent(arguments);
        },

        buildDocks : function() {
            var docks = Ext.Array.from(this.dockedItems);

            docks.push({
                xtype : 'toolbar',
                dock  : 'top',
                items : [
                    {
                        text     : 'Delete',
                        disabled : true,
                        action   : 'delete'
                    }
                ]
            });

            return docks;
        },

        buildSelModel : function() {
            return {
                type : 'rowmodel',
                mode : 'SIMPLE'
            };
        }
    });

So you can see from this code (which usually isn't the entire abstract class) that we are adding a top docked `Ext.Toolbar` with a disabled delete button and defining a selection model with `mode` set to 'SIMPLE'. The delete button should enable and disable based on the number of rows selected, disabled if the number of rows selected is zero, otherwise enable it. Usually you would extend an abstract class but for this blog we will just instantiate the abstract class like this:

    new MyApp.view.grid.Abstract({
        renderTo : Ext.getBody(),
        width    : 400,
        height   : 400,
        title    : 'Test Grid',
        columns  : [
            {
                header    : 'Row',
                flex      : 1,
                dataIndex : 'row'
            }
        ],
        store    : new Ext.data.Store({
            fields : ['row'],
            data   : [
                { row : 'One'   },
                { row : 'Two'   },
                { row : 'Three' },
                { row : 'Four'  },
                { row : 'Five'  }
            ]
        })
    });

So now we have a grid rendering as expected, time to handle the user interaction using the `selectionchange` event on the grid panel. This is where the problem lies. I have seen many developers add `listeners` like this:

    Ext.define('MyApp.view.grid.Abstract', {
        extend : 'Ext.grid.Panel',
        alias  : 'widget.grid-abstract',

        listeners : {
            selectionchange : function(selModel, selected) {
                var view = selModel.view,
                    grid = view.up('gridpanel'),
                    btn  = grid.down('button[action=delete]');

                btn.setDisabled(selected.length === 0);
            }
        },

        initComponent : function() {
            /**/
        },

        buildDocks : function() {
            /**/
        },

        buildSelModel : function() {
            /**/
        }
    });

Notice the `listeners` property we just set on the class' prototype. And this works but I have always been told just because it works doesn't mean it's right; to me, this is an invalid use of `listeners`. `listeners` is listed as a config option so what happens when you instantiate the class like so:

    new MyApp.view.grid.Abstract({
        /**/
        listeners : {
            afterrender : function() {
                console.log('my grid has rendered!');
            }
        }
    });

Now, try to enable that delete button by selecting a row. Did it work? The problem here is anything you pass in the config object will overwrite anything you set on the prototype in `Ext.define` so the `listeners` you set to listen for the `selectionchange` event is now overwritten by the `listeners` config object listening for the `afterrender` when we instantiated. You now easily broke your abstract class. This is why you should never use `listeners` when using `Ext.define`.

So how do we go about to rectify this situation so that we can have our config listeners not overwrite our class listeners? The simple usage of `on()` will allow this, the only cavet is that we have to clean up the listener but that's simple. Let's delete the `listeners` from the `Ext.define` and put the `on()` usage into `initComponent` and use `un()` in `beforeDestroy`:

    Ext.define('MyApp.view.grid.Abstract', {
        extend : 'Ext.grid.Panel',
        alias  : 'widget.grid-abstract',

        initComponent : function() {
            var me = this;

            Ext.apply(me, {
                dockedItems : me.buildDocks(),
                selModel    : me.buildSelModel()
            });

            me.callParent();

            me.on('selectionchange', me.handleSelectionChange, me);
        },

        beforeDestroy: function() {
            var me = this;

            me.un('selectionchange', me.handleSelectionChange, me);

            me.callParent(arguments);
        },

        buildDocks : function() {
            /**/
        },

        buildSelModel : function() {
            /**/
        },

        handleSelectionChange : function(selModel, selected) {
            var view = selModel.view,
                grid = view.up('gridpanel'),
                btn  = grid.down('button[action=delete]');

            btn.setDisabled(selected.length === 0);
        }
    });

Can you see where I used `on()` and `un()`? Now, when you render the grid, the listeners you placed in the config object that has an `afterrender` listener gets executed and if you select a row, the delete button will now enable.

Awesome! Now we have a full functional abstract class that has event listeners that cannot be affected when instantiating a class.
