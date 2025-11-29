// src/pages/Submit.jsx

import React, { useState } from "react";
import AddCategory from "@/components/db/AddCategory";
import AddLink from "@/components/db/AddLink";

export default function Submit() {
  const [tab, setTab] = useState("category");

  const TabButton = ({ id, label }) => (
    <button
      onClick={() => setTab(id)}
      className={`
        px-4 py-2 rounded-lg border border-white/10
        ${tab === id
          ? "bg-white/10 text-white"
          : "bg-black/40 text-white/50 hover:bg-white/5"
        }
      `}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen md:p-10 text-white flex flex-col items-center">

      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6">
        Submit to ArcLane
      </h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        <TabButton id="category" label="Submit Category" />
        <TabButton id="link" label="Submit Link" />
      </div>

      {/* Content */}
      <div className="w-full flex justify-center">
        {tab === "category" && <AddCategory />}
        {tab === "link" && <AddLink />}
      </div>

    </div>
  );
}
