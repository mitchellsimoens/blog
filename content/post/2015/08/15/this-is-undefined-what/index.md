---
title: this is undefined, what?
date: "2015-08-15T14:38:03.284Z"
---

Playing around the other day with ES6 and classes and ran upon a strange error. It was simple code, a base class, a subclass and a constructor:

    class Base {}

    class Sub extends Base {
        constructor(config) {
            console.log(this);
        };
    }

    new Sub();

This resulting in a `ReferenceError` that `this` was `undefined`. This was, quite simply, the only time I've ever see `this` be `undefined`. I mean, even if I were to try to make it `undefined` I couldn't:

    function Foo() {
        console.log(this);
    }

    Foo.call(undefined);

Within `Foo`, `this` would be equal to `window`. So how can it ever be `undefined`? My first thought was that ES6 is very new and not fully implemented anywhere yet (Babel and Traceur are coming close to transpiling it though) and the browsers are definitely not close for real native development (see kangax's [chart](https://kangax.github.io/compat-table/es6/)) so then it must just be a browser error. Since I know Babel is quite far along and they have a [playground](https://babeljs.io/repl/) that can run in the browser I threw the code in there and finally got an error that explains it:

    'this' is not allowed before super()

What a curious bug but trying it out this code does indeed work:

    class Base {}

    class Sub extends Base {
        constructor(config) {
            super(config);

            console.log(this);
        };
    }

    new Sub();

So `this` can only be used after calling `super` huh? Why? And I don't mean technically why but theoretically why? What if I wanted to do something before calling the superclass' method and use `this`? So now a superclass has to take into account any subclasses. So if I wanted to do something, I guess I would have to execute a function in the superclass so that a subclass can enact on it:

    class Base {
        constructor(config) {
            if (this.doSomething) {
                this.doSomething(config);
            }
        }
    }

    class Sub extends Base {
        constructor(config) {
            super(config);

            console.log(this);
        };

        doSomething(config) {
            console.log(this);
        }
    }

    new Sub();

Yuck! I hope someone else has found a better way to use `this` in a subclass.

Ok, so there's a limitation there and as developers we can beat our heads against a brick wall (you can't beat the interpreter) or you can develop around the limitation. I was just hoping, in a new spec in modern day, that I wouldn't have such limitations. I come from a PHP background and have no problems like this. Currently use Ext JS and it's class system and have no problems like this.
