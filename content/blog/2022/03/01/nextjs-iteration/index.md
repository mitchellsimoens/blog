---
title: Next.js Iteration
date: '2022-03-01T17:58:03.682Z'
tags:
  - nextjs
  - tailwind css
---

Once again, I've refactored my blog. I did this back in [2019](/blog/2019/07/26/move-to-github-pages) when I moved to GitHub Pages and Gatsby. I do this once in a while to teach myself something new. This time, I wanted to learn [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/). I gotta say, the DX of these tools is amazing! I don't really use Next to it's potential, right now it's really just spitting out some static HTML pages for my blog but it gives me a little more that I can do.

# Architecture

I've also moved things around. With my last refactor, this site was just a collection of blog posts. Go to `https://mitchellsimoens.com` and you'd see a list of blog articles. These then pointed to URLs such as `https://mitchellsimoens.com/2019/07/26/move-to-github-pages` and you'd see that blog article. Now, I've nested all these blogs into the blog directory so that now I can start having other things in this site. What other things? Not sure.

# Cloudflare

When I moved to GitHub Pages, I had Cloudflare's CDN in front of it. I've loved it. Recently, Cloudflare now has it's own [Pages](https://pages.cloudflare.com/) service. So now, I could move my static HTML pages under one provider. I can open PRs and Cloudflare Pages will stand up a full ephemeral environment automagically. In the PR, I get a nice little link to this environment to easily see. I say environment because they also have integration with [Cloudflare Workers](https://developers.cloudflare.com/pages/platform/functions/) which I'm more and more a fan each time I use them.

Once again, the DX of Cloudflare Pages has been outstanding to work with. I'm starting to see why some companies focusing on DX are really succeeding in today's world.

# Content Updates

With Gatsby, I could support different plugins to parse the Markdown that I write blogs with. With Next, I now can also use MDX. I'm not sure I'm a big fan of MDX but it's something I can easily support so... why not?

One thing I am a fan of, and GitHub recently started [supported](https://github.blog/2022-02-14-include-diagrams-markdown-files-mermaid/) it too, is [mermaid](https://mermaid-js.github.io/mermaid/). So I support that within Markdown here too:

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

# Future

Besides one day eventually refactoring everything into something new, I do plan on playing around more. I don't have specifics yet as my day job and being a father keep me very busy. But I look forward to doing more with Next, Tailwind and Cloudflare.
