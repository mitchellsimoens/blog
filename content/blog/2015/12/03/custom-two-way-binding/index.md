---
title: Custom Two Way Binding!
date: "2015-12-03T16:39:03.284Z"
---

When [Ext JS](https://www.sencha.com/products/extjs/) 5 was released it brought with it data binding including two-way data binding. Although some argue that two way data binding is an anti-pattern, it does have it's uses. Many Ext JS components have two-way binding ready by default (for example, [this Kitchen Sink example](http://examples.sencha.com/extjs/6.0.1/examples/kitchensink/#binding-two-way)) but there may be cases where you want to setup a custom bindings. At a high level, what I want is when one component changes, another component changes in response automatically and if that second component changes, the first component also changes.

## First Attempt

As a use case, I was recently asked how to collapse/expand a `Ext.form.FieldSet` using data binding. Without any custom things, it's possible like so:

<iframe style="border: 0;height: 600px;width: 600px;" src="https://fiddle.sencha.com/fiddle/120u"></iframe>

In this fiddle, the`Ext.form.field.Checkbox` under the `FieldSet` will toggle whether the `FieldSet` is expanded or not. However, that's kind of weird because we are binding to `expanded` but that's not a config of `FieldSet`. The reason I used it is because binding requires a setter function so in this case the `FieldSet` needs (and does albeit being private) have a `setExpanded` method in order for binding to work. `FieldSet` does have a `collapsed` config but binding needs a setter and there is no `setCollapsed` method. We could create a simple override to add one:

<iframe style="border: 0;height: 600px;width: 600px;" src="https://fiddle.sencha.com/fiddle/120v"></iframe>

That looks better! However, if we manually collapse/expand the `FieldSet`, the `Checkbox` will not reflect this change so it's only one-way currently. This is where we need to do some custom stuff in order to have two-way binding. There are two ways to have two-way binding and which to use depends on if the config you want to change is within the config object (so setter and getter methods are automatically created for you).

## Manual Two-Way Binding

To get the new value up to the `Ext.app.ViewModel` on the form, the `publishState` method must be executed passing in the name and value. The `FieldSet` will fire `collapse` and `expand` events when it has been collapsed/expanded so we can add listeners to it in order to execute that `publishState` method:

<iframe style="border: 0;height: 600px;width: 600px;" src="https://fiddle.sencha.com/fiddle/120t"></iframe>

In the `initComponent` method, I add listeners to the `collapse` and `expand` events which will execute the `publishCollapsed` method. If rendered, this will execute `publishState` meaning two-way binding is setup.

## Automatic Two-Way Binding

Like I said before, the way to know if you need to hookup the `publishState` method execution or if Ext JS can handle it automatically for you is whether the config you are binding to is within the config object. The `collapsed` config is not part of the config object but what if we had a custom config, how can we get that custom config to be two-way bindable? This is where `twoWayBindable` comes in handy to hook things up for us:

<iframe style="border: 0;height: 600px;width: 600px;" src="https://fiddle.sencha.com/fiddle/121e"></iframe>

When `setFoo` is executed, we check to see if the `FieldSet` is already collapsed/expanded and then execute the `setExpanded` if not. We had to add the `setFoo` call to `setExpanded` also to hook into when the `FieldSet` is manually collapsed/expanded by the user. That has nothing to do with the binding tho, the bit to pay attention to is the config object and the `twoWayBindable` property. The `twoWayBindable` property is an array of configs and it will then hook into the `updater` for that config to then automatically execute that `publishState` method. So the binding is automatic, the other code is to handle collapsing/expanding when the `foo` config changes.

## Summary

Data binding can be a bit mysterious but having some form of understanding the sequence of things helps go a long way. Knowing that `publishState` and having an associated setter method are important pieces of the binding puzzle. For more, check out the [guide](http://docs.sencha.com/extjs/6.0/application_architecture/view_models_data_binding.html) that goes over binding.
