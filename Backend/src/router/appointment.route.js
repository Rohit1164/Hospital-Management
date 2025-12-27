import express from "express";
import {
  createAppointment,
  getAppointment,
  UpdateAppointment,
  deleteAppointment,
  getAppointmentByID,
  countAppointment,
} from "../controllers/appointment.controller.js";

const router = express.Router();

router.post("/create", createAppointment);
router.get("/", getAppointment);
router.get("/count", countAppointment);
router.get("/:id", getAppointmentByID);
router.put("/:id", UpdateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
