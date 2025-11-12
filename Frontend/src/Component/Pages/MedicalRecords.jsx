import React, { useState } from "react";
import Card from "../UI/Card.jsx";
import { useTheme } from "../../Context/ThemeProvider.jsx";

export default function MedicalRecords() {
  const { darkMode } = useTheme();
  const [records] = useState([
    {
      id: "r1",
      patient: "Rohit Kumar",
      summary: "Routine checkup - all normal",
    },
    {
      id: "r2",
      patient: "Anita Sharma",
      summary: "Blood pressure follow-up",
    },
  ]);

  return (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <h2 className="text-3xl font-bold mb-6">Medical Records</h2>

      <div className="grid gap-6">
        {records.map((r) => (
          <Card
            key={r.id}
            title={r.patient}
            className={`transition-colors duration-300 ${
              darkMode
                ? "bg-gray-800 text-gray-100 border-gray-700"
                : "bg-white text-gray-800 border-gray-200"
            }`}
          >
            <p className="text-sm opacity-90">{r.summary}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
