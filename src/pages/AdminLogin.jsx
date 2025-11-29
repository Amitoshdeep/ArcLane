import { useState } from "react";
import axios from "axios";

export default function AdminLogin() {
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", { password });

      if (res.data.success) {
        localStorage.setItem("isAdmin", "true");
        window.location.href = "/dev";
      } else {
        alert("Wrong password");
      }

    } catch {
      alert("Wrong password");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center text-white">
      <div className="bg-white/5 border border-white/15 p-6 rounded-xl w-[350px]">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>

        <input
          className="w-full bg-black/40 border border-white/20 rounded-lg px-3 py-2 mb-3 outline-none"
          placeholder="Enter admin password"
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
