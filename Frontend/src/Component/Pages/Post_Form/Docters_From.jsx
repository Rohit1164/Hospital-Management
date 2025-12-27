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

const BASE_URL = import.meta.env.VITE_BASE_URL_DOCTOR;

export default function AddDoctorForm() {
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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add New Doctor
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="flex items-center border rounded-lg p-2 mt-1 bg-gray-50">
              <User className="text-gray-500 mr-2" size={20} />
              <input
                name="name"
                className="w-full bg-transparent outline-none"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="flex items-center border rounded-lg p-2 mt-1 bg-gray-50">
              <Mail className="text-gray-500 mr-2" size={20} />
              <input
                name="email"
                className="w-full bg-transparent outline-none"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center border rounded-lg p-2 mt-1 bg-gray-50">
              <Lock className="text-gray-500 mr-2" size={20} />
              <input
                name="password"
                type="password"
                className="w-full bg-transparent outline-none"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Salary */}
          <div>
            <label className="text-sm font-medium text-gray-700">Salary</label>
            <div className="flex items-center border rounded-lg p-2 mt-1 bg-gray-50">
              <IndianRupee className="text-gray-500 mr-2" size={20} />
              <input
                name="salary"
                type="number"
                className="w-full bg-transparent outline-none"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Qualification */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Qualification
            </label>
            <div className="flex items-center border rounded-lg p-2 mt-1 bg-gray-50">
              <GraduationCap className="text-gray-500 mr-2" size={20} />
              <input
                name="qualification"
                className="w-full bg-transparent outline-none"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Experience */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Experience (Years)
            </label>
            <div className="flex items-center border rounded-lg p-2 mt-1 bg-gray-50">
              <Briefcase className="text-gray-500 mr-2" size={20} />
              <input
                name="experienceInYears"
                type="number"
                className="w-full bg-transparent outline-none"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Works in Hospitals */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Works in Hospitals
            </label>
            <div className="flex items-center border rounded-lg p-2 mt-1 bg-gray-50">
              <Building2 className="text-gray-500 mr-2" size={20} />
              <input
                name="worksInHospitals"
                className="w-full bg-transparent outline-none"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-700"
          >
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
}
