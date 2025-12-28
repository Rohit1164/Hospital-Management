import { useEffect, useState } from "react";
import { useTheme } from "../../../Context/ThemeProvider";
import { useNavigate } from "react-router-dom";
const BASE_URL_PATIENT = import.meta.env.VITE_BASE_URL_PATIENT;
const BASE_URL = import.meta.env.VITE_BASE_URL_BILL;

export default function BillForm({ initialData }) {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    patientId: "",
    amount: "",
    status: "Pending",
  });

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const res = await fetch(BASE_URL_PATIENT);
        const data = await res.json();
        console.log(data.patients?.name);
        setPatients(data.patients);
      } catch (error) {
        console.log(
          "error on billing while fetching pantient name",
          error.message
        );
      }
    };
    fetchLists();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const payload = {
  //     name: form.patientId,
  //     amount: Number(form.amount),
  //     status: form.status,
  //   };

  //   try {
  //     const res = await fetch(`${BASE_URL}`, {
  //       method: initialData ? "PUT" : "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     await res.json();
  //     // console.log("Saved:", data);
  //     alert("Bill saved successfully!");
  //     setForm({
  //       name: "",
  //       amount: "",
  //       status: "Pending",
  //     });
  //     navigate("/dashboard/billing");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Something went wrong");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.patientId) {
      alert("Please select patient");
      return;
    }

    const payload = {
      patientId: form.patientId, // ✅ ID save hogi
      amount: Number(form.amount),
      status: form.status,
    };

    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      await res.json();
      alert("Bill saved successfully!");

      setForm({
        patientId: "",
        amount: "",
        status: "Pending",
      });

      navigate("/dashboard/billing");
    } catch (error) {
      alert("Something went wrong", error.message);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6 border transition-colors ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Bill Form</h2>

        {/* Name */}
        <div>
          <label
            className={`block font-medium mb-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Name
          </label>
          <select
            name="patientId"
            value={form.patientId}
            onChange={handleChange}
            className={`w-full p-3 rounded-xl border outline-none transition ${
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
        </div>

        {/* Amount */}
        <div>
          <label
            className={`block font-medium mb-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className={`w-full p-3 rounded-xl border outline-none transition ${
              darkMode
                ? "bg-transparent border-gray-600 text-gray-100 focus:ring focus:ring-blue-500"
                : "border-gray-300 focus:ring focus:ring-blue-300"
            }`}
            required
          />
        </div>

        {/* Status */}
        <div>
          <label
            className={`block font-medium mb-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={`w-full p-3 rounded-xl border outline-none transition ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-gray-100 focus:ring focus:ring-blue-500"
                : "border-gray-300 focus:ring focus:ring-blue-300"
            }`}
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          className={`w-full px-4 py-3 rounded-xl shadow font-semibold transition ${
            darkMode
              ? "bg-blue-600 hover:bg-blue-500 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {initialData ? "Update Bill" : "Create Bill"}
        </button>
      </form>
    </div>
  );
}
