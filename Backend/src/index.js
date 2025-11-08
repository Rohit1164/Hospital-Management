import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/index.js";
import doctorRoutes from "./router/doctor.route.js";
import hospitalRouter from "./router/hospital.route.js";
import adminRoutes from "./router/admin.route.js";
import { MedicalRecord } from "./models/medical_record.models.js";
import { Patient } from "./models/patient.models.js";

const PORT = process.env.PORT || 8000;

dotenv.config({ path: "./.env" });
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  // res.redirect("/user");
  res.redirect("/admin");
});

app.use("/admin", adminRoutes);
app.use("/doctors", doctorRoutes);
app.use("/hospital", hospitalRouter);
app.use("/medicalRecord", MedicalRecord);
app.use("/patient", Patient);

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
