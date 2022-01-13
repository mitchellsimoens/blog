import { FunctionComponent } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

interface NavLinkProps {
  href: string
}

export const NavLink: FunctionComponent<NavLinkProps> = ({
  children,
  href,
}) => {
  const router = useRouter()
  const isRelative = href[0] === '/'
  let classes = 'text-gray-700 border-none hover:text-gray-900'

  if (!isRelative) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    )
  }

  const active =
    href === '/' ? router.asPath === href : router.asPath.indexOf(href) === 0

  console.log({ asPath: router.asPath, href })

  if (active) {
    classes = `${classes} font-bold`
  }

  return (
    <Link href={href}>
      <a className={classes}>{children}</a>
    </Link>
  )
}
