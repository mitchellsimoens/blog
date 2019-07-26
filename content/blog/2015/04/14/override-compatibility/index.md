---
title: Override Compatibility
date: "2015-04-14T20:55:03.284Z"
---

Software is and always will be buggy, let's be honest. While being honest, Ext JS certain isn't bug free. So if you're like me, you may come up on a bug or two while developing an application. Most of the time, the bugs I encounter I find a way to create a patch (an override) to fix the bug whether it's from my own debugging or since I have access to out git repo I can extrapolate the fix.

Before I go on, it's good practice to remove your overrides when you upgrade the Ext JS SDK. Test your app and then apply the ones that are still needed and remove the ones that are not. Your overrides should be well documented so that when you come back to them you know what's going on with the override and what bug(s) the override is fixing.

We're human, we make mistakes, we forget things, we rush things. Ext JS actually has a property that will control what maximum version an override should be applied to. Say a bug existed in 5.0.1 but is fixed in 5.1.0, you only want the override to be applied to 5.0.1 (and older) and not to 5.1.0. The property is called `compatibility` and it's usage is like so:

<iframe src="https://fiddle.sencha.com/fiddle/l8j" style="border: 0; width: 600px; height: 600px;"></iframe>

The fiddle is set to use the 5.0.1 and therefore you should be able to see the `Ext.Msg.alert` over the panel. If you open the fiddle in the [Fiddle](https://fiddle.sencha.com/#fiddle/l8j) app and change the framework version to a 5.1.0 release, you should not see the `Ext.Msg.alert` because the override is set to only apply to 5.0.1 and older.

So like I said before, you should always evaluate your overrides when you upgrade your Ext JS SDK. The `compatibility` property can help not apply overrides on versions after you know the bug was fixed but I even if I know I'm going to be diligent with my override evaluation, I still like to put it in there even just for documentation sake. Nothing wrong with extra documentation!
