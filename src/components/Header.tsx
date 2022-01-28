import { FunctionComponent, useCallback, useState } from 'react'

import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic'

import { Nav } from '@/components/Nav'
import { AppConfig } from '@/utils/AppConfig'

const ThemeButton = dynamic(() => import('@/components/ThemeButton'), {
  ssr: false,
})

export const Header: FunctionComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const onMenuClick = useCallback(
    () => setMenuOpen(!menuOpen),
    [menuOpen, setMenuOpen],
  )

  const navClassName = menuOpen ? 'flex' : 'hidden'

  return (
    <div className="border-b border-gray-300 dark:border-slate-500">
      <div className="pb-8 md:pt-16 md:pb-8">
        <div className="items-center md:flex">
          <div className="flex items-center justify-end md:order-2">
            <ThemeButton />

            <FontAwesomeIcon
              className="cursor-pointer md:hidden"
              icon={faBars}
              onClick={onMenuClick}
            />
          </div>

          <div className="flex-1 text-2xl font-bold text-slate-600 dark:text-slate-300 md:text-3xl">
            {AppConfig.title}
          </div>
        </div>

        <div className="md:text-xl">{AppConfig.description}</div>
      </div>

      <Nav
        className={`${navClassName} absolute inset-x-2 top-8 z-20 flex-col rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800 dark:shadow-none dark:shadow-slate-500 md:relative md:top-0 md:flex md:flex-row md:space-x-6 md:rounded-none md:bg-transparent md:p-0 md:shadow-none md:dark:bg-transparent`}
      />
    </div>
  )
}
