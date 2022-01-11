---
title: What is callParent and callSuper?
date: "2015-01-20T18:01:03.284Z"
---

One of the best things about Ext JS is it's class system. Even though JavaScript doesn't have a class system with inheritance, Ext JS utilizes different JavaScript methods to create inheritance. This enables classes to extend one another to give power, flexibility and code reuse in a simple api otherwise not present in native JavaScript.

### Introduction

First, let's setup a couple classes `Bar` which extends `Foo`:

```js
Ext.define('Foo', {
    someProp : 3,

    someMethod : function() {
        console.log('Foo', 'someMethod');
    }
});

Ext.define('Bar', {
    extend : 'Foo',

    anotherProp : 'test',
    someProp    : 4
});
```

If we look at this code, `Foo` is defined with `someProp` and `someMethod` members on that class. `Bar` is defined and extends `Foo`, adds an `anotherProp` member and overwrites `someProp` to have a different value than was defined on `Foo`. In this case, `Bar` will inherit the `someMethod` and therefore instances of `Bar` can execute the `someMethod` method. Let's look at instantiation and execution:

```js
var foo = new Foo();

foo.someProp === 3;
foo.someMethod(); // logs `Foo someMethod` to the console

var bar = new Bar();

bar.anotherProp === 'test';
bar.someProp === 4;
bar.someMethod(); // logs 'Foo someMethod' to the console
```

### Using `callParent`

We have a need to add logic to `Bar`'s `someMethod` method but we still need to execute the `someMethod` that was inherited from `Foo`. If we simply add `someMethod` to `Bar` like this:

```js
Ext.define('Bar', {
    extend : 'Foo',

    anotherProp : 'test',
    someProp    : 4,

    someMethod : function() {
        console.log('Bar', 'someMethod');
    }
});
```

When we execute `bar.someMethod();` it will now only log out `Bar someMethod` and will not execute the `someMethod` method on the `Foo` class because we overrode the method. We can still call `Foo`'s `someMethod` by using the `callParent` method:

```js
Ext.define('Bar', {
    extend : 'Foo',

    anotherProp : 'test',
    someProp    : 4,

    someMethod : function() {
        console.log('Bar', 'someMethod');

        this.callParent();
    }
});
```

Now when `bar.someMethod();` is executed, we will get `Bar someMethod` **and** `Foo someMethod` both logged to the console because `this.callParent();` calls the superclass' (`Foo`) `someMethod` method.

#### Function arguments

Thus far, the `someMethod` method did not accept any arguments and therefore we didn't need to deal with them and how to pass the arguments to the superclass' method. Let's modify `Foo` to handle a couple arguments:

```js
Ext.define('Foo', {
    someProp : 3,

    someMethod : function(callback, scope) {
        console.log('Foo', 'someMethod');

        if (callback) {
            callback.call(scope || this);
        }
    }
});
```

We changed the signature of the `someMethod` method to accept `callback` and `scope` arguments which are optional but we need to now handle passing the arguments in our `someMethod` method in the `Bar` class in order to keep the behavior of the `Foo` `someMethod` method.

We can do this two ways. The preferred way is to know what the arguments are and pass an array of the arguments to the `callParent` method call. This may take some educating yourself on what arguments are valid for that method by reading the source for the superclass and it's ancestors. The other way is to use the special `arguments` keyword which holds the arguments for the current function block. Here are the two methods in action:

```js
Ext.define('Bar', {
    extend : 'Foo',

    anotherProp : 'test',
    someProp    : 4,

    someMethod : function(callback, scope) {
        console.log('Bar', 'someMethod');

        this.callParent([callback, scope]);
    }
});
```

or with the `arguments` keyword:

```js
Ext.define('Bar', {
    extend : 'Foo',

    anotherProp : 'test',
    someProp    : 4,

    someMethod : function(callback, scope) {
        console.log('Bar', 'someMethod');

        this.callParent(arguments);
    }
});
```

I personally always try to know what arguments are possible and use the first method. Documentation can really help here or simply reading the source from that class' ancestors. If you know a method will never have any arguments, `initComponent` in `Ext.Component` for example, then you can simply execute `callParent` without passing any parameters: `this.callParent();`

### Using `callSuper`

Like `callParent`, `callSuper` allows you to call an ancestor method when overwriting one. There are two differences:

- `callSuper` is only usable within an override
- While `callParent` calls the inherited method, `callSuper` will skip the directly inherited method and call the next level's method.

Let's create an override to `Bar` to explore how to use the `callSuper` method:

```js
Ext.define('Override.Bar', {
    override : 'Bar',

    someMethod : function(callback, scope) {
        console.log('Override.Bar', 'someMethod');
    }
});
```

In this example, we are globally overwriting the `someMethod` method on `Bar`. When we execute `bar.someMethod();` we will only see the `Override.Bar someMethod`. Our need to is not call the `someMethod` method on the `Bar` class but skip it and call the method on the `Foo` class. We can do this with `callSuper`:

```js
Ext.define('Override.Bar', {
    override : 'Bar',

    someMethod : function(callback, scope) {
        console.log('Override.Bar', 'someMethod');

        this.callSuper([callback, scope]);
    }
});
```

Now when `bar.someMethod();` is executed, we will get both `Override.Bar someMethod` and `Foo someMethod` logged to the console. Also note that passing arguments works exactly like it did with `callParent`.

### Handling returning something

What if the `someMethod` in the `Foo` class returned something? How do we handle this with `callParent` and `callSuper`? Well, it's actually quite simple. First, let's look at the changes to `Foo`:

```js
Ext.define('Foo', {
    someProp : 3,

    someMethod : function(callback, scope) {
        console.log('Foo', 'someMethod');

        if (callback) {
            callback.call(scope || this);
        }

        return this;
    }
});
```

Now `someMethod` is chainable as it returns `this` which is likely the `Foo` class. Now we need to handle this in the `Bar` class where we use `callParent`:

```js
Ext.define('Bar', {
    extend : 'Foo',

    anotherProp : 'test',
    someProp    : 4,

    someMethod : function(callback, scope) {
        console.log('Bar', 'someMethod');

        return this.callParent([callback, scope]);
    }
});
```

All I did here was add `return`, `callParent` is just a placeholder for calling the superclass' method and therefore will return whatever that method returns. The same goes for when `callSuper` is used:

```js
Ext.define('Override.Bar', {
    override : 'Bar',

    someMethod : function(callback, scope) {
        console.log('Override.Bar', 'someMethod');

        return this.callSuper([callback, scope]);
    }
});
```

What if you need to do something with what is returned from `callParent` or `callSuper`? Just cache the execution to a local variable and return that variable. Once again this is exactly the same between `callParent` and `callSuper` so I will only show one:

```js
Ext.define('Override.Bar', {
    override : 'Bar',

    someMethod : function(callback, scope) {
        console.log('Override.Bar', 'someMethod');

        var ret = this.callSuper([callback, scope]);

        console.log('Override.Bar', ret.someProp);

        return ret;
    }
});
```

With all the classes and the override in place, when `bar.someMethod();` is executed it will return `this` (which will be the instance of Bar) but will now log these in this order: `Override.Bar someMethod`, `Foo someMethod` and `Override.Bar 4`. Couple things to note here, since we used `callSuper` in the override, the `someMethod` defined on the `Bar` class was not executed as it was skipped due to using `callSuper` and the scope is the instance that was created which is that of the `Bar` class (since we used `var bar = new Bar();` in the beginning) which is why `ret.someProp` returns `4` **not** `3`.
