import { useEffect, useState } from "react";
import { useTheme } from "../../Context/ThemeProvider.jsx";
import Card from "../UI/Card.jsx";
import { Users, CalendarDays, Stethoscope, Receipt } from "lucide-react";

const PATIENT_URL = import.meta.env.VITE_BASE_URL_PATIENT;
const APPOINTMENT_URL = import.meta.env.VITE_BASE_URL_APPOINTMENT;
const DOCTOR_URL = import.meta.env.VITE_BASE_URL_DOCTOR;
const BILL_URL = import.meta.env.VITE_BASE_URL_BILL;

export default function Dashboard() {
  const { darkMode } = useTheme();
  const [patient, setPatient] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [bill, setbill] = useState([]);

  const [recentAppointments, setRecentAppointments] = useState([]);

  useEffect(() => {
    async function fetchPatientData() {
      try {
        const res = await fetch(`${PATIENT_URL}/count`);
        const json = await res.json();

        // console.log("Total Patients:", json.count);
        setPatient(json.count);
      } catch (error) {
        console.log("Dashboard Error:", error.message);
      }
    }

    async function fetchAppointmentData() {
      try {
        const res = await fetch(`${APPOINTMENT_URL}/count`);
        const json = await res.json();

        // console.log("Total Patients:", json.count);
        setAppointment(json.count);
      } catch (error) {
        console.log("Dashboard Error:", error.message);
      }
    }

    async function fetchDoctorData() {
      try {
        const res = await fetch(`${DOCTOR_URL}/count`);
        const json = await res.json();

        // console.log("Total Patients:", json.count);
        setDoctor(json.count);
      } catch (error) {
        console.log("Dashboard Error:", error.message);
      }
    }

    async function fetchBillData() {
      try {
        const res = await fetch(`${BILL_URL}/count`);
        const json = await res.json();

        // console.log("Total Patients:", json.count);
        setbill(json.count);
      } catch (error) {
        console.log("Dashboard Error:", error.message);
      }
    }

    fetchPatientData();
    fetchAppointmentData();
    fetchDoctorData();
    fetchBillData();
  }, []);

  useEffect(() => {
    async function loadAppointments() {
      try {
        const res = await fetch(APPOINTMENT_URL);
        const json = await res.json();

        // console.log(json.data);
        if (json?.data) {
          setRecentAppointments(json.data.slice(0, 5)); // show only 5 latest
        }
      } catch (err) {
        console.error("Failed to load appointments", err);
      }
    }

    loadAppointments();
  }, []);

  const kpis = [
    {
      title: "Patients",
      value: patient,
      color: "from-blue-500 to-blue-700",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Appointments",
      value: appointment,
      color: "from-green-500 to-emerald-600",
      icon: <CalendarDays className="w-6 h-6" />,
    },
    {
      title: "Doctors",
      value: doctor,
      color: "from-purple-500 to-indigo-600",
      icon: <Stethoscope className="w-6 h-6" />,
    },
    {
      title: "Pending Bills",
      value: bill,
      color: "from-red-500 to-rose-600",
      icon: <Receipt className="w-6 h-6" />,
    },
  ];

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2
          className={`text-3xl font-bold ${
            darkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Dashboard
        </h2>
        <p
          className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm`}
        >
          Welcome back, Admin
        </p>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {kpis.map((k) => (
          <div
            key={k.title}
            className={`relative bg-linear-to-br ${k.color} text-white rounded-2xl shadow-md p-5 transition-transform transform hover:scale-105`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm uppercase tracking-wide opacity-80">
                  {k.title}
                </h3>
                <p className="text-3xl font-bold mt-2">{k.value}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-full">{k.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <Card
        title="Recent Appointments"
        className={`${
          darkMode
            ? "bg-gray-800 text-gray-100 border-gray-700"
            : "bg-white text-gray-800 border-gray-200"
        }`}
      >
        <div className="overflow-hidden rounded-lg">
          <table
            className={`min-w-full text-sm ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <thead
              className={`uppercase text-xs ${
                darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <tr>
                <th className="px-4 py-3 text-left">Patient</th>
                <th className="px-4 py-3 text-left">Doctor</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAppointments.map((a, i) => (
                <tr
                  key={i}
                  className={`border-b last:border-none transition-colors ${
                    darkMode
                      ? "border-gray-700 hover:bg-gray-800"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3">{a.patientName}</td>
                  <td className="px-4 py-3">Dr {a?.doctor?.name}</td>
                  <td className="px-4 py-3">{a.time}</td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        darkMode
                          ? "bg-green-900 text-green-300"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      Confirmed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
