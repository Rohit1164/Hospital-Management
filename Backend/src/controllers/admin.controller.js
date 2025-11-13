import Admin from "../models/admin.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerAdmin(req, res) {
  try {
    const { name, email, password } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Admin already exists" });

    const hash = await bcrypt.hash(password, 10);

    const admin = await Admin.create({ name, email, password: hash });

    res.json({ msg: "Admin registered", admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(400).json({ msg: "Admin not found" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign({ id: admin._id }, "SECRET123", { expiresIn: "1d" });

    res.json({ msg: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function dashboard(req, res) {
  const admin = await Admin.find({});
  return res.status(200).json({
    success: true,
    message: "Welcome to Admin Dashboard",
    admin,
  });
}
