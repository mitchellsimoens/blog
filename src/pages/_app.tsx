import { FunctionComponent } from 'react'

import { config } from '@fortawesome/fontawesome-svg-core'
import { AppProps } from 'next/app'

import '@fortawesome/fontawesome-svg-core/styles.css'

import '../styles/global.css'

config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

// It's best to inline this in `head` to avoid FOUC (flash of unstyled content) when changing pages or themes
// if (
//   localStorage.getItem('color-theme') === 'dark' ||
//   (!('color-theme' in localStorage) &&
//     window.matchMedia('(prefers-color-scheme: dark)').matches)
// ) {
//   document.documentElement.classList.add('dark')
// } else {
//   document.documentElement.classList.remove('dark')
// }

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
)

export default MyApp
