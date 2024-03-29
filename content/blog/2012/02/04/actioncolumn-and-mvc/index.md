---
title: ActionColumn and MVC
date: "2012-02-04T20:38:03.284Z"
---

Being full-time on the <a href="http://www.sencha.com/forums/" title="Sencha forums" target="_blank">Sencha forums</a> gives me direct access to the community which gives me an idea of some frequently asked questions that I hope to blog more to answer.

## Mission

Building applications with Ext JS 4 is very easy with the MVC architecture but sometimes it's not always easy to know how to use MVC with certain widgets or features of Ext JS 4. Today I would like to discuss how I went about using ActionColumns and MVC specifically how to control when you click on an ActionColumn item within a controller.

## Setting the Stage

Let's set the stage! I'm going to use the Array Grid example that comes with every Ext JS release but turn it from an ordinary example into a more MVC example. Here are the controller, model, view and application code that we can start with:

```js
Ext.define('Mitch.controller.Main', {
    extend : 'Ext.app.Controller',

    init : function() {
        //this.control will go here
    }
});

Ext.define('Mitch.model.Company', {
    extend : 'Ext.data.Model',

    idProperty : 'company',
    fields     : [
        { name : 'company'                                            },
        { name : 'price',      type : 'float'                         },
        { name : 'change',     type : 'float'                         },
        { name : 'pctChange',  type : 'float'                         },
        { name : 'lastChange', type : 'date', dateFormat : 'n/j h:ia' }
    ]
});

Ext.define('Mitch.view.Viewport', {
    extend : 'Ext.grid.Panel',
    xtype  : 'mitch-viewport',

    multiSelect : true,
    height      : 350,
    width       : 600,
    title       : 'Array Grid',

    initComponent : function() {
        var me = this;

        me.columns    = me.buildColumns();
        me.store      = me.buildStore();
        me.viewConfig = {
            stripeRows          : true,
            enableTextSelection : true
        };

        Mitch.view.Viewport.superclass.initComponent.call(me);
    },

    buildStore : function() {
        return new Ext.data.Store({
            model : 'Mitch.model.Company',
            data  : [
                ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
                ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
                ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
                ['American Express Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
                ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
                ['AT&amp;T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
                ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
                ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
                ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
                ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
                ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
                ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
                ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
                ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
                ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
                ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
                ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
                ['Johnson &amp; Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
                ['JP Morgan &amp; Chase &amp; Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
                ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
                ['Merck &amp; Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
                ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
                ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
                ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
                ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
                ['The Procter &amp; Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
                ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
                ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],
                ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am']
            ]
        });
    },

    buildColumns : function() {
        return [
            {
                text      : 'Company',
                flex      : 1,
                sortable  : false,
                dataIndex : 'company'
            },
            {
                text      : 'Price',
                width     : 75,
                sortable  : true,
                renderer  : 'usMoney',
                dataIndex : 'price'
            },
            {
                text      : 'Change',
                width     : 75,
                sortable  : true,
                renderer  : 'usMoney',
                dataIndex : 'change'
            },
            {
                text      : '% Change',
                width     : 75,
                sortable  : true,
                renderer  : function(v) { return v + '%'; },
                dataIndex : 'pctChange'
            },
            {
                text      : 'Last Updated',
                width     : 85,
                sortable  : true,
                renderer  : Ext.util.Format.dateRenderer('m/d/Y'),
                dataIndex : 'lastChange'
            },
            {
                xtype        : 'actioncolumn',
                menuDisabled : true,
                sortable     : false,
                width        : 50,
                items        : [
                    {
                        icon    : '../SDK/extjs/examples/shared/icons/fam/delete.gif',
                        tooltip : 'Sell stock',
                        handler : function(grid, rowIndex, colIndex) {
                            var rec = store.getAt(rowIndex);
                            alert('Sell ' + rec.get('company'));
                        }
                    },
                    {
                        getClass : function(v, meta, rec) {
                            if (rec.get('change') < 0) {
                                this.items[1].tooltip = 'Hold stock';
                                return 'alert-col';
                            } else {
                                this.items[1].tooltip = 'Buy stock';
                                return 'buy-col';
                            }
                        },
                        handler  : function(grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            alert((rec.get('change') < 0 ? 'Hold ' : 'Buy ') + rec.get('company'));
                        }
                    }
                ]
            }
        ];
    }
});

Ext.application({
    name        : 'Mitch',
    controllers : [ 'Main' ],

    launch : function() {
        new Mitch.view.Viewport({
            renderTo : document.body
        });
    }
});
```

