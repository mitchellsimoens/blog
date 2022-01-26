import { FunctionComponent, useEffect } from 'react'

export const Body: FunctionComponent = () => {
  useEffect(() => {
    // remove other classes
    document.body.className = ''

    // assign new class
    document.body.className =
      'antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900'
  }, [])

  return null
}
