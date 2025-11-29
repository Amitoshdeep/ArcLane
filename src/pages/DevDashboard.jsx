import React from "react";
import axios from "axios";

import AdminDashboard from "@/components/db/AdminDashboard";

function DevDashboard() {
  return (
    <div className="min-h-screen px-2 py-5 md:p-10 text-white">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="md:text-2xl font-semibold">Admin Dashboard</h1>

        <button
          onClick={() => {
            axios.get(`${import.meta.env.VITE_API_URL}/api/admin/logout`, {
              withCredentials: true,
              }).then(() => {
              window.location.href = "/admin-login";
            });
          }}
          className="px-3 py-1 bg-red-600 rounded-lg text-sm md:text-lg"
        >
          Logout
        </button>
      </div>

      {/* Admin Moderation (links + categories) */}
      <AdminDashboard />

    </div>
  );
}

export default DevDashboard;
