import { FunctionComponent } from 'react'

import { config } from '@fortawesome/fontawesome-svg-core'
import { AppProps } from 'next/app'

import '@fortawesome/fontawesome-svg-core/styles.css'

import '../styles/global.css'

config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)

export default MyApp
