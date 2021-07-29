import { useEffect } from 'react'
import { useTheme } from '../state/theme/useTheme'
import { dark, light } from './backgrounds'

const BodyClass = () => {
  const [theme] = useTheme()

  useEffect(() => {
    // remove other classes
    document.body.className = ''

    // assign new classes
    document.body.classList.add(
      'bg-white',
      'dark:bg-gray-800',
      'text-white',
    )

    if (theme.mode !== 'auto') {
      const backgrounds = theme.mode === 'dark' ? dark : light
      const background =
        backgrounds[Math.floor(Math.random() * backgrounds.length)]

      document.body.style.backgroundImage = `url(/assets/images/background/${background})`
    }
  }, [theme])

  return null
}

export default BodyClass
