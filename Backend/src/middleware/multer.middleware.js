import multer from "multer";
import path from "path";
import fs from "fs";

const tempPath = path.join(process.cwd(), "public", "temp");

// Create folder if it doesn't exist
if (!fs.existsSync(tempPath)) {
  fs.mkdirSync(tempPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempPath); // absolute path → never fails
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });
