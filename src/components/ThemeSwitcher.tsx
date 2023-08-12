import { FunctionComponent, useCallback } from 'react'

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from 'next-themes'

const ThemeSwitcher: FunctionComponent = () => {
  const { theme, setTheme } = useTheme()

  const onClick = useCallback(
    () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    [theme, setTheme],
  )

  return theme === 'dark' ? (
    <button key="light-mode-switcher" onClick={onClick}>
      <FontAwesomeIcon icon={faSun} title="Use Light Mode" />
    </button>
  ) : (
    <button key="dark-mode-switcher" onClick={onClick}>
      <FontAwesomeIcon icon={faMoon} title="Use Dark Mode" />
    </button>
  )
}

export default ThemeSwitcher
