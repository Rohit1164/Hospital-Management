import express from "express";
import {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  assignHospital,
} from "../controllers/doctor.controller.js";

const router = express.Router();

router.post("/create", createDoctor);
router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);
router.post("/assign-hospital", assignHospital);

export default router;
