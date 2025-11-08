import express from "express";
import {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../controllers/patient.controller.js";
import { auth } from "../middleware/auth.js";
import { isAdmin, isDoctor } from "../middleware/role.js";

const router = express.Router();

// Doctors + Admin can manage patients
router.post("/", auth, isDoctor, createPatient);
router.get("/", auth, getPatients);
router.get("/:id", auth, getPatientById);
router.put("/:id", auth, isDoctor, updatePatient);
router.delete("/:id", auth, isAdmin, deletePatient);

export default router;
