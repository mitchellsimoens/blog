import { FunctionComponent } from 'react'

import { useRouter } from 'next/router'

import Link from '@/components/Link'

interface NavLinkProps {
  className?: string
  href: string
}

export const NavLink: FunctionComponent<NavLinkProps> = ({
  children,
  className,
  href,
}) => {
  const router = useRouter()
  let classes = 'text-gray-700 border-none hover:text-gray-900'

  if (className) {
    classes = `${className} ${classes}`
  }

  const active =
    href === '/' ? router.asPath === href : router.asPath.indexOf(href) === 0

  if (active) {
    classes = `${classes} font-bold`
  }

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  )
}
