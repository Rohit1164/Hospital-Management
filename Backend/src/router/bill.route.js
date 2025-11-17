import express from "express";
import {
  countBill,
  createBill,
  deleteBill,
  getBill,
  getBillByID,
  UpdateBill,
} from "../controllers/billing.controller.js";

const router = express.Router();

router.post("/", createBill);
router.get("/", getBill);
router.get("/count", countBill);
router.get("/:id", getBillByID);
router.put("/:id", UpdateBill);
router.delete("/:id", deleteBill);

export default router;
