// src/pages/DevDashboard.jsx

import React, { useState } from "react";
import AddCategory from "@/components/db/AddCategory";
import AddLink from "@/components/db/AddLink";
import AdminDashboard from "@/components/db/AdminDashboard";

function DevDashboard() {
  const [tab, setTab] = useState("addCategory");

  const TabButton = ({ id, label }) => (
    <button
      onClick={() => setTab(id)}
      className={`px-4 py-2 rounded-lg border border-white/10
        ${tab === id ? "bg-white/10 text-white" : "bg-black/40 text-white/50 hover:bg-white/5"}
      `}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen p-10 text-white">

      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6">Developer Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        <TabButton id="addCategory" label="Add Category" />
        <TabButton id="addLink" label="Add Link" />
        <TabButton id="admin" label="Admin (Moderation)" />
      </div>

      {/* Content */}
      {tab === "addCategory" && <AddCategory />}
      {tab === "addLink" && <AddLink />}
      {tab === "admin" && <AdminDashboard />}

      <button
        onClick={() => {
          localStorage.removeItem("isAdmin");
          window.location.href = "/admin-login";
        }}
        className="px-3 py-1 bg-red-600 rounded-lg ml-5"
      >
        Logout
      </button>

    </div>
  );
}

export default DevDashboard;
