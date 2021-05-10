---
title: Sencha Making The Same Mistakes
date: "2018-06-18T15:14:03.284Z"
---

Let's get something out before I start. Yes, I am an ex-employee of Sencha. No, I was not laid off (I left on principle seeing the knowledge of the company and friends get laid off). Yes, I have been critical of Sencha since the acquisition but this is something I've been doing internally for years so nothing new there.

## Quick History

One of the necessary evils of the early 2000s was that JavaScript was really just a kid. You couldn't do any real OOP like many languages could do for years. I come from a PHP background and had been using classes for a long time, I liked that type of programming. When I started dealing with JavaScript I had to do functional programming which worked and you could do what you need to but I always enjoyed my classes in PHP. It just felt structured to me.

When I found Ext JS, not only did it have some great UI widgets but it had a form of OOP, it had a class system. Under the hood, all it was doing was using `function` with the `new` keyword and `prototype` to get that inheritance. So it was kind of a workaround to no classes to create a "manual" class system if you will. I love it and devoted the next decade to it!

## Old Mistakes

With the renewed interest in furthering JavaScript the language, we now have classes. We have a lot of new things that Ext JS did manually (and in early days even applied onto native prototypes, thankfully we got away from that!). When we created the ExtReact, it was just an adapter layer. ExtReact is not a true React component library, it's just a way to let Ext JS render a component somewhere in your React application.

Ext JS isn't alone in this but when React and other came onto the scene, Sencha was not prepared for it. We were fixing massive issues that Ext JS 4 brought. We were caught with our pants down, we were simply standing still while the entire ecosystem upended and ran right past us. To catch up, we needed to do more than incremental updates or else Ext JS was going to be destined for the legacy bin.

You can look at things like Google Trends but in my own experience, in 2012 my primary job was helping people on Sencha's forum and at my busiest month, I did almost 4,000 posts in a single month just trying to keep up. The community was vibrant and passionate. Look at the forum these days and you will see something vastly different. I wouldn't be surprised if there wasn't 4,000 posts total in a month let alone from a single person.

## A Fix

One potential fix would have been to create true React (and other) component libraries. Let React do what React does best, render fast. Ext JS doesn't do optimizations that things like virtual DOM do. Sure, there are some optimizations but that's no where near what virtual DOM would get you, it's more a little attempt to batch or delay certain things but it can also require the developer to code correctly whereas React basically just handles it for you. The only time you need to code a certain way is to do some advanced fine-tuning since not everything can know exactly what you want to do and how to handle it. Luckily, there are vibrant communities around React and other new libraries/frameworks.

But doing a massive restructure of Ext JS would be a major undertaking for a monolithic company like Sencha which made certain execs not buy it. They have a board to report to so I can understand the short sighted sense of those decisions but there are also ways to piece meal a lot of it. Maybe it was because a sale was more preferred so revenue and margins were looked at differently than if a company was going to invest in it's own future.

## Today's Mistake

I saw a [blog](https://motivationalcodepro.com/sencha-npm-tooling-with-ext-js-6-6/) about some new npm tooling and while you have to be a special MVP to get access today, there were some code snippets the blog showed. And once again, instead of using tried and battle-tested existing tools that have active communities they chose to build their own thing. It looks to be built from scratch so a perfect time to do it using existing tools.

One example showed generating an application. First, some constructive feedback for the blog author is that showing a long command in multilines would help readability as the command is over 300 characters long (maybe it was just a command that is missing the special code formatting so it's all thrown together). Here is my best guess at the nested nature of the command:

```shell
ext-gen \
  app \
    –template universalclassicmodern \
    –classictheme theme-graphite \
    –moderntheme theme-material \
    –name CoolUniversalAppext-gen \
  app–template classicdesktop \
    –classictheme theme-graphite \
    –name CoolDesktopAppext-gen \
  app \
      –interactiveext-gen \
  app \
    -a \
    —classictheme theme-graphite \
    -n ClassicAppext-gen \
  app \
    -a \
    -t moderndesktop \
    -n ModernApp
```

So there is an `ext-gen` tool that likely downloads (and maybe caches to local) templates from a GitHub repo (since Sencha uses GitHub with lots of private repos) or maybe from the customer only npm server. Just feels like Yeoman or the like could have done this. Honestly, this doesn't give you much as it's a command you execute at the start of a project and never against for that project so whatever.

Another example is building an app where the generated app likely has some predefined scripts in it's `package.json` that you can run things like `npm run build-desktop-testing`. Unfortunately the blog doesn't show what is being used here as the script could even use Cmd:

```json
"build-desktop-testing": "sencha app build testing"
```

Or it could use a new tool or just the Cmd NodeJS wrapper. If it's just a Node wrapper that executes Cmd commands for you then it's no better than using Cmd by itself except you get to run Cmd commands a different way. It's like using promises over callbacks, it's still just a callback-hell just different and maybe prettier. If it's a new tool altogether, I'll be pleasantly shocked and will attempt to be the first to congratulate them but it's still wouldn't be a perfect solution. It's still reliant on Ext JS development and with Ext JS being on it's own tiny island not using the better libraries, the tooling can only do so much. For example, I talked about ExtReact not being a true React library and neither is it's build tool. There is a Webpack plugin but it still uses Cmd under the hood but at least it allows you to use Webpack and not have to worry about Cmd. It at least tried to use what people want to use and not forcing a black box tool.

## Suggestions

Ok, so I outlines some issues I see coming down the pipeline. If I were to have a wish list, I would love Sencha to follow Ionic's path with web components. Ok, I just contradicted myself as going with web components wouldn't make Ext JS a true React library like I said Ext JS should be but this is a wish list and this would be my top wish list item... one code base could work with or without another library but could seamlessly work with any library without any adapters like ExtReact (and the future ExtAngular and others) will use. But that won't happen, however, it could have an adapter layer to get you web components without separate adapters for each new library you want to support, in fact I was playing around one day with this [fiddle](https://fiddle.sencha.com/#fiddle/1u8k) to prove a point internally.

Past web components, properly abstract the rendering of components so that you could use React or alike as the rendering layer of a component. That means Ext JS would sit on-top of other libraries like React that can handle the DOM much more efficiently.

Once you do some things with Ext JS, you can then use tooling that people want to use. You gotta stop wasting time getting new tools and force them on people. That's not what the field wants these days. They want to use what they know so if someone loves Webpack or Rollup, enable the devs instead of forcing something on them. You'll likely turn them off of everything including Ext JS.

Should I say something about going with modern toolkit at the very least here? If you do none of the above, modern toolkit has much more promise than classic toolkit. Don't walk backwards, you'll never go forward.

## Conclusion

Yes, I have been critical of Sencha and Idera but it's nothing I haven't been doing internally for years. These things I say here have been the same theme of what I've said for years internally. I firmly believe if you aren't willing to do major surgery (or figure out how to do it in phases) then you will get left behind in this field. Every major framework/library that has rose to the top has fallen. Some like Ionic are trying to keep innovating to keep up and even push the tech forward (come on web components, you've been a promise for years but we are so close!). Some like Dojo have even gone under the knife to try and stay relevant. Even the mighty React doesn't have a promised future. Ext JS is the tech of last decade, not the current and definitely not the future. If you want Ext JS to be around 10 years from now then you have to make some wild decisions and get experts to deliver on those.
