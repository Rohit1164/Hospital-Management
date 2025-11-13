import express from "express";
import {
  createRecord,
  getAllRecords,
  getRecordsByPatient,
  updateRecord,
  deleteRecord,
} from "../controllers/medicalRecord.controller.js";

const router = express.Router();

router.post("/", createRecord);
router.get("/", getAllRecords);
router.get("/patient/:name", getRecordsByPatient);
router.put("/:id", updateRecord);
router.delete("/:id", deleteRecord);

export default router;
