import { useEffect } from 'react'
import { useTheme } from '../state/theme/useTheme'

const Html = () => {
  const [theme] = useTheme()

  useEffect(() => {
    if (theme.mode === 'dark') {
      document.documentElement.classList.add(theme.mode)
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return null
}

export default Html
