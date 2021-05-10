import Head from 'next/head';
import { FunctionComponent } from 'react';
import Body from './Body';
import Html from './Html';
import ThemeButton from './ThemeButton';
import Providers from '../state/Providers';

interface Props {
  title: string;
}

const Layout: FunctionComponent<Props> = ({ children, title }) => (
  <Providers>
    <Html />
    <Head>
      <title>{title}</title>
    </Head>
    <Body />
    <ThemeButton />

    {children}
  </Providers>
);

export default Layout;
