import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: {
      type: String,
      // default: "https://avatars.dicebear.com/api/initials/Admin.svg", // default avatar
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
