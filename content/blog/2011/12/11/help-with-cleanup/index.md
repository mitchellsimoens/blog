---
title: Help with cleanup
date: "2011-12-11T17:38:03.284Z"
---

We are only in the developer preview stages of **Sencha Touch 2** but we are already seeing so many great things. Performance in Android is superb. Scrolling is so native feeling that users won't really be able to tell it's really just a web page. Orientation changing is faster than the actual browser. The list goes on and on but I just stumbled on something that will help you clean up after your defined components.

Lots of times, we as developers set references onto components to keep track of things. We now can use the config Object with the getters and setters which is very useful I have to admit. But sometimes that's just a bit much for what we need. We just want to set a reference and refer to it whenever we want but the problem with this is it can leak memory. So what we would do is either listen for the destroy event or use one of the destroy methods and call the superclass. But what if **Sencha Touch** as a framework can take care of it? Enter the referenceList.

Every subclass of `Ext.AbstractComponent` gets an Array placed as `referenceList`. All this is is an Array of Strings which are references on the component. You will see that the referenceList Array will have 'element' and sometimes 'innerElement' (depending on if it is an `Ext.Container` or subclass). When the component is destroyed, the destroy method will iterate over the referenceList Array, execute the destroy method on that reference and then delete it:

    // Destroy all element references
    for (i = 0,ln = referenceList.length; i &amp;lt; ln; i++) {
        reference = referenceList[i];
        this[reference].destroy();
        delete this[reference];
    }

Now you can see the comment says that it will destroy all element references but technically you can put anything in there that has a destroy method. Very simple to clean up your references. Let's look at an example...

Say you want a fullscreened `Ext.Container` but you need to detect when that `Ext.Container`'s size changes. By default, `Ext.Container` doesn't monitor it's own size so you have to initialize your own `Ext.util.SizeMonitor` in order to do this. I will caution you, `Ext.util.SizeMonitor` adds in overhead so don't go crazy adding it to everything. This is an example of a subclass that does just this:

    Ext.define('MyContainer', {
        extend : 'Ext.Container',

        config : {
            fullscreen : true
        },

        initialize: function() {
            var me      = this,
                refList = me.referenceList;

            me.sizeMonitor = Ext.create('Ext.util.SizeMonitor', {
                element  : me.element,
                callback : me.onSizeChange,
                scope    : me
            });

            me.on('painted', 'onPainted', me, { single : true });

            me.callParent();
        },

        onPainted: function(cmp) {
            cmp.sizeMonitor.refresh();
        },

        onSizeChange: function() {
            this.fireEvent('sizechanged', this);
        }
    });

Couple things I want to point out here. First, you can see we are placing a reference to the `Ext.util.SizeMonitor` instance to `this.sizeMonitor`. Second, you have to execute the refresh method on the `Ext.util.SizeMonitor` instance when the component has been painted, this is what will make the size change be picked up. This may be better suited for the config Object to get the getter and setter but it's just an example for this blog post. So right now we have a fully working example with a reference that could be a memory leak, we could listen for the 'destroy' event and clean it up ourselves but there is a built in way to do it as mentioned before, the referenceList Array. So after you set the reference, we just need to push a String to the referenceList Array and it will automatically be cleaned up for us:

    Ext.define('MyContainer', {
        //..

        initialize: function() {
            var me      = this,
                refList = me.referenceList;

            me.sizeMonitor = Ext.create('Ext.util.SizeMonitor', {
                element  : me.element,
                callback : me.onSizeChange,
                scope    : me
            });
            refList.push('sizeMonitor');

            me.on('painted', 'onPainted', me, { single : true });

            me.callParent();
        },

        //...
    });

That simple! But remember, it must have that destroy method or else you will get a JavaScript error as there is no check if a destroy method is present. Kind of wish there was for other references but it's not really what this was meant for.

Enjoy all the **Sencha Touch 2** goodness!
