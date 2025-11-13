import express from "express";
import {
  createAppointment,
  getAppointment,
  UpdateAppointment,
  deleteAppointment,
  getAppointmentByID,
} from "../controllers/appointment.controller.js";

const router = express.Router();

router.post("/", createAppointment);
router.get("/", getAppointment);
router.get("/:id", getAppointmentByID);
router.put("/:id", UpdateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
