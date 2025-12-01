import { useState } from "react";
import axios from "axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        window.location.href = "/dev";
      } else {
        alert("Wrong credentials");
      }

    } catch {
      alert("Wrong credentials");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center text-white">
      <div className="bg-white/5 border border-white/15 p-6 rounded-xl w-[350px]">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>

        <input
          className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 mb-3"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
}
