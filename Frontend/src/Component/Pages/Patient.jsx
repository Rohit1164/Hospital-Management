// import { FileText, User, CalendarDays, Bell } from "lucide-react";
// import { useTheme } from "../../Context/ThemeProvider";

// export default function PatientDashboard() {
//   const { darkMode } = useTheme();

//   const upcoming = [
//     { doctor: "Dr. Sharma", date: "12 Nov", time: "9:30 AM" },
//     { doctor: "Dr. Aditi", date: "14 Nov", time: "2:00 PM" },
//   ];

//   return (
//     <div
//       className={`min-h-screen bg-gray-100 p-6 ${
//         darkMode
//           ? "bg-gray-900 text-gray-100 border-gray-800"
//           : "bg-white text-gray-800 border-gray-200"
//       }`}
//     >
//       <header className="bg-white shadow-md rounded-xl p-5 mb-6">
//         <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//           <User /> Patient Dashboard
//         </h1>
//         <p className="text-gray-500 text-sm">Hi, Welcome to your portal!</p>
//       </header>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <button className="p-5 bg-white rounded-xl shadow flex flex-col items-center hover:bg-gray-50">
//           <CalendarDays size={32} />
//           <p className="font-semibold mt-2">Book Appointment</p>
//         </button>

//         <button className="p-5 bg-white rounded-xl shadow flex flex-col items-center hover:bg-gray-50">
//           <FileText size={32} />
//           <p className="font-semibold mt-2">View Reports</p>
//         </button>

//         <button className="p-5 bg-white rounded-xl shadow flex flex-col items-center hover:bg-gray-50">
//           <Bell size={32} />
//           <p className="font-semibold mt-2">Notifications</p>
//         </button>
//       </div>

//       {/* Upcoming Appointments */}
//       <div className="bg-white p-5 rounded-xl shadow">
//         <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//           <CalendarDays /> Upcoming Appointments
//         </h2>

//         {upcoming.map((u, i) => (
//           <div
//             key={i}
//             className="p-3 border-b last:border-none hover:bg-gray-50"
//           >
//             <p className="font-semibold">{u.doctor}</p>
//             <p className="text-gray-600">
//               {u.date} • {u.time}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { FileText, User, CalendarDays, Bell } from "lucide-react";
import { useTheme } from "../../Context/ThemeProvider";

export default function PatientDashboard() {
  const { darkMode } = useTheme();

  const upcoming = [
    { doctor: "Dr. Sharma", date: "12 Nov", time: "9:30 AM" },
    { doctor: "Dr. Aditi", date: "14 Nov", time: "2:00 PM" },
  ];

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Header */}
      <header
        className={`rounded-xl p-5 mb-6 shadow-md transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <User /> Patient Dashboard
        </h1>
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          Hi, Welcome to your portal!
        </p>
      </header>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { icon: <CalendarDays size={32} />, label: "Book Appointment" },
          { icon: <FileText size={32} />, label: "View Reports" },
          { icon: <Bell size={32} />, label: "Notifications" },
        ].map((action, i) => (
          <button
            key={i}
            className={`p-5 rounded-xl shadow flex flex-col items-center transition-all duration-200 ${
              darkMode
                ? "bg-gray-800 hover:bg-gray-700 text-gray-100"
                : "bg-white hover:bg-gray-50 text-gray-800"
            }`}
          >
            {action.icon}
            <p className="font-semibold mt-2">{action.label}</p>
          </button>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <div
        className={`rounded-xl p-5 shadow transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <CalendarDays /> Upcoming Appointments
        </h2>

        {upcoming.map((u, i) => (
          <div
            key={i}
            className={`p-3 border-b last:border-none transition-colors ${
              darkMode
                ? "border-gray-700 hover:bg-gray-700"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <p className="font-semibold">{u.doctor}</p>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {u.date} • {u.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
