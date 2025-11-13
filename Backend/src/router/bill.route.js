import express from "express";
import {
  createBill,
  deleteBill,
  getBill,
  getBillByID,
  UpdateBill,
} from "../controllers/billing.controller.js";

const router = express.Router();

router.post("/", createBill);
router.get("/", getBill);
router.get("/:id", getBillByID);
router.put("/:id", UpdateBill);
router.delete("/:id", deleteBill);

export default router;
