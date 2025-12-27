import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL_PHARMACY;
const BASE_URL_ADMIN = import.meta.env.VITE_BASE_URL_ADMIN;

export default function PharmacyForm() {
  const [adminId, setAdminId] = useState(null);
  // const [admin, setAdmin] = useState([]);
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

        if (data?.admin?._id) {
          id = data.admin._id; // object
        } else if (Array.isArray(data?.admin)) {
          id = data.admin[0]?._id; // array
        } else if (data?._id) {
          id = data._id; // direct
        } else if (data?.data?._id) {
          id = data.data._id; // wrapped
        }
        console.log("FINAL ADMIN ID 👉", id);
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

    // ✅ Payload EXACTLY schema ke hisaab se
    const payload = {
      medicineName: form.medicineName,
      batchNumber: form.batchNumber.toUpperCase(), // schema requires uppercase
      manufacturer: form.manufacturer,
      supplier: form.supplier || "In-house",

      quantity: Number(form.quantity),
      unit: form.unit,

      purchasePrice: Number(form.purchasePrice),
      sellingPrice: Number(form.sellingPrice),

      expiryDate: form.expiryDate,
      addedBy: adminId,
      // addedBy: admin?._id || ADMIN_ID,
    };

    try {
      const res = await axios.post(BASE_URL, payload);
      console.log("Saved:", res.data);
      alert("Medicine Saved Successfully!");

      // reset form
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
      console.error("Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error saving medicine");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Pharmacy Medicine Form
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            name="medicineName"
            placeholder="Medicine Name"
            value={form.medicineName}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />

          <input
            name="batchNumber"
            placeholder="Batch Number"
            value={form.batchNumber}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />

          <input
            name="manufacturer"
            placeholder="Manufacturer"
            value={form.manufacturer}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />

          <input
            name="supplier"
            placeholder="Supplier"
            value={form.supplier}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />

          {/* ✅ ENUM FIELD */}
          <select
            name="unit"
            value={form.unit}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          >
            <option value="">Select Unit</option>
            <option value="Tablet">Tablet</option>
            <option value="Capsule">Capsule</option>
            <option value="Syrup">Syrup</option>
            <option value="Injection">Injection</option>
            <option value="Cream">Cream</option>
            <option value="Ointment">Ointment</option>
          </select>

          <input
            type="number"
            name="purchasePrice"
            placeholder="Purchase Price"
            value={form.purchasePrice}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />

          <input
            type="number"
            name="sellingPrice"
            placeholder="Selling Price"
            value={form.sellingPrice}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />

          <input
            type="date"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700"
          >
            Save Medicine
          </button>
        </form>
      </div>
    </div>
  );
}
