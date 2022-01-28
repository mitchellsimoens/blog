---
title: A Naming Strategy
date: "2015-01-07T16:08:03.284Z"
---

You just got contracted or assigned a new app! Wow, that's exciting! All you want to do is just jump in and start coding right? Well, you need to slow down and think about the application first. Don't skip the pre-planning stage of the programming. This is separate from pre-planning the application where you come up with all the features the app will have, as developers (the implementors) we need to think of how to develop the app before we actually develop the app.

#### Classes

In an Ext JS or Sencha Touch application, you will no doubt be creating a lot of classes. Before we start programming, we need to think of how we are going to organize the code. You will likely be refactoring as you develop but thinking a bit up front will help quite a bit.

First, you have a list of features. You need to take that list and come up with a logical class structure. For example, maybe you have a user management part of the application. You'll likely need a grid to display a list of users, maybe a detail view of the user and maybe a form to edit and create a user. So right there we know we need 3 classes that belong to a user "feature":

- user
  - Detail
  - Form
  - Grid

To add to that, say your application is an email program so you'll need a form to send an email and of couse a view to display the email so now you have an email and user "features":

- email
  - Detail
  - Form
- user
  - Detail
  - Form
  - Grid

As you can see, we are already starting to think of what classes our application is likely to have and even a structure.

#### Naming our classes

Since we have a structure of classes, the naming of the classes should follow that structure. Say our application name is `Email`, therefore our classes should be named:

- `Email.view.email.Detail`
- `Email.view.email.Form`
- `Email.view.user.Detail`
- `Email.view.user.Form`
- `Email.view.user.Grid`

You can logically see the class names describe the same structure that we planned out. With Ext JS 5, you're likely to have some `ViewController`s for your forms and grids:

- `Email.view.email.Detail`
- `Email.view.email.Form`
- `Email.view.email.FormController`
- `Email.view.user.Detail`
- `Email.view.user.Form`
- `Email.view.user.FormController`
- `Email.view.user.Grid`
- `Email.view.user.GridController`

#### Aliases

Another part of developing an Ext JS and Sencha Touch application is providing aliases (or xtypes for components). These are string representations of our classes that can be used for lazy instantiation. I've seen many naming schemes for naming their aliases to save on space. I see xtypes being like `usergrid` and `emailform` which are pretty descriptive in a simple application but the issue with this is down the road in development the more complex an application gets and not having a naming standard may not be the easiest to remember what class is for an alias when you or someone new to the project comes across the alias somewhere in the application. I keep my alias names closely associated to my class names so when I come across an alias, I know exactly what class that alias is associated with. Here is a mapping of what I'd give my views:

- `email-email-detail`
  - class: `Email.view.email.Detail`
- `email-email-form`
  - class: `Email.view.email.Form`
- `email-user-detail`
  - class: `Email.view.user.Detail`
- `email-user-form`
  - class: `Email.view.user.Form`
- `email-user-grid`
  - class: `Email.view.user.Grid`

You can see the alias for my views is very close to the class name. In fact, all I did was removed the `.view` portion, lowercased it and replaced periods with dashes. But that's exactly what I want. Now when I come across an xtype of `email-user-form` I know that it correlates to the `Email.view.user.Form` and I know exactly where to go to look at the source of that view. I'm even fine with the duplication of `email-email-detail` as it needs to conform to my naming standard. The standard needs to be adhered to regardless of duplication.

For the `ViewController`s, I alias them like so:

- `controller.email-email-form`
  - class: `Email.view.email.FormController`
- `controller.email-user-form`
  - class: `Email.view.user.FormController`
- `controller.email-user-grid`
  - class: `Email.view.user.GridController`

Here I did pretty much the same thing as the views' xtype. I removed the `.view` portion, lowercased the name, replaced periods with dashes only with a `ViewController` I moved the controller part to the beginning of the alias as you have to use the `alias` property and therefor need to give it the `controller` prefix. This gets confusing without seeing the actual code so here is the few lines for the user grid view and controller:

```js
Ext.define('Email.view.user.Grid', {
    extend : 'Ext.grid.Panel',
    xtype  : 'email-user-grid',

    requires : [
        'Email.view.user.GridController
    ],

    controller : 'email-user-grid',

    //...
});

Ext.define('Email.view.user.GridController', {
    extend : 'Ext.app.ViewController',
    alias  : 'controller.email-user-grid',

    //...
});
```

Hopefully the code makes a bit more sense about what I mean. If you look at the `Email.view.user.Grid` source and you see the `controller` property, you should be able to immediately know where to look at for the `ViewController`. The reason why I remove the controller from the end of the `controller.email-user-grid` alias is because it's redundant, the prefix is telling you what the alias is so `controller.email-user-gridcontroller` is redundant but if you want it on your alias there is nothing wrong with it.

You may be wondering why I have my aliases prefixed with the `email` part that is the application name lowercased. I use Sencha Cmd and often times have packages and each package has it's own name and the classes are named with that package name. Having the aliases prefixed with that application or package name tells me what class that is. I may have a `MyPackage.view.user.Grid` class so I need to have an xtype of `mypackage-user-grid`. If I just had it as `user-grid` then does that tell me its for `MyPackage.view.user.Grid` or is it for `Email.view.user.Grid`? Do I need to now name my package classes dependent on what I have in my applications that the package may added to? No. Prefix the aliases to allow for present and future-proofing.

#### Reasons

The main reason I structure my class names and aliases is for maintenance. Six months down the road, I may not remember what I did but since I have a naming standard I don't rely on my memory. Six months down the road, I may hire someone to work on my project and with a naming standard they could more easily hit the ground running instead of searching through the source trying to find what class some alias belongs too. Yes, `Ext.ClassManager` holds a mapping of aliases to classes but IMO you shouldn't have to run the application in order to understand the code especially when it's so easy to structure your names.

#### Conclusions

I'm a big believer in self-deprecation programming. I know many like to program in their own way which can easily give them job security. I want to develop the project so that if something happens to me, like I change jobs and let's face it, this happens often in our programming field, that someone else can pick up where I left off and the project remains successful. One way to do this, is proper class name structuring; you can read the source and understand the structure very easily.
