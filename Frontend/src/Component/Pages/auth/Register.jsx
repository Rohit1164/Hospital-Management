import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8001/admin";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [, setMsg] = useState("");
  const [error, setError] = useState("");
  const [pic, setPic] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("pic", pic);

    try {
      const res = await axios.post(`${BASE_URL}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg(res.data.msg);
      navigate("/login");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Register
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-3 text-sm">{error}</p>
        )}

        <form method="POST" onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e) => setPic(e.target.files[0])}
            accept="image/*"
            required
          />

          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg bg-white/70 focus:bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg bg-white/70 focus:bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Create Password"
            className="w-full px-4 py-3 rounded-lg bg-white/70 focus:bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all font-semibold text-lg shadow-md"
          >
            Register
          </button>
        </form>

        <p className="text-gray-600 text-center mt-4 text-sm">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
