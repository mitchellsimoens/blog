import { Dispatch, SetStateAction, createContext } from 'react'

import { Theme } from '@/types/theme'

const theme: unknown = {}
const setter = () => {}

export const ThemeContext = createContext<
  [Theme, Dispatch<SetStateAction<Theme>>]
>([theme as Theme, setter])
