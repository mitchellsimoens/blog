---
title: My Move to GitHub Pages
date: "2019-07-26T17:58:03.682Z"
---

I've had my personal blog since 2011, the year my career sort of took off. I self hosted [Wordpress][wordpress] as it's the de facto blog platform (at least at the time). There were lots of plugins, lots of blogs saying how to use it. It just worked.

At the end of 2014, I moved from Wordpress to [Ghost][ghost] and wrote a [blog](/2019/07/26/move-to-github-pages/) saying why I did it. There was some help migrating between the two and I was all about using [Node.js][nodejs]. However, the version I was on meant upgrading was a pain and eventually I stopped upgrading Ghost. I was stuck on an old version (like v0.11.x) and so I decided to rethink my blog. I want to blog more so I wanted something that felt good to write on, a blogging platform definitely shouldn't get in my way.

With Ghost, I was using a Let's Encrypt SSL certificate and I was too lazy to setup a cron to get a new certificate so I'd ssl into my serer and manually update the certificate. Manually updating the certificate was annoying but not annoying enough to take the minute to setup that cron... crazy!

## What I Was Wanting (Technically)

It's no surprise that I've been getting into [React][reactjs] lately and wanted to move to using a CDN and static pages. No more having a platform that had to do database calls, unnecessary for what my blog is. So I decided to give [Gatsby][gatsbyjs] a look. I write in Markdown, I can write components using React, and the pages are built and those static pages can be deployed. Even though I wasn't paying [DigitalOcean][digitalocean] much monthly, my static site could be deployed to [GitHub Pages][githubpages] and I could put [Cloudflare][cloudflare] in front of it.

Basically, what I was deciding was perfect for what I wanted for this blog and saves me some money.

## DigitalOcean

By no means was I unhappy with DO. In fact, I love the company. I love their tutorials. I love their new control panel. I love the new features they've been rolling out. With my Ghost blog, I've had no problems. So moving away from DO was only because I didn't need to have a server always running for a static site. They do have a [newer service](https://blog.digitalocean.com/introducing-spaces-object-storage/) called [Spaces](https://www.digitalocean.com/products/spaces/) where I could host a static site with a CDN so I could have stayed with them... except that it does cost and what I could get from GitHub Pages, I don't need to pay.

## Cloudflare

Cloudflare is an amazing company with amazing products. For me, it's a huge CDN, gives me lots of controls over what is cached and what I can invalidate, a full API (if I need it) and for my blog it's free. Cloudflare would also manage the SSL certificate for me so no laziness on my part!

## GitHub Pages and CircleCI

I absolutely love how simple GitHub Pages is as a concept. Basically, your files in a repo is hosted for you... easily. I'm all about setting up CI/CD pipelines for everything so all I have to do is write some content and push to the repo. I have [CircleCI][circleci] automatically build and deploy for me. Building is simple with Gatsby and deploying is done with [gh-pages](https://www.npmjs.com/package/gh-pages). It's just all easy and free and automated.

## Gatsby

This is the only thing I haven't used before. The rest of the stack is all familiar to me. And what I have with Gatsby is a starter, I still need to do some things like styling but I wanted to get something deployed. I made sure to keep the URLs the same so any linkage from external sources plus SEO is persisted.

Gatsby does have a plugin to get blogs from Ghost but since I was on such an old version and the API was in beta with no tokens, didn't look like the plugin was going to work. So I spent a couple hours, copy and pasting from my online Ghost to local Markdown files... manually. But now that I have files locally and if I move to something else, I can at least easily script something to migrate. I was so tired after the manual "downloading" and I'm sure there was still ways to do this without me manually doing it but some times the long way isn't actually the long way. Could I have figured out how to do it, write scripts myself or whatever was going to be needed within the couple hours it took me to do it manually? I wagered no and I feel like it was the right decision.

With Ghost, I had to host images in an external service and tbh I don't remember what that was. With Gatsby, I can link to it in my Markdown and since GitHub is my host my images are right there, nothing else is needed.

The one thing that is bothering me is the index page shows all the blogs in one list. I want to get pagination going and Gatsby does have plugins for this but wanted to go ahead and get this going.

## Conclusion

My new stack, while not finished, is just easier for me to work with... and free. I will continue to update this blog to get it styled and I'll be trying to get back to actively blogging. Best way to let me know what you'd like me to blog is via [Twitter](https://twitter.com/LikelyMitch)!

[circleci]: https://circleci.com/
[cloudflare]: https://www.cloudflare.com/
[digitalocean]: https://www.digitalocean.com/
[gatsbyjs]: https://www.gatsbyjs.org/
[ghost]: https://ghost.org/
[githubpages]: https://pages.github.com/
[nodejs]: https://nodejs.org/
[reactjs]: https://reactjs.org/
[wordpress]: https://wordpress.org/
