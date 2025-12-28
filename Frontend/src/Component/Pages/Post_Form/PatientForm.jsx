import { useState } from "react";
import axios from "axios";
import { useTheme } from "../../../Context/ThemeProvider";

const BASE_URL = import.meta.env.VITE_BASE_URL_PATIENT;

export default function PatientForm() {
  const { darkMode } = useTheme();

  const [form, setForm] = useState({
    name: "",
    diagonsedwith: "",
    address: "",
    age: "",
    bloodGroup: "",
    gender: "",
    admittedIn: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.diagonsedwith ||
      !form.address ||
      !form.age ||
      !form.bloodGroup ||
      !form.gender
    ) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      name: form.name,
      diagonsedwith: form.diagonsedwith,
      address: form.address,
      age: Number(form.age),
      bloodGroup: form.bloodGroup,
      gender: form.gender,
      admittedIn: form.admittedIn || null,
    };

    try {
      await axios.post(BASE_URL, payload);
      alert("Patient added successfully");

      setForm({
        name: "",
        diagonsedwith: "",
        address: "",
        age: "",
        bloodGroup: "",
        gender: "",
        admittedIn: "",
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Error adding patient");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-blue-50 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-2xl rounded-2xl p-8 shadow-xl transition-colors ${
          darkMode
            ? "bg-gray-800 border border-gray-700"
            : "bg-white border border-gray-200"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Add Patient</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Patient Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Rohit Kumar"
              className={`w-full rounded-lg p-3 border outline-none ${
                darkMode
                  ? "bg-transparent border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-400"
              }`}
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="25"
              className={`w-full rounded-lg p-3 border outline-none ${
                darkMode
                  ? "bg-transparent border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-400"
              }`}
            />
          </div>

          {/* Diagnosis */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Diagnosed With
            </label>
            <input
              name="diagonsedwith"
              value={form.diagonsedwith}
              onChange={handleChange}
              placeholder="Fever / Diabetes / BP"
              className={`w-full rounded-lg p-3 border outline-none ${
                darkMode
                  ? "bg-transparent border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-400"
              }`}
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              name="address"
              rows="2"
              value={form.address}
              onChange={handleChange}
              placeholder="Patient address"
              className={`w-full rounded-lg p-3 border outline-none ${
                darkMode
                  ? "bg-transparent border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-400"
              }`}
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Blood Group
            </label>
            <select
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              className={`w-full rounded-lg p-3 border outline-none ${
                darkMode
                  ? "bg-gray-800 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500"
                  : "bg-white border-gray-300 focus:ring-2 focus:ring-blue-400"
              }`}
            >
              <option value="">Select Blood Group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>O+</option>
              <option>O-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className={`w-full rounded-lg p-3 border outline-none ${
                darkMode
                  ? "bg-gray-800 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500"
                  : "bg-white border-gray-300 focus:ring-2 focus:ring-blue-400"
              }`}
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="CUSTOM">Custom</option>
            </select>
          </div>

          {/* Hospital */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Admitted In (Hospital ID – Optional)
            </label>
            <input
              name="admittedIn"
              value={form.admittedIn}
              onChange={handleChange}
              placeholder="Hospital ObjectId"
              className={`w-full rounded-lg p-3 border outline-none ${
                darkMode
                  ? "bg-transparent border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-400"
              }`}
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className={`w-full py-3 rounded-xl text-lg font-semibold transition ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-500 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Save Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
