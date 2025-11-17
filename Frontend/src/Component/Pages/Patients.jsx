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
