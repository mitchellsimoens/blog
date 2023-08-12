import { FunctionComponent, useState } from 'react'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from '@nextui-org/react'
import dynamic from 'next/dynamic'

import { NavLink } from '@/components/NavLink'
import { siteDescription } from '@/constants'

const ThemeSwitcher = dynamic(() => import('@/components/ThemeSwitcher'), {
  ssr: false,
})

export const Header: FunctionComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="border-b border-divider">
      <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit">Mitchell Simoens</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/about">About</NavLink>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          <NavLink menu href="/">
            Home
          </NavLink>
          <NavLink menu href="/blog">
            Blog
          </NavLink>
          <NavLink menu href="/about">
            About
          </NavLink>
        </NavbarMenu>
      </Navbar>

      <div className="py-2 md:text-xl">{siteDescription}</div>
    </div>
  )
}
