'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('dark');

  const applyTheme = useCallback((resolved: ResolvedTheme) => {
    setResolvedTheme(resolved);
    if (resolved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      localStorage.setItem('theme', newTheme);
      if (newTheme === 'system') {
        const systemDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        applyTheme(systemDark ? 'dark' : 'light');
      } else {
        applyTheme(newTheme);
      }
    },
    [applyTheme]
  );

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    const initial = stored || 'system';
    setThemeState(initial);

    if (initial === 'system') {
      const systemDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      applyTheme(systemDark ? 'dark' : 'light');
    } else {
      applyTheme(initial);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      const currentTheme = localStorage.getItem('theme') as Theme | null;
      if (!currentTheme || currentTheme === 'system') {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
