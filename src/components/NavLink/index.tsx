import { FunctionComponent } from 'react'

import { Link, NavbarItem, NavbarMenuItem } from '@nextui-org/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

interface NavLinkProps {
  children?: React.ReactNode
  href: string
  menu?: boolean
}

export const NavLink: FunctionComponent<NavLinkProps> = ({
  children,
  href,
  menu = false,
}) => {
  const router = useRouter()
  const isActive =
    href === '/' ? router.asPath === href : router.asPath.indexOf(href) === 0

  // TODO any type
  const linkProps: any = isActive
    ? { color: 'primary' }
    : { color: 'foreground' }

  if (menu) {
    return (
      <NavbarMenuItem>
        <Link
          href={href}
          as={NextLink}
          className="w-full"
          size="lg"
          {...linkProps}
        >
          {children}
        </Link>
      </NavbarMenuItem>
    )
  }

  return (
    <NavbarItem isActive={isActive}>
      <Link href={href} as={NextLink} {...linkProps}>
        {children}
      </Link>
    </NavbarItem>
  )
}
