import React, { useEffect, useState } from "react";

export default function MedicalRecordForm() {
  const BASE = import.meta.env.VITE_BASE_URL_MEDICALREPORT || "";

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
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch lists for selects (adjust endpoints if your API differs)
    async function fetchLists() {
      try {
        const [dRes, hRes] = await Promise.all([
          fetch(`${BASE}/doctors`),
          fetch(`${BASE}/hospitals`),
        ]);
        if (dRes.ok) setDoctors(await dRes.json());
        if (hRes.ok) setHospitals(await hRes.json());
      } catch (e) {
        console.error("Failed to load doctors/hospitals", e);
      }
    }
    fetchLists();
  }, [BASE]);

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

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    if (!validate()) return;
    setLoading(true);

    // Build payload to match the JSON structure you showed
    const doctor = doctors.find((d) => d._id === form.doctorId) || {
      _id: form.doctorId,
      name: "",
    };
    const hospital = hospitals.find((h) => h._id === form.hospitalId) || {
      _id: form.hospitalId,
      name: "",
    };

    const payload = {
      patientName: form.patientName,
      patientAge: Number(form.patientAge),
      diagnosis: form.diagnosis,
      treatment: form.treatment,
      doctor: { _id: doctor._id, name: doctor.name },
      hospital: { _id: hospital._id, name: hospital.name },
      prescription: form.prescription,
    };

    try {
      // Adjust endpoint path if your API expects something else (e.g. /reports)
      const res = await fetch(`${BASE}/medical-records`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Server error");
      }
      const data = await res.json();
      setMessage({
        type: "success",
        text: "Medical record created successfully.",
      });
      // Optionally reset or populate form with returned record
      setForm({
        patientName: "",
        patientAge: "",
        diagnosis: "",
        treatment: "",
        doctorId: "",
        hospitalId: "",
        prescription: "",
      });
      console.log("created record:", data);
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err.message || "Failed to create record",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-2">Create Medical Record</h2>
        <p className="text-sm text-gray-500 mb-6">
          Fill patient details and save the record to your medical reports API.
        </p>

        {message && (
          <div
            className={`p-3 rounded-md mb-4 ${
              message.type === "success"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Patient name
            </label>
            <input
              className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                errors.patientName ? "border-red-300" : "border-gray-200"
              }`}
              value={form.patientName}
              onChange={(e) =>
                setForm({ ...form, patientName: e.target.value })
              }
              placeholder="e.g. Rohit"
            />
            {errors.patientName && (
              <p className="text-xs text-red-600 mt-1">{errors.patientName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              type="number"
              className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                errors.patientAge ? "border-red-300" : "border-gray-200"
              }`}
              value={form.patientAge}
              onChange={(e) => setForm({ ...form, patientAge: e.target.value })}
              placeholder="21"
            />
            {errors.patientAge && (
              <p className="text-xs text-red-600 mt-1">{errors.patientAge}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Diagnosis</label>
            <textarea
              rows={2}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 border-gray-200"
              value={form.diagnosis}
              onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
              placeholder="Diagnosis details"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Treatment</label>
            <textarea
              rows={2}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 border-gray-200"
              value={form.treatment}
              onChange={(e) => setForm({ ...form, treatment: e.target.value })}
              placeholder="Treatment plan"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Doctor</label>
              <select
                className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                  errors.doctorId ? "border-red-300" : "border-gray-200"
                }`}
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
                <p className="text-xs text-red-600 mt-1">{errors.doctorId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Hospital</label>
              <select
                className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                  errors.hospitalId ? "border-red-300" : "border-gray-200"
                }`}
                value={form.hospitalId}
                onChange={(e) =>
                  setForm({ ...form, hospitalId: e.target.value })
                }
              >
                <option value="">Select hospital</option>
                {hospitals.map((h) => (
                  <option key={h._id} value={h._id}>
                    {h.name}
                  </option>
                ))}
              </select>
              {errors.hospitalId && (
                <p className="text-xs text-red-600 mt-1">{errors.hospitalId}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Prescription
            </label>
            <textarea
              rows={2}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 border-gray-200"
              value={form.prescription}
              onChange={(e) =>
                setForm({ ...form, prescription: e.target.value })
              }
              placeholder="Prescribed medicines / notes"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow hover:brightness-105 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Record"}
            </button>

            <button
              type="button"
              onClick={() =>
                setForm({
                  patientName: "",
                  patientAge: "",
                  diagnosis: "",
                  treatment: "",
                  doctorId: "",
                  hospitalId: "",
                  prescription: "",
                })
              }
              className="px-4 py-2 rounded-lg border hover:bg-gray-50"
            >
              Reset
            </button>

            <div className="ml-auto text-xs text-gray-400">
              API base:{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">
                VITE_BASE_URL_MEDICALREPORT
              </code>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        Tip: adjust <code>fetch</code> endpoints (/doctors, /hospitals,
        /medical-records) to match your backend.
      </div>
    </div>
  );
}
