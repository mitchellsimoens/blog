---
title: Lesson in the getElementConfig method and config object
date: "2013-01-11T21:40:03.284Z"
---

Recently I saw a <a href="http://training.figleaf.com/tutorials/senchacomplete/chapter2/lesson10/5.cfm" title="blog post" target="_blank">blog post</a> about creating a component to play YouTube videos in Sencha Touch 2. Of course the code worked but I could help but think there should be a better way then to use the `Ext.String.format` method, of course I am not sure of the previous lessons as this is Chapter 2. This week I also have been running into people not understanding the `config` object and the getters/setters created for it so I felt like this YouTube component could be a great example to use. Also, last week someone asked me what the equivalent to the renderTpl property in Ext JS 4 was in Sencha Touch 2 so I decided to wrap the `getElementConfig` method in to this blog post as well. Hopefully this isn't too much in one post, will take it as slow as I can.

## Code Discovery

Let's first look at how the blog post accomplished the YouTube video viewing. They create an extension of Ext.Component and create a string of an `&#60;iframe&#62;` to view the video. Couple things I didn't like about this. First, I think using `Ext.String.format` isn't the most ideal and flexible solution. Also the string generates a `&#60;div&#62;` wrapping the `&#60;iframe&#62;` so it can horizontally center the `&#60;iframe&#62;` but shouldn't the parent container's layout take care of this centering? The component also uses two width (`vWidth`) and height (`vHeight`) configs to set the size of the `&#60;iframe&#62;` but just like the centering, shouldn't the parent container's layout take care of the sizing? I think the `&#60;iframe&#62;` should have 100% height and width to take up the full size of the `Ext.Component`. Also, no need for the `styleHtmlContent` for this. So basically I just said they are doing it all wrong in my opinion, it works just there is a better way to do it. One thing I've learned, there is always going to be a better way to do things and many opinions of how it should be done.

## New Code

I'm gonna throw out my code and then walk through why I did it and also learn how the `config` object and `getElementConfig` work.

```js
Ext.define('Ux.YouTubePlayer', {
    extend : 'Ext.Component',
    xtype  : 'youtubeplayer',

    config : {
        cls     : 'youtube-player',
        /**
            * @cfg {String} url The base URL of the YouTube video.
            */
        url     : 'http://www.youtube.com/embed/',
        /**
            * @cfg {String} videoId The ID of the video.
            */
        videoId : null
    },

    getElementConfig : function() {
        var tpl = this.callParent();

        //The src will come from the updateVideoId method
        tpl.children.push({
            tag       : 'iframe',
            //this is the property that will be used on the component
            reference : 'videoIframe',
            //would rather this be in CSS
            style     : 'width:100%;height:100%;border:0;'
        });

        return tpl;
    },

    /**
        * This method will update the src attribute of the &lt;iframe&gt; when
        * you execute setVideoId method.
        */
    updateVideoId : function(videoId) {
        if (videoId) {
            this.videoIframe.set({
                src : this.getUrl() + videoId
            });
        }
    }
});
```

Few things I did here, instead of using the `alias` property I used the `xtype` property, this doesn't do anything differently, just saves some code. I also got rid of the three configs (`vWidth<span>, `vHeight` and `styleHtmlContent`) for reasons discussed before and only kept the two important ones. Then I used the `getElementConfig` method and `updateVideoId` method to do the the logic instead of the `Ext.String.format`. But, we need to slow down and talk a little bit.

## getElementConfig

In Ext JS 4, you would use the `renderTpl` property which uses `Ext.XTemplate` to setup the DOM elements for that component. In Sencha Touch 2 you cannot use the `renderTpl` property but of course we still need a way to setup the DOM elements. For this Sencha Touch 2 uses the `getElementConfig` method that returns a single or an array of element configs for `Ext.DomHelper`. At first glance people get scared away but it's really simple. Let's look at the `getElementConfig` for `Ext.Component`:

```js
getElementConfig: function() {
    return {
        reference: 'element',
        classList: ['x-unsized'],
        children: this.getTemplate()
    };
}
```

This simple will return a single DOM element as that's all `Ext.Component` needs. First property is the `reference` property which is just a string. This is the property on the component that this element will be cached as so this element can be accessed from `component.element`. The `classList` takes an array or string of the CSS classes to be applied to that element. The `children` property is an array of child elements which each of will look like above. The `getTemplate` method returns `this.template` so you could use the `template` property but you can get things off the class scope which can be very powerful and you can see the inheritance work if you extend a component that uses `this.template` without you breaking things. One thing that is not used here is what tag the element will be (div, span, etc) and the reason that is is the `tag` property defaults to 'div' so this will return a `&#60;div&#62;` element.

So back to my YouTube component if we look at the `getElementConfig` method. First thing I do is get the object from the superclass (Ext.Component) which is the code snippet above. Then I added an iframe element to the children of what was returned from the superclass. This `&#60;iframe&#62;` will be cached to the `videoIframe` property on the component as specified in the `reference` property. We also give it some inline styles however I hate seeing inline styles. I much prefer using SASS (CSS) to specify styles like this but serving as an example and to not have an additional file for this blog post I just did an inline style. Since we have `cls` set to 'youtube-player' on this component we could use that to specify the styles.

