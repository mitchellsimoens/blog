import { FunctionComponent, ReactNode } from 'react'

import { NavLink } from '@/components/NavLink'
import { AppConfig } from '@/utils/AppConfig'

interface MainProps {
  meta: ReactNode
}

export const Main: FunctionComponent<MainProps> = ({ meta, children }) => (
  <div className="antialiased w-full text-gray-700 px-1">
    {meta}

    <div className="max-w-screen-md mx-auto">
      <div className="border-b border-gray-300">
        <div className="pt-16 pb-8">
          <div className="font-bold text-3xl text-gray-900">
            {AppConfig.title}
          </div>
          <div className="text-xl">{AppConfig.description}</div>
        </div>
        <div>
          <ul className="flex flex-wrap text-xl">
            <li className="mr-6">
              <NavLink href="/">Home</NavLink>
            </li>
            <li className="mr-6">
              <NavLink href="/blog/">Blog</NavLink>
            </li>
            <li className="mr-6">
              <NavLink href="/about/">About</NavLink>
            </li>
            <li className="mr-6">
              <NavLink href="https://github.com/mitchellsimoens/blog">
                GitHub
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="py-5 text-xl content">{children}</div>

      <div className="border-t border-gray-300 text-center py-8 text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}.
      </div>
    </div>
  </div>
)
