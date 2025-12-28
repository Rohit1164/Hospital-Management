import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../../Context/ThemeProvider";

const BASE_URL = import.meta.env.VITE_BASE_URL_PHARMACY;
const BASE_URL_ADMIN = import.meta.env.VITE_BASE_URL_ADMIN;

export default function PharmacyForm() {
  const { darkMode } = useTheme();

  const [adminId, setAdminId] = useState(null);
  const [form, setForm] = useState({
    medicineName: "",
    batchNumber: "",
    manufacturer: "",
    supplier: "In-house",
    quantity: "",
    unit: "",
    purchasePrice: "",
    sellingPrice: "",
    expiryDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    async function fetchAdmin() {
      try {
        const res = await fetch(BASE_URL_ADMIN);
        const data = await res.json();

        let id = null;
        if (data?.admin?._id) id = data.admin._id;
        else if (Array.isArray(data?.admin)) id = data.admin[0]?._id;
        else if (data?._id) id = data._id;
        else if (data?.data?._id) id = data.data._id;

        setAdminId(id);
      } catch (error) {
        console.log("Error while fetch Admin ", error.message);
      }
    }
    fetchAdmin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.medicineName ||
      !form.batchNumber ||
      !form.manufacturer ||
      !form.quantity ||
      !form.unit ||
      !form.purchasePrice ||
      !form.sellingPrice ||
      !form.expiryDate
    ) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      medicineName: form.medicineName,
      batchNumber: form.batchNumber.toUpperCase(),
      manufacturer: form.manufacturer,
      supplier: form.supplier || "In-house",
      quantity: Number(form.quantity),
      unit: form.unit,
      purchasePrice: Number(form.purchasePrice),
      sellingPrice: Number(form.sellingPrice),
      expiryDate: form.expiryDate,
      addedBy: adminId,
    };

    try {
      // const res = await axios.post(BASE_URL, payload);
      await axios.post(BASE_URL, payload);
      alert("Medicine Saved Successfully!");

      setForm({
        medicineName: "",
        batchNumber: "",
        manufacturer: "",
        supplier: "In-house",
        quantity: "",
        unit: "",
        purchasePrice: "",
        sellingPrice: "",
        expiryDate: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Error saving medicine");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-xl rounded-2xl p-6 shadow-xl transition-colors ${
          darkMode
            ? "bg-gray-800 border border-gray-700"
            : "bg-white border border-gray-200"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Pharmacy Medicine Form
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {[
            { name: "medicineName", placeholder: "Medicine Name" },
            { name: "batchNumber", placeholder: "Batch Number" },
            { name: "manufacturer", placeholder: "Manufacturer" },
            { name: "supplier", placeholder: "Supplier" },
            { name: "quantity", placeholder: "Quantity", type: "number" },
            {
              name: "purchasePrice",
              placeholder: "Purchase Price",
              type: "number",
            },
            {
              name: "sellingPrice",
              placeholder: "Selling Price",
              type: "number",
            },
          ].map(({ name, placeholder, type = "text" }) => (
            <input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
              value={form[name]}
              onChange={handleChange}
              className={`p-2 rounded-lg border outline-none transition ${
                darkMode
                  ? "bg-transparent border-gray-600 text-gray-100 placeholder-gray-400"
                  : "border-gray-300 text-gray-900"
              }`}
            />
          ))}

          {/* Unit */}
          <select
            name="unit"
            value={form.unit}
            onChange={handleChange}
            className={`p-2 rounded-lg border outline-none transition ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-gray-100"
                : "border-gray-300 text-gray-900"
            }`}
          >
            <option value="">Select Unit</option>
            <option value="Tablet">Tablet</option>
            <option value="Capsule">Capsule</option>
            <option value="Syrup">Syrup</option>
            <option value="Injection">Injection</option>
            <option value="Cream">Cream</option>
            <option value="Ointment">Ointment</option>
          </select>

          {/* Expiry */}
          <input
            type="date"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
            className={`p-2 rounded-lg border outline-none transition ${
              darkMode
                ? "bg-transparent border-gray-600 text-gray-100"
                : "border-gray-300 text-gray-900"
            }`}
          />

          <button
            type="submit"
            className={`py-2 rounded-xl font-semibold transition ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Save Medicine
          </button>
        </form>
      </div>
    </div>
  );
}
