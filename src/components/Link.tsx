import { FunctionComponent } from 'react'

import NextLink from 'next/link'

interface Props {
  as?: string
  href: string
}

const Link: FunctionComponent<Props> = ({ as, children, href }) => (
  <NextLink as={as} href={href}>
    <a>{children}</a>
  </NextLink>
)

export default Link
