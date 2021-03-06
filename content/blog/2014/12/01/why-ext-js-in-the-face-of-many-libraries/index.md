---
title: Why Ext JS in the face of many (micro)libraries
date: "2014-12-01T16:55:03.284Z"
---

First, I want to provide a disclaimer.  I work for Sencha so admittibly I'm a bit biased.  Believe be or not when I say I attempt to have an open mind, I know Ext JS isn't the right tool for every job.  However, for the applications I've had to build, it's been the perfect tool.

I also want to say I'm writing this blog on the tails of reading the blog [The State of JavaScript in 2015](http://www.breck-mckye.com/blog/2014/12/the-state-of-javascript-in-2015/) by Jimmy Breck-McKye.

#### Jimmy's tl;dr

Directly from his blog post, his tl;dr is:

> - The churn rate of front end JavaScript technologies is problematic
> - People are starting to feel burned out and alienated by the pace of change
> - The answer might be to eschew monolithic frameworks in favour of microlibraries
>
>Of course, we’ll see how much of this actually happens in 2015. It’s entirely possible that Angular’s dominance will remain stable despite the wailing and gnashing of teeth – it is, after all, popular for a very good reason. If so, Angular’s position could be secured in an industry looking for standards and stability amongst the turbulence of the last two years. It’s also possible that another monolith might take Angular’s place. An informal combination of React, Flux and Browserify seems the obvious candidate.

So what he is saying in his blog is that the rate of new JS tech is overwhelming developers and you should pick proven microlibs to piece together an application.

#### Churn Rate

I 100% agree that the number of new libraries and such coming out every day (it seems) is overwhelming.  If I was just starting out, I'd be walking out onto an 8 lane interstate with bumper-to-bumper traffic not knowing what to do.  There is a "hot flavor of the month" where one is touted to be the best thing ever but soon dies because no one actually uses it or turns out it's not all that great.

So should people calm down and go with one?  Thinking as a developer, I'm never going to settle for one; I'm never going to stop creating.  In this field, if you stop creating you are irrelevant or soon to be.  You should always challenge and push yourself, that's how you get better.

Read about all the new stuff but take it with a grain of salt.  For actual projects you get paid for; yes, pick a proven library/framework but for hobby or pet-projects have some fun!  I've created countless things that have never seen the light of day but it's all part of me teaching myself something.  Practice makes perfect right?

#### Why Ext JS?

In Jimmy Breck-McKye's blog, he recommends to go with microlibraries to piece together your applications instead of a monolithic framework.  A microlib usually does one thing really good but a monolithic framework does a ton of stuff well.  The problem I have with the piece meal of microlibs is that there is no one code style and the piecing together of things can be fragile and difficult and can often lead to poor performance.

"You just said monolithic frameworks only do stuff well but microlibs do things really good. Why would I settle with well when I can have really good?"  That's a good question and assuming the glue of all the microlibs is optimal and solid, I'd still stay away from it for the projects I've had to work on.

Ext JS does a lot of things really well. Look at it's data and grid packages, I haven't seen anything that compares.  The charting package used to be the best, it'd do the basic things just fine but failed quickly. Have you seen the progression the charts of had in recent releases? Leaps and bounds better, catching up extremely quick.  Notice I am using the term "packages", Ext JS together with Sencha Cmd, Ext JS is really a collection of packages (would be a stretch to call them microlibs) and the core of Ext JS (called sencha-core) is the glue to hold these packages together.  If your application won't be using grids, Cmd will not build it in for you (including the CSS!).  So if you agree with the piecing the microlib mentality, Ext JS is setup for it!  If you want to use a chart library instead of Ext JS' charting package, you can very well do that and with Sencha Cmd your application will not contain Ext JS' charting source and styles.  It's really not that hard to create an Ext JS component to wrap it and translate data from an Ext JS store to a format readable for that chart.

Ext JS has been around since 2006 and it's not going anywhere.  Development is incredibly active, documentation is being written actively, new guides are being authored, the forums are as busy as ever.  I love Ext JS, for what I do, it's exactly the right tool.  Well, in my eyes it's the only tool.  In the face of things coming and going, Ext JS has been going strong.

#### Conclusion

Don't get overwhelmed with all the new fancy, shiney stuff.  For paid gigs, use what's proven.  For fun, use the new stuff or better yet, create the new stuff. Piecing together microlibs to create a stable application may not be a good idea and Ext JS still has a place in this microlib infested world.  You really have to determine what the right tool for the project is.  Ext JS can be overkill but it can be the savior, just depends on your project.

Also, one pet-peeve I have is when a blog doesn't allow comments.  Jimmy's does not.  I personally love hearing people's opinions even when they conflict with mine.  I respect people's opinions, I know I'm not always right.  Let me know what you think, let's discuss!
