---
title: List and the scrollDock config
date: "2015-07-24T14:33:03.284Z"
---

With [Ext JS 6](https://www.sencha.com/products/extjs/) modern toolkit and [Sencha Touch 2](https://www.sencha.com/products/touch/), you can have docked items on an `Ext.dataview.List` without wrapping the `List` in a `Container` or `Panel` like this:

<iframe style="border:0;width:600px;height:600px;" src="https://fiddle.sencha.com/fiddle/r3a"></iframe>

Notice the `docked` config on the toolbar and notice in the preview this adds the toolbar to the bottom of the list and does not take part in the scrolling of the list. What if you wanted to add a component to be beginning or end of the list and take part in the scrolling of the list? For this, Sencha Touch 2 has had the `scrollDock` config since 2.4.0 I believe, not sure exactly when this was first introduced and of course in the merge of Ext JS and Sencha Touch into Ext JS 6, this config still exists. You use it just like the `docked` config:

<iframe style="border:0;width:600px;height:600px;" src="https://fiddle.sencha.com/fiddle/r3b"></iframe>

Now the toolbar isn't just docked to the bottom but is at the end of the list and will scroll with the list.
