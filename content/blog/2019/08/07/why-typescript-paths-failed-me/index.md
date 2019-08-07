---
title: Why TypeScript Paths Failed Me
date: '2019-08-07T19:08:03.682Z'
---

This year has really been the year of [Typescript][typeScript] for me, I've been using is anywhere and everywhere I can. While there are some annoyances, I love it and I didn't think I would. At the same time, I've been using React more and more and on larger projects, using [aliases](https://webpack.js.org/configuration/resolve/#resolvealias) that [Webpack][webpack] provides has been great. When importing files, relative paths could get ugly but with aliases they can be relative to your `src` directory. But when working with Typescript, I didn't have this feature... so I thought.

## Enter paths

I don't remember where I saw it first but I saw that TypeScript has a [paths](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping) feature. Ok, so this looked very similar to Webpack aliases and in development, it worked. Now instead of this code:

```typescript
import Foo from '../../../components/Foo';
```

I could write:

```typescript
import Foo from '@/components/Foo';
```

And all I had to do is have two things in my `compilerOptions` object in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

This worked exactly like I wanted... in development.

## First Issue

I call out that it worked in development because I actually published a module to [npm][npm] and it simply didn't work. I'd get an error like:

> Error: Cannot find module '@/components/Foo'

But wait... this code is compiled. Why is it trying to use the path I have in my `import` and not a relative path that TypeScript found? I feel like most people first using paths hit this and the reason is, it's not meant to be analogous to Webpack's alias. TypeScript paths are intended to be used to resolve type information used by various loaders, not resolve just anything. There are a couple GitHub issues for this, here is a link to the first explanation that made sense to me: [#10866](https://github.com/Microsoft/TypeScript/issues/10866#issuecomment-246789510). There is lots of back and forth on these GitHub issues but it sounds like TypeScript isn't going to change things to work the way we want in this case.

## Solution

Not wanting to give up, I found a way around it. I found a [plugin](https://www.npmjs.com/package/@zerollup/ts-transform-paths) that during build, it will rewrite these paths to relative paths so CommonJS style requiring (like [Node.js][node] uses) will work. You can then edit your `tsconfig.json` to use this plugin:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "plugins": [
      {
        "transform": "@zerollup/ts-transform-paths"
      }
    ]
  }
}
```

Run a build, test the compiled code and you'll still see the same "Cannot find module" error. The reason for this is TypeScript **doesn't** support plugins. So why did I say to use plugins? Instead of using TypeScript directly, you have to use a different project: [ttypescript](https://github.com/cevek/ttypescript). So instead of using `tsc` command, you use `ttsc`. Now run a build and everything should work! Fantastic!

Even though I hate that we have to use ttypescript and even though we are using something in a way it wasn't intended, it works. At least for now. I do hope TypeScript supports plugins eventually. Ok, so it works... or wait, does it?

## Second Issue

I felt like I was on an emotional rollercoaster. I published a version that used paths and it didn't work. I worked around it using other libs and it worked... but then it didn't. I moved a project to a [monorepo](https://en.wikipedia.org/wiki/Monorepo) using [Lerna][lerna] (and [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/)). Each package had it's own `tsconfig.json` that extended from a base `tsconfig.json` and I was using paths in the individual packages. However, when I wanted to import from another package in the monorepo, it couldn't find the other package. The reason for this is each package had the [`main`](https://docs.npmjs.com/files/package.json#main) field set to something like `lib/index.js` as when published, that's what I needed. However, with TypeScript, that `lib/index.js` only exists when you build and during development, it's not likely you'll have that and even if you build in order to get it, as you develop and add/remove files, you'd have to build the package each time. I'm way too lazy for that and it didn't feel like an efficient workflow for me and anyone else working on the project.

So my solution, add TypeScript paths for each package that was going to be imported to target that package's `src` directory in the same way my `@` path works. So an individual's tsconfig.json would have this sort of thing:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@somescope/core-pkg": ["../core-pkg/src/index.ts"],
      "@somescope/core-pkg/lib/*": ["../core-pkg/src/*"]
    }
  }
}
```

