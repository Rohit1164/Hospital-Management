import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../Context/ThemeProvider";

const BASE_URL = import.meta.env.VITE_BASE_URL_PATIENT;

export default function Get_patient() {
  const { darkMode } = useTheme();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const res = await axios.get(BASE_URL);

        // ✅ safe response handling
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.patients)
          ? res.data.patients
          : [];

        setPatients(data);
      } catch (error) {
        console.error(
          "Error fetching patients:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center text-lg font-semibold ${
          darkMode
            ? "bg-gray-900 text-gray-100 border-gray-800"
            : "bg-white text-gray-800 border-gray-200"
        }`}
      >
        Loading patients...
      </div>
    );
  }

  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-900 text-gray-100 border-gray-800"
          : "bg-white text-gray-800 border-gray-200"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <NavLink to={"/dashboard/patients/post_data_patient"}>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Patient
          </button>
        </NavLink>
      </div>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Patient List</h2>

          {patients.length === 0 ? (
            <p className="text-center text-gray-500">No patients found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Age</th>
                    <th className="p-3 text-left">Gender</th>
                    <th className="p-3 text-left">Blood Group</th>
                    <th className="p-3 text-left">Diagnosis</th>
                    <th className="p-3 text-left">Hospital</th>
                  </tr>
                </thead>

                <tbody>
                  {patients.map((p) => (
                    <tr key={p._id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{p.name}</td>
                      <td className="p-3">{p.age}</td>
                      <td className="p-3">{p.gender}</td>
                      <td className="p-3">{p.bloodGroup}</td>
                      <td className="p-3">{p.diagonsedwith}</td>
                      <td className="p-3">{p.admittedIn?.name || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
