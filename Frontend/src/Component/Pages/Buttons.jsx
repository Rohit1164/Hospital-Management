import { useTheme } from "../../Context/ThemeProvider";

function Buttons({ children }) {
  const { darkMode } = useTheme();

  return (
    <button
      className={`px-4 py-2 ml-[1000px] mt-72 fixed rounded font-semibold transition ${
        darkMode
          ? "bg-blue-600 hover:bg-blue-500 text-white"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
    >
      {children}
    </button>
  );
}

export default Buttons;
