import express from "express";
import {
  registerAdmin,
  loginAdmin,
  dashboard,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

router.get("/", dashboard);

export default router;
