import { useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Lock,
  Briefcase,
  GraduationCap,
  Building2,
  IndianRupee,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../Context/ThemeProvider";

const BASE_URL = import.meta.env.VITE_BASE_URL_DOCTOR;

export default function AddDoctorForm() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    qualification: "",
    experienceInYears: "",
    worksInHospitals: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.qualification ||
      formData.experienceInYears === ""
    ) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      salary: Number(formData.salary || 0),
      qualification: formData.qualification,
      experienceInYears: Number(formData.experienceInYears || 0),
      worksInHospitals: formData.worksInHospitals
        ? formData.worksInHospitals.split(",").map((h) => h.trim())
        : [],
    };

    try {
      const res = await axios.post(`${BASE_URL}/create`, payload);
      console.log("Doctor Added:", res.data);
      alert("Doctor added successfully");
      navigate("/dashboard/doctors");
    } catch (err) {
      console.error("Backend error:", err.response?.data);
      alert(err.response?.data?.message || "Error adding doctor");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors ${
        darkMode
          ? "bg-linear-to-br from-gray-900 to-gray-800 text-gray-100"
          : "bg-linear-to-br from-gray-50 to-gray-200 text-gray-900"
      }`}
    >
      {/* CARD */}
      <div
        className={`w-full max-w-xl rounded-2xl shadow-xl p-8 border transition-colors ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Add New Doctor</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* INPUT TEMPLATE */}
          {[
            { label: "Full Name", name: "name", icon: User },
            { label: "Email", name: "email", icon: Mail },
            {
              label: "Password",
              name: "password",
              icon: Lock,
              type: "password",
            },
            {
              label: "Salary",
              name: "salary",
              icon: IndianRupee,
              type: "number",
            },
            {
              label: "Qualification",
              name: "qualification",
              icon: GraduationCap,
            },
            {
              label: "Experience (Years)",
              name: "experienceInYears",
              icon: Briefcase,
              type: "number",
            },
            {
              label: "Works in Hospitals",
              name: "worksInHospitals",
              icon: Building2,
            },
            // eslint-disable-next-line no-unused-vars
          ].map(({ label, name, icon: Icon, type = "text" }) => (
            <div key={name}>
              <label
                className={`text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {label}
              </label>

              <div
                className={`flex items-center border rounded-lg p-2 mt-1 transition-colors ${
                  darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-gray-50 border-gray-300"
                }`}
              >
                <Icon
                  size={20}
                  className={`mr-2 ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                />

                <input
                  type={type}
                  name={name}
                  onChange={handleChange}
                  className={`w-full bg-transparent outline-none ${
                    darkMode
                      ? "text-gray-100 placeholder-gray-400"
                      : "text-gray-900 placeholder-gray-500"
                  }`}
                />
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
}
