---
title: No dependencies, no drama!
date: "2016-03-24T14:08:03.284Z"
---

Open source is great, except when it's not. If you were under a rock this week, some big projects broke due to a module being removed (left-pad). So if you were using Babel or React, it broke if you attempted to `npm install` it. You can read about it [here](http://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos/) and [here](http://www.haneycodes.net/npm-left-pad-have-we-forgotten-how-to-program/). Now of course this will be incredibly simple to fix as the required code is extremely small but it also shows that open source comes with it's risks.

I personally think this whole fiasco could have been handled much better, when you use a piece of code, you get into a sort of contract with the maintainer. As an author of a few repos on GitHub that some people do use, I attempted to work with people to make what I made work better for them (implement features, change features) but life got busy and I simply didn't have time to maintain it. It's not that I didn't have intention to keep maintaining it, I simple couldn't dedicate any time to it so as a maintainer, I failed the open source community and therefore broke the contract where they were using my code and expected it to work.

The drama this week was much more than simply not having enough time to maintain left-pad but since this blog is geared towards Sencha products, I'll highlight one of the big benefits of using something from Sencha. While the whole web dev community is hot on building their own framework made up of many different libraries, Sencha provides a framework that is setup to work together. So if you want components and MVC/MVVM, Sencha works to have it work out of the box. Want a data package with charting? Sencha has it all working and they maintain it. So instead of mixing React with Bootstrap and Highcharts and so on, you just need to download Ext JS and start working. If one of the libraries in your DIY framework is updated and you want to use it, you have to update it and make sure all the different pieces of your DIY framework work with that update. Whereas with Ext JS, when an update is released you just need to replace Ext JS.

We all know that any software update may come with API changes and Sencha has been releasing [API Diffs](http://docs.sencha.com/extjs/6.0/api_diffs/601_classic_diff.html) now and even really good upgrade guides for major version upgrade like [this](http://docs.sencha.com/extjs/6.0/upgrades_migrations/extjs_upgrade_guide.html). Sencha has been putting a lot of effort into documenting any API changes and keeping backwards compatibility where possible.

So in the open source vs commercial company debate, I won't say which is better. What I will say, commercial still has a place these days. Sure commercial isn't always the cheapest but when you look at what you get, it may actually be cheaper in the long run. What you get with Ext JS can outweigh the cost of developing your DIY framework, maintaining it and training new people on it.