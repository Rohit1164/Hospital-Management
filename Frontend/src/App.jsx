import { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// Main
import Dashboard from "./Component/Pages/DashBoard.jsx";
import Doctors from "./Component/Pages/Doctor.jsx";
import Appointments from "./Component/Pages/Appointments";
import MedicalRecords from "./Component/Pages/MedicalRecords";
import Billing from "./Component/Pages/Billing";
import Pharmacy from "./Component/Pages/Pharmacy";
import Labs from "./Component/Pages/Labs";

// Auth
import Login from "./Component/Pages/auth/Login";
import Register from "./Component/Pages/auth/Register";

// NAvigation
import Sidebar from "./Component/Pages/Sidebar";
import Navbar from "./Component/Navbar/Header.jsx";

// Theme Provider
import { ThemeProvider } from "./Context/ThemeProvider.jsx";

// Post Forms
import AddDoctorForm from "./Component/Pages/Post_Form/Docters_From.jsx";
import AppointmentForm from "./Component/Pages/Post_Form/AppointmentForm.jsx";
import BillForm from "./Component/Pages/Post_Form/BillForm.jsx";
import PharmacyForm from "./Component/Pages/Post_Form/PharmacyForm.jsx";
import LabForm from "./Component/Pages/Post_Form/LabForm.jsx";
import PatientForm from "./Component/Pages/Post_Form/PatientForm.jsx";
import PatientDashboard from "./Component/Pages/PatientDashboard.jsx";
import GetPatient from "./Component/Pages/Get_patient.jsx";
import MedicalRecordForm from "./Component/Pages/Post_Form/MedicalRecordForm.jsx";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const DashboardLayout = () => {
    const user = localStorage.getItem("token");

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return (
      <div className="min-h-screen flex bg-gray-50">
        <Sidebar open={sidebarOpen} />
        <div className="flex-1 flex flex-col ">
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

        {/* Protected */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="patient_dashboard" element={<PatientDashboard />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="records" element={<MedicalRecords />} />
          <Route path="billing" element={<Billing />} />
          <Route path="pharmacy" element={<Pharmacy />} />
          <Route path="labs" element={<Labs />} />
          <Route path="get_patient" element={<GetPatient />} />

          {/* Forms */}
          <Route path="doctors/post_data_doctor" element={<AddDoctorForm />} />
          <Route
            path="appointments/post_data_appointments"
            element={<AppointmentForm />}
          />
          <Route
            path="records/post_data_records"
            element={<MedicalRecordForm />}
          />
          <Route path="bills/post_data_bill" element={<BillForm />} />
          <Route
            path="pharmacy/post_data_pharmacy"
            element={<PharmacyForm />}
          />
          <Route path="patients/post_data_patient" element={<PatientForm />} />
          <Route path="lab/post_data_lab" element={<LabForm />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
