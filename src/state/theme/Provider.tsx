import { FunctionComponent, useEffect, useState } from 'react'

import { Theme } from '@/types/theme'

import { ThemeContext } from './Context'

interface Props {
  children: React.ReactNode
}

const osSupportsDarkMode =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
const defaultMode = global.localStorage?.theme || 'auto'
const defaultTheme: Theme = {
  mode: defaultMode,
  system: true,
}

export const ThemeProvider: FunctionComponent<Props> = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    if ('theme' in localStorage) {
      setTheme({
        mode: localStorage.theme,
        system: localStorage.theme === 'dark' && osSupportsDarkMode,
      })
    } else if (osSupportsDarkMode) {
      setTheme({ mode: 'dark', system: false })
    } else {
      setTheme({ mode: 'light', system: false })
    }
  }, [])

  // manage localStorage
  useEffect(() => {
    switch (theme.mode) {
      case 'dark':
        localStorage.theme = 'dark'
        break
      case 'light':
        localStorage.theme = 'light'
        break
      default:
        if (osSupportsDarkMode) {
          setTheme({ mode: 'dark', system: true })
        } else {
          localStorage.removeItem('theme')
        }
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}
