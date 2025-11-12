import { useTheme } from "../../Context/ThemeProvider.jsx";
import Table from "../UI/Table.jsx";

export default function Pharmacy() {
  const { darkMode } = useTheme();

  const meds = [
    { id: "m1", name: "Paracetamol", stock: 120 },
    { id: "m2", name: "Amoxicillin", stock: 20 },
  ];

  const columns = [
    { key: "name", title: "Name" },
    { key: "stock", title: "Stock" },
  ];

  return (
    <div
      className={`transition-all duration-300 rounded-2xl shadow-md p-6 border 
      ${
        darkMode
          ? "bg-gray-900 text-gray-100 border-gray-800"
          : "bg-white text-gray-800 border-gray-200"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Pharmacy</h2>

      <div
        className={`rounded-lg overflow-hidden border 
        ${
          darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        <Table
          columns={columns}
          data={meds}
          className={`w-full text-sm ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        />
      </div>
    </div>
  );
}
