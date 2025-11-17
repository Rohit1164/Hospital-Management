import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Component/Pages/DashBoard.jsx";
import Patients from "./Component/Pages/Patient.jsx";
import PatientProfile from "./Component/Pages/PatientProfile";
import Doctors from "./Component/Pages/Doctor.jsx";
import Appointments from "./Component/Pages/Appointments";
import MedicalRecords from "./Component/Pages/MedicalRecords";
import Billing from "./Component/Pages/Billing";
import Pharmacy from "./Component/Pages/Pharmacy";
import Labs from "./Component/Pages/Labs";
import Login from "./Component/Pages/auth/Login";
import Register from "./Component/Pages/auth/Register";
import Sidebar from "./Component/Pages/Sidebar";
import Navbar from "./Component/Navbar/Header.jsx";
import { ThemeProvider } from "./Context/ThemeProvider.jsx";

export default function App() {
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = true; // simple auth flag for demo

  return (
    <ThemeProvider>
      <div className="min-h-screen flex bg-gray-50">
        <Sidebar open={sidebarOpen} />
        <div className="flex-1 flex flex-col">
          <Navbar onToggleSidebar={() => setSidebarOpen((s) => !s)} />
          <main className="p-6">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route path="/patients" element={<Patients />} />
              <Route path="/patients/:id" element={<PatientProfile />} />
              <Route path="/dashboard/doctors" element={<Doctors />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/records" element={<MedicalRecords />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/pharmacy" element={<Pharmacy />} />
              <Route path="/labs" element={<Labs />} />
            </Routes>
          </main>
        </div>

        {toast && (
          <ToastContainer toast={toast} onClose={() => setToast(null)} />
        )}
      </div>
    </ThemeProvider>
  );
}
