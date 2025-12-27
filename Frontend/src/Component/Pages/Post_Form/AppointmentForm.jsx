import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL_APPOINTMENT;
const BASE_URL_DOCTOR = import.meta.env.VITE_BASE_URL_DOCTOR;

export default function AppointmentForm() {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    patientName: "",
    doctorId: "",
    date: "",
    time: "",
    status: "",
  });
  useEffect(() => {
    const fetchLists = async () => {
      try {
        const dJson = await fetch(BASE_URL_DOCTOR);
        const res = await dJson.json();
        // console.log(res);
        setDoctors(res.data || res);
      } catch (error) {
        console.log("fetch list of doctors", error.message);
      }
    };
    fetchLists();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.patientName ||
      !formData.doctorId ||
      !formData.date ||
      !formData.time ||
      !formData.status
    ) {
      alert("Please fill all fields");
      return;
    }

    const doctor = doctors.find((d) => d._id === formData.doctorId) || {};

    const payload = {
      patientName: formData.patientName,
      doctor: {
        _id: doctor._id,
        name: doctor.name || doctor.doctorName || "",
      },
      date: formData.date,
      time: formData.time,
      status: formData.status,
    };

    try {
      const res = await axios.post(`${BASE_URL}/create`, payload);
      console.log("Appointment Created:", res.data);
      alert("Appointment created successfully");

      // Reset form
      setFormData({
        patientName: "",
        doctorName: "",
        date: "",
        time: "",
        status: "",
      });
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to add appointment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Appointment Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Patient Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Patient Name
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Doctor */}
          <div>
            <label className="text-sm font-medium">Doctor</label>
            <select
              className="w-full rounded-lg border px-3 py-2"
              value={formData.doctorId}
              onChange={(e) =>
                setFormData({ ...formData, doctorId: e.target.value })
              }
            >
              <option value="">Select doctor</option>
              {doctors.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
            {/* {errors.doctorId && (
              <p className="text-xs text-red-600">{errors.doctorId}</p>
            )} */}
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Appointment Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-lg transition"
          >
            Save Appointment
          </button>
        </form>
      </div>
    </div>
  );
}
