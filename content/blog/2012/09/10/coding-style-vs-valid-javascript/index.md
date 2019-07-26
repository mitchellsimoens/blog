---
title: Coding style vs valid Javascript
date: "2012-09-10T12:33:03.284Z"
---

I came across a thread that actually got me a little riled up. A quick disclaimer, I absolutely have OCD tendencies (have a light switch story for that). I take great pride in how my code looks, not just how it is parsed by the browser. For those who know me and have seen my code, you probably know I'm anal about lining colons and equal signs up:

    var foo    = {
            uno    : 'one',
            dos    : 'two',
            tres   : 'three',
            cuatro : 'four'
        },
        fooBar = 'Who?';

As you can see things are lined up and easily readable versus this:

    var foo = {
            uno: 'one',
            dos: 'two',
            tres: 'three',
            cuatro: 'four'
        },
        fooBar = 'Who?';

Not that big of a deal with that little code but bigger your code gets the more your code looks like a mess. Either case, Javascript will parse both code and all will be the same. Yes, my "beautified" code does take up more disk space; my reply would be that would be that you likely won't be deploying it like either one of these as you will be minifying etc so both pieces of code will look the same in the end. During development, it's easier to read the first snippet than the second. Some agree, some don't... this is purely my coding style.

Now the real thing that irked me... trailing commas. What is a trailing comma? It's a comma that is on the last value in an object:

    var foo = {
        bar : 'whoa',
    };

The comma after 'whoa' is a trailing comma. Run this code in different browsers and you will get two different results. In Chrome, Safari and Firefox this code will be parsed with the trailing comma disregarded; however, run this code in Internet Explorer and it will throw an error. Why since it works in other browsers? I believe the EMCAScript 5 spec says it's fine to have trailing commas but in EMCAScript 3 it is actually invalid Javascript. Testing that code in IE6-9 will result in an error. IE10 is supporting the 5 spec so it's technically valid but the argument for messy code is still there. Sure, when you minify your code trailing commas will likely be taken out.

I have been in corporate and government environments both within Sencha and outside of Sencha and a requirement that I always have is code must run in IE6+. All builds have to pass: dev, testing, prod and others which means that trailing commas will not pass.

Whether or not it technically parses, does that mean you should allow it? Not sure if you all have had to pass JSLint/JSHint tests, good luck with trailing commas. Not sure if you have ever had to pass a code test for a job but code quality will likely be judged and trailing commas raises red flags.

It's your choice whether you want to use trailing commas, I strongly discourage it.
