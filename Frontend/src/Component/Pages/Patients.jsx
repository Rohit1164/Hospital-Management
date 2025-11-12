import { useState } from "react";
import Table from "../components/ui/Table";
import Modal from "../components/ui/Modal";
import { useTheme } from "../../Context/ThemeProvider";

export default function Patients() {
  const { darkMode } = useTheme();

  const [patients, setPatients] = useState([
    { id: "p1", name: "Anita Sharma", age: 32, phone: "9876543210" },
    { id: "p2", name: "Rohit Kumar", age: 28, phone: "9123456780" },
  ]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", age: "", phone: "" });

  const columns = [
    { key: "name", title: "Name" },
    { key: "age", title: "Age" },
    { key: "phone", title: "Phone" },
    {
      key: "actions",
      title: "Actions",
      render: (r) => (
        <div className="flex gap-2">
          <a href={`#/patients/${r.id}`} className="text-blue-600">
            View
          </a>
        </div>
      ),
    },
  ];

  function addPatient() {
    setPatients((p) => [...p, { id: "p" + (p.length + 1), ...form }]);
    setForm({ name: "", age: "", phone: "" });
    setOpen(false);
  }

  return (
    <div
      className={`${
        darkMode
          ? "bg-gray-900 text-gray-100 border-gray-800"
          : "bg-white text-gray-800 border-gray-200"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Patients</h2>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Patient
        </button>
      </div>

      <Table columns={columns} data={patients} />

      <Modal open={open} onClose={() => setOpen(false)} title="Add Patient">
        <div className="grid gap-3">
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Name"
            className="p-2 border rounded"
          />
          <input
            value={form.age}
            onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
            placeholder="Age"
            className="p-2 border rounded"
          />
          <input
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            placeholder="Phone"
            className="p-2 border rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setOpen(false)}
              className="px-3 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              onClick={addPatient}
              className="px-3 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// import React, { useState } from "react";
// import Table from "../components/ui/Table";
// import Modal from "../components/ui/Modal";
// import { Plus, X } from "lucide-react";

// export default function Patients() {
//   const [patients, setPatients] = useState([
//     { id: "p1", name: "Anita Sharma", age: 32, phone: "9876543210" },
//     { id: "p2", name: "Rohit Kumar", age: 28, phone: "9123456780" },
//   ]);
//   const [open, setOpen] = useState(false);
//   const [form, setForm] = useState({ name: "", age: "", phone: "" });

//   const columns = [
//     { key: "name", title: "Name" },
//     { key: "age", title: "Age" },
//     { key: "phone", title: "Phone" },
//     {
//       key: "actions",
//       title: "Actions",
//       render: (r) => (
//         <a
//           href={`#/patients/${r.id}`}
//           className="text-blue-600 font-medium hover:text-blue-800 transition"
//         >
//           View Profile →
//         </a>
//       ),
//     },
//   ];

//   function addPatient() {
//     if (!form.name || !form.age || !form.phone)
//       return alert("Please fill all fields");
//     setPatients((p) => [...p, { id: "p" + (p.length + 1), ...form }]);
//     setForm({ name: "", age: "", phone: "" });
//     setOpen(false);
//   }

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-semibold text-gray-800">
//           Patient Records
//         </h2>
//         <button
//           onClick={() => setOpen(true)}
//           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition"
//         >
//           <Plus size={18} /> Add New Patient
//         </button>
//       </div>

//       <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
//         <Table columns={columns} data={patients} />
//       </div>

//       {open && (
//         <Modal open={open} onClose={() => setOpen(false)} title="Add Patient">
//           <div className="p-2">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-semibold text-gray-700">
//                 New Patient
//               </h3>
//               <button
//                 onClick={() => setOpen(false)}
//                 className="text-gray-500 hover:text-red-500 transition"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//             <div className="grid gap-4">
//               <input
//                 value={form.name}
//                 onChange={(e) =>
//                   setForm((f) => ({ ...f, name: e.target.value }))
//                 }
//                 placeholder="Full Name"
//                 className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//               <input
//                 value={form.age}
//                 onChange={(e) =>
//                   setForm((f) => ({ ...f, age: e.target.value }))
//                 }
//                 placeholder="Age"
//                 type="number"
//                 className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//               <input
//                 value={form.phone}
//                 onChange={(e) =>
//                   setForm((f) => ({ ...f, phone: e.target.value }))
//                 }
//                 placeholder="Phone Number"
//                 className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//               <div className="flex justify-end gap-3 mt-4">
//                 <button
//                   onClick={() => setOpen(false)}
//                   className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={addPatient}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
//                 >
//                   Save Patient
//                 </button>
//               </div>
//             </div>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// }
