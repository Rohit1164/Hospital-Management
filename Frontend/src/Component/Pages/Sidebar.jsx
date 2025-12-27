import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarDays,
  FileText,
  Receipt,
  Pill,
  FlaskConical,
} from "lucide-react";
import { useTheme } from "../../Context/ThemeProvider";

export default function Sidebar({ open = true }) {
  const { darkMode } = useTheme();

  const links = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      to: "/dashboard/patient_dashboard",
      label: "Patients",
      icon: <Users size={18} />,
    },
    {
      to: "/dashboard/doctors",
      label: "Doctors",
      icon: <Stethoscope size={18} />,
    },
    {
      to: "/dashboard/appointments",
      label: "Appointments",
      icon: <CalendarDays size={18} />,
    },
    {
      to: "/dashboard/records",
      label: "Medical Records",
      icon: <FileText size={18} />,
    },
    {
      to: "/dashboard/billing",
      label: "Billing",
      icon: <Receipt size={18} />,
    },
    {
      to: "/dashboard/pharmacy",
      label: "Pharmacy",
      icon: <Pill size={18} />,
    },
    {
      to: "/dashboard/labs",
      label: "Labs",
      icon: <FlaskConical size={18} />,
    },
  ];

  return (
    <aside
      className={`${
        open ? "w-64" : "w-20"
      }bg-white border-r shadow-sm  transition-all duration-300 flex flex-col  ${
        darkMode
          ? "bg-gray-900 text-gray-100 border-gray-800"
          : "bg-white text-gray-800 border-gray-200"
      }`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-center gap-2 p-4 border-b">
        <div className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-lg font-bold">
          H
        </div>
        {open && <span className="text-xl font-bold text-gray-700">HMS</span>}
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3 my-1 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-700 border-l-4 border-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            <div className="text-gray-500">{icon}</div>
            {open && <span className="font-medium text-sm">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t text-center text-xs text-gray-400">
        © 2025 HMS
      </div>
    </aside>
  );
}
