import { FunctionComponent } from 'react'
import { ThemeProvider } from './theme/Provider'

const Providers: FunctionComponent = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

export default Providers
