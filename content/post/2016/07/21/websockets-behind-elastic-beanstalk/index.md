---
title: WebSockets Behind Elastic Beanstalk
date: "2016-07-21T19:02:03.284Z"
---

Lately, I've been working on a few projects and I've been using [Ext JS](https://www.sencha.com/products/extjs/) served with [Node.js](https://nodejs.org/). We use [AWS](https://aws.amazon.com/) as our ISP using [EB](https://aws.amazon.com/elasticbeanstalk/) with [Docker](https://www.docker.com/). Things are working very well for us but one of the projects I've been working on makes use of [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) where I use [socket.io](http://socket.io). Locally things are going great but one thing that I know is that EB doesn't specifically like WebSockets. Well, it's not that it doesn't like WebSockets, it's more that the default config doesn't allow for it.

## Setup

First things first, let's create a simple Node.js app that will allow us to use WebSockets and push events to all connected sockets. Since I don't want to step through code in this blog, I've created a [GitHub repo](https://github.com/mitchellsimoens/Simple-WebSocket). I also assume you have the [eb cli](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html) installed.

The eb cli wants to use git so you should have a git repo all setup. I always create git repos and commit code often to preserve a history and ease of rolling back code. So I assume that you have the code from my repo brought down and using your own git repo.

## Initializing the eb project

In your local git clone, you need to execute [`eb init`](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb3-init.html). I like to add the `-i` flag to force getting asked everything but it's up to you. You'll be asked what region you want to be deployed to, what application (you can create an app also), what type of application (select Docker) and version 1.11.1, and any SSH keys.

Once you have your eb project initialized, you can create an environment. For this, you should use the [`eb create [env name]`](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb3-create.html) command. This should take a bit of time to setup everything and will also deploy your committed code.

Once done, you can load your project in the browser. If you don't know the URL then you can use the [`eb open`](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb3-open.html) command which will get the URL and open in your default browser. You should see some text and a button but if you were to check the dev tools you'll notice the WebSocket handshake failed with a 400 status code. This is where I said EB doesn't like WebSockets.

## Configuring nginx

For those that do not know, EB uses [nginx](https://www.nginx.com/) as a proxy, basically nginx receives the request and determines what to do with it. We need to configure it to support WebSocket. I'm already checked in [`.ebextensions/files.config`](https://github.com/mitchellsimoens/Simple-WebSocket/blob/master/.ebextensions/files.config) in my GitHub repo so what you already deployed has nginx configured. Also note that during my initial investigations I saw many different ways, this is the way I found that worked for me based on what an AWS team member originally suggested on their [forums](https://forums.aws.amazon.com/thread.jspa?messageID=729795) but without the shell script. So in the last 2 years, there may be a better way to configure nginx but anyway, nginx can now know how to handle WebSockets.

Not all of the settings should be needed, the important bits are:

    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

## Configuring EB

So nginx is configured and we still got the 400 status code on the handshake so what gives? At this point, I wasn't 100% sure I'd figure this out. However, searching the web I kept seeing something about using TCP connections instead of HTTP. So I gave it a shot and all of a sudden everything started working! Using two browsers (Chrome and Firefox), I was able to click the button and each browser get the event pushed to it and I could see the WebSocket upgrade request.

So how do we setup EB to use TCP connections? Go into the [EB dashboard](https://us-west-2.console.aws.amazon.com/elasticbeanstalk/home) and click on the environment for your app. This is where it shows some recent events, the health and other quick info. On the left, there is a vertical list and one of them is `Configuration` which you should click on. If you scroll down and find the Load Balancing box, click the edit tool in the upper-right corner of that box to configure the load balancer. In this form, the second field should be labeled `Protocol` and have two options: HTTP (which should be selected) and TCP. Yup, you guessed it, select TCP and scroll down and save. Go back to the Dashboard for your app's environment and it should be deploying the new configuration.

Once done, you should be all setup. Go to the url of your app and everything should be working!
