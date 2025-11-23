import { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

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
import AddDoctorForm from "./Component/Pages/Post_Form/Docters_From.jsx";
import AppointmentForm from "./Component/Pages/Post_Form/AppointmentForm.jsx";
import MedicalRecordForm from "./Component/Pages/Post_Form/MedicalRecordForm.jsx";
import BillForm from "./Component/Pages/Post_Form/BillForm.jsx";
import PharmacyForm from "./Component/Pages/Post_Form/PharmacyForm.jsx";
import LabForm from "./Component/Pages/Post_Form/LabForm.jsx";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = true;
  // const navigate = useNavigate();

  const DashboardLayout = () => {
    if (!user) return <Navigate to="/login" />;

    return (
      <div className="min-h-screen flex bg-gray-50">
        <Sidebar open={sidebarOpen} />
        <div className="flex-1 flex flex-col">
          <Navbar onToggleSidebar={() => setSidebarOpen((s) => !s)} />
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    );
  };

  return (
    <ThemeProvider>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/:id" element={<PatientProfile />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="records" element={<MedicalRecords />} />
          <Route path="billing" element={<Billing />} />
          <Route path="pharmacy" element={<Pharmacy />} />
          <Route path="labs" element={<Labs />} />
          <Route
            path="/dashboard/doctors/post_data_doctor"
            element={<AddDoctorForm />}
          />
          <Route
            path="/dashboard/appointments/post_data_appointments"
            element={<AppointmentForm />}
          />
          <Route
            path="/dashboard/records/post_data_records"
            element={<MedicalRecordForm />}
          />
          <Route
            path="/dashboard/bills/post_data_bill"
            element={<BillForm />}
          />
          <Route
            path="/dashboard/pharmacy/post_data_pharmacy"
            element={<PharmacyForm />}
          />
          <Route path="/dashboard/lab/post_data_lab" element={<LabForm />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
