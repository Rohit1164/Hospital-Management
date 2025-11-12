// import React, { useState } from "react";
// import Table from "../UI/Table.jsx";
// import { useTheme } from "../../Context/ThemeProvider.jsx";

// export default function Doctors() {
//   const { darkMode } = useTheme();
//   const [doctors] = useState([
//     {
//       id: "d1",
//       name: "Dr. Meera Rao",
//       speciality: "Cardiology",
//       phone: "9988776655",
//     },
//     {
//       id: "d2",
//       name: "Dr. Ajay Singh",
//       speciality: "Orthopedics",
//       phone: "9876655432",
//     },
//   ]);

//   const columns = [
//     { key: "name", title: "Name" },
//     { key: "speciality", title: "Speciality" },
//     { key: "phone", title: "Phone" },
//   ];

//   return (
//     <div
//       className={` ${
//         darkMode
//           ? "bg-gray-900 text-gray-100 border-gray-800"
//           : "bg-white text-gray-800 border-gray-200"
//       }`}
//     >
//       <div className={`flex justify-between items-center mb-4 `}>
//         <h2 className="text-2xl font-bold">Doctors</h2>
//       </div>
//       <Table columns={columns} data={doctors} />
//     </div>
//   );
// }

import React, { useState } from "react";
import Table from "../UI/Table.jsx";
import { useTheme } from "../../Context/ThemeProvider.jsx";

export default function Doctors() {
  const { darkMode } = useTheme();
  const [doctors] = useState([
    {
      id: "d1",
      name: "Dr. Meera Rao",
      speciality: "Cardiology",
      phone: "9988776655",
    },
    {
      id: "d2",
      name: "Dr. Ajay Singh",
      speciality: "Orthopedics",
      phone: "9876655432",
    },
  ]);

  const columns = [
    { key: "name", title: "Name" },
    { key: "speciality", title: "Speciality" },
    { key: "phone", title: "Phone" },
  ];

  return (
    <div
      className={`min-h-screen p-6 rounded-2xl transition-colors duration-300 border
        ${
          darkMode
            ? "bg-gray-900 text-gray-100 border-gray-800"
            : "bg-white text-gray-800 border-gray-200"
        }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Doctors</h2>
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          Manage doctor information
        </p>
      </div>

      {/* Table */}
      <div
        className={`rounded-lg shadow-md overflow-hidden transition-all duration-300 
          ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-gray-50"}`}
      >
        <Table columns={columns} data={doctors} darkMode={darkMode} />
      </div>
    </div>
  );
}
