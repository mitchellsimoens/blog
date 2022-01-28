---
title: Tiny Performance Boost in Data Drive Ext JS/Sencha Touch apps
date: "2014-03-19T15:15:03.284Z"
---

If you're like me, you probably try to squeeze every bit of performance out of your code and likely end up on a never ending search for performance, there are always little nooks and crannies to find more performance. Some times smaller code isn't more optimized code and the thought of fewer function calls the better holds up quite a bit but still not always. A small tip I want to discuss is along the lines of fewer function calls within an Ext JS and Sencha Touch data Model. In this case, you may find a tiny performance boost but also knowing what is happening behind the scenes is always welcomed.

In an application, most of the time you will have data models in your application with something like:

```js
Ext.define('MyApp.model.User', {
    extend : 'Ext.data.Model',

    fields : [
        { name : 'firstName', type : 'string'                     },
        { name : 'lastName',  type : 'string'                     },
        { name : 'email',     type : 'string'                     },
        { name : 'phone',     type : 'string'                     },
        { name : 'age',       type : 'int'                        },
        { name : 'dob',       type : 'date', dateFormat : 'Y-m-d' }
    ]
});
```

Ok, likely you have many more fields but you get the point. I'm sure your application may still perform very well but you may not actually know what's going on behind the scenes. When you define the type config within your field, you are telling the Model to convert the data coming in to that format. But couldn't you expect firstName and lastName to always be a string so why convert it? If you do not specify a type, it will not do any conversion at all. If you specify your model like the next code snippet, functionality may be exactly the same but perform a little better:

```js
Ext.define('MyApp.model.User', {
    extend : 'Ext.data.Model',

    fields : [
        { name : 'firstName'                                },
        { name : 'lastName'                                 },
        { name : 'email'                                    },
        { name : 'phone'                                    },
        { name : 'age', type : 'int'                        },
        { name : 'dob', type : 'date', dateFormat : 'Y-m-d' }
    ]
});
```

In fact you can shorten that code down even more:

```js
Ext.define('MyApp.model.User', {
    extend : 'Ext.data.Model',

    fields : [
        'firstName',
        'lastName',
        'email',
        'phone',
        { name : 'age', type : 'int'                        },
        { name : 'dob', type : 'date', dateFormat : 'Y-m-d' }
    ]
});
```

Here, we care about the age and dob fields be a certain type, an Integer and Date. Now when the model instances are created, firstName, lastName, email and phone fields will not try to convert the value and will simple apply the value on the data object within your model. Ext.data.Field will turn your string into an Object for you.

Ok, run a perf test on it and you will likely see that performance didn't improve significantly but I think it's also very important to know what's going on behind the scenes. If you set the type config, you are opting into a conversion. You need to evaluate if you actually need to opt for that conversion; some cases you may, some you may not.
