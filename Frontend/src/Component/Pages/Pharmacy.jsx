import { useState, useEffect } from "react";
import { useTheme } from "../../Context/ThemeProvider.jsx";

const BASE_URL = import.meta.env.VITE_BASE_URL_PHARMACY;

export default function Pharmacy() {
  const { darkMode } = useTheme();
  const [addData, setAddData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPharmacy() {
      try {
        const res = await fetch(BASE_URL);
        const json = await res.json();

        // console.log("PHARMACY API: ", json.data);
        if (json?.data) {
          setAddData(json.data);
        }
        setLoading(false);
      } catch (error) {
        console.log("Pharmacy Error", error.message);
      }
    }
    loadPharmacy();
  }, []);

  return (
    <div
      className={`transition-all duration-300 rounded-2xl shadow-md p-6 border
      ${
        darkMode
          ? "bg-gray-900 text-gray-100 border-gray-800"
          : "bg-white text-gray-800 border-gray-200"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Pharmacy</h2>

      <div
        className={`rounded-lg overflow-hidden border
        ${
          darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        {/* Loading State */}
        {loading && <p className="p-4 text-center text-gray-500">Loading...</p>}

        {/* No Data */}
        {!loading && addData.length === 0 && (
          <p className="p-4 text-center text-gray-500">No Appointments</p>
        )}
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table
            className={`min-w-full text-sm ${
              darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
            }`}
          >
            <thead
              className={`${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              } text-left`}
            >
              <tr>
                <th className="p-3">S.no</th>
                <th className="p-3">Medicine Name</th>
                <th className="p-3">Batch Number</th>
                <th className="p-3">Manufacturer</th>
                <th className="p-3">Supplier</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">unit</th>
                <th className="p-3">Purchase Price</th>
                <th className="p-3">Selling Price</th>
                <th className="p-3">Admin</th>
                <th className="p-3">status</th>
              </tr>
            </thead>

            <tbody>
              {addData.map((r, index) => (
                <tr
                  key={r._id}
                  className={`border-b ${
                    darkMode ? "border-gray-700" : "border-gray-300"
                  }`}
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{r.medicineName}</td>
                  <td className="p-3">{r.batchNumber}</td>
                  <td className="p-3">{r.manufacturer}</td>
                  <td className="p-3">{r.supplier}</td>
                  <td className="p-3">{r.quantity}</td>
                  <td className="p-3">{r.unit}</td>
                  <td className="p-3">{r.purchasePrice}</td>
                  <td className="p-3">{r.sellingPrice}</td>
                  <td className="p-3">{r?.addedBy?.name}</td>

                  <td className="p-3">{r.status}</td>
                  {/* And more */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
