import { FunctionComponent, MouseEventHandler, useCallback } from 'react'

import { faMoon, faSun, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useTheme } from '@/state/theme/useTheme'

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLDivElement>
}

const Button: FunctionComponent<ButtonProps> = ({ children, onClick }) => (
  <div
    className="inline-block cursor-pointer rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
    onClick={onClick}
  >
    {children}
  </div>
)

const ThemeButton: FunctionComponent = () => {
  const [theme, setTheme] = useTheme()

  const goDark = useCallback(
    () => setTheme({ mode: 'dark', system: false }),
    [setTheme],
  )
  const goLight = useCallback(
    () => setTheme({ mode: 'light', system: false }),
    [setTheme],
  )
  const goSystem = useCallback(
    () => setTheme({ mode: 'auto', system: true }),
    [setTheme],
  )

  return (
    <>
      {theme.mode === 'light' && (
        <Button onClick={goDark}>
          <FontAwesomeIcon icon={faMoon} title="Use Dark Mode" />
        </Button>
      )}
      {theme.mode === 'dark' && (
        <Button onClick={goLight}>
          <FontAwesomeIcon icon={faSun} title="Use Light Mode" />
        </Button>
      )}
      {!theme.system && (
        <Button onClick={goSystem}>
          <FontAwesomeIcon icon={faTimesCircle} title="Use System Setting" />
        </Button>
      )}
    </>
  )
}

export default ThemeButton
