// src/pages/DevDashboard.jsx

import React from "react";
import AdminDashboard from "@/components/db/AdminDashboard";

function DevDashboard() {
  return (
    <div className="min-h-screen p-10 text-white">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

        <button
          onClick={() => {
            localStorage.removeItem("isAdmin");
            window.location.href = "/admin-login";
          }}
          className="px-3 py-1 bg-red-600 rounded-lg"
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
