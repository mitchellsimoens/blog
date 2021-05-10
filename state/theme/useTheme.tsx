import { useContext } from 'react';
import { ThemeContext } from './Context';

export const useTheme= () => useContext(ThemeContext);
