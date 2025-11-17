import Table from "../UI/Table.jsx";
import { useState, useEffect } from "react";
import { useTheme } from "../../Context/ThemeProvider.jsx";

const BASE_URL = import.meta.env.VITE_BASE_URL_LAB;

export default function Labs() {
  const { darkMode } = useTheme();
  const [test, setTest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLabs() {
      try {
        const res = await fetch(BASE_URL);
        const json = await res.json();

        // console.log("API: ", json.data);

        if (json?.data) {
          setTest(json.data);
        }
      } catch (error) {
        console.log("Lab Error:", error.message);
      } finally {
        setLoading(false);
      }
    }

    loadLabs();
  }, []);

  return (
    <div
      className={`p-6 rounded-2xl shadow-md transition-colors duration-300 border ${
        darkMode
          ? "bg-gray-900 text-gray-100 border-gray-800"
          : "bg-white text-gray-800 border-gray-200"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Laboratory</h2>

      <div
        className={`overflow-hidden rounded-xl transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-800"
        }`}
      >
        {loading && <p className="p-4 text-center text-gray-500">Loading...</p>}

        {!loading && test.length === 0 && (
          <p className="p-4 text-center text-gray-500">No Lab Records Found</p>
        )}

        {!loading && test.length > 0 && (
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table
              className={`min-w-full text-sm ${
                darkMode
                  ? "bg-gray-800 text-gray-100"
                  : "bg-white text-gray-900"
              }`}
            >
              <thead
                className={`${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                } text-left`}
              >
                <tr>
                  <th className="p-3">S.No</th>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Doctor</th>
                  <th className="p-3">Test Name</th>
                  <th className="p-3">Test Date</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Result File</th>
                  <th className="p-3">Report Summary</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Billing Status</th>
                </tr>
              </thead>

              <tbody>
                {test.map((r, index) => (
                  <tr
                    key={r._id}
                    className={`border-b ${
                      darkMode ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{r?.patient?.name || "N/A"}</td>
                    <td className="p-3">{r?.doctor?.name || "N/A"}</td>
                    <td className="p-3">{r.testName}</td>
                    <td className="p-3">{r.testDate}</td>
                    <td className="p-3">{r.amount}</td>
                    <td className="p-3">{r.resultFile || "N/A"}</td>
                    <td className="p-3">{r.reportSummary}</td>
                    <td className="p-3">{r.status}</td>
                    <td className="p-3">{r.billingStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
