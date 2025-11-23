// import axios from "axios";
// import React, { useState } from "react";

// const BASE_URL = import.meta.env.VITE_BASE_URL_APPOINTMENT;

// export default function AppointmentForm() {
//   const [formData, setFormData] = useState({
//     patientName: "",
//     doctorName: "",
//     date: "",
//     time: "",
//     status: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${BASE_URL}`);
//       console.log("Doctor Added:", res.data);
//       alert("Doctor added successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Error adding doctor");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Appointment Form
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Patient Name */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Patient Name
//             </label>
//             <input
//               type="text"
//               name="patientName"
//               value={formData.patientName}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           {/* Doctor Name */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Doctor Name
//             </label>
//             <input
//               type="text"
//               name="doctorName"
//               value={formData.doctorName}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           {/* Date */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Appointment Date
//             </label>
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           {/* Time */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Time</label>
//             <input
//               type="time"
//               name="time"
//               value={formData.time}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           {/* Status */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Status
//             </label>
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             >
//               <option>Scheduled</option>
//               <option>Completed</option>
//               <option>Cancelled</option>
//             </select>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-lg transition"
//           >
//             Save Appointment
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import axios from "axios";
import React, { useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL_APPOINTMENT;

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    time: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.patientName ||
      !formData.doctorName ||
      !formData.date ||
      !formData.time ||
      !formData.status
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}`, formData);

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

          {/* Doctor Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Doctor Name
            </label>
            <input
              type="text"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
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
