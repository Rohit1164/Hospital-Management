import { FileText, User, CalendarDays, Bell } from "lucide-react";
import { useTheme } from "../../Context/ThemeProvider";
import { useEffect, useState } from "react";
import Card from "../UI/Card";
import Button from "./Button";
import { NavLink } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL_PATIENT;
const BASE_URL_TWO = import.meta.env.VITE_BASE_URL_APPOINTMENT;

export default function PatientDashboard() {
  const { darkMode } = useTheme();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch PATIENTS
  useEffect(() => {
    async function loadPatient() {
      try {
        const res = await fetch(BASE_URL);
        const json = await res.json();

        // console.log("API Response:", json);

        if (json?.patients?.length > 0) {
          setPatient(json.patients[0]);
        }
      } catch (err) {
        console.error("Failed to load patient", err);
      }
      setLoading(false);
    }

    loadPatient();
  }, []);

  // Fetch Appointments
  useEffect(() => {
    async function loadAppointments() {
      try {
        const res = await fetch(BASE_URL_TWO);
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
      className={`min-h-screen p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Header */}
      <header
        className={`rounded-xl p-5 mb-6 shadow-md transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        <NavLink to={"/dashboard/get_patient"}>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <User /> Patient Dashboard
          </h1>
        </NavLink>

        {loading && <p className="text-sm">Loading patient info...</p>}

        {!loading && patient && (
          <p className="text-sm">
            Hi, <strong>{patient.name}</strong> — Welcome to your portal!
          </p>
        )}
      </header>

      {/* Patient Details */}
      {!loading && patient && (
        <div
          className={`rounded-xl p-5 mb-6 shadow transition-colors ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-bold mb-3">Your Information</h2>

          <p>
            <strong>Age:</strong> {patient.age}
          </p>
          <p>
            <strong>Gender:</strong> {patient.gender}
          </p>
          <p>
            <strong>Blood Group:</strong> {patient.bloodGroup}
          </p>
          <p>
            <strong>Diagnosis:</strong> {patient.diagonsedwith}
          </p>
          <p>
            <strong>Address:</strong> {patient.address}
          </p>

          <p>
            <strong>Admitted In:</strong> {patient.admittedIn?.name || "N/A"}
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { icon: <CalendarDays size={32} />, label: "Book Appointment" },
          { icon: <FileText size={32} />, label: "View Reports" },
          { icon: <Bell size={32} />, label: "Notifications" },
        ].map((action, i) => (
          <button
            key={i}
            className={`p-5 rounded-xl shadow flex flex-col items-center transition-all duration-200 ${
              darkMode
                ? "bg-gray-800 hover:bg-gray-700 text-gray-100"
                : "bg-white hover:bg-gray-50 text-gray-800"
            }`}
          >
            {action.icon}
            <p className="font-semibold mt-2">{action.label}</p>
          </button>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <div
        className={`rounded-xl p-5 shadow transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <CalendarDays /> Upcoming Appointments
        </h2>

        <Card
          className={`rounded-2xl shadow-md border transition-colors duration-300 ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-gray-100"
              : "bg-white border-gray-200 text-gray-800"
          }`}
        >
          {/* Loading State */}
          {loading && (
            <p className="p-4 text-center text-gray-500">Loading...</p>
          )}

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
      </div>
      <NavLink to={"/dashboard/patients/post_data_patient"}>
        <button> Add patient </button>
      </NavLink>
      {/* <Button>Add Patient</Button> */}
    </div>
  );
}
