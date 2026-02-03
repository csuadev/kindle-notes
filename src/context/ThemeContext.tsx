import { createContext, useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../constants/storageKeys';

enum Theme {
  light = 'light',
  dark = 'dark',
}

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.light,
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const isBrowser = typeof window !== 'undefined';

  const getSystemTheme = (): Theme => {
    if (!isBrowser || !window.matchMedia) return Theme.light;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.dark : Theme.light;
  };

  const getStoredTheme = (): Theme | null => {
    if (!isBrowser) return null;
    const stored = window.localStorage.getItem(STORAGE_KEYS.theme);
    const source = window.localStorage.getItem(STORAGE_KEYS.themeSource);
    if (source !== 'user') return null;
    if (stored === Theme.dark || stored === Theme.light) return stored;
    return null;
  };

  const [hasUserPreference, setHasUserPreference] = useState(() => {
    if (!isBrowser) return false;
    return window.localStorage.getItem(STORAGE_KEYS.themeSource) === 'user';
  });

  const [theme, setTheme] = useState<Theme>(() => getStoredTheme() ?? getSystemTheme());

  const toggleTheme = (): void => {
    setHasUserPreference(true);
    setTheme(prevTheme => (prevTheme === Theme.light ? Theme.dark : Theme.light));
  };

  useEffect(() => {
    if (!isBrowser) return;
    window.localStorage.setItem(STORAGE_KEYS.theme, theme);
    if (hasUserPreference) {
      window.localStorage.setItem(STORAGE_KEYS.themeSource, 'user');
    } else {
      window.localStorage.removeItem(STORAGE_KEYS.themeSource);
    }
  }, [hasUserPreference, isBrowser, theme]);

  useEffect(() => {
    if (!isBrowser || hasUserPreference || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? Theme.dark : Theme.light);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [hasUserPreference, isBrowser]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
