---
title: React State Provider with Hooks
date: '2019-08-01T17:58:03.682Z'
---

I love how simple [React](https://reactjs.org/) makes using global state in an application so simple. It's API is simple, predictable and easy to [grok](https://en.wikipedia.org/wiki/Grok) (IMO). You can have as many state providers as you want to separate chunks of state into logical chunks. Let's say you have a simple email application so you could choose to separate loading emails and the address book into separate state providers. The reason for separating it is each thing has different actions to work with the state. For example, both will have the different CRUD actions but how you work with each may require different application logic.

I'm not going to build everything so you'll have to fill in some blanks. What I want to do is how I structure multiple state providers and later we'll add a way to use React Hooks.

## Using Providers

To add a state provider, you add the provider to your `App` component. So you'll have something like:

```tsx
// src/App.tsx

import React from 'react';
import { AddressBookProvider } from './state/AddressBook.tsx';
import { EmailProvider } from './state/Email.tsx';

const App = () => (
  <AddressBookProvider>
    <EmailProvider>
      // the rest of your application or router
    </EmailProvider>
  </AddressBookProvider>
);

export default App;
```

Like I said, you can have as many providers here as you wish. The more providers you have and what the rest of the `App` component will look like (maybe using [react-router](https://reacttraining.com/react-router/)), the more the `App` component begins to grow in complexity. Instead, I like to create a `Providers` component that will wrap all the providers like we see in the `App` component and it will help simplify the `App` component. The `Providers` component will look almost identical to the `App` component:

```tsx
// src/state/Providers.tsx

import React, { FunctionComponent } from 'react';
import { AddressBookProvider } from './state/AddressBook.tsx';
import { EmailProvider } from './state/Email.tsx';

interface Props {
  children: React.ReactNode;
}

const Providers: FunctionComponent<Props> = ({ children }) => (
  <AddressBookProvider>
    <EmailProvider>
      {children}
    </EmailProvider>
  </AddressBookProvider>
);

export default Providers;
```

And now the `App` component would be able to just use the `Providers` component:

```tsx
// src/App.tsx

import React from 'react';
import Providers from './state/Providers.tsx';

const App = () => (
  <Providers>
    // the rest of your application or router
  </Providers>
);

export default App;
```

So now as your application grows and if you add more providers, your `App` component doesn't increase in complexity and nesting, that is abstracted away by the `Providers` component. I know from these small snippets it doesn't show much benefit but in real applications, organizing in proper places can help tremendously.

## Using Global State

Once you have added the state provider to the `Providers` component (which is then bootstrapped into the `App` component), any component can get the state and will re-render whenever that state changes. To do this, the component will use the state context along with the [`useContext`](https://reactjs.org/docs/hooks-reference.html#usecontext) hook:

```tsx
// src/components/Email/List/index.tsx

import React, { useContext } from 'react';
import { EmailContext, ContextArray, Email } from './state/Email.tsx';

const EmailList = () => {
  const [{ data }, setState]: ContextArray = useContext(EmailContext);

  if (!data) {
    // data hasn't been loaded yet
    // maybe show loading spinner
    return null;
  }

  if (data.length === 0) {
    return <div>No emails!</div>
  }

  return data.map((email: Email) => (
    <div>{email.subject}</div>
  ));
};

export default EmailList;
```

Here, we use React's `useContext` hook and pass it the email context. Check if it was loaded, has emails and finally you get to rendering the email list itself. Now if something else, maybe a search field in a header, filters the emails this `EmailList` component will get re-rendered thanks to using the `useContext` hook. This means there is nothing more you have to do to keep this `EmailList` in sync with that email state; it'll just work.

## Email State

Before we get too far, let's look at what our email state context and provider looks. We'll just look at a small example, I won't complicate it by using [`useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer) even if we would maybe likely use it in this instance just to keep this blog scoped small.

```tsx
// src/state/Email.tsx

import React, { Context, Dispatch, FunctionComponent, SetStateAction, createContext, useContext, useState } from 'react';

export interface Email {
  // more fields...
  subject: string;
}

export interface State {
  data?: Email[];
}

export type ContextArray = [State, Dispatch<SetStateAction<State>>];

export const EmailContext: Context<any> = createContext([{}, Function]);

interface Props {
  children?: React.ReactNode;
}

const EmailProvider: FunctionComponent<Props> = ({ children }) => {
  const [state, setState] = useState<State>({})

  return <EmailContext.Provider value={[state, setState]}>
    {children}
  </EmailContext.Provider>
};

export default EmailProvider;
```

A few things are done here. We have some interfaces to describe the state object and what an email looks like; these could go into your typings directory but we'll keep things simple for this blog. I like to have a type to describe the context array that will be used for `useContext` so each usage can use this one type instead of duplicating the type per usage. The context is created, this is what will hold the state. We create a provider, use the [`useState`](https://reactjs.org/docs/hooks-reference.html#usestate) React Hook passing an empty object.

This is all we need to use state globally in an application. Now I'm not going into how to load the emails or work with them (like filtering to creating a new email), that's just not what I aim to do with this blog.

## Our Own Hook

What we just saw using `useContext` isn't complex, but maybe we can make it a little more approachable. One of my favorite updates to a library I've ever used from any language may be [React Hooks](https://reactjs.org/docs/hooks-intro.html). I love the Hooks api, I have seen them be used in some truly amazing ways. For this blog, let's look at updating our `EmailList` component to use a custom hook and then we'll see how to actually creating the hook:

```tsx
// src/components/Email/List/index.tsx

import React from 'react';
import { ContextArray, Email, useEmails } from './state/Email.tsx';

const EmailList = () => {
  const [{ data }, setState]: ContextArray = useEmails();

  if (!data) {
    // data hasn't been loaded yet
    // maybe show loading spinner
    return null;
  }

  if (data.length === 0) {
    return <div>No emails!</div>
  }

  return data.map((email: Email) => (
    <div>{email.subject}</div>
  ));
};

export default EmailList;
```

Ok, this simple example, not much as changed. Instead of using the `useContext` React Hook, we are using the `useEmails` custom hook we will create shortly. The reason I like doing this is there no longer is a need to import the actual context and pass that to React's `useContext`. We are simplifying separate usages, making the "complex" code appear only once in our code base (our `useEmails` hook) but you'll see, it's not complex at all so it's really only a benefit with no sacrifice.

## Our Custom Hook

To create our own hook, all we need to do is add this bit of code to the end of `src/state/Email.tsx`:

```tsx
export const useEmails = () => useContext(EmailContext);
```

So you can see, our hook really just does the `useContext` for us. It's not a huge savings here but it is something I do enjoy. Small wins are still wins in my book!

## Conclusion

This blog only shows some small wins but sometimes small wins have large impacts. Maybe it's from my time working on Ext JS but I tend to think about how I can abstract away duplicate code. While sometimes that abstraction can lead to other issues (like performance), the two things I showed in this blog, the `Providers` component and `useEmails` hook, have only been a good thing for the React projects I've worked on.
