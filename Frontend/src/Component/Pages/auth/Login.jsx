import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL_ADMIN;

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${BASE_URL}/login`, { email, password });
      const token = res.data.token;

      login(token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password", err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-3 text-sm">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-gray-700 font-semibold text-sm">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-white/70 focus:bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold text-sm">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-white/70 focus:bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all font-semibold text-lg shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-gray-600 text-center mt-4 text-sm">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
