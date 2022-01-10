import { FunctionComponent } from 'react'

import { AppProps } from 'next/app'

import '../styles/global.css'

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)

export default MyApp
