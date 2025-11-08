// import { Router } from "express";
// import { loginhospital } from "../controllers/hospital.controller.js";

// const router = Router();

// router.get("/", (req, res) => {
//   res.send("Welcome to User Page");
// });
// router.post("/login", loginhospital);

// export default router;

import express from "express";
import {
  createHospital,
  getHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital,
} from "../controllers/hospital.controller.js";
// import { auth } from "../middleware/auth.js";
// import { isAdmin, isDoctor } from "../middleware/role.js";

const router = express.Router();

// CRUD ROUTES
router.post("/", createHospital); // Only admin creates
router.get("/", getHospitals); // Anyone can view
router.get("/:id", getHospitalById);
router.put("/:id", updateHospital); // Only admin edits
router.delete("/:id", deleteHospital);

export default router;
