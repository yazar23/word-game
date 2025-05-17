import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeMode } from '../types';

type ThemeContextType = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('system');
  const [isDark, setIsDark] = useState(false);

  // Check for system preference
  useEffect(() => {
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme('system');
    }
    
    updateIsDark(savedTheme || 'system', systemPreference);
  }, []);

  // Update when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    updateIsDark(theme, systemPreference);
    
    // Listen for system changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        setIsDark(mediaQuery.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Helper to update isDark based on theme and system preference
  const updateIsDark = (currentTheme: ThemeMode, systemPreference: 'dark' | 'light') => {
    if (currentTheme === 'system') {
      setIsDark(systemPreference === 'dark');
    } else {
      setIsDark(currentTheme === 'dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};