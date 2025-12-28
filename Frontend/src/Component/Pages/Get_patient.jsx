import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../Context/ThemeProvider";
import Buttons from "./Buttons";

const BASE_URL = import.meta.env.VITE_BASE_URL_PATIENT;

export default function Get_patient() {
  const { darkMode } = useTheme();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const res = await axios.get(BASE_URL);

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
          darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        Loading patients...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-6 transition-colors ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Card */}
      <div
        className={`max-w-6xl mx-auto shadow-xl rounded-2xl p-6 transition-colors ${
          darkMode
            ? "bg-gray-800 border border-gray-700"
            : "bg-white border border-gray-200"
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Patient List</h2>

        {patients.length === 0 ? (
          <p
            className={`text-center ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No patients found
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className={`${darkMode ? "bg-gray-700" : "bg-gray-100"} `}>
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
                  <tr
                    key={p._id}
                    className={`border-b transition ${
                      darkMode
                        ? "border-gray-700 hover:bg-gray-700"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
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

      {/* Header */}
      <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto">
        <NavLink to={"/dashboard/patients/post_data_patient"}>
          <Buttons>Add Patient</Buttons>
        </NavLink>
      </div>
    </div>
  );
}
