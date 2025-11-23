import { NavLink } from "react-router-dom";
import { useTheme } from "../../Context/ThemeProvider.jsx";
// import Table from "../UI/Table.jsx";
import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL_BILL;

export default function Billing() {
  const { darkMode } = useTheme();

  const [addbill, setBill] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBill() {
      try {
        const res = await fetch(BASE_URL);
        const json = await res.json();

        // console.log("API: ", json.data);
        if (json?.data) {
          setBill(json.data);
        }
        setLoading(false);
      } catch (error) {
        console.log("Pharmacy Error", error.message);
      }
    }
    loadBill();
  }, []);

  return (
    <div
      className={`min-h-screen p-8 rounded-2xl shadow-md transition-colors duration-300 
        ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"}`}
    >
      <h2
        className={`text-3xl font-bold mb-6 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Billing
      </h2>

      {loading && <p className="p-4 text-center text-gray-500">Loading...</p>}

      {/* No Data */}
      {!loading && addbill.length === 0 && (
        <p className="p-4 text-center text-gray-500">No Bills</p>
      )}

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table
          className={`min-w-full text-sm ${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
          }`}
        >
          <thead
            className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} text-left`}
          >
            <tr>
              <th className="p-3">S.no</th>
              <th className="p-3">Name</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {addbill.map((r, index) => (
              <tr
                key={r._id}
                className={`border-b ${
                  darkMode ? "border-gray-700" : "border-gray-300"
                }`}
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.amount}</td>
                <td className="p-3">{r.status}</td>

                {/* And more */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="
      flex items-center gap-2 
      bg-blue-600 hover:bg-blue-700 
      text-white font-semibold 
      px-4 py-2 rounded-lg 
      shadow-md transition-all
    "
      >
        <NavLink
          key={"/post_data_records"}
          to={"/dashboard/bills/post_data_bill"}
        >
          <span>
            {/* <Pencil className="w-4 h-4" /> */}
            Add
          </span>
        </NavLink>
      </button>
    </div>
  );
}
