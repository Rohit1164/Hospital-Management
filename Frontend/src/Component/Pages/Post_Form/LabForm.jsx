import { useState, useEffect } from "react";
import { useTheme } from "../../../Context/ThemeProvider";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL_LAB;
const BASE_URL_DOCTOR = import.meta.env.VITE_BASE_URL_DOCTOR;
const BASE_URL_PATIENT = import.meta.env.VITE_BASE_URL_PATIENT;

export default function LabForm() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const dRes = await fetch(BASE_URL_DOCTOR);
        const dJson = await dRes.json();
        setDoctors(Array.isArray(dJson) ? dJson : dJson.data || []);

        const pRes = await fetch(BASE_URL_PATIENT);
        const pJson = await pRes.json();
        setPatients(
          Array.isArray(pJson)
            ? pJson
            : Array.isArray(pJson.patients)
            ? pJson.patients
            : []
        );
        navigate("/dashboard/labs");
      } catch (err) {
        console.error("Error fetching lists", err);
      }
    };

    fetchLists();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.patientId || !form.doctorId || !form.testName || !form.amount) {
      alert("Patient, Doctor, Test Name, and Amount are required");
      return;
    }

    const payload = {
      patient: form.patientId,
      doctor: form.doctorId,
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

      await res.json();
      alert("Lab Test saved successfully");

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
      navigate("/dashboard/labs");
    } catch (error) {
      console.error(error);
      alert("Error submitting lab test");
    }
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center p-6 transition-colors ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-3xl rounded-2xl p-6 shadow-2xl transition-colors ${
          darkMode
            ? "bg-gray-800 border border-gray-700"
            : "bg-white border border-gray-200"
        }`}
      >
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
            className={`p-3 rounded-xl border outline-none ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-gray-100"
                : "border-gray-300 text-gray-900"
            }`}
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
            className={`p-3 rounded-xl border outline-none ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-gray-100"
                : "border-gray-300 text-gray-900"
            }`}
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
            className={`p-3 rounded-xl border outline-none ${
              darkMode
                ? "bg-transparent border-gray-600 text-gray-100 placeholder-gray-400"
                : "border-gray-300 text-gray-900"
            }`}
          />

          {/* Test Date */}
          <input
            type="date"
            name="testDate"
            value={form.testDate}
            onChange={handleChange}
            className={`p-3 rounded-xl border outline-none ${
              darkMode
                ? "bg-transparent border-gray-600 text-gray-100"
                : "border-gray-300 text-gray-900"
            }`}
          />

          {/* Amount */}
          <input
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className={`p-3 rounded-xl border outline-none ${
              darkMode
                ? "bg-transparent border-gray-600 text-gray-100"
                : "border-gray-300 text-gray-900"
            }`}
          />

          {/* Result File */}
          <input
            name="resultFile"
            placeholder="Result File URL"
            value={form.resultFile}
            onChange={handleChange}
            className={`p-3 rounded-xl border outline-none ${
              darkMode
                ? "bg-transparent border-gray-600 text-gray-100"
                : "border-gray-300 text-gray-900"
            }`}
          />

          {/* Summary */}
          <textarea
            name="reportSummary"
            placeholder="Report Summary"
            value={form.reportSummary}
            onChange={handleChange}
            className={`p-3 rounded-xl border outline-none md:col-span-2 ${
              darkMode
                ? "bg-transparent border-gray-600 text-gray-100 placeholder-gray-400"
                : "border-gray-300 text-gray-900"
            }`}
          />

          {/* Status */}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={`p-3 rounded-xl border outline-none ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-gray-100"
                : "border-gray-300 text-gray-900"
            }`}
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
            className={`p-3 rounded-xl border outline-none ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-gray-100"
                : "border-gray-300 text-gray-900"
            }`}
          >
            <option value="">Billing Status</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className={`px-6 py-3 rounded-xl text-lg font-semibold transition ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-500 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
