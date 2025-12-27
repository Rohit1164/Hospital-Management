import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const BASE_MEDICALREPORT = import.meta.env.VITE_BASE_URL_MEDICALREPORT || "";
const BASE_URL_DOCTOR = import.meta.env.VITE_BASE_URL_DOCTOR;
const BASE_URL_HOSPITAL = import.meta.env.VITE_BASE_URL_HOSPITAL;

export default function MedicalRecordForm() {
  const [form, setForm] = useState({
    patientName: "",
    patientAge: "",
    diagnosis: "",
    treatment: "",
    doctorId: "",
    hospitalId: "",
    prescription: "",
  });

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

        const hospitalList = Array.isArray(hJson)
          ? hJson
          : Array.isArray(hJson.data)
          ? hJson.data
          : [];
        console.log(hospitalList);
        console.log(hJson.hospitals);
        setHospitals(hJson.hospitals);
      } catch (e) {
        console.error("Failed to load lists", e);
      }
    }
    fetchLists();
  }, []);

  // ✅ validation
  function validate() {
    const e = {};
    if (!form.patientName.trim()) e.patientName = "Patient name is required";
    if (!form.patientAge || isNaN(Number(form.patientAge)))
      e.patientAge = "Valid age is required";
    if (!form.doctorId) e.doctorId = "Select a doctor";
    if (!form.hospitalId) e.hospitalId = "Select a hospital";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ✅ submit
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const doctor = doctors.find((d) => d._id === form.doctorId) || {};

    const payload = {
      patientName: form.patientName,
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
        patientName: "",
        patientAge: "",
        diagnosis: "",
        treatment: "",
        doctorId: "",
        hospitalId: "",
        prescription: "",
      });
      Navigate();
    } catch (err) {
      console.error(err.message, "Error on Medical Record");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-2">Create Medical Record</h2>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Patient Name */}
          <div>
            <label className="text-sm font-medium">Patient Name</label>
            <input
              className="w-full rounded-lg border px-3 py-2"
              value={form.patientName}
              onChange={(e) =>
                setForm({ ...form, patientName: e.target.value })
              }
            />
            {errors.patientName && (
              <p className="text-xs text-red-600">{errors.patientName}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="text-sm font-medium">Age</label>
            <input
              type="number"
              className="w-full rounded-lg border px-3 py-2"
              value={form.patientAge}
              onChange={(e) => setForm({ ...form, patientAge: e.target.value })}
            />
            {errors.patientAge && (
              <p className="text-xs text-red-600">{errors.patientAge}</p>
            )}
          </div>

          {/* Diagnosis */}
          <div>
            <label className="text-sm font-medium">Diagnosis</label>
            <textarea
              className="w-full rounded-lg border px-3 py-2"
              value={form.diagnosis}
              onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
            />
          </div>

          {/* Treatment */}
          <div>
            <label className="text-sm font-medium">Treatment</label>
            <textarea
              className="w-full rounded-lg border px-3 py-2"
              value={form.treatment}
              onChange={(e) => setForm({ ...form, treatment: e.target.value })}
            />
          </div>

          {/* Doctor */}
          <div>
            <label className="text-sm font-medium">Doctor</label>
            <select
              className="w-full rounded-lg border px-3 py-2"
              value={form.doctorId}
              onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
            >
              <option value="">Select doctor</option>
              {doctors.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
            {errors.doctorId && (
              <p className="text-xs text-red-600">{errors.doctorId}</p>
            )}
          </div>

          {/* Hospital */}
          <div>
            <label className="text-sm font-medium">Hospital</label>
            <select
              className="w-full rounded-lg border px-3 py-2"
              value={form.hospitalId}
              onChange={(e) => setForm({ ...form, hospitalId: e.target.value })}
            >
              {Array.isArray(hospitals) &&
                hospitals.map((h) => (
                  <option key={h._id} value={h._id}>
                    {h.name}
                  </option>
                ))}
            </select>
            {errors.hospitalId && (
              <p className="text-xs text-red-600">{errors.hospitalId}</p>
            )}
          </div>

          {/* Prescription */}
          <div>
            <label className="text-sm font-medium">Prescription</label>
            <textarea
              className="w-full rounded-lg border px-3 py-2"
              value={form.prescription}
              onChange={(e) =>
                setForm({ ...form, prescription: e.target.value })
              }
            />
          </div>

          {/* Buttons */}
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white py-2 rounded-lg"
          >
            {loading ? "Saving..." : "Save Record"}
          </button>
        </form>
      </div>
    </div>
  );
}
