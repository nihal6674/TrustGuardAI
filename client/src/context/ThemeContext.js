import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('APP_THEME');
      if (saved === 'dark') setDarkMode(true);
    })();
  }, []);

  const toggleTheme = async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    await AsyncStorage.setItem('APP_THEME', newMode ? 'dark' : 'light');
  };

  const theme = darkMode
    ? {
        ...MD3DarkTheme,
        colors: { ...MD3DarkTheme.colors, primary: '#0D9488', background: '#0F172A' },
      }
    : {
        ...MD3LightTheme,
        colors: { ...MD3LightTheme.colors, primary: '#0D9488', background: '#F8FAFC' },
      };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
