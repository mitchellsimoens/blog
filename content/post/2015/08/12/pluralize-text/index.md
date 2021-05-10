---
title: Pluralize text
date: "2015-08-12T16:21:03.284Z"
---

One of my gripes is when I see text that should be singular but shows plural when the value before it is one. It's 2015, surely we can detect when we should show singular there. Now admittedly, I've missed these opportunities but I do try to show the appropriate form of a word. So if you see `1 items` wrong! Should be `1 item` and `3 items`. I mean all that has to be done is a simple ternary expression:

<iframe src="https://fiddle.sencha.com/fiddle/s41?height=200" style="height:200px;width:600px;border:0;"></iframe>

Done! So what does this have to do with Ext JS? Ext JS makes this a bit easier and has a function that you can call. That code there can be replaced with:

<iframe src="https://fiddle.sencha.com/fiddle/s40?height=200" style="height:200px;width:600px;border:0;"></iframe>

All the `plural` method does is adds the 's' onto the term you pass but also prepends the value you pass in. The `plural` method doesn't do too much magic in determining whether or not to add the 's' so for words that need to be changed more than just adding the 's' then you can pass the plural version as the third argument:

<iframe src="https://fiddle.sencha.com/fiddle/s42?height=200" style="height:200px;width:600px;border:0;"></iframe>

Ok, so this isn't really getting me much except a friendly API. Where I really love using this is in an `XTemplate`. Code like this:

<iframe src="https://fiddle.sencha.com/fiddle/s43?height=200" style="height:200px;width:600px;border:0;"></iframe>

can be replaced with this:

<iframe src="https://fiddle.sencha.com/fiddle/s44?height=200" style="height:200px;width:600px;border:0;"></iframe>

Super clean! In a grouped grid, I use `plural` in the `groupHeaderTpl` and love how clean it is. Just for completeness, you can still pass the plural version too:

<iframe src="https://fiddle.sencha.com/fiddle/s45?height=200" style="height:200px;width:600px;border:0;"></iframe>
