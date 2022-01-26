import { FunctionComponent, ReactNode } from 'react'

import {
  faGithub,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { NavLink } from '@/components/NavLink'
import ThemeButton from '@/components/ThemeButton'
import { Body } from '@/layout/Body'
import Providers from '@/state/Providers'
import { AppConfig } from '@/utils/AppConfig'

interface MainProps {
  meta: ReactNode
}

export const Main: FunctionComponent<MainProps> = ({ meta, children }) => (
  <Providers>
    <Body />
    <div className="w-full px-1">
      {meta}

      <div className="mx-auto max-w-screen-md">
        <div className="border-b border-gray-300 dark:border-slate-500">
          <div className="pt-16 pb-8">
            <div className="flex items-center">
              <div className="flex-1 text-3xl font-bold text-slate-300">
                {AppConfig.title}
              </div>
              <div>
                <ThemeButton />
              </div>
            </div>
            <div className="text-xl">{AppConfig.description}</div>
          </div>
          <nav>
            <ul className="flex flex-wrap text-xl">
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
                >
                  <FontAwesomeIcon icon={faGithub} />
                </NavLink>
                <NavLink
                  className="mr-3"
                  href="https://twitter.com/LikelyMitch"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </NavLink>
                <NavLink
                  className="mr-3"
                  href="https://www.linkedin.com/in/mitchellsimoens/"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className="content py-5 text-xl">{children}</div>

        <div className="border-t border-gray-300 py-8 text-center text-sm dark:border-slate-500">
          © Copyright {new Date().getFullYear()} {AppConfig.title}.
        </div>
      </div>
    </div>
  </Providers>
)