Bunch of code but very easy to follow. Currently the Main controller doesn't do anything and you can see we have two items under the ActionColumn but it's not very MVCish. I know you can use the ComponentQuery 'mitch-viewport actioncolumn' to resolve the ActionColumn so in the Main controller I just decided to test if I can listen to the a click event on the ActionColumn in a controller and it actually worked! Here is how to capture the click event:

```js
Ext.define('Mitch.controller.Main', {
    extend : 'Ext.app.Controller',

    init : function() {
        this.control({
            'mitch-viewport actioncolumn' : {
                click : this.handleActionColumn
            }
        });
    },

    handleActionColumn : function(gridview, el, rowIndex, colIndex, e, rec, rowEl) {
        console.log(arguments);
    }
});
```

So if you click on an item in the ActionColumn the controller will console.log the arguments out so you can inspect them. You could actually stop here and use this as is but upon inspecting the different arguments (there are quite a few) I saw a problem... there isn't an easy way to distinguish which icon in the ActionColumn was actually clicked on. You could add some logic in to look look at the actual target to see which icon was clicked on but there is an easier and less expensive way than parsing the DOM.

## Custom Events

I would hope we all know that you don't have to stick with the default events that are fired within the framework, we can actually fire custom events using fireEvent but I know I didn't have that thought when I first started off. So why not use fireEvent within the handler of each item in the ActionColumn so that we don't have to dig into the DOM? Why have a catch-all click event that is on the column? We can have a general event that is fired but easily distinguishable from one another and name it 'itemclick'!

## Fire `itemclick`

So we chose to fire a custom event call 'itemclick', first we need to decide what kind of arguments we want to fire this event with. The scope of the handler is that of the ActionColumn which is where we are going to fire the event on. We would maybe want the ActionColumn, grid, rowIndex, colIndex, record, eventObject, the node clicked on and since we are firing the event, we can make it easy on ourselves and put a custom argument to tell the action we should take. Let's look at the code:

```js
{
    xtype        : 'actioncolumn',
    menuDisabled : true,
    sortable     : false,
    width        : 50,
    items        : [
        {
            icon    : '../SDK/extjs/examples/shared/icons/fam/delete.gif',
            tooltip : 'Sell stock',
            handler : function(grid, rowIndex, colIndex, node, e, record, rowNode) {
                this.fireEvent('itemclick', this, 'sell', grid, rowIndex, colIndex, record, node);
            }
        },
        {
            getClass : function(v, meta, rec) { /* */
            },
            handler  : function(grid, rowIndex, colIndex, node, e, record, rowNode) {
                var action = record.get('change') &lt; 0 ? 'hold' : 'buy';
                this.fireEvent('itemclick', this, action, grid, rowIndex, colIndex, record, node);
            }
        }
    ]
}
```

So you can see how we can use the fireEvent and fired the 'itemclick' event onto this which is the ActionColumn. Now we can update the Main controller like this:

```js
Ext.define('Mitch.controller.Main', {
    extend : 'Ext.app.Controller',

    init : function() {
        this.control({
            'mitch-viewport actioncolumn' : {
                itemclick : this.handleActionColumn
            }
        });
    },

    handleActionColumn : function(column, action, grid, rowIndex, colIndex, record, node) {
        console.log(action);
    }
});
```

If you update the view and the controller now and click on an icon in the ActionColumn, you would see the action console.log into the developer tools console being one of these options: 'sell', 'hold' or 'buy'. Now based on that action we can then do whatever application and business logic that is required. Since we have the power of firing our own event you could actually fire the event on the grid itself so that your control method in your controller is easily managable and not have too many different ComponentQuery selectors but I would prefix the 'itemclick' event with 'action' so that the event name means something and doesn't collide with any existing events.

## Recap

First we took the Array Grid example and turned it into a simple MVC application. We then tested to see what events fire on the ActionColumn that we could use and found the click event was fired on the ActionColumn even though that particular event is documented in the API docs (I looked at the source for the ActionColumn and saw the possibility, don't be afraid to look at the source!). We inspected the arguments that are fired with the click event and saw that we could use it but would have to query the DOM to see which item in the ActionColumn was actually clicked on. We decided that there could be a less expensive way to accomplish what we wanted to do than to play with the DOM as doing anything with the DOM (read/write) has a high performance hit. We found out we can fire our own events which should be faster than the DOM and so we modified our code to do this and found out it was very simple to do! Now we can go forth and do actual actions with our custom 'itemclick' event!
