import { Bell, Menu, LogOut } from "lucide-react";
import Button from "../Pages/Button";
import { useTheme } from "../../Context/ThemeProvider";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL_ADMIN;

export default function Navbar({ onToggleSidebar }) {
  const { darkMode, setDarkMode } = useTheme();
  const [admin, setAdmin] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = (await axios(BASE_URL)).data;

        // console.log(data.admin[0]);
        // console.log(data.admin[0].name);
        // console.log(data.admin[0].profilePic);
        setAdmin(data.admin[0]);
      } catch (error) {
        console.log("Admin Error", error.message);
      }
    }
    fetchData();
  }, []);

  function handleLogout() {
    console.log(localStorage.removeItem("token"));
    // navigate("/login");
  }

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
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        <Button darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Admin Profile */}
        {admin && (
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right leading-tight">
              <span className="font-medium text-sm">{admin.name}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Administrator
              </span>
            </div>

            <img
              src={
                admin?.profilePic
                  ? `http://localhost:8001/${admin.profilePic}`
                  : `https://api.dicebear.com/7.x/initials/svg?seed=${
                      admin?.name || "Admin"
                    }`
              }
              className="w-10 h-10 rounded-full"
              alt="profile"
            />
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
