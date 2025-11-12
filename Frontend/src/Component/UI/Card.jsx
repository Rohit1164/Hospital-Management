import { useTheme } from "../../Context/ThemeProvider";

export default function Card({ title, children }) {
  const { darkMode } = useTheme();

  return (
    <div
      className={`p-4 rounded-xl border shadow-sm transition-all duration-300 ${
        darkMode
          ? "bg-gray-800 text-gray-100 border-gray-700"
          : "bg-white text-gray-800 border-gray-200"
      }`}
    >
      {title && (
        <div
          className={`font-semibold mb-3 ${
            darkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {title}
        </div>
      )}

      <div
        className={`transition-colors ${
          darkMode ? "text-gray-200" : "text-gray-700"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
