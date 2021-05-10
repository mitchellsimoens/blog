---
title: Full featured or lightweight, cannot have both
date: "2016-04-11T15:12:03.284Z"
---

Earlier today, I noticed a conversation about how [React](https://facebook.github.io/react/) was "far more flexible when it comes to customizing" than [Ext JS](https://www.sencha.com/products/extjs/).

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/dmitrybrin">@dmitrybrin</a> It&#39;s component-based like Ext JS but far more flexible when it comes to customizing. Also really fast.</p>&mdash; Arthur Kay (@arthurakay) <a href="https://twitter.com/arthurakay/status/719477208012578817">April 11, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

So being an Ext JS dev, I disagree with this statement except the last sentence, React is really fast no doubt. React being far more flexible is very debatable. Yes, with React you are the one creating the DOM whereas Ext JS' produced DOM can be bloated a bit and if you're writing your own library of widgets to suit your application you can create it in a way that is best for your application. However, comparing React to Ext JS is like comparing a go-kart to a semi truck. React doesn't do that much, it's just the view layer that you can build on top of whereas Ext JS is a full framework and gives a huge set of widgets out-of-the-box. Sure, you can drive a go-kart but you can't haul things like a semi can.

Let's be honest, having a full framework like Ext JS has it's pros and cons. The pros are self evident (huge set of widgets, opinionated code structure, etc) however there are cons like the produced DOM. That DOM may be bloated for your use but when you flex the full functionality of the framework, that "bloat" isn't actually bloat. I bet you don't use every feature of Microsoft Word but still use it (and yes, I'm sure still holds true for OpenOffice etc). But with Ext JS, you don't have to build and maintain the set of widgets which can quickly get expensive and risky of developer lock-in and supporting all the features it does and configurations developers need it to support for the vast difference of applications out there, that "bloat" is needed. And I'll be honest again, I'm sure not all the bloat is necessary, I'm sure there are opportunities for improvement but it wouldn't be night and day I'm sure.

It really shouldn't be React vs Ext JS as either will win for what either attempts to fulfill. Each project should determine which thing it should use. You cannot say:

> I want to have all these features built-in but still be lightweight.

You cannot have both. You cannot make a truck be as fast as a sports car but still be as lightweight as the car. I know, I'm analogy full today.
