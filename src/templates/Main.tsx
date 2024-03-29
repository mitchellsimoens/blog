import { FunctionComponent, ReactNode } from 'react'

import { Header } from '@/components/Header'
import Mermaid from '@/components/Mermaid'
import { siteTitle } from '@/constants'
import Providers from '@/state/Providers'

interface MainProps {
  children: React.ReactNode
  meta: ReactNode
}

export const Main: FunctionComponent<MainProps> = ({ meta, children }) => (
  <Providers>
    <Mermaid />

    <div className="w-full px-1">
      {meta}

      <div className="mx-auto max-w-screen-md">
        <Header />

        <div className="content py-5 text-xl">{children}</div>

        <div className="border-t border-divider py-8 text-center text-sm">
          © Copyright {new Date().getFullYear()} {siteTitle}
        </div>
      </div>
    </div>
  </Providers>
)
