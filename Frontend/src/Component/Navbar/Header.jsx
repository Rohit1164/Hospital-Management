import { Bell, Menu, LogOut } from "lucide-react";
import Button from "../Pages/Button";
import { useTheme } from "../../Context/ThemeProvider";

export default function Navbar({ onToggleSidebar }) {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <header
      className={`sticky top-0 z-30 flex items-center justify-between px-6 py-3 shadow-sm border-b transition-all duration-300 ${
        darkMode
          ? "bg-gray-900 text-gray-100 border-gray-800"
          : "bg-white text-gray-800 border-gray-200"
      }`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold tracking-wide">
          <span className="text-blue-600">🏥</span> Hospital Management
          {/* <div className="flex items-center justify-center gap-2 p-4">
            <div className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-lg font-bold">
              H
            </div>
            <span className="text-xl font-bold text-gray-700">HMS</span>
          </div> */}
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        <Button darkMode={darkMode} setDarkMode={setDarkMode} />
        {/* Notification */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
            2
          </span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right leading-tight">
            <span className="font-medium text-sm">Admin</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Administrator
            </span>
          </div>
          <img
            src={`https://avatars.dicebear.com/api/initials/Admin.svg`}
            alt="Admin Avatar"
            className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700"
          />
        </div>

        {/* Logout Button */}
        <button className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
