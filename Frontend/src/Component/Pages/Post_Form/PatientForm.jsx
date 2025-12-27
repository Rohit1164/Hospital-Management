import { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL_PATIENT;

export default function PatientForm() {
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

    // ✅ frontend validation
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
      const res = await axios.post(BASE_URL, payload);
      console.log("Patient Added:", res.data);
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
    <div className="min-h-screen from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add Patient
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Patient Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Rohit Kumar"
              className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="25"
              className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Diagnosis */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Diagnosed With
            </label>
            <input
              name="diagonsedwith"
              value={form.diagonsedwith}
              onChange={handleChange}
              placeholder="Fever / Diabetes / BP"
              className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows="2"
              placeholder="Patient address"
              className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Blood Group
            </label>
            <select
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 outline-none"
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
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="CUSTOM">Custom</option>
            </select>
          </div>

          {/* Hospital (Optional) */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Admitted In (Hospital ID – Optional)
            </label>
            <input
              name="admittedIn"
              value={form.admittedIn}
              onChange={handleChange}
              placeholder="Hospital ObjectId"
              className="mt-1 w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
            >
              Save Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
