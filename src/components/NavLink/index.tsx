import { FunctionComponent, HTMLAttributeAnchorTarget } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

interface NavLinkProps {
  className?: string
  href: string
  target?: HTMLAttributeAnchorTarget
}

export const NavLink: FunctionComponent<NavLinkProps> = ({
  children,
  className,
  href,
  target = '_self',
}) => {
  const router = useRouter()
  const isRelative = href[0] === '/'
  let classes = 'text-gray-700 border-none hover:text-gray-900'

  if (className) {
    classes = `${className} ${classes}`
  }

  if (!isRelative) {
    return (
      <a className={classes} href={href} target={target}>
        {children}
      </a>
    )
  }

  const active =
    href === '/' ? router.asPath === href : router.asPath.indexOf(href) === 0

  if (active) {
    classes = `${classes} font-bold`
  }

  return (
    <Link href={href}>
      <a className={classes} target={target}>
        {children}
      </a>
    </Link>
  )
}
