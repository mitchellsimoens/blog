---
title: A cause in poor performance
date: "2014-12-17T13:59:03.284Z"
---

Over the years of working with Ext JS and Sencha Touch, I've gotten to see lots of code both from projects I've worked on and for the many code reviews I've done. One common thing I always see, and I'm not exaggerating when I say always, is something that can degrade performance quickly both on the DOM and JavaScript execution level. It's called "overnesting" and it's an epidemic.

#### What is "overnesting"?

Ext JS and Sencha Touch work with Component and Layout systems where you layout your UI by instantiating Components and position/size them using a layout. Overnesting is when you nest a component within a container when that component does not need to be nested. When I say "component", I mean any component not just `Ext.Component`; likewise, "container" doesn't just mean `Ext.container.Container` it also means for any subclass like `Ext.form.Panel` or `Ext.grid.Panel`.

#### Affect of "overnesting"

The side affects of overnesting can include:

- Extra DOM nodes
- Extra JavaScript execution
- Extra layout runs by the browser and/or the framework
- Layout issues, components not laid out properly on all platforms
 	- IE may display differently than Chrome

Any of these are bad and will happen if you have overnesting in your application.

#### Example

Let's look at a sample of overnesting:

    Ext.create('Ext.tab.Panel', {
        items : [
            {
                xtype  : 'panel',
                title  : 'Users',
                layout : 'fit',
                tbar   : [
                    { text : 'Create User' }
                ],
                items  : [
                    {
                        xtype   : 'gridpanel',
                        store   : 'Users',
                        columns : [
                            {
                                text      : 'Name',
                                dataIndex : 'name',
                                flex      : 1
                            }
                        ]
                    }
                ]
            }
        ]
    });

In this example, we create a tab panel with a single tab that is a panel. The panel has a top docked toolbar with a Create User button and also a grid that is laid out using fit layout. While this will work and look as you would expect, it's overnesting. The panel is a layer that is not needed just to have a top docked toolbar, the grid can have a top docked toolbar and will look exactly the same:

    Ext.create('Ext.tab.Panel', {
        items : [
            {
                xtype   : 'gridpanel',
                store   : 'Users',
                tbar    : [
                    { text : 'Create User' }
                ],
                columns : [
                    {
                        text      : 'Name',
                        dataIndex : 'name',
                        flex      : 1
                    }
                ]
            }
        ]
    });

#### Spotting "overnesting"

That was a very simple example, applications are going to be much more complex. The first tip I could give is you need to be aware of what your code is doing. A browser does a very good job at showing the DOM structure, it's a tree of nodes. Your application's UI is also a tree. The overnesting example could look like this in a tree format:

    --Ext.tab.Panel
    ----Ext.panel.Panel
    ------Ext.grid.Panel

If you start to visualize your layout as a tree, you'll start to realize how things are laid out and can then spot possible overnesting.

Another tip would be to use tools or scripts. For example, [Sencha AppInspector](https://chrome.google.com/webstore/detail/app-inspector-for-sencha/pbeapidedgdpniokbedbfbaacglkceae) can display your components in an actual `Ext.tree.Panel` and give you a bit more information on each component that will help you debug your application. I personally prefer having intimate knowledge over the projects I work on but AppInspector can aid your understanding.

#### Conclusion

Overnesting can cause poor performance and all sorts of issues in your application. Even if overnesting isn't a cause of a bug in an application I'm looking at, it's still something that has to be addressed. To me, it's not optional; overnesting must be solved.
