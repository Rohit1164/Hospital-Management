// import { useTheme } from "../../Context/ThemeProvider.jsx";
// import Card from "../UI/Card.jsx";
// import { Users, CalendarDays, Stethoscope, Receipt } from "lucide-react"; // icons

// export default function Dashboard() {
//   const { darkMode } = useTheme();
//   const kpis = [
//     {
//       title: "Patients",
//       value: 124,
//       color: "from-blue-500 to-blue-700",
//       icon: <Users className="w-6 h-6" />,
//     },
//     {
//       title: "Appointments",
//       value: 23,
//       color: "from-green-500 to-emerald-600",
//       icon: <CalendarDays className="w-6 h-6" />,
//     },
//     {
//       title: "Doctors",
//       value: 14,
//       color: "from-purple-500 to-indigo-600",
//       icon: <Stethoscope className="w-6 h-6" />,
//     },
//     {
//       title: "Pending Bills",
//       value: 5,
//       color: "from-red-500 to-rose-600",
//       icon: <Receipt className="w-6 h-6" />,
//     },
//   ];

//   const recentAppointments = [
//     { patient: "Rohit Kumar", doctor: "Dr. Meera Rao", time: "10:00 AM" },
//     { patient: "Anita Sharma", doctor: "Dr. Ajay Singh", time: "11:30 AM" },
//     { patient: "Rahul Verma", doctor: "Dr. Sneha Patel", time: "2:00 PM" },
//   ];

//   return (
//     <div
//       className={`h-full space-y-8 ${
//         darkMode
//           ? "bg-gray-900 text-gray-100 border-gray-800"
//           : "bg-white text-gray-800 border-gray-200"
//       }`}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
//         <p className="text-gray-500 text-sm">Welcome back, Admin</p>
//       </div>

//       {/* KPI Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {kpis.map((k) => (
//           <div
//             key={k.title}
//             className={`relative bg-linear-to-br ${k.color} text-white rounded-2xl shadow-md p-5 transition-transform transform hover:scale-105`}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-sm uppercase tracking-wide opacity-80">
//                   {k.title}
//                 </h3>
//                 <p className="text-3xl font-bold mt-2">{k.value}</p>
//               </div>
//               <div className="bg-white/20 p-3 rounded-full">{k.icon}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Recent Appointments */}
//       <Card title="Recent Appointments">
//         <div className="overflow-hidden rounded-lg">
//           <table className="min-w-full text-sm text-gray-700">
//             <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
//               <tr>
//                 <th className="px-4 py-3 text-left">Patient</th>
//                 <th className="px-4 py-3 text-left">Doctor</th>
//                 <th className="px-4 py-3 text-left">Time</th>
//                 <th className="px-4 py-3 text-right">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentAppointments.map((a, i) => (
//                 <tr
//                   key={i}
//                   className="border-b last:border-none hover:bg-gray-50 transition-colors"
//                 >
//                   <td className="px-4 py-3">{a.patient}</td>
//                   <td className="px-4 py-3">{a.doctor}</td>
//                   <td className="px-4 py-3">{a.time}</td>
//                   <td className="px-4 py-3 text-right">
//                     <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
//                       Confirmed
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </Card>
//     </div>
//   );
// }

import { useTheme } from "../../Context/ThemeProvider.jsx";
import Card from "../UI/Card.jsx";
import { Users, CalendarDays, Stethoscope, Receipt } from "lucide-react";

export default function Dashboard() {
  const { darkMode } = useTheme();

  const kpis = [
    {
      title: "Patients",
      value: 124,
      color: "from-blue-500 to-blue-700",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Appointments",
      value: 23,
      color: "from-green-500 to-emerald-600",
      icon: <CalendarDays className="w-6 h-6" />,
    },
    {
      title: "Doctors",
      value: 14,
      color: "from-purple-500 to-indigo-600",
      icon: <Stethoscope className="w-6 h-6" />,
    },
    {
      title: "Pending Bills",
      value: 5,
      color: "from-red-500 to-rose-600",
      icon: <Receipt className="w-6 h-6" />,
    },
  ];

  const recentAppointments = [
    { patient: "Rohit Kumar", doctor: "Dr. Meera Rao", time: "10:00 AM" },
    { patient: "Anita Sharma", doctor: "Dr. Ajay Singh", time: "11:30 AM" },
    { patient: "Rahul Verma", doctor: "Dr. Sneha Patel", time: "2:00 PM" },
  ];

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2
          className={`text-3xl font-bold ${
            darkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Dashboard
        </h2>
        <p
          className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm`}
        >
          Welcome back, Admin
        </p>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {kpis.map((k) => (
          <div
            key={k.title}
            className={`relative bg-linear-to-br ${k.color} text-white rounded-2xl shadow-md p-5 transition-transform transform hover:scale-105`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm uppercase tracking-wide opacity-80">
                  {k.title}
                </h3>
                <p className="text-3xl font-bold mt-2">{k.value}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-full">{k.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <Card
        title="Recent Appointments"
        className={`${
          darkMode
            ? "bg-gray-800 text-gray-100 border-gray-700"
            : "bg-white text-gray-800 border-gray-200"
        }`}
      >
        <div className="overflow-hidden rounded-lg">
          <table
            className={`min-w-full text-sm ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <thead
              className={`uppercase text-xs ${
                darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <tr>
                <th className="px-4 py-3 text-left">Patient</th>
                <th className="px-4 py-3 text-left">Doctor</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAppointments.map((a, i) => (
                <tr
                  key={i}
                  className={`border-b last:border-none transition-colors ${
                    darkMode
                      ? "border-gray-700 hover:bg-gray-800"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3">{a.patient}</td>
                  <td className="px-4 py-3">{a.doctor}</td>
                  <td className="px-4 py-3">{a.time}</td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        darkMode
                          ? "bg-green-900 text-green-300"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      Confirmed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
