import {useMediaQuery} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import React from 'react';
import {
  DARK_SCHEME_QUERY,
  DEFAULT_THEME_MODE,
  ThemeContext,
  ThemeMode,
  THEME_MODE_VAR_NAME,
} from './ThemeContext';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const systemPrefersDark = useMediaQuery(DARK_SCHEME_QUERY);

  const [themeMode, setThemeMode] =
    React.useState<ThemeMode>(DEFAULT_THEME_MODE);

  const toggleTheme = () => {
    const newThemeMode: ThemeMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newThemeMode);
    postMessage(newThemeMode);
    localStorage.setItem(THEME_MODE_VAR_NAME, newThemeMode);
  };

  React.useEffect(() => {
    const mode = localStorage.getItem(THEME_MODE_VAR_NAME);
    if (mode === 'dark' || mode === 'light') {
      setThemeMode(mode);
    } else {
      setThemeMode(systemPrefersDark ? 'dark' : DEFAULT_THEME_MODE);
    }
  }, [systemPrefersDark]);

  return (
    <ThemeContext.Provider value={{themeMode, toggleTheme}}>
      <MuiThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
