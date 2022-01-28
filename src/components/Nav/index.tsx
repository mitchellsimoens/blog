import { FunctionComponent } from 'react'

import {
  faGithub,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'

import { NavLink } from './NavLink'

interface NavProps {
  className?: string
}

export const Nav: FunctionComponent<NavProps> = ({ className }) => (
  <nav className={className}>
    <ul className="w-full flex-wrap text-xl md:flex">
      <li className="mr-6">
        <NavLink href="/">Home</NavLink>
      </li>

      <li className="mr-6">
        <NavLink href="/blog">Blog</NavLink>
      </li>

      <li className="mr-6">
        <NavLink href="/about">About</NavLink>
      </li>

      <li className="flex flex-1 flex-row justify-end">
        <NavLink
          className="mr-3"
          href="https://github.com/mitchellsimoens/blog"
          icon={faGithub}
          id="GitHub"
        />

        <NavLink
          className="mr-3"
          href="https://twitter.com/LikelyMitch"
          icon={faTwitter}
          id="Twitter"
        />

        <NavLink
          className="mr-3"
          href="https://www.linkedin.com/in/mitchellsimoens/"
          icon={faLinkedin}
          id="LinkedIn"
        />
      </li>
    </ul>
  </nav>
)
