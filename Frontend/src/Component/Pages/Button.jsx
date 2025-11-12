import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../Context/ThemeProvider";

function Button() {
  const { darkMode, setDarkMode } = useTheme();
  return (
    <button
      onClick={() => setDarkMode((d) => !d)}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
}

export default Button;
