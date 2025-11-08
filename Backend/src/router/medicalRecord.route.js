import express from "express";
import {
  createRecord,
  getAllRecords,
  getRecordsByPatient,
  updateRecord,
  deleteRecord,
} from "../controllers/medicalRecord.controller.js";
import { auth } from "../middleware/auth.js";
import { isAdmin, isDoctor } from "../middleware/role.js";

const router = express.Router();

// CRUD Endpoints
router.post("/", auth, isDoctor, createRecord);
router.get("/", auth, getAllRecords);
router.get("/patient/:name", auth, getRecordsByPatient);
router.put("/:id", auth, isDoctor, updateRecord);
router.delete("/:id", auth, isAdmin, deleteRecord);

export default router;
