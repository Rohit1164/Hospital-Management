import Table from "../UI/Table.jsx";
import { useTheme } from "../../Context/ThemeProvider.jsx";

export default function Labs() {
  const { darkMode } = useTheme();

  const tests = [
    {
      id: "t1",
      patient: "Anita Sharma",
      test: "Blood Sugar",
      status: "Completed",
    },
    { id: "t2", patient: "Rohit Kumar", test: "X-Ray", status: "Pending" },
  ];

  const columns = [
    { key: "patient", title: "Patient" },
    { key: "test", title: "Test" },
    { key: "status", title: "Status" },
  ];

  return (
    <div
      className={`p-6 rounded-2xl shadow-md transition-colors duration-300 border ${
        darkMode
          ? "bg-gray-900 text-gray-100 border-gray-800"
          : "bg-white text-gray-800 border-gray-200"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Laboratory</h2>

      {/* Table Wrapper for dark mode handling */}
      <div
        className={`overflow-hidden rounded-xl transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-800"
        }`}
      >
        <Table
          columns={columns}
          data={tests}
          darkMode={darkMode} // ✅ pass darkMode to Table (for row/text styles)
        />
      </div>
    </div>
  );
}
