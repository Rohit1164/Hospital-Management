import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext);
}
