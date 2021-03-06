---
title: What I miss at Sencha
date: "2017-10-30T20:55:03.284Z"
---

It's been a little bit since I [left Sencha](https://mitchellsimoens.com/next-chapter-in-2017/) and while working here at [Modus](https://moduscreate.com) has been great so far, there is still something I miss about Sencha. I worked at Sencha for almost 7 years and I did quite a lot of stuff during those years but there is one thing that I can say I miss...

[Sencha Fiddle](https://fiddle.sencha.com/) was something that was never officially announced but people just started using it. It was an application that I **owned, maintained and furthered**. I was able to do things with it (both front and back ends) that was able to push me, make me learn new things and truly enjoy. If I had it my way, I have solely worked on it but of course it didn't make money so I had to earn my salary other ways. Fiddle was also developed to streamline our internal processes but had obvious external usages such as support sharing code with a customer or someone helping someone else on the forums.

## Fiddle 1

In version 1, it was an [Ext JS](https://www.sencha.com/products/extjs/) 4 application that was served with PHP/Apache. At this time, there were many different departments within Sencha that was wanting to use Fiddle but for their own purposes so I architected it so features that were not part of the core app were [Sencha Cmd](https://www.sencha.com/products/sencha-cmd/) packages. This way, I could produce separate builds for these separate installations and include only the features they wanted. This seemed great and having Fiddle accepted everywhere was great. For example, training has it's own portal and code challenges that have to be run and of course that uses Ext JS so Fiddle was a no-brainer idea to be recycled.

## Fiddle 1 Issues

Fiddle 1 was a big success both internally and externally even without being officially announced. In fact, the first time it was seen was Don Griffin using it at SenchaCon 2013 in Orlando where we "launched" it. But, with every 1.0 release, there are certain things that are going to come up as not working or could be improved and you should always be open to some criticism (hopefully it's always constructive).

First up was the infrastructure. When Fiddle 1 was first released, the IT department was being remade. I can remember even the main webstack going down every time a newsletter was released because of all the extra traffic (I jokingly said the newsletter started DDoS attacks). Mike Estes took over the IT department and together (mainly him but I tagged along and learned some DevOps along the way) we turned to AWS Elastic Beanstalk to have an infrastructure that could scale with the demand. Only time I've seen things go down is when AWS has gone down or I checked in code that threw server errors but that's not the infrastructure's fault.

The way Fiddle ran it's code was all local, it basically threw all the source together and ran it. This worked unless you did some common things that made it not work. And if you wanted to load data (which you often want with a grid), the mock data requests magically happened but there was no way for you to see it.

The layout of Fiddle wasn't very pleasing and I had many people that outright told me they hated it. I get it, I'm an engineer and engineers aren't always the best at design. I focused on what worked, not too much how it should work.

## Fixing Issues

I could have let the new infrastructure run the existing PHP codebase but at the same time I was working on a new support portal that was also using a PHP codebase. There were obvious common things so I decided to take a large leap and trash the existing code and develop a new [Node.js](https://nodejs.org/en/) codebase since at the time Node was really starting to get a lot of traction (wasn't the 0.x days now!). Fiddle and the portal was now hosted by a Node server each but that was more used as an http server and for fiddle some extra things we'll get to in a bit. The actual CRUD and login was powered by an api server. This api server opened up a lot of possibilities. I can say, all the Node servers vs the PHP servers, the Node servers are much more performant than the PHP servers and saved the company some money (except the old PHP servers are still running to host some legacy apps). Plus, my node modules were built with all the new ES6+ syntax to allow me to keep up to date on it too.

Fiddle 2 decided to refactor the way code ran and used **real** network requests. This changed everything! Now your xhr requests can be inspected in the browser dev tools, you can require classes and other things could run arbitrary code on Fiddle. Like the training portal I mentioned earlier, the api documentation uses Fiddle to run the code snippets. I did't have to have separate Fiddle installations in order for other apps use Fiddle anymore which is definitely a win on many levels!

Luckily, going through some designs with the portal allowed me to create a common Cmd theme that could be shared among my projects, Fiddle being the first one. The design process with the portal was incredibly frustrating. The first design was said to be the future design Sencha tools were going to use. Then, I started seeing other tools using other designs, ok. I went through many complete redesigns that delayed the portal's release for over a year and there are people still not happy with it. These weren't just simple color changes, complete layout changes which take time to implement and gives opportunities for me to be put on other projects that needed help. Fiddle 2 got wrapped up in the design as it also changed in a dot release. But, the layout of things was much better and was a bit more familiar to any modern editor users.

## Pre 2.0

I was working on a few things that I actually scrapped.

First was a mock data inspector which was basically what you have in the browser dev tools but worked with the client mock data feature. This was removed since I moved to using real network requests but I was very excited about this! Here is a preview of what it was:

<iframe src="https://player.vimeo.com/video/121247419" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

I also had a form of Sencha Test before Sencha Test was a thing. It could record the user interactions and play them back while running unit tests also. Here is a simple test of it:

<iframe src="https://player.vimeo.com/video/121037209" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## New Stuff

There were many things that I did just because I wanted to. I mean, I was a major user of the tool also and there were things I wanted that others wouldn't want. For example, did you know in the settings you can control where code was run? You can have it open a new tab or window and run code within it which allowed for device emulation and multiple monitor support (if you know me and my workstation, multiple monitor support is important). In fact, this affected how code was run also. When you press *Run* in Fiddle, it's the same exact thing as when the code snippets is run in the api docs! Any site can run code against Fiddle, I don't block non sencha.com requests iirc.

Since Fiddle uses real network requests, you can actually load code from one fiddle in another fiddle. I've had a base fiddle that had common code and just loaded those like I would in an Ext JS in other fiddles. This was more of a byproduct of how code is now running but it turned out to be handy.

## What Could Have Been

I had many future things I felt Fiddle could do that was prevented after my exit. The one thing that **could** have had a huge impact on the Ext JS ecosystem was what I called **FU** (**Fiddle University** with a fun acronym). Knowing that learning Ext JS at any stage is hard. The api docs and guides were much better but there wasn't an in-depth, guided training. I also felt Sencha's official training wasn't the most comprehensive, advanced labeled courses weren't very advanced but I have only attended one when I was there to help the students before a SenchaCon. So I was going to create a guided lesson plan that had code challenges and if management liked it, could have had videos that paused while a code challenge was waiting to be passed. You would write code by hand, run it and when ready submit it and there would have been different tests that would be run to provide a score. Get a good enough score and you could continue. I could have seen this provide huge value to the community to help new people to even more seasoned developers. And yes, I know, I would have likely killed training with it but it's not like training bringing in a ton of money.

Not that I was happy but there was a brand new theme that I believe Sencha Themer was the first to use that business wanted Fiddle to use. However, it wasn't created in a way that was sharable for other apps to use so I had to start my own. Then I found out the designer had started one and Sencha Test also had one. You can imagine my immediate frustration seeing four different people working on the same thing but this was common around Sencha too. There have been a few times where I thought, "I see this thing will be used in different things, let's create a reusable package/module!" but then get friction since people love doing things their way, but I digress. So I refactored Fiddle to use my new theme and it looks pretty good, I like it better than the overly white one. If you'd like to see it, looks like it's still up on the [test server](https://test-fiddle.sencha.com/). But I still heard bad things about it and it's hard to please everyone. There were a couple that likes a light theme but some like a dark theme and more and more apps allow you to pick one, I was going to work on that!

Depending on what else was going on, I was also going to migrate to use the modern toolkit which I thought would be great to say since Sencha was wanting to push the modern toolkit on people. This could also be an opportunity to clean up the code as there is always a better way and I'm sure there are opportunities there.

There was code in Fiddle that allowed you to write code on a computer but when you press *Run*, it would run locally (which could be disabled) but it would also run on remote browsers at the same time. I thought I had a video showing it but I had an iPhone, an Android tablet, iOS Simulator, Internet Explorer on a laptop among other browsers on my MacBook and the Windows laptop connected to my Fiddle session I had with Chrome on my MacBook. Press *Run* in Chrome and all connected browsers started running all at once. This was pretty cool and worked great locally except I ran into an issue when deployed as since I was in a load balanced environment, I had sessions saved one one server which you can imagine didn't work. So I made a `TODO` to circle back to use something like Redis where I could pub/sub or use some other messaging service. It really was pretty cool to see everything reload!

Fiddle has always been the tool that pushed the Ext JS Router and since I was also the developer maintaining the router, I was going to finally embark on a new, declarative router that could have changed Ext JS development. Big words but I had lots of ideas that I felt could have made Ext JS better. Plus, we were on the verge of working on Ext JS 7 and having the router much more integrated throughout Ext JS to make things just work with minimal configuration would have been a perfect opportunity. And Fiddle could have been the tool to keep on testing these ideas in production (each version of fiddle has lots of overrides to add features to the router, it's not using the out of the box router).

Quickly, some others were going to be an example redux (Fiddle could replace [examples.sencha.com](http://examples.sencha.com)), named fiddles (so you could go to fiddle.sencha.com/#basic-grid and it'd load the associated fiddle) and I was going to get the KitchenSink to be built from individual fiddles.

## Conclusion

Ok, a trip down memory lane was fun. Fiddle allowed me to push myself to build a tool used by many peers to make their work lives better. I can remember my first Monday as a non-Sencha employee starting work was odd and it wasn't just because I was no longer at a company I had spent a ton of hours at... it was because of Fiddle. I loved working on Fiddle, I loved dreaming about what Fiddle could be or the different ways I could do things. There are projects that you do and kick ass on, but then there are projects that you absolutely love. If there was one project I defined myself while at Sencha, it was Fiddle. Not having access to the code so I could keep working on it to make it better makes me sad. But, like anything in life, there will always be another project to fall in love with.
