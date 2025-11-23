// import express from "express";
// import {
//   registerAdmin,
//   loginAdmin,
//   dashboard,
//   logoutAdmin,
// } from "../controllers/admin.controller.js";
// import { upload } from "../middleware/multer.middleware.js";

// const router = express.Router();

// router.post("/register", upload.single("pic"), registerAdmin);

// router.post("/login", loginAdmin);
// router.post("/logout", logoutAdmin);

// router.get("/", dashboard);

// export default router;

import express from "express";
import {
  registerAdmin,
  loginAdmin,
  dashboard,
  logoutAdmin, // import logout controller
} from "../controllers/admin.controller.js";

import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/register", upload.single("pic"), registerAdmin);
router.post("/login", loginAdmin);
router.get("/", dashboard);

// ✅ Add this route for logout
router.get("/logout", logoutAdmin);

export default router;
