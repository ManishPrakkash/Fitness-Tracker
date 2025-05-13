import { createContext, useState, useEffect } from 'react';

// Available themes
const themes = {
  light: {
    id: 'light',
    name: 'Light Mode',
  },
  dark: {
    id: 'dark',
    name: 'Dark Mode',
  },
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check if user has theme preference in localStorage or prefer color scheme
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes[savedTheme]) {
      return themes[savedTheme].id;
    }
    
    // Check for system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return themes.dark.id;
    }
    
    return themes.light.id; // Default theme
  });

  // Apply theme class to the document
  useEffect(() => {
    if (currentTheme === themes.dark.id) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setCurrentTheme(prevTheme => 
      prevTheme === themes.light.id ? themes.dark.id : themes.light.id
    );
  };

  // Set a specific theme
  const setTheme = (themeId) => {
    if (themes[themeId]) {
      setCurrentTheme(themeId);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        isDarkMode: currentTheme === themes.dark.id,
        toggleTheme,
        setTheme,
        themes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};