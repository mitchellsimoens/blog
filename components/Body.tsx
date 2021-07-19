import { useEffect } from 'react'

const BodyClass = () => {
  useEffect(() => {
    // remove other classes
    document.body.className = ''

    // assign new classes
    document.body.classList.add(
      'bg-white',
      'dark:bg-gray-800',
      'dark:text-white',
    )
  })

  return null
}

export default BodyClass
