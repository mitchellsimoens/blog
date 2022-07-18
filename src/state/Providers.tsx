import { FunctionComponent } from 'react'

import { ThemeProvider } from './theme/Provider'

interface Props {
  children: React.ReactNode
}

const Providers: FunctionComponent<Props> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

export default Providers
