
import React, { createContext, useState, useEffect, useContext } from 'react';

type Theme = 'light';

interface ThemeContextType {
  fontSize: string;
  setFontSize: (size: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize font size from localStorage or default
  const [fontSize, setFontSize] = useState<string>(() => {
    return localStorage.getItem('fontSize') || 'medium';
  });
  
  // Apply font size
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous font size classes
    root.classList.remove('text-small', 'text-medium', 'text-large');
    
    // Add new font size class
    root.classList.add(`text-${fontSize}`);
    
    // Save to localStorage
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);
  
  const value = {
    fontSize,
    setFontSize,
  };
  
  return (
    <ThemeContext.Provider value={value}>
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
