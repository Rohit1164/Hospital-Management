import express from "express";
import {
  createLab,
  deleteLab,
  getLabByID,
  getLabs,
  updateLab,
} from "../controllers/Lab.controller.js";

const router = express.Router();

router.post("/", createLab);
router.get("/", getLabs);
router.get("/:id", getLabByID);
router.put("/:id", updateLab);
router.delete("/:id", deleteLab);

export default router;
