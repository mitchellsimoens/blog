---
title: Wordpress is slow, Ghost is better?
date: "2014-12-17T13:00:03.284Z"
---

The de facto standard of blog software is Wordpress, I'm sure everyone has heard of it. You can do quite a bit with it: install themes, plugins, updates all from the admin GUI. Heck, you can even run whole websites (not just blogs) with it. When the [Healthcare.gov](http://healthcare.gov) site was failing, I can remember reading stories wondering why they didn't use Wordpress.

So I started to wonder, is Wordpress not the right tool for my small little blog? This last year, I was having trouble with my server staying up with Wordpress. First I thought the [DigitalOcean](https://www.digitalocean.com/?refcode=24dc06aa008c) instances I was running were too small so I kept bumping it up. Soon I was running a server with 4GB memory and 2 CPUs thinking maybe I was getting lots of traffic. Admittedly, I don't expect lots of traffic to this blog so that just felt odd to me.

So I setup some free website monitoring from [Monitor.US](http://www.monitor.us) to check performance and to alert me when my server goes down. It was great, I'd get an email when my server went down, I'd go and restart the server. However, some days it was happening several times a day. Another thing I didn't like is the response times reported by the monitoring. I was getting 300-500ms response from US and more than that from Germany to load the page.

I also checked [Google Analytics](http://www.google.com/analytics/) to see my visitor count and it was no where near what I would need to run the server I had running it. It's like having a Lamborghini as your grocery getter, you have the engine to go fast but you are really never going to. So something was up with my Wordpress install. Disabling plugins and such didn't help the stability either. So I could either fix my Wordpress install or go with something else and since I didn't feel like Wordpress was the right tool for my needs, I looked elsewhere and found a new blogging platform that was just starting and getting lots of buzz, [Ghost](https://ghost.org/).

I decided to spin up a new server, install Ghost and work on migrating Wordpress to Ghost. The migration wasn't the best but I eventually got my existing posts migrated over. The one thing that I regret didn't transfer was my Wordpress comments, Disqus just failed to ever want to do that. Once I got the server up and running, I transferred my DNS over to the new server. My response times are normally 100ms in the US and 150ms from Germany now and the server instance is much smaller.

Ghost wasn't around when I first installed Wordpress. There were others but I played it safe with Wordpress. I'm much happier with the simple Ghost blog that promises never to be complex like Wordpress and that's exactly what I want. Before Ghost, I even had thought about creating my own blog software to suit only what I wanted, it wouldn't be too hard to make. So for me and my simple needs, Ghost is perfect! Simple, fast, good :)
