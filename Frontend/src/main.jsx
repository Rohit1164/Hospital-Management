// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import HospitalHome from "./Component/Pages/Home.jsx";
// import App from "./App.jsx";
// import DoctorDashboard from "./Component/Pages/Doctor.jsx";
// import PatientDashboard from "./Component/Pages/Patient.jsx";
// import ContactPage from "./Component/Pages/Contact.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       { path: "/dashboard", element: <HospitalHome /> },
//       { path: "/doctor", element: <DoctorDashboard /> },
//       { path: "/patients", element: <PatientDashboard /> },
//       { path: "/contact", element: <ContactPage /> },
//     ],
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <RouterProvider router={router} />
//   </StrictMode>
// );

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
