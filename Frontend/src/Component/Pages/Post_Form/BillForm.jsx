import { useState } from "react";

export default function BillForm({ initialData }) {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    amount: initialData?.amount || "",
    status: initialData?.status || "Pending",
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL_BILL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}`, {
        method: initialData ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Saved:", data);
      alert("Bill saved successfully!");
      setForm({
        name: "",
        amount: "",
        status: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Bill Form</h2>

        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring focus:ring-blue-300 outline-none"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring focus:ring-blue-300 outline-none"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring focus:ring-blue-300 outline-none"
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-xl shadow hover:bg-blue-700 transition"
        >
          {initialData ? "Update Bill" : "Create Bill"}
        </button>
      </form>
    </div>
  );
}
