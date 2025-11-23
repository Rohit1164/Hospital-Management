// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const BASE_URL = "http://localhost:8001/admin";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [pic, setPic] = useState("");
//   const [error, setError] = useState("");
//   const [, setMsg] = useState("");
//   const navigate = useNavigate();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("email", email);
//     formData.append("password", password);
//     formData.append("pic", pic);

//     try {
//       const res = await axios.post(`${BASE_URL}/register`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setMsg(res.data.msg);
//       navigate("/login");
//     } catch (err) {
//       setMsg(err.response?.data?.msg || "Error");
//     }
//   }

//   // Array of random hospital images
//   const hospitalImages = [
//     "https://images.unsplash.com/photo-1588776814546-9e9361b90f71?auto=format&fit=crop&w=1470&q=80",
//     "https://images.unsplash.com/photo-1580281657526-c17c1e0d78c6?auto=format&fit=crop&w=1470&q=80",
//     "https://images.unsplash.com/photo-1600180758895-4d1f6d1641de?auto=format&fit=crop&w=1470&q=80",
//   ];

//   // Pick a random image
//   const randomImage =
//     hospitalImages[Math.floor(Math.random() * hospitalImages.length)];

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
//       style={{ backgroundImage: `url(${randomImage})` }}
//     >
//       {/* Overlay to darken background for readability */}
//       <div className="absolute inset-0 bg-black/50"></div>

//       <div className="relative w-full max-w-md bg-white/90 shadow-xl rounded-2xl p-8 border border-gray-200 z-10">
//         {/* Top overlay text */}
//         <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
//           Welcome to <span className="text-blue-600">Your Hospital</span>
//         </h1>
//         <p className="text-center text-gray-700 mb-6 text-sm">
//           Register as Admin to manage hospital operations
//         </p>

//         {error && (
//           <p className="text-red-600 text-center mb-3 text-sm">{error}</p>
//         )}

//         <form method="POST" onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="file"
//             className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             onChange={(e) => setPic(e.target.files[0])}
//             accept="image/*"
//             required
//           />

//           <input
//             type="text"
//             placeholder="Full Name"
//             className="w-full px-4 py-3 rounded-lg bg-white/70 focus:bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />

//           <input
//             type="email"
//             placeholder="Email Address"
//             className="w-full px-4 py-3 rounded-lg bg-white/70 focus:bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Create Password"
//             className="w-full px-4 py-3 rounded-lg bg-white/70 focus:bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all font-semibold text-lg shadow-md"
//           >
//             Register
//           </button>
//         </form>

//         <p className="text-gray-600 text-center mt-4 text-sm">
//           Already have an account?{" "}
//           <span
//             className="text-blue-600 cursor-pointer hover:underline"
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HMS from "../../../assets/HMS2.png";

const BASE_URL = "http://localhost:8001/admin";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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
      alert(res.data.msg);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${HMS})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Form Container */}
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-gray-200">
        {/* Header Text */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Welcome to <span className="text-blue-600">HMS Hospital</span>
        </h2>
        <p className="text-center text-gray-700 mb-6">
          Create your admin account to manage hospital operations
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-center mb-3 text-sm">{error}</p>
        )}

        {/* Form */}
        <form method="POST" onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            className="w-full px-4 py-3 rounded-lg bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setPic(e.target.files[0])}
            accept="image/*"
            required
          />

          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg bg-white/70 focus:bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg bg-white/70 focus:bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Create Password"
            className="w-full px-4 py-3 rounded-lg bg-white/70 focus:bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all font-semibold text-lg shadow-md"
          >
            Register
          </button>
        </form>

        <p className="text-gray-600 text-center mt-4 text-sm">
          Already have an account?{" "}
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
