import { FunctionComponent, useEffect, useState } from 'react';
import { Theme } from '../../types/theme';
import { ThemeContext } from './Context';

const osDarkMode = typeof window !== "undefined" && window.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultTheme: Theme = { mode: 'auto', system: true  };

export const ThemeProvider: FunctionComponent = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && osDarkMode)) {
      setTheme({ mode: 'dark', system: false });
    } else {
      setTheme({ mode: 'auto', system: true });
    }
  }, []);

  // manage localStorage
  useEffect(() => {
    switch (theme.mode) {
      case 'dark':
        localStorage.theme = 'dark';
        break;
      case 'light':
        localStorage.theme = 'light';
        break;
      default:
        if (osDarkMode) {
          setTheme({ mode: 'dark', system: true });
        } else {
          localStorage.removeItem('theme');
        }
    }
  }, [theme]);

  return <ThemeContext.Provider value={[theme, setTheme ]}>{children}</ThemeContext.Provider>;
}
