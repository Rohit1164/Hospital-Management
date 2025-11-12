import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="bg-white shadow-md rounded-xl p-5 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Phone /> Contact Us
        </h1>
        <p className="text-gray-500 text-sm">
          Reach out for appointments, support, or general queries.
        </p>
      </header>

      {/* Contact Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow hover:bg-gray-50 flex flex-col items-center text-center">
          <Phone size={30} />
          <h3 className="font-semibold mt-2">Phone</h3>
          <p className="text-gray-600">+91 90123 45678</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:bg-gray-50 flex flex-col items-center text-center">
          <Mail size={30} />
          <h3 className="font-semibold mt-2">Email</h3>
          <p className="text-gray-600">support@hospital.com</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:bg-gray-50 flex flex-col items-center text-center">
          <MapPin size={30} />
          <h3 className="font-semibold mt-2">Location</h3>
          <p className="text-gray-600">Delhi NCR, India</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Send us a Message
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none focus:border-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg outline-none focus:border-blue-500"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg h-32 outline-none focus:border-blue-500"
            required
          ></textarea>

          <button
            type="submit"
            className="px-5 py-3 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Send size={18} /> Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
