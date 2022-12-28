import React from 'react';

export type ThemeMode = 'light' | 'dark';

export const DEFAULT_THEME_MODE: ThemeMode = 'light';

export const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';

export const THEME_MODE_VAR_NAME = 'themeMode';

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType>(
  {} as ThemeContextType,
);

export const useThemeContext = () => React.useContext(ThemeContext);
