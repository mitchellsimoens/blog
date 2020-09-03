---
title: NPM Install
date: "2020-09-03T17:58:03.682Z"
---

In the world of [Node.js](https://nodejs.org/), you're gonna be using the [npm cli tool](https://www.npmjs.com/). You're
also going to find lots of blogs telling you how to do things but I constantly find one piece of info lacking and
surprisingly, this is about installing node modules in a project. Well, I guess there are two things that are related
and one sort of makes the other moot.

## Version Pinning

One thing I always try to get people to do is pin versions of their dependencies in `package.json`. What pinning does is
makes anyone installing the dependencies always have the same version. By default, npm adds the `~` prefix to the
versions so if you were to `npm i @mitchellsimoens/versionator` it will use `^1.0.5` as the version. This means, if
1.0.6 or 1.1.0 is released, someone could have a different version that has been untested and may have features not
present in older versions. This can add confusion but even worse, this can add risk (even for
[attacks](https://eslint.org/blog/2018/07/postmortem-for-malicious-package-publishes)). The `~` prefix is a little better
but the same issues can still occur only it locks down the possibilities to patch versions not minor versions.

So what's the big deal? In today's world, we have to admit we freely install node modules from anyone. This means we
put a lot of faith in people and while I would hope people have great intentions, some don't and even great intentions
aren't perfect. Also, not everyone follows semver strictly so a minor version maybe should have been a major.

You're best to protect yourself as best as you can by pinning versions. I even change the default to always pin via
npm's config:

```sh
npm config set save-exact=true
```

I'll be honest though, this is a bit of a false sense of security as it's not 100% but it's at least some form of
prevention. Someone I work with found this [blog post](https://docs.renovatebot.com/dependency-pinning/) that does a
great job at some pros/cons of version pinning so I definitely think that is worth a read.

## The Right Command

The other thing sort of makes version pinning moot. Say you clone a repo that contains a node project, what do you do
first? I bet you run `npm install` (or `npm i`). You just used the wrong command. Instead, and hopefully everyone checks
in the `package-lock.json` into VCS, you should get into the habit of using `npm ci`. What this command does is installs
what is in `package-lock.json`. If you used `npm install`, npm will go and try to find the latest version of your
dependencies (and their dependencies) that match the version and version prefixes come into play then. Npm will then
update the `package-lock.json` with these updated versions and you just introduced risk.

In fact, I ran a quick poll of some colleagues and 10 out of 11 (the poll got pushed way off screen with all the
replies) used `npm install` and some didn't even know about `npm ci`. The one person is someone I work with a lot so
wasn't a surprise there. This is also why I will still pin versions to get at least some sort of protection from those
not using `npm ci` when they should.

If you are adding a dependency, then use `npm install` since that will just add the dependency(ies) and not upgrade all
existing dependencies. If you are wanting to install all dependencies then use `npm ci` and protect yourself.
