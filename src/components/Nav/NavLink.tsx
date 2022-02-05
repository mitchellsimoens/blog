import { FunctionComponent } from 'react'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { useRouter } from 'next/router'

import Link from '@/components/Link'

interface NavLinkProps {
  className?: string
  href: string
  icon?: IconProp
  label?: string
}

export const NavLink: FunctionComponent<NavLinkProps> = ({
  children,
  className,
  href,
  icon,
  label,
}) => {
  const router = useRouter()
  let classes =
    'border-none text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'

  if (className) {
    classes = `${className} ${classes}`
  }

  const active =
    href === '/' ? router.asPath === href : router.asPath.indexOf(href) === 0

  if (active) {
    classes = `${classes} font-bold`
  }

  return (
    <Link className={classes} href={href} icon={icon} label={label}>
      {children}
    </Link>
  )
}