Ok, while writing this I think I can make it a little better and more elegant. Instead of pushing an element onto the children array in `getElementConfig` method after calling the superclass, let's remove the `getElementConfig` method from the `Ux.YouTubePlayer` component and let's use the `getTemplate` method. This is what the new code would look like:

```js
Ext.define('Ux.YouTubePlayer', {
    extend : 'Ext.Component',
    xtype  : 'youtubeplayer',

    config : {
        cls     : 'youtube-player',
        /**
            * @cfg {String} url The base URL of the YouTube video.
            */
        url     : 'http://www.youtube.com/embed/',
        /**
            * @cfg {String} videoId The ID of the video.
            */
        videoId : null
    },

    getTemplate : function() {
        return [
            {
                tag       : 'iframe',
                //this is the property that will be used on the component
                reference : 'videoIframe',
                //would rather this be in CSS
                style     : 'width:100%;height:100%;border:0;'
            }
        ];
    },

    /**
        * This method will update the src attribute of the &lt;iframe&gt; when
        * you execute setVideoId method.
        */
    updateVideoId : function(videoId) {
        if (videoId) {
            this.videoIframe.set({
                src : this.getUrl() + videoId
            });
        }
    }
});
```

I like that better. This goes to show that there are always better ways and talking through something can help quite a bit.

## config Object

So we saw how we can create DOM elements but the other half of what I wanted to discuss is what the `config` object is and how it works. At first I thought I would hate this but I feel like I can't live without it now, it's magical! The `config` object is what holds all the configs, go figure! When you create a class and pass in a config object to that instantiation it gets applied on the `config` object you specify in the `Ext.define` call, the config object in `Ext.define` are like the default values for the configs. So instead of this:

```js
Ext.define('MyClass', {
    foo : null
});
```

You would have

```js
Ext.define('MyClass', {
    config : {
        foo : null
    }
});
```

So it nests the configs within an object now, what gives? Well, there is more to that `config` object. First, it generates a getter method. It takes the config, in this case 'foo', uppercases the first letter and prefixes 'get' so you get 'getFoo'. This method simply returns the private `this._foo` property value. The other part is it generates a setter method which name is like the 'getFoo' but it's 'setFoo'. You probably think it just sets the value passed to the setFoo method to the `this._foo` private property, it does but it adds more flexibility. What I mean is it can look for and use applyFoo and updateFoo that you can (optional) specify in your `Ext.define` statement. The applyFoo, called an applier, can be used to transform the value passed into something else. For example, you can pass in a config object of a class and the applier method can take that config object and turn it into a class. The updateFoo method, called the updater, can be used to take action on the new value like adding listeners. So the workflow (in code) is like this:

```js
setFoo : function(value) {
    var applier         = 'applyFoo',
        updater         = 'updateFoo',
        getter          = 'getFoo',
        privateProperty = '_foo',
        oldValue        = this[getter]();

    if (this[applier]) {
        value = this[applier].call(this, value, oldValue);
    }

    if (typeof value != 'undefined') {
        this.[privateProperty] = value;

        if (this[updater]) {
            this[updater].call(this, value, oldValue);
        }
    }
}
```

This is very similar to the `generateSetter` method in `Ext.Class`. You can notice the workflow and that the applier and updater get both the value and the oldValue passed to it. So now the `MyClass` class can look like this:

```js
Ext.define('MyClass', {
    config : {
        foo : null
    },

    applyFoo : function(newValue, oldValue) {
        return Ext.factory(newValue, Ext.data.Store, oldValue);
    },

    updateFoo : function(newValue, oldValue) {
        if (oldValue) {
            oldValue.un('load', this.someFunction, this);
        }

        if (newValue) {
            newValue.on('load', this.someFunction, this);
        }
    }
});
```

So in the applyFoo we use the `Ext.factory` method to create an `Ext.data.Store` instance and return it, make sure you return something here. In the updateFoo, we removed a listener on the old value and added a listener on the new value. Can you see how awesome the config object is? You will see this pattern all over Sencha Touch 2 framework classes, it really does add quite a bit of power and flexibility.

So back to the `Ux.YouTubePlayer` class that we are using for a real world example. We want to take advantage of any setVideoId execution to update the `&#60;iframe&#62;` with a new URL of the actual video. We expect the ID of the video so no need to specify an applier method as we don't need to transform the value. However, we do need to take action on a new ID so we specify the updateVideoId method to change the src attribute on the `&#60;iframe&#62;` element.

## Summary

I hope I didn't cover too much in one blog post. You can see how to use the `getElementConfig` (and later the `getTemplate`) method works and also what the `config` object is and how it works with the getter/setter/applier/updater methods. Can you see how awesome this stuff is?!
