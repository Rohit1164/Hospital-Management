import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../Context/ThemeProvider";

const BASE_MEDICALREPORT = import.meta.env.VITE_BASE_URL_MEDICALREPORT || "";
const BASE_URL_DOCTOR = import.meta.env.VITE_BASE_URL_DOCTOR;
const BASE_URL_HOSPITAL = import.meta.env.VITE_BASE_URL_HOSPITAL;
const BASE_URL_PATIENT = import.meta.env.VITE_BASE_URL_PATIENT;

export default function MedicalRecordForm() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    patientId: "",
    patientAge: "",
    diagnosis: "",
    treatment: "",
    doctorId: "",
    hospitalId: "",
    prescription: "",
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // ✅ fetch doctors + hospitals ONCE
  useEffect(() => {
    async function fetchLists() {
      try {
        const dRes = await fetch(BASE_URL_DOCTOR);
        const dJson = await dRes.json();
        // console.log(dJson);
        setDoctors(dJson.data || dJson);

        const hRes = await fetch(BASE_URL_HOSPITAL);
        const hJson = await hRes.json();

        setHospitals(hJson.hospitals);

        const pRes = await fetch(BASE_URL_PATIENT);
        const pJson = await pRes.json();
        setPatients(
          Array.isArray(pJson)
            ? pJson
            : Array.isArray(pJson.patients)
            ? pJson.patients
            : []
        );
      } catch (e) {
        console.error("Failed to load lists", e);
      }
    }
    fetchLists();
  }, []);

  // ✅ validation
  function validate() {
    const e = {};
    if (!form.patientId) e.patientId = "Patient is required";
    if (!form.patientAge || isNaN(Number(form.patientAge)))
      e.patientAge = "Valid age is required";
    if (!form.doctorId) e.doctorId = "Select a doctor";
    if (!form.hospitalId) e.hospitalId = "Select a hospital";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ submit
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const doctor = doctors.find((d) => d._id === form.doctorId) || {};
    const patient = patients.find((p) => p._id === form.patientId) || {};

    const payload = {
      patientName: patient.name,
      patientAge: Number(form.patientAge),
      diagnosis: form.diagnosis,
      treatment: form.treatment,

      doctor: {
        _id: doctor._id,
        name: doctor.name || doctor.doctorName || "",
      },

      hospital: form.hospitalId, // ✅ REQUIRED BY BACKEND
      prescription: form.prescription,
    };

    try {
      const res = await fetch(BASE_MEDICALREPORT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      await res.json();
      alert("Medical record added successfully");

      setForm({
        patientId: "",
        patientAge: "",
        diagnosis: "",
        treatment: "",
        doctorId: "",
        hospitalId: "",
        prescription: "",
      });
      navigate("/dashboard/records");
    } catch (err) {
      console.error(err.message, "Error on Medical Record");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div
      className={`p-6 min-h-screen transition-colors ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div
        className={`max-w-3xl mx-auto shadow-lg rounded-2xl p-6 transition-colors ${
          darkMode
            ? "bg-gray-800 border border-gray-700"
            : "bg-white border border-gray-200"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Create Medical Record
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Patient Name */}
          <div>
            <label
              className={`text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Patient Name
            </label>
            {/* Patient */}
            <select
              name="patientId"
              value={form.patientId}
              onChange={handleChange}
              className={`w-full rounded-lg border px-3 py-2 bg-transparent outline-none ${
                darkMode
                  ? "border-gray-600 text-gray-100"
                  : "border-gray-300 text-gray-900"
              }`}
            >
              <option value="">Select Patient</option>
              {patients.map((p) => (
                <option key={p._id} value={p._id} className="text-gray-700">
                  {p.name}
                </option>
              ))}
            </select>
            {errors.patientId && (
              <p className="text-xs text-red-500 mt-1">{errors.patientId}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label
              className={`text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Age
            </label>
            <input
              type="number"
              className={`w-full rounded-lg border px-3 py-2 bg-transparent outline-none ${
                darkMode
                  ? "border-gray-600 text-gray-100"
                  : "border-gray-300 text-gray-900"
              }`}
              value={form.patientAge}
              onChange={(e) => setForm({ ...form, patientAge: e.target.value })}
            />
            {errors.patientAge && (
              <p className="text-xs text-red-500 mt-1">{errors.patientAge}</p>
            )}
          </div>

          {/* Diagnosis */}
          <div>
            <label
              className={`text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Diagnosis
            </label>
            <textarea
              className={`w-full rounded-lg border px-3 py-2 bg-transparent outline-none ${
                darkMode
                  ? "border-gray-600 text-gray-100"
                  : "border-gray-300 text-gray-900"
              }`}
              value={form.diagnosis}
              onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
            />
          </div>

          {/* Treatment */}
          <div>
            <label
              className={`text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Treatment
            </label>
            <textarea
              className={`w-full rounded-lg border px-3 py-2 bg-transparent outline-none ${
                darkMode
                  ? "border-gray-600 text-gray-100"
                  : "border-gray-300 text-gray-900"
              }`}
              value={form.treatment}
              onChange={(e) => setForm({ ...form, treatment: e.target.value })}
            />
          </div>

          {/* Doctor */}
          <div>
            <label
              className={`text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Doctor
            </label>
            <select
              className={`w-full rounded-lg border px-3 py-2 bg-transparent outline-none ${
                darkMode
                  ? "border-gray-600 text-gray-100"
                  : "border-gray-300 text-gray-900"
              }`}
              value={form.doctorId}
              onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
            >
              <option value="">Select doctor</option>
              {doctors.map((d) => (
                <option key={d._id} value={d._id} className="text-gray-800">
                  {d.name}
                </option>
              ))}
            </select>
            {errors.doctorId && (
              <p className="text-xs text-red-500 mt-1">{errors.doctorId}</p>
            )}
          </div>

          {/* Hospital */}
          <div>
            <label
              className={`text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Hospital
            </label>
            <select
              className={`w-full rounded-lg border px-3 py-2 bg-transparent outline-none ${
                darkMode
                  ? "border-gray-600 text-gray-100"
                  : "border-gray-300 text-gray-900"
              }`}
              value={form.hospitalId}
              onChange={(e) => setForm({ ...form, hospitalId: e.target.value })}
            >
              <option value="">Select hospital</option>
              {Array.isArray(hospitals) &&
                hospitals.map((h) => (
                  <option key={h._id} value={h._id} className="text-gray-800">
                    {h.name}
                  </option>
                ))}
            </select>
            {errors.hospitalId && (
              <p className="text-xs text-red-500 mt-1">{errors.hospitalId}</p>
            )}
          </div>

          {/* Prescription */}
          <div>
            <label
              className={`text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Prescription
            </label>
            <textarea
              className={`w-full rounded-lg border px-3 py-2 bg-transparent outline-none ${
                darkMode
                  ? "border-gray-600 text-gray-100"
                  : "border-gray-300 text-gray-900"
              }`}
              value={form.prescription}
              onChange={(e) =>
                setForm({ ...form, prescription: e.target.value })
              }
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`py-2 rounded-lg font-semibold transition ${
              darkMode
                ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {loading ? "Saving..." : "Save Record"}
          </button>
        </form>
      </div>
    </div>
  );
}
