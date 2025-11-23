import React, { useState, useEffect } from "react";
import { useTheme } from "../../Context/ThemeProvider.jsx";
import { NavLink } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL_MEDICALREPORT;

export default function MedicalRecords() {
  const { darkMode } = useTheme();

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function storeRecords() {
      try {
        const res = await fetch(BASE_URL);
        const json = await res.json();

        if (json?.records) {
          setRecords(json.records);
        }
      } catch (err) {
        console.error("Failed to load records:", err);
      }
      setLoading(false);
    }

    storeRecords();
  }, []);

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <h2 className="text-3xl font-bold mb-6">Medical Records</h2>

      {loading && <p className="text-center p-4">Loading...</p>}

      {!loading && records.length === 0 && (
        <p className="text-center p-4">No medical records found.</p>
      )}

      {!loading && records.length > 0 && (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table
            className={`min-w-full text-sm ${
              darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
            }`}
          >
            <thead
              className={`${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              } text-left`}
            >
              <tr>
                <th className="p-3">S.no</th>
                <th className="p-3">Patient Name</th>
                <th className="p-3">Age</th>
                <th className="p-3">Diagnosis</th>
                <th className="p-3">Treatment</th>
                <th className="p-3">Doctor</th>
                <th className="p-3">Hospital</th>
                <th className="p-3">Prescription</th>
              </tr>
            </thead>

            <tbody>
              {records.map((r, index) => (
                <tr
                  key={r._id}
                  className={`border-b ${
                    darkMode ? "border-gray-700" : "border-gray-300"
                  }`}
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{r.patientName}</td>
                  <td className="p-3">{r.patientAge}</td>
                  <td className="p-3">{r.diagnosis}</td>
                  <td className="p-3">{r.treatment}</td>

                  <td className="p-3">
                    {r?.doctor?.name ? r.doctor.name : "N/A"}
                  </td>

                  <td className="p-3">{r?.hospital?.name || "N/A"}</td>

                  <td className="p-3">{r.prescription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        className="
      flex items-center gap-2 
      bg-blue-600 hover:bg-blue-700 
      text-white font-semibold 
      px-4 py-2 rounded-lg 
      shadow-md transition-all
    "
      >
        <NavLink
          key={"/post_data_records"}
          to={"/dashboard/records/post_data_records"}
        >
          <span>
            {/* <Pencil className="w-4 h-4" /> */}
            Add Records
          </span>
        </NavLink>
      </button>
    </div>
  );
}
