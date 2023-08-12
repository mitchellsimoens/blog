import { FunctionComponent } from 'react'

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

interface Props {
  children: React.ReactNode
}

const Providers: FunctionComponent<Props> = ({ children }) => (
  <NextUIProvider>
    <NextThemesProvider attribute="class" defaultTheme="dark">
      {children}
    </NextThemesProvider>
  </NextUIProvider>
)

export default Providers
