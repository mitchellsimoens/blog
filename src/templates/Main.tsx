import { FunctionComponent, ReactNode } from 'react'

import { Header } from '@/components/Header'
import Providers from '@/state/Providers'
import { AppConfig } from '@/utils/AppConfig'

interface MainProps {
  meta: ReactNode
}

export const Main: FunctionComponent<MainProps> = ({ meta, children }) => (
  <Providers>
    <div className="w-full px-1">
      {meta}

      <div className="mx-auto max-w-screen-md">
        <Header />

        <div className="content py-5 text-xl">{children}</div>

        <div className="border-t border-gray-300 py-8 text-center text-sm dark:border-slate-500">
          © Copyright {new Date().getFullYear()} {AppConfig.title}.
        </div>
      </div>
    </div>
  </Providers>
)
