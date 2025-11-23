import { useState, useEffect } from "react";
import axios from "axios";

export default function PharmacyForm({ data }) {
  const [form, setForm] = useState({
    medicineName: "",
    batchNumber: "",
    manufacturer: "",
    supplier: "",
    quantity: "",
    unit: "",
    purchasePrice: "",
    sellingPrice: "",
    expiryDate: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        medicineName: data.medicineName || "",
        batchNumber: data.batchNumber || "",
        manufacturer: data.manufacturer || "",
        supplier: data.supplier || "",
        quantity: data.quantity || "",
        unit: data.unit || "",
        purchasePrice: data.purchasePrice || "",
        sellingPrice: data.sellingPrice || "",
        expiryDate: data.expiryDate ? data.expiryDate.split("T")[0] : "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      `${import.meta.env.VITE_BASE_URL_PHARMACY}/medicine`,
      form
    );
    alert("Medicine Saved Successfully!");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Pharmacy Medicine Form
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {Object.keys(form).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-semibold mb-1 capitalize">
              {key}
            </label>
            <input
              type={key === "expiryDate" ? "date" : "text"}
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="border p-2 rounded-lg focus:ring focus:ring-blue-200 outline-none"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl mt-4 font-semibold hover:bg-blue-700 transition"
        >
          Save Medicine
        </button>
      </form>
    </div>
  );
}
