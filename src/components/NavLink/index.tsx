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

  // TODO checkout for relative links for header nav links?
  const active = router.asPath === href

  if (active) {
    classes = `${classes} font-bold`
  }

  return (
    <Link href={href}>
      <a className={classes}>{children}</a>
    </Link>
  )
}
