import { FunctionComponent, HTMLAttributeAnchorTarget } from 'react'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NextLink from 'next/link'

interface Props {
  as?: string
  className?: string
  href: string
  id?: string
  icon?: IconProp
  isRelative?: boolean
  target?: HTMLAttributeAnchorTarget
}

const Link: FunctionComponent<Props> = ({
  as,
  children,
  className,
  href,
  icon,
  id,
  isRelative = href.search(/^^(?:https?:)/i) < 0,
  target = isRelative ? undefined : '_blank',
}) => (
  <NextLink as={as} href={href}>
    <a
      className={className}
      id={id}
      target={target}
      rel={target === '_blank' ? 'noopener' : undefined}
    >
      {children}
      {icon && <FontAwesomeIcon icon={icon} />}
    </a>
  </NextLink>
)

export default Link
