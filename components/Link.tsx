import NextLink from 'next/link';
import { FunctionComponent } from 'react';

interface Props {
  as?: string;
  href: string;
}

const Link: FunctionComponent<Props> = ({ as, children, href }) => (
  <NextLink as={as} href={href}>
    <a className="hover:underline">{children}</a>
  </NextLink>
);

export default Link;