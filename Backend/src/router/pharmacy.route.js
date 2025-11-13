import express from "express";
import {
  createMedicine,
  deleteMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
} from "../controllers/pharmacy.controller.js";

const router = express.Router();

router.post("/", createMedicine);
router.get("/", getAllMedicines);
router.get("/:id", getMedicineById);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);

export default router;
