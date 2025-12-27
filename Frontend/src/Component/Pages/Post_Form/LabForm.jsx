import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL_LAB;
const BASE_URL_DOCTOR = import.meta.env.VITE_BASE_URL_DOCTOR;
const BASE_URL_PATIENT = import.meta.env.VITE_BASE_URL_PATIENT;

export default function LabForm() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    testName: "",
    testDate: "",
    amount: "",
    resultFile: "",
    reportSummary: "",
    status: "",
    billingStatus: "",
  });

  // ===============================
  // FETCH PATIENTS & DOCTORS
  // ===============================
  useEffect(() => {
    const fetchLists = async () => {
      try {
        // Doctors
        const dRes = await fetch(BASE_URL_DOCTOR);
        const dJson = await dRes.json();
        setDoctors(
          Array.isArray(dJson)
            ? dJson
            : Array.isArray(dJson.data)
            ? dJson.data
            : []
        );

        // Patients
        const pRes = await fetch(BASE_URL_PATIENT);
        const pJson = await pRes.json();
        setPatients(
          Array.isArray(pJson)
            ? pJson
            : Array.isArray(pJson.patients)
            ? pJson.patients
            : []
        );
      } catch (err) {
        console.error("Error fetching lists", err);
      }
    };

    fetchLists();
  }, []);

  // ===============================
  // HANDLE CHANGE
  // ===============================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ===============================
  // SUBMIT
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!form.patientId || !form.doctorId || !form.testName || !form.amount) {
      alert("Patient, Doctor, Test Name, and Amount are required");
      return;
    }

    // Payload EXACTLY as schema expects
    const payload = {
      patient: form.patientId, // ObjectId
      doctor: form.doctorId, // ObjectId
      testName: form.testName,
      testDate: form.testDate,
      amount: Number(form.amount),
      resultFile: form.resultFile,
      reportSummary: form.reportSummary,
      status: form.status,
      billingStatus: form.billingStatus,
    };

    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Saved:", data);
      alert("Lab Test saved successfully");

      // Reset
      setForm({
        patientId: "",
        doctorId: "",
        testName: "",
        testDate: "",
        amount: "",
        resultFile: "",
        reportSummary: "",
        status: "",
        billingStatus: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error submitting lab test");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Lab Test Form</h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Patient */}
          <select
            name="patientId"
            value={form.patientId}
            onChange={handleChange}
            className="p-3 rounded-xl border"
          >
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* Doctor */}
          <select
            name="doctorId"
            value={form.doctorId}
            onChange={handleChange}
            className="p-3 rounded-xl border"
          >
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Test Name */}
          <input
            name="testName"
            placeholder="Test Name"
            value={form.testName}
            onChange={handleChange}
            className="p-3 rounded-xl border"
          />

          {/* Test Date */}
          <input
            type="date"
            name="testDate"
            value={form.testDate}
            onChange={handleChange}
            className="p-3 rounded-xl border"
          />

          {/* Amount */}
          <input
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="p-3 rounded-xl border"
          />

          {/* Result File */}
          <input
            name="resultFile"
            placeholder="Result File URL"
            value={form.resultFile}
            onChange={handleChange}
            className="p-3 rounded-xl border"
          />

          {/* Summary */}
          <textarea
            name="reportSummary"
            placeholder="Report Summary"
            value={form.reportSummary}
            onChange={handleChange}
            className="p-3 rounded-xl border md:col-span-2"
          />

          {/* Status */}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="p-3 rounded-xl border"
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Billing Status */}
          <select
            name="billingStatus"
            value={form.billingStatus}
            onChange={handleChange}
            className="p-3 rounded-xl border"
          >
            <option value="">Billing Status</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>

          <div className="md:col-span-2 flex justify-center mt-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-lg">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
