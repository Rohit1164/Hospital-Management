import { useState } from "react";
import { User, FileText, Calendar, DollarSign } from "lucide-react";

export default function LabForm() {
  const BASE_URL = import.meta.env.VITE_BASE_URL_LAB;

  const [form, setForm] = useState({
    patientName: "",
    patientAge: "",
    patientGender: "",
    doctorName: "",
    testName: "",
    testDate: "",
    amount: "",
    resultFile: "",
    reportSummary: "",
    status: "",
    billingStatus: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/labs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      console.log("Saved:", data);
      alert("Lab form submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error submitting form");
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
          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            value={form.patientName}
            onChange={handleChange}
            className="p-3 rounded-xl border w-full"
          />

          <input
            type="number"
            name="patientAge"
            placeholder="Patient Age"
            value={form.patientAge}
            onChange={handleChange}
            className="p-3 rounded-xl border w-full"
          />

          <select
            name="patientGender"
            value={form.patientGender}
            onChange={handleChange}
            className="p-3 rounded-xl border w-full"
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>

          <input
            type="text"
            name="doctorName"
            placeholder="Doctor Name"
            value={form.doctorName}
            onChange={handleChange}
            className="p-3 rounded-xl border w-full"
          />

          <input
            type="text"
            name="testName"
            placeholder="Test Name"
            value={form.testName}
            onChange={handleChange}
            className="p-3 rounded-xl border w-full"
          />

          <input
            type="date"
            name="testDate"
            value={form.testDate}
            onChange={handleChange}
            className="p-3 rounded-xl border w-full"
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            className="p-3 rounded-xl border w-full"
          />

          <input
            type="text"
            name="resultFile"
            placeholder="Result File URL"
            value={form.resultFile}
            onChange={handleChange}
            className="p-3 rounded-xl border w-full"
          />

          <textarea
            name="reportSummary"
            placeholder="Report Summary"
            value={form.reportSummary}
            onChange={handleChange}
            className="p-3 rounded-xl border w-full col-span-1 md:col-span-2"
            rows="3"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="p-3 rounded-xl border w-full"
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            name="billingStatus"
            value={form.billingStatus}
            onChange={handleChange}
            className="p-3 rounded-xl border w-full"
          >
            <option value="">Billing Status</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>

          <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
