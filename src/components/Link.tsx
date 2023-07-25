import { FunctionComponent, HTMLAttributeAnchorTarget } from 'react'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NextLink from 'next/link'

interface Props {
  as?: string
  children: React.ReactNode
  className?: string
  href: string
  icon?: IconProp
  isRelative?: boolean
  label?: string
  target?: HTMLAttributeAnchorTarget
}

const Link: FunctionComponent<Props> = ({
  as,
  children,
  className,
  href,
  icon,
  label,
  isRelative = href.search(/^^(?:https?:)/i) < 0,
  target = isRelative ? undefined : '_blank',
}) => (
  <NextLink
    as={as}
    href={href}
    className={`${className} dark:text-slate-200`}
    aria-label={label}
    target={target}
    rel={target === '_blank' ? 'noopener' : undefined}
  >
    {children}
    {icon && <FontAwesomeIcon icon={icon} />}
  </NextLink>
)

export default Link
