---
title: Abstract vs Override
date: "2014-12-04T14:54:03.284Z"
---

Developing large single-page applications can be a daunting task.  I've seen web applications approach a million lines of code.  That's quite a lot of code and performance is a real issue there (luckily it was a B2B application not a consumer facing application).  A golden rule in software development, well most things in life really, is that there is always a better way to do something.  You may think you have the perfect way to make a pizza but there's likely a better way to make it.  The same goes for software development.

### Abstracting code

One way to minimize code is to create an abstract class.  Ext JS has a great class system that allows simple inheritance.  Taking advantage of this class system by creating an abstract class can minimize the code required because you're not having to have the same code spread among several classes.

A simple example I could provide is in my grids I tend to want a couple different things:

- A top docked toolbar with:
  - A search field
  - Button to add a record
- A paging toolbar
- A refresh tool in the title bar

Normally I would extend `Ext.grid.Panel` for all my grids but for those common UI features I'd have to implement them in each grid which is not optimal.  There's an better way to do it, create an abstract grid class that extends `Ext.grid.Panel` and has configs to turn on/off the UI features. Here is an example abstract grid class (please don't get overwhelmed by the amount of code):

    Ext.define('MyApp.view.abstracts.Grid', {
        extend : 'Ext.grid.Panel',
        xtype  : 'myapp-abstracts-grid',

        requires : [
            'Ext.button.Button',
            'Ext.form.field.Text',
            'Ext.grid.feature.Grouping',
            'Ext.toolbar.Paging'
        ],

        config : {
            /**
             * @cfg {Boolean/Object} [createNew=true] `true` to add a {@link Ext.button.Button} to create a new record.
             *
             * Can also be a config object for the button.
             */
            createNew   : true,
            /**
             * @cfg {Boolean/Object} [grouped=false] `true` to add the {@link Ext.grid.feature.Grouping} feature to the grid.
             *
             * Can be a config object that will be passed or a boolean.
             */
            grouped     : false,
            /**
             * @cfg {Boolean/Object} [pageable=true] `true` to add a {@link Ext.toolbar.Paging}. Will set the grid's
             * store on the toolbar automatically.
             *
             * Can be a config object for the paging toolbar.
             */
            pageable    : true,
            /**
             * @cfg {Boolean/Object} [refreshable=true] `true` to add a refresh {@link Ext.panel.Tool} to the title bar.
             *
             * Can be a config object for the tool.
             */
            refreshable : true,
            /**
             * @cfg {Boolean/Object} [searchable=true] `true` to add a search {@link Ext.form.field.Text}.
             *
             * Can also be a config object for the text field.
             */
            searchable  : true
        },

        initComponent : function() {
            var me          = this,
                store       = me.store = Ext.data.StoreManager.lookup(me.store),
                dockedItems = me.dockedItems || [],
                features    = me.features    || [],
                tbar        = me.tbar        || [],
                tools       = me.tools       || [],
                createNew   = me.getCreateNew(),
                grouped     = me.getGrouped(),
                pageable    = me.getPageable(),
                refreshable = me.getRefreshable(),
                searchable  = me.getSearchable();

            if (createNew) {
                tbar.unshift(Ext.apply({
                    text    : 'Create',
                    iconCls : 'fa fa-plus',
                    handler : 'onCreateClick'
                }, createNew));
            }

            if (searchable) {
                //add it first
                tbar.unshift(Ext.apply({
                    xtype           : 'textfield',
                    enableKeyEvents : true,
                    emptyText       : 'search...',
                    width           : 300,
                    triggers        : {
                        search : {
                            cls     : 'fa fa-search',
                            handler : 'doSearch'
                        }
                    },
                    listeners       : {
                        keydown : 'onSearchKeyDown'
                    }
                }, searchable));
            }

            if (grouped) {
                features.push(Ext.apply({
                    ftype : 'grouping'
                }, grouped));
            }

            if (pageable) {
                dockedItems.push(Ext.apply({
                    xtype       : 'pagingtoolbar',
                    dock        : 'bottom',
                    displayInfo : true,
                    store       : store
                }, pageable));
            }

            if (refreshable) {
                tools.push(Ext.apply({
                    type    : 'refresh',
                    tooltip : 'Refresh Grid',
                    scope   : me,
                    handler : 'refreshStore'
                }, refreshable));
            }

            if (tbar.length) {
                docks.push({
                    xtype : 'toolbar',
                    dock  : 'top',
                    items : tbar
                });
            }

            me.dockedItems = docks;
            me.features    = features;
            me.tools       = tools;
            me.tbar        = null;

            me.callParent();
        }
    });

We now have an abstract grid class that has 5 configs to add certain UI features that are common among grids.  Within the `initComponent` method, we go through these configs and add the classes to the grid.  The configs can be a simple `Boolean` or can be config `Object`s for the different components associated with that config.

##### Abstract Benefits

The issue with this is it will cause a little bit of performance as any extra code will.  Not only do you have an extra `initComponent` call for each class instance, you also have the configs that get the getter/setter methods created, the conditionals in the `initComponent`, and the `Ext.apply` calls.  That's narrow vision thinking though.  If you look at it from an entire application perspective, you will save on performance as it should lead to smaller code; likely not smaller code to be executed as the code has to be executed somewhere but smaller code for the browser to download and evaluate.

I haven't sold you on the idea yet?  Let's look at it from a maintenance perspective.  No doubt, somewhere down the line of development someone will make the decision to add a UI feature.  Would you rather go through each grid and add that in there or make a new config in an abstract class that all grid's will inherit?  Change one class or many?  Still not sold?  You're a hard sale.  Let's look at it from a QA perspective.  Would you rather test one class for these features or many classes duplicating the tests?  Still not sold?  Guess you aren't in charge of QA then.  Maybe you're a project lead or in management.  How about time of development?  Would you rather pay someone to make one change or many?  Abstracts allow you to work faster, implement application features quicker when you have the abstracts setup upfront.

I do this for many different classes that are used frequently: form panel, window, tree but also view controllers (before action in a route maybe?) and stores.

### Using overrides

Abstracts are incredibly useful.  However, abstracts cannot solve everything.  I'm currently working on a new support portal for Sencha, employees (admins) should see different items than customers (users).  I could hook into `initComponent` and build the items array there but I wanted to use simple configs and stay away from overriding methods so I have `adminItems` and `userItems` configs I implement like this:

    Ext.define('MyApp.view.Foo', {
        extend : 'Ext.container.Container',
        xtype  : 'myapp-foo',

        adminItems : [
            //...
        ],

        userItems : [
            //...
        ]
    });

If I were to handle this in an abstract, I'd have to spread the code around to `Ext.container.Container`, `Ext.panel.Panel`, `Ext.grid.Panel`, etc abstract classes so that all components would handle the different admin/user configs.  With the abstract approach, I'd have to spread the logic which is not what I want to do.  I could create a singleton utility class and in the abstracts execute a common method on that utility class but there is a better way to do it.  Let's keep taking advantage of the class system and override certain Ext JS classes.  An example to pick certain items based on if the user is an admin or user we need to determine where the class that handles the items is, which is `Ext.container.Container`, and override it like so:

    Ext.define('Override.container.Container', {
        override : 'Ext.container.Container',

        adminItems : null,
        userItems  : null,

        buildItems      : null,
        buildAdminItems : null,
        buildUserItems  : null,

        initComponent : function() {
            var me      = this,
                user    = Portal.user,
                isAdmin = user && user.isAdmin();

            if (me.buildItems) {
                me.items = me.buildItems();
            } else if (me.buildAdminItems && isAdmin) {
                me.items = me.buildAdminItems();
            } else if (me.buildUserItems && user) {
                me.items = me.buildUserItems();
            } else if (me.adminItems && isAdmin) {
                me.items = me.adminItems;
            } else if (me.userItems && user) {
                me.items = me.userItems;
            }

            me.callParent();
        }
    });

I also go a bit further and allow for `buildItems`, `buildAdminItems` and `buildUserItems` to be methods that I can execute and return items making this override a bit more flexible.

The same process can be put into place for docked items but we need to override `Ext.panel.Panel`:

    Ext.define('Override.panel.Panel', {
        override : 'Ext.panel.Panel',

        adminDockedItems : null,
        userDockedItems  : null,

        buildDockedItems      : null,
        buildAdminDockedItems : null,
        buildUserDockedItems  : null,

        initComponent : function() {
            var me      = this,
                user    = Portal.user,
                isAdmin = user && user.isAdmin();

            if (me.buildDockedItems) {
                me.dockedItems = me.buildDockedItems();
            } else if (me.buildAdminDockedItems && isAdmin) {
                me.dockedItems = me.buildAdminDockedItems();
            } else if (me.buildUserDockedItems && user) {
                me.dockedItems = me.buildUserDockedItems();
            } else if (me.adminDockedItems && isAdmin) {
                me.dockedItems = me.adminDockedItems;
            } else if (me.userDockedItems && user) {
                me.dockedItems = me.userDockedItems;
            }

            me.callParent();
        }
    });

I now have reusable logic for any class. Before, if I wanted to use adminDockedItems in a grid, I'd have to implement the code in `Ext.panel.Panel` and `Ext.grid.Panel` abstracts but with override I only have to impelemnt the code in the `Ext.panel.Panel` override as `Ext.grid.Panel` eventually extends `Ext.panel.Panel`.

The same benefits for abstracts is the same for overrides.  Testability, reusability and time are more optimized.

### Conclusion

The title of the blog is a bit misleading, it's not one versus the other; I use both methods in my applications.  I find doing things like this allows me to be more flexible and quicker and have great success.  That million line app I worked on a few years could have been optimized using abstracts and overrides.  It was but only to an extent, there were many teams working on the one application and I was only to work on my section.
