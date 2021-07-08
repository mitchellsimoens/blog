import { Component, FunctionComponent } from 'react';
// remove the following if the JIT plugin in
// postcss.config.js works without throwing
// theme in undefined error
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

interface Props {
  Component: typeof Component;
  pageProps: any;
}

const MyApp: FunctionComponent<Props> = ({ Component, pageProps }) => <Component {...pageProps} />;

export default MyApp;
