import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import HMS from "../../../assets/HMS2.png";

const BASE_URL = import.meta.env.VITE_BASE_URL_ADMIN;

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
      const token = res.data.accessToken;
      login(token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid email or password");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${HMS})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Form container */}
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-gray-200">
        {/* Header Text */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-700 mb-6">
          Admin login to manage hospital operations
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-center mb-3 text-sm">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-gray-700 font-semibold text-sm">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg text-black  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-full px-4 py-3 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all font-semibold text-lg shadow-md"
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
