import { FunctionComponent, HTMLAttributeAnchorTarget } from 'react'

import NextLink from 'next/link'

interface Props {
  as?: string
  className?: string
  href: string
  isRelative?: boolean
  target?: HTMLAttributeAnchorTarget
}

const Link: FunctionComponent<Props> = ({
  as,
  children,
  className,
  href,
  isRelative = href.search(/^^(?:https?:)/i) < 0,
  target = isRelative ? undefined : '_blank',
}) => (
  <NextLink as={as} href={href}>
    <a className={className} target={target}>
      {children}
    </a>
  </NextLink>
)

export default Link
