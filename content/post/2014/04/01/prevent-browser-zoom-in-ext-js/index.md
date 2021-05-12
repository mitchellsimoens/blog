---
title: Prevent browser zoom in Ext JS
date: "2014-04-01T07:53:03.284Z"
---

Something that I've been seeing a lot lately is people reporting lots of layout issues when they use the browser zoom feature and unfortunately Ext JS does not support browser zoom. The sad part is it's not 100% preventable for what I can see. I found I can prevent the zooming if you use the hotkeys (ctrl + -) but the browser will still allow zooming via the menu. Trying to disable the zooming via the menu I could not find a way cross browser (all IEs), would be elated if anyone knew a way for this cross browser. The following article was just out of curiosity if you could prevent the zooming at all.

## Prevent via hotkeys

In Chrome, Safari, Firefox and IE you can hit ctrl and - or + to zoom out and in. Luckily you can listen for these keys and prevent the browser's handling of these keys. First, we need add a keydown listener to the document body which is quite simple:

```js
Ext.onReady(function() {
    Ext.getBody().on('keydown', function(e) {
        console.log('You pressed a key!');
    });
});
```

Run that in a browser like Chrome and press any key and you should see the log in the javascript console. Next we need to find out what the key codes are when you press the - and + keys which is quite simple:

```js
Ext.onReady(function() {
    Ext.getBody().on('keydown', function(e) {
        console.log('You pressed a key!', e.getKey());
    });
});
```

Now, when you press a button it will also log out what key code is associated with that button. In Chrome, if you pressed - then the key code is 187 and + is 189. This is the same for Safari and IE but Firefox (shortened to Fx, that's for you Jay) the keys are 61 and 173. The next step is to detect if the ctrl (and cmd on Mac) was held down when a key was pressed:

```js
Ext.onReady(function() {
    Ext.getBody().on('keydown', function(e) {
        if (e.ctrlKey) {
            console.log('You pressed a key!', e.getKey());
        }
    });
});
```

Now, if you press ctrl and + it will log that you pressed a key but if you didn't hold down the ctrl key then it will not log it. Let's modify the conditional so that we can check out the key codes in a verbose way since Firefox is different than the others:

```js
Ext.onReady(function() {
    Ext.getBody().on('keydown', function(e) {
        var key = e.getKey();

        if (e.ctrlKey &amp;&amp; (
            (key == e.NUM_MINUS || key == e.NUM_PLUS)                   //Num Pad keys
                ||
            (Ext.isGecko &amp;&amp; (key == 61 || key == 173))                  //Firefox
                ||
            ((Ext.isWebKit || Ext.isIE) &amp;&amp; (key == 187 || key == 189))) // Chrome, Safari or IE
        ) {
            e.preventDefault();
        }
    });
});
```

Notice, I also added in the - and + from the num pad also. Also notice the `e.preventDefault(); call, this is what will prevent the browser from handling those keys. If you run this snippet and try to zoom using the hotkeys the browser will not zoom. Sweet!

## Other Notes

Firefox has the <a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent" title="KeyboardEvent" target="_blank">KeyboardEvent</a> API which would be a great way to normalize the key differences if all browsers worked the same (KeyboardEvent.DOM_VK_EQUALS is 61 on Firefox, undefined on Chrome).

You don't really need all the `Ext.is*` checks, the keys could be combined but I wanted to be verbose in the differences. This could be made better and there are libs that attempt to normalize the keys.
