import { useParams } from "react-router-dom";
import Card from "../UI/Card.jsx";
import { useTheme } from "../../Context/ThemeProvider.jsx";

export default function PatientProfile() {
  const { darkMode } = useTheme();
  const { id } = useParams();
  // In a real app you'd fetch by id. Here we show mock data.
  const patient = {
    id,
    name: "Rohit Kumar",
    age: 28,
    phone: "9123456780",
    history: "No allergies. Previous surgery 2020.",
  };

  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-900 text-gray-100 border-gray-800"
          : "bg-white text-gray-800 border-gray-200"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Patient: {patient.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div>Age: {patient.age}</div>
          <div>Phone: {patient.phone}</div>
        </Card>
        <Card title="History">
          <div className="text-sm text-gray-700">{patient.history}</div>
        </Card>
        <Card title="Actions">
          <button className="px-3 py-2 bg-green-600 text-white rounded">
            Create Appointment
          </button>
        </Card>
      </div>
    </div>
  );
}
