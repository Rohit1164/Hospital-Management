// import React, { useState } from "react";
// import Card from "../UI/Card.jsx";
// import { useTheme } from "../../Context/ThemeProvider.jsx";

// export default function Appointments() {
//   const { darkMode } = useTheme();
//   const [appointments] = useState([
//     {
//       id: "a1",
//       patient: "Rohit Kumar",
//       doctor: "Dr. Meera Rao",
//       time: "2025-11-14 10:00",
//     },
//   ]);

//   return (
//     <div
//       className={`${
//         darkMode
//           ? "bg-gray-900 text-gray-100 border-gray-800"
//           : "bg-white text-gray-800 border-gray-200"
//       }`}
//     >
//       <h2 className="text-2xl font-bold mb-4">Appointments</h2>
//       <Card>
//         {appointments.map((a) => (
//           <div key={a.id} className="p-2 border-b flex justify-between">
//             <div>
//               {a.patient} → {a.doctor}
//             </div>
//             <div className="text-sm text-gray-600">{a.time}</div>
//           </div>
//         ))}
//       </Card>
//     </div>
//   );
// }

import React, { useState } from "react";
import Card from "../UI/Card.jsx";
import { useTheme } from "../../Context/ThemeProvider.jsx";

export default function Appointments() {
  const { darkMode } = useTheme();
  const [appointments] = useState([
    {
      id: "a1",
      patient: "Rohit Kumar",
      doctor: "Dr. Meera Rao",
      time: "2025-11-14 10:00",
    },
  ]);

  return (
    <div
      className={`min-h-screen p-6 transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>

      <Card
        className={`rounded-2xl shadow-md border transition-colors duration-300 ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-gray-100"
            : "bg-white border-gray-200 text-gray-800"
        }`}
      >
        {appointments.map((a) => (
          <div
            key={a.id}
            className={`p-3 border-b last:border-none flex justify-between items-center transition-colors ${
              darkMode
                ? "border-gray-700 hover:bg-gray-700/50"
                : "border-gray-200 hover:bg-gray-100"
            }`}
          >
            <div>
              <span className="font-medium">{a.patient}</span>
              <span className="mx-2 text-gray-500">→</span>
              <span className="font-medium">{a.doctor}</span>
            </div>
            <div
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {a.time}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
