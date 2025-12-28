import React, { useState, useEffect } from "react";
import Card from "../UI/Card.jsx";
import { useTheme } from "../../Context/ThemeProvider.jsx";
import { NavLink } from "react-router-dom";
import Buttons from "./Buttons.jsx";

const BASE_URL = import.meta.env.VITE_BASE_URL_APPOINTMENT;
export default function Appointments() {
  const { darkMode } = useTheme();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Appointments
  useEffect(() => {
    async function loadAppointments() {
      try {
        const res = await fetch(BASE_URL);
        const json = await res.json();

        if (json?.data) {
          setAppointments(json.data);
        }
      } catch (err) {
        console.error("Failed to load appointments", err);
      }
      setLoading(false);
    }

    loadAppointments();
  }, []);

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
        {/* Loading State */}
        {loading && <p className="p-4 text-center text-gray-500">Loading...</p>}

        {/* No Data */}
        {!loading && appointments.length === 0 && (
          <p className="p-4 text-center text-gray-500">No Appointments</p>
        )}

        {/* Show Appointments */}
        {appointments.map((a) => (
          <div
            key={a._id}
            className={`p-3 border-b last:border-none flex justify-between items-center transition-colors ${
              darkMode
                ? "border-gray-700 hover:bg-gray-700/50"
                : "border-gray-200 hover:bg-gray-100"
            }`}
          >
            <div>
              <span className="font-medium">{a.patientName}</span>
              <span className="mx-2 text-gray-500">→</span>

              {/* If doctor is ObjectId, you can fetch doctor name or show ID */}
              <span className="font-medium">Dr {a.doctor?.name}</span>
            </div>

            <div className="text-sm text-gray-500">
              📅 {a.date?.substring(0, 10)} — {a.time}
            </div>
          </div>
        ))}
      </Card>

      <NavLink
        key={"/post_data_appointments"}
        to={"/dashboard/appointments/post_data_appointments"}
      >
        <Buttons>Add Appointment</Buttons>
      </NavLink>
    </div>
  );
}
