---
title: Breakpoint a lost art?
date: "2012-09-07T18:49:03.284Z"
---

Over the last few months helping people on the forums I have come across people who really aren't debugging for themselves. They come on an issue and jump pretty quickly to ask for help. Don't get me wrong, I love to help, this is the reason why I have stayed in my position but you kind of need to be able to debug for yourself. I believe the reason for this is very like how I started in web development:

When I got first started out, I debugged via alert. Meaning I did things like this:

```js
alert(foo.bar[2]);
```

And then realized that I got the mapping wrong and had to change the alert to something else and try again. This was a pain as often to get to where this alert was I'd have to do some user interactions and such. Then I learned of Firebug and loved using the console to log things out. That was so much better as I could then just log out an object or array and inspect it. This helped so much more than the alert did especially since I didn't have to worry about only working with string and numbers, I could now inspect objects and arrays so I could replace that alert with

```js
console.log(foo);
```

and deal with getting into the bar property and inspect that array. Thought that was as good as it got until I found out about breakpoints. Holy cow, that was a game changer for me!

So what is a breakpoint? First we need to look at Javascript. Javascript is a synchronous language meaning things are executed in order. So we can rely that line 3 is going to always execute before line 5:

```js
var foo = {};

someFn();

someFn2();
```

So no matter what in someFn is executed, someFn2 will not be executed until someFn executes. But say we have an error somewhere that the foo object is incorrect but we don't know if the issue is in someFn or someFn2. We can log things to the console and spread them around to see when something is changed. Technically yes, you could do that and find the issue but it's inefficient and messy to spread console statements around and you run the possibility that you may leave them in there which is now a waste of space and IE won't like you anymore.

What do we do then? This is where a breakpoint can save your life. A breakpoint tells the browser to halt everything at the line you set a breakpoint on. The browser will literally stop, interactions with your page will stop, Javascript will stop; nothing will happen. Then you can start to Step Into or Step Over to navigate through the code as it is being executed meanwhile you can keep an eye on the different variables as you are going through. Since our foo object is being changed incorrectly somewhere, this is exactly what we need: walk through the code and watch the foo object change.

Wait, what is Step Into and Step Over? Picture yourself hiking and you come up on a huge rock that is in your way. You have two choices you can either climb over it or you can walk around it bypassing the rock. If you choose to climb over it you are going over the rock little by little with each foot hold, this is like Step Into where you are going to go into more code and go little by little. If you choose to walk around it you are bypassing the rock, this is like Step Over where you can skip a function call so you don't have to deal with the code within that function. So if you set a break point on line 1 where we defined the foo object and you get to line 3 where someFn is going to be executed, you can Step Into or Step Over... either go into the someFn as it is executing and see what is happening within that function (Step Into) or bypass the code that is within the function (Step Over). What happens when you are climbing up the rock but you realize this isn't where you need to be and need to get off the rock right now and bypass it? You can Step Out. So if you stepped into someFn but you realize that the code within it isn't where the issue is, you can Step Out of the function and go on to someFn2. Of course at any point you want to give up you can always Play which lets your browser execute the rest of the code until all code has been executed or it comes across another breakpoint. Often times when I am sending an ajax call and I stepped into code where the ajax call is going to send, I need to set another breakpoint in the callback and press Play so that when the ajax call returns the browser will once again halt it's executing so I can continue debugging.

Now you can see that you can walk your way through code without needing to debug via alert or console.log which is a much much better way of debugging code. But, how do you set a breakpoint? Two ways. You can type a debugger statement which tells your browser to stop there like:

```js
var foo = {};

debugger;
someFn();

someFn2();
```

And the browser will stop at line 2 and wait for your decision to continue. However, like the issues with console.log, debugger statements are messy and IE won't like you. I often create hooks to not allow version control to commit changes if it finds any. Or you can open the dev tools of your browser and go into the file you need to set a breakpoint and click on the row number to set a breakpoint. That's it! Now you can set breakpoints and walk through your code to find any issues.

Don't forget to remove your breakpoints as your browser will remember them (for file names that are the same, Ext JS and ST add _dc param not allowing the breakpoints to stick). To do this either click on the line number to remove the breakpoint or there is a section for breakpoints on the right-hand side of the dev tools. YOu can disable breakpoints in the breakpoints section as well to keep them but the browser won't stop.
