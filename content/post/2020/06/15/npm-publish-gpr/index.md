---
title: NPM Publish to GPR and NPM
date: "2020-06-25T17:58:03.682Z"
---

I've seen a few blogs about publishing a node module to the [NPM] repository and
[GitHub Package Registry (GPR)][GPR]. Some I like, some I don't. I thought, what's better than a couple
existing blogs about it? One more. I also have some ideas for the stuff I've done that may be a bit unique to
me but the workflow I have can be easily adjusted to remove parts if that isn't desired.

## The Why

Why publish a node module to NPM and GPR? Being the default, publishing to NPM is still a great idea. However,
lately, I've seen some projects start going with GPR also. Yes, installing a node module that your `.npmrc` is
targeting GPR will still get proxied to NPM, I still feel it could be a good idea to also publish to GitHub. I
also want to have a GitHub release created without just relying on a git tag.

## Splitting the workflow

The workflow I will be talking about has 4 jobs:

- [`build`](#build-job)
- [`release`](#release-job) (requires `build` job)
- [`publish-npm`](#publish-npm-job) (requires `build` job)
- [`publish-gpr`](#publish-gpr-job) (requires `build` job)

The last three rely on the `build` job but allow those three to run in parallel. Let's look more at each
individually but at the end I'll still show the entire `.github/workflows/publish.yml` file.

### `build`<a name="build-job"></a>

```yml
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: 14
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
      - name: Zip lib & node_modules
        run: zip -9qry "build.zip" "./" -i "node_modules/*" -i "lib/*"
      - name: Upload build.zip
        uses: actions/upload-artifact@v2
        with:
          name: build.zip
          path: build.zip
```

I personally use [TypeScript] a lot so I need do need to build it. I also like to run a quick lint check and
run tests as this is the last opportunity to stop a release.I also zip up the build artifacts (`node_modules`
and `lib` in this case) and then upload them so the subsequent steps can download it and use it.

One thing not to overlook is when installing I use `npm ci` instead of `npm i` so that I only install what is
in the lock file and nothing possibly new. I see people using `npm i` far too many times even during
development. Updating dependencies should be a planned thing and not happen just whenever anyone feels like it.

If you don't use TypeScript or anything else that would require a build, you can simply remove that step and
the `lib` dir from the zipping but I still would zip and upload the `node_modules` dir. This would then look
like this:

```yml
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: 14
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - name: Zip lib & node_modules
        run: zip -9qry "build.zip" "./" -i "node_modules/*"
      - name: Upload build.zip
        uses: actions/upload-artifact@v2
        with:
          name: build.zip
          path: build.zip
```

The same would be true if you didn't have or didn't want to run the lint check or tests.

### `release`<a name="release-job"></a>

```yml
  release:
    needs: build
    name: Create GitHub Release
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - name: Download build.zip
        uses: actions/download-artifact@v2
        with:
          name: build.zip
      - name: Create Release
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          body: Stuff happened
      - name: Upload Release Asset
        uses: actions/upload-release-asset@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: ./build.zip
          asset_name: build.zip
          asset_content_type: application/zip
```

This is where things start happening. Creating GitHub releases is a great thing as it allows you to hold build
artifacts and have some body describing things in that release. There are many ways to build the body of the
release so I left it simple in this workflow as I've had to do many different things. Notice here, we download
the zipped build artifact but we don't unzip it. We upload that zip to the release after it has been created.
The reason for this is when the `create_release` step executes, it actually hits GitHubs create release API
which then uses the source for that tag. This is important as it does not create a release from what is
currently on disk so if you did this after a build (or unzipped the build artifact), that wouldn't show up
in the GitHub release.

I think it's important to upload the build artifact to the GitHub release so you have that zip bound to that
release which does include the `node_modules` dir. This is important because many people have dependencies in
their `package.json` with a prefix meaning the versions of the dependencies are not locked. When not locked,
you can never count on installing that exact version without some work. So upload the build artifact and you
are good to go without any work.

If you don't know, when you see `${{ secrets.GITHUB_TOKEN }}` that does not mean you need to go into the repo
settings and add a secret. That is a special secret that is generated for you when it's used. Also, the
`actions/create-release` action specially handles the `${{ github.ref }}` to strip away the `refs/tags/` part
to just have the actual tag name. So the `${{ github.ref }}` would really look like `refs/tags/v1.0.0` but
it removes it and so you'd just have `v1.0.0`.

### `publish-npm`<a name="publish-npm-job"></a>

```yml
  publish-npm:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: 14
          registry-url: https://registry.npmjs.org/
      - name: Download build.zip
        uses: actions/download-artifact@v2
        with:
          name: build.zip
      - name: Unzip build.zip
        run: unzip -q build.zip
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{secrets.PUBLISH_NPM_TOKEN}}
```

Publishing to NPM step is pretty simple. We setup node setting the registry url to NPM, then download the
build artifact from the [`build`](#build-job) step, unzip it so that the `lib` directory is present and then
run `npm publish`. This step does require you to create a token over on [NPM] and add it as a secret to your
repo settings.

### `publish-gpr`<a name="publish-gpr-job"></a>

```yml
  publish-gpr:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: 14
          registry-url: https://npm.pkg.github.com/
          scope: '@mitchellsimoens'
      - name: Download build.zip
        uses: actions/download-artifact@v2
        with:
          name: build.zip
      - name: Unzip build.zip
        run: unzip -q build.zip
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.PUBLISH_GITHUB_TOKEN}}
```

The publish to GPR is very similar to the [`publish-npm`](#publish-npm-job) but there are a few differences.
First, when we setup node we give it a different registry-url but we also need to specify the scope. All this
is is the username or organization name the repo is under. So for me, if I have the repo
https://github.com/mitchellsimoens/foo then `@mitchellsimoens` is the scope. The next difference is of course
we need a [GitHub token](https://github.com/settings/tokens) which needs the `write:packages` scope (this will
also automatically check all the `repo.*` and `read:packages` scopes). A keen eye also would notice that the
`npm publish` here doesn't have the `--access public` because with GPR the access is determined by the scopes
on the user token being used.

## The whole workflow

The whole workflow is mostly all of the above concatenated but it also includes what triggers the workflow. I
have mine trigger when a tag with the `v` prefix is pushed. This means, I run `npm version patch` (or whatever
version) and then push the commit and tag up. I've seen some people push all tags (`git push --tags`) which is
fine but if there are any other tags with `v` prefix in it that have not been pushed you could trigger unwanted
publishes so you may want to push a single tag like `git push origin v1.0.0`. Up to you if you care about that.

Ok, here is the full workflow I normally put as `.github/workflow/publish.yml`:

```yml
name: Publish

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: 14
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - name: Zip lib & node_modules
        run: zip -9qry "build.zip" "./" -i "node_modules/*" -i "lib/*"
      - name: Upload build.zip
        uses: actions/upload-artifact@v2
        with:
          name: build.zip
          path: build.zip

  release:
    needs: build
    name: Create GitHub Release
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - name: Download build.zip
        uses: actions/download-artifact@v2
        with:
          name: build.zip
      - name: Create Release
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
      - name: Upload Release Asset
        uses: actions/upload-release-asset@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: ./build.zip
          asset_name: build.zip
          asset_content_type: application/zip

  publish-npm:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: 14
          registry-url: https://registry.npmjs.org/
      - name: Download build.zip
        uses: actions/download-artifact@v2
        with:
          name: build.zip
      - name: Unzip build.zip
        run: unzip -q build.zip
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{secrets.PUBLISH_NPM_TOKEN}}

  publish-gpr:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: actions/setup-node@v1
        with:
          node-version: 14
          registry-url: https://npm.pkg.github.com/
          scope: '@mitchellsimoens'
      - name: Download build.zip
        uses: actions/download-artifact@v2
        with:
          name: build.zip
      - name: Unzip build.zip
        run: unzip -q build.zip
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.PUBLISH_GITHUB_TOKEN}}
```

[GPR]: https://github.com/features/packages
[NPM]: https://www.npmjs.com/
[TypeScript]: https://www.typescriptlang.org/
