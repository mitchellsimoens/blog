import Head from 'next/head';
import { FunctionComponent } from 'react';
import Body from './Body';
import Container from './Container';
import Header from './Header';
import Html from './Html';
import ThemeButton from './ThemeButton';
import Providers from '../state/Providers';
import { Variants } from '../types/components/Container';

interface Props {
  containerVariant?: Variants;
  title: string;
}

const Layout: FunctionComponent<Props> = ({ children, containerVariant, title }) => (
  <Providers>
    <Html />
    <Head>
      <title>{title}</title>
    </Head>
    <Body />

    <Container variant={containerVariant}>
      <div className="flex justify-end">
        <ThemeButton />
      </div>

      <Header />

      {children}
    </Container>
  </Providers>
);

export default Layout;
