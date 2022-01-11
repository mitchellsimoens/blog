---
title: var me = this; convention
date: "2012-07-11T22:38:03.284Z"
---

Once in a while the topic of using the `var me = this;` convention is brought up. Some people love it, some people hate it and some people don't understand it. Usually the people who love it or hate it understand the convention (or may not fully understand it) but there seems to be quite a few people who do not understand it. I use the variable me as an example but you could name it anything and it won't change it, even to the beloved `var that = this;` and what I will say will still hold true. The decision on whether to use `var me = this;` is purely for minification and therefore saving bytes. However, it could also cost you bytes if you don't realize what you are doing or maybe think you will need to use it when you start coding and don't go back to clean your code up. Let's start experimenting!

## Control

Let's look at a control method that you may have somewhere in your code:

```js
saveSomething : function(foo, status, scope) {
    this.foo = foo;

    this.myObj = {
        mitch : status
    };

    this.onSave.call(scope);
}
```

If we look at this, we use `this` 4 times. All looks great so far! We have a method that saves the first two arguments and then calls a method.

## New Feature!

So our control `saveSomething` method has been working quite well but we realize that we should do some error checking, we can make the `scope` argument optional and we decide we need to pass a method in the `onSave` method call. Let's look at an example of how we can do it and then circle back to see if we can do a little better:

```js
saveSomething : function(foo, status, scope) {
    var myObj = this.myObj;

    scope = scope || this;

    if (!myObj) {
        myObj = this.myObj = {};
    }

    this.foo = foo;

    myObj.mitch = status;

    this.onSave.call(scope, this.saveSomethingCallback);
}
```

So here we created a variable `myObj` to equate to `this.myObj`. However, `this.myObj` may be undefined so we added an `if` statement to check and if it is undefined (or falsey) set the `myObj` variable and `this.myObj` property to an Object. Also, we made `scope` default to `this` with the `scope = scope || this;` so if the `scope` argument is undefined (or falsey) it will then equate to `this` making it an optional argument (IMO a little more robust). Lastly we pass the `saveSomethingCallback` method in the `onSave` call as an argument to be executed later in our code.

## Minification

So now we have a little better of a method but it can get better! When we deploy our code we should always minify our code so it's as small as can be reducing what the client has to download but still maintain code functionality. This does many things but what I want to talk about is how it minifies variables. This small example:

```js
var foo = 'bar';
```

can get minified to

```js
var a='bar';
```

which saves 4 bytes as `foo` got renamed to `a` and the spaces before and after the equal sign got trimmed. Thinking back to our `saveSomething` method we can think that `this` will get minified to something like `a` just like the foo variable got renamed. Unfortunately, `this` (and other JavaScript keywords like `delete` or `new`) will not get minified. To combat this, we can create a variable to cache this and that variable can then get minified. This is where the `var me = this;` convention comes into play as we are going to cache `this` to the `me` variable and `me` will get minified:

```js
saveSomething : function (foo, status, scope) {
    var me    = this,
        myObj = me.myObj;

    scope = scope || me;

    if (!myObj) {
        myObj = me.myObj = {};
    }

    me.foo = foo;

    myObj.mitch = status;

    me.onSave.call(scope, me.saveSomethingCallback);
}
```

We put the `me = this` in the variable block at the beginning of the method and replaced all `this` instances with `me`. We can now minify it and save 3 bytes per `this` instance for a total of 18 bytes (`this` was used 6 times in the `saveSomething` method before we applied the `me = this` convention and 6 x 3 = 18). However `me = this` also costs us some bytes, in fact in this example it cost us 8 bytes not including the spaces between `me` and `this` as they will get trimmed when it's minified. So in total we saved 10 bytes after the `var me = this` convention which doesn't account for much but if you have a sizable app it can add up and if you ask me, every bit saved counts.

## Trouble!

This convention doesn't come without a dark side. Applying this convention without counting the bytes that the `me = this` takes up and what you will save after minification will cost you bytes. If we go way back to the first `saveSomething` method and applied the `var me = this;` convention we will have costed some bytes:

```js
saveSomething : function(foo, status, scope) {
    var me = this;

    me.foo = foo;

    me.myObj = {
        mitch : status
    };

    me.onSave.call(scope);
}
```

The `var me = this;` would cost us 11 bytes (it would be `var a=this;` after minification). For every instance of `this` we replaced we save 3 bytes and we had 3 instances so we save 9 bytes but the `me` variable line cost us 11 so we saved -2 bytes which is bad. We are trying to save bytes not add them.

## Two Types

In these examples you saw the `me` variable get created by itself and in a variable block. If you have `me = this` in a variable block where there are other variables it costs less as we don't have to add the `var` keyword. Let's look at the byte cost:

```js
var me = this;
var a=this; //minified
```

The minified version costs 11 bytes so you would have to use this 4 or more times to save bytes in the long run.

```js
var me  = this,
    foo = 'bar';
var a=this,b='bar'; //minified
```

`a=this`, costs 7 bytes so you would have to use this 3 or more times to save bytes in the long run.

## Review

Using the `var me = this;` convention is purely to save some byte because `this` cannot be minified but `me` can. The savings won't be drastic but every little bit helps but you have to be cautious as it could cost you bytes. If you ask me, this is a code style issue also and code style (quality) should be just as high of a priority as what your code is doing. I take my code style very seriously so lining colons and equal signs up and also applying `me = this` wherever it will save a byte is very important to me.

A downside to this, which is just a visual annoyance, is in your IDE you probably have syntax highlighting and keywords usually get a blue (or other color depending ont he IDE) highlight but `me` will not so you can't easily visually see the scope. My eyes simply have been trained to see me easily but I do miss seeing `this` highlighted. The syntax highlighting in the above examples show this.

Results may vary.
