import { Component, FunctionComponent } from 'react'
import '../styles/globals.css'

interface Props {
  Component: typeof Component
  pageProps: any
}

const MyApp: FunctionComponent<Props> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)

export default MyApp
