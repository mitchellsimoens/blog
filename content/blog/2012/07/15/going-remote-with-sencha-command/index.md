---
title: Going Remote with Sencha Command
date: "2012-07-15T17:19:03.284Z"
---

With the introduction of Sencha Touch 2.0.0 GA we got the use of Sencha Command which allows developers to create an app and build an app. Well, not as simple as that as there is more to it than simply creating and building but that's for another blog post maybe. One thing that I try to emphasize is that you not edit `index.html`. The only exception to my rule is to edit the CSS and HTML for the loading screen but nothing else! No adding `&#60;link&#62;` elements, `&#60;script&#62;` elements, nothing! Of course your application may require it but try not to do it.

## `app.json`

`app.json` is the configuration file that the builder and microloader uses to know really how to work and what to load. What to load, like CSS and JavaScript files? Exactly! There are both `js` and `css` properties that tell the builder to copy over to the `build` folder and setup the microloader to load and possibly save to `localStorage`. However, there is a flaw with this and is noted in the comment above the `js` and `css` properties that the path must be relative to the `app.json` file. Many apps require the loading of remote sources and one of the more popular ones is the Google Maps API. To load a Google Map you must have a `&#60;script&#62;` element to load the API but you shouldn't edit `index.html` and `app.json`'s js property only loads relative files which both mean that there is no way to handle remote files.

## Hack

The URL that you need to load for the Google Maps API is likely <a href="http://maps.google.com/maps/api/js?sensor=true" target="_blank">http://maps.google.com/maps/api/js?sensor=true</a> and if you look at this file you can plainly see that it bootstraps their API and creates a `&#60;script&#62;` element to load the actual API. You could, in theory (I haven't tested it) create a local file that has this source and it would work but it's a hack and I wouldn't recommend it. Yeah, I have see someone do this and the reason was because they really didn't have any other way to load the Google Maps API before their app was launched which I couldn't blame them for trying it.

## Savior

I haven't dug into the source for Sencha Command and the microloader (`Ext.blink`) so I took it upon myself to jump head first to implement a way to load remote files using a simple config in `app.json`. I wanted to add a simple and descriptive config to the config objects you can put into the `js` array and the `"remote"` config was born. This config would mark that resource as being a remote file and accepts `true` or `false` (defaults to `false`, well, `undefined` really but it's falsey so the same in this instance).

## Sencha Touch 2.0.2

First thing I notice while digging into Sencha Command was that it copies the files to the `build` folder in a couple places. A few `if` statements and solved that issue. Tested and things were working great! I didn't do enough testing admittedly and this was released for Sencha Touch 2.0.2. <a href="http://twitter.com/themightychris" target="_blank">@themightychris</a> (Chris Alfano from Jarv.us Innovations) tweeted about how to load remote files in Sencha Touch 2 and as a proud father of what I thought worked I told him about the `"remote"` config. He replied with errors... oh boy. I should have known it was too easy to throw a couple `if` statements at a problem and expect it to work fully. The next day I didn't do any work on the Forums until I fixed it, my fault, my problem, my fix.

What it does now is when Sencha Command builds the `index.html` it will create `&#60;script&#62;` elements for your remote JavaScript files and `&#60;link&#62;` elements for your remote CSS files. The microloader, the system responsible for actually loading the resources, submits Ajax calls to load the assets and once all the assets have been loaded it then kicks off your application's `launch` method. So why create `&#60;script&#62;` files in the builder and not let the microloader do the loading? The issue I came across is I couldn't accurately determine when the Google Maps API was loaded due to it creating it's own `&#60;script&#62;` tag as mentioned before (see why I explained that now?). I could determine when the `&#60;script&#62;` element that I created would load but not the `&#60;script&#62;` element the Google Map bootstrap element I created would create so the `launch` method would fire before the Google Maps API was actually loaded causing issues with my `Ext.Map` test. So not knowing what people will use I felt creating `&#60;script&#62;` elements in the `index.html` the safest solution. So once you do a production build, you can see the `&#60;script&#62;` elements in `index.html` that Sencha Command created. Not the prettiest solution but sometimes you just don't have the control you want. This fix will be part of the next release (2.0.3 I believe it will be) but for you premium users it should be in SVN and part of the nightly builds you can get from <a href="http://support.sencha.com/" target="_blank">http://support.sencha.com/</a>

## Example

Enough backstory, I know you are craving some code! Diving into the Sencha Touch 2.0.3 directory I created a simple app:

```sh
cd ~/Sites/sencha-touch-2.0.3
sencha app create MyApp ../MyApp
```

Simple to create an app isn't it? Hell yeah it is (I was a doubter but now I'm a promoter)! I then edited the `MyApp.view.Main` class to add an `Ext.Map` item as the 2nd item so I opened the `~/Sites/MyApp/view/Main.js` in my editor (IntelliJ IDEA if you were wondering) and added this code as index 1:

```js
{
    xtype   : 'map',
    title   : 'Map',
    iconCls : 'maps'
},
```

and of course added `Ext.Map` to the `requires` array at the top of the file. So now we have our view using `Ext.Map` which will use the Google Maps API so we need to add the JavaScript file in `app.json` so I opened `app.json` and made 2 edits. First I added this code after the `sencha-touch.js` asset in the `js` property array:

```json
{
    "path": "http://maps.google.com/maps/api/js?sensor=true",
    "remote": true
},
```

and then at the bottom to get around a current error I changed the `logger` config to `false`:

```json
"buildOptions": {
    "product": "touch",
    "minVersion": 3,
    "debug": false,
    "logger": false
},
```

So now `app.json` is going to tell Sencha Command to include the Google Maps' remote JavaScript file and the display the map in my `MyApp.view.Main` tab panel. First I need to test to make sure everything is working so I do a testing build:

```sh
cd ~/Sites/MyApp
sencha app build testing
```

Launched <a href="http://localhost/MyApp/build/testing/" target="_blank">http://localhost/MyApp/build/testing/</a> in Chrome (my browser of choice) and everything displayed just fine, my map shows correctly (centered South-East of San Jose California because I didn't tell it to center anywhere and that's default). More importantly I checked out the console and there were not errors! Great, so from everything I know thus far my app is working perfectly so now I can deploy with a production build:

```sh
sencha app build production
```

Launched <a href="http://localhost/MyApp/build/production/" target="_blank">http://localhost/MyApp/build/production/</a> in Chrome (yup, still my favorite browser) and everything works perfectly!

## Summary

So we learned some backstory on the issue at hand and the little bumpy road to the fix that is the `"remote"` config for your JavaScript and CSS assets in `app.json`. We then looked at building a simple example all using Sencha Command.

Happy coding!
