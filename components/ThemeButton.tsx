import { useCallback } from 'react'
import { useTheme } from '../state/theme/useTheme'
import { faMoon, faSun, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ThemeButton = () => {
  const [theme, setTheme] = useTheme()

  const goDark = useCallback(
    () => setTheme({ mode: 'dark', system: false }),
    [],
  )
  const goLight = useCallback(
    () => setTheme({ mode: 'light', system: false }),
    [],
  )
  const goSystem = useCallback(
    () => setTheme({ mode: 'auto', system: true }),
    [],
  )

  return (
    <>
      {theme.mode === 'light' ? (
        <FontAwesomeIcon icon={faMoon} title="Use Dark Mode" onClick={goDark} />
      ) : null}
      {theme.mode === 'dark' ? (
        <FontAwesomeIcon
          icon={faSun}
          title="Use Light Mode"
          onClick={goLight}
        />
      ) : null}
      {theme.system ? null : (
        <FontAwesomeIcon
          icon={faTimesCircle}
          title="Use System Setting"
          onClick={goSystem}
        />
      )}
    </>
  )
}

export default ThemeButton