Now, when one package had an import like:

```typescript
import Foo from '@somescope/core-pkg/lib/Foo';
```

In development, it would then map to `../core-pkg/src/Foo` and work. However, once compiled, that plugin I was using would overwrite the path and have that relative path. Since each package gets published on it's own, that wasn't what I needed. I needed it to leave that import alone but write the `@` path so I wanted to have cake and eat it too. Luckily, that plugin I'm using has a way to exclude certain paths from what it processes. So my base `tsconfig.json` now has this:

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "transform": "@zerollup/ts-transform-paths",
        "exclude": [
          "@somescope/core-pkg",
          "@somescope/core-pkg/lib/*"
        ]
      }
    ]
  }
}
```

And now when it comes across an import matching that path, it simply leaves it alone. Great, this plugin is fantastic!

## Recap

Let's step back and recap what is going on. In development, I can import from the same package or another package using paths to load the TypeScript raw source without needing to build often or using the watch feature. When built, paths to the other packages are excluded and will remain the same after as it looks before, with the module import not a relative import. Great! We're done... or are we?

## Third Issue

Oh geez, I thought we were done except we weren't. Something I noticed when I was building packages, TypeScript was also moving the other packages that we imported into the package's `lib` directory. So once built, the `lib` directory looked like:

```
lib/
  core-pkg/
    src/
      index.js
      ...
  my-pkg/
    src/
      index.js
      ...
```

Notice how the core package and the current package (my-pkg in this case) are there now? TypeScript will compile all the files you imported and move them into your build directory as it thinks you need it... you know, since we aren't using paths how it was intended. So I had a `postbuild` script that I now delete that `core-pkg` directory (using [rifraf][rifraf]) so the `lib` directory looks like:

```
lib/
  my-pkg/
    src/
      index.js
      ...
```

I could move all the `lib/my-pkg/src` files up to `lib` and delete the unnecessary `my-pkg/src` directories so things are more cleaned up but it works and I'm tired of fighting with this so I just kept it the way and updated the `main` field in `package.json` to be to that nested `lib/my-pkg/src/index.js`.

## Fourth Issue

Oh good man why?! Yes, there is a fourth issue. When you are running code in development, TypeScript only loads a single `tsconfig.json` so if you are importing another package that is also using paths, TypeScript simply doesn't know about the paths in that other package. So if both packages are using `@` as a path, it'll try to load files imported by that other package into the package you are running in and it won't find the proper file. And if you changed to a different path in that other package, say `^`, TypeScript simply won't know what that it should try importing the file from that other package because it doesn't load that package's `tsconfig.json`.

Ok, at this point I was done. I was done working around issues trying to get paths to work as something it wasn't designed to. Could you get it to work? I'm not sure, I didn't even look and I honestly do not care. The other package didn't have a lot of files so going back to relative import paths worked and I just went with it.

## Conclusion

After fighting with paths, I decided to not use it. I still have it used in one package that is the "main" package and it has a few files where paths has helped but the only reason I haven't undone using paths is because I'd rather do other things than update 50 files and since I'm not going to use them going forward there just isn't a payoff just yet. I'll eventually undo using paths but you never know, maybe there will be official support. And like I said, you may be able to get something super elegant that works in development and production and it may be beautiful... I just lost motivation myself. If you'd like to see what project I am referring to, it's the [Gimbal](https://github.com/ModusCreateOrg/gimbal) project at [Modus Create](https://moduscreate.com/).

I'm not saying paths are bad just if you're gonna use them in a way they are not intended to be used, expect a bumpy road. And just because it works today doesn't mean that TypeScript will have an update that will break ttypescript and you'll have to wait till it gets updated to work. I doubt TypeScript wants to break things but they also are not obligated to keep it working. So use at your own risk!

[lerna]: https://lerna.js.org/
[node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/
[rifraf]: https://www.npmjs.com/package/rifraf
[typescript]: https://www.typescriptlang.org/
[webpack]: https://webpack.js.org/
