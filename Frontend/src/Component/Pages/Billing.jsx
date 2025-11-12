import { useTheme } from "../../Context/ThemeProvider.jsx";
import Table from "../UI/Table.jsx";

export default function Billing() {
  const { darkMode } = useTheme();

  const data = [
    { id: "b1", patient: "Anita Sharma", amount: "₹2,400", status: "Paid" },
    { id: "b2", patient: "Rohit Kumar", amount: "₹1,200", status: "Pending" },
  ];

  const columns = [
    { key: "patient", title: "Patient" },
    { key: "amount", title: "Amount" },
    { key: "status", title: "Status" },
  ];

  return (
    <div
      className={`min-h-screen p-8 rounded-2xl shadow-md transition-colors duration-300 
        ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"}`}
    >
      <h2
        className={`text-3xl font-bold mb-6 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Billing
      </h2>

      <div
        className={`rounded-xl border transition-colors duration-300 ${
          darkMode
            ? "border-gray-700 bg-gray-800"
            : "border-gray-200 bg-gray-50"
        }`}
      >
        <Table columns={columns} data={data} darkMode={darkMode} />
      </div>
    </div>
  );
}
