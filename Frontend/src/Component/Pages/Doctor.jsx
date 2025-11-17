import { useEffect, useState } from "react";
import Table from "../UI/Table.jsx";
import { useTheme } from "../../Context/ThemeProvider.jsx";

const BASE = import.meta.env.VITE_BASE_URL_DOCTOR;

export default function Doctors() {
  const { darkMode } = useTheme();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch doctors from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(BASE);

        if (!res.ok) throw new Error("Failed to fetch doctors");

        const data = await res.json();

        // FIX: Data safety + fallback handling
        const formatted = data.map((doc) => ({
          id: doc._id,
          name: doc.name || "Unknown",
          speciality: doc.qualification || "N/A",
          phone: doc.email || "N/A",
          experience: doc.experienceInYears
            ? `${doc.experienceInYears} years`
            : "N/A",
          salary: doc.salary ? `₹${doc.salary}` : "N/A",
        }));

        setDoctors(formatted);
      } catch (err) {
        setError(err, "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Table Columns
  const columns = [
    { key: "name", title: "Name" },
    { key: "speciality", title: "Qualification" },
    { key: "phone", title: "Email" },
    { key: "experience", title: "Experience" },
    { key: "salary", title: "Salary" },
  ];

  return (
    <div
      className={`min-h-screen p-6 rounded-2xl transition-colors duration-300 border ${
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

      {/* Loading */}
      {loading && (
        <p className="text-center py-4 text-lg font-medium">Loading...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center py-4 text-red-500 font-medium">{error}</p>
      )}

      {/* Table */}
      {!loading && !error && (
        <div
          className={`rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
            darkMode ? "bg-gray-800 border border-gray-700" : "bg-gray-50"
          }`}
        >
          <Table columns={columns} data={doctors} darkMode={darkMode} />
        </div>
      )}
    </div>
  );
}
