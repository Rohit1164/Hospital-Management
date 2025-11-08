import express from "express";
import {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  assignHospital,
} from "../controllers/doctor.controller.js";
// import { auth } from "../middleware/auth.js";
// import { isAdmin, isDoctor } from "../middleware/roles.js";

const router = express.Router();

// Admin can create doctor
// router.post("/create", auth, isAdmin, createDoctor);
router.post("/create", createDoctor);

// Everyone authenticated can view doctors
// router.get("/", auth, getDoctors);
router.get("/", getDoctors);

router.get("/:id", getDoctorById);
// router.get("/:id", auth, getDoctorById);

// Only doctor can update their profile
// router.put("/:id", auth, isDoctor, updateDoctor);
router.put("/:id", updateDoctor);

// Only admin can delete doctor
// router.delete("/:id", auth, isAdmin, deleteDoctor);
router.delete("/:id", deleteDoctor);

// Assign hospital to doctor (Admin only)
// router.post("/assign-hospital", auth, isAdmin, assignHospital);
router.post("/assign-hospital", assignHospital);

export default router;
