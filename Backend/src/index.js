import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/index.js";

import doctorRoutes from "./router/doctor.route.js";
import hospitalRouter from "./router/hospital.route.js";
import adminRoutes from "./router/admin.route.js";
import medicalRecordRouter from "./router/medicalRecord.route.js";
import patientRouter from "./router/patient.route.js";
import appointmentRouter from "./router/appointment.route.js";
import BillingRouter from "./router/bill.route.js";
import lavRouter from "./router/lab.route.js";
import pharmacyRouter from "./router/pharmacy.route.js";

dotenv.config({ path: "./.env" });
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.redirect("/admin");
});

app.use("/admin", adminRoutes);
app.use("/doctors", doctorRoutes);
app.use("/hospital", hospitalRouter);
app.use("/medicalRecord", medicalRecordRouter);
app.use("/patient", patientRouter);
app.use("/appointment", appointmentRouter);
app.use("/bill", BillingRouter);
app.use("/lav", lavRouter);
app.use("/pharmacy", pharmacyRouter);

connectDB()
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server started at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
