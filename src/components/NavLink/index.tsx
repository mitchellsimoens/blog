import { FunctionComponent } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

interface NavLinkProps {
  href: string
}

export const NavLink: FunctionComponent<NavLinkProps> = (props) => {
  const router = useRouter()
  const isRelative = props.href[0] === '/'
  let classes = 'text-gray-700 border-none hover:text-gray-900'

  if (!isRelative) {
    return (
      <a className={classes} href={props.href}>
        {props.children}
      </a>
    )
  }

  // TODO checkout for relative links for header nav links?
  const active = router.asPath === props.href

  if (active) {
    classes = `${classes} font-bold`
  }

  return (
    <Link href={props.href}>
      <a className={classes}>{props.children}</a>
    </Link>
  )
}
