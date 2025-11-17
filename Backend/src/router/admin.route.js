import express from "express";
import {
  registerAdmin,
  loginAdmin,
  dashboard,
} from "../controllers/admin.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/register", upload.single("pic"), registerAdmin);

router.post("/login", loginAdmin);

router.get("/", dashboard);

export default router;
