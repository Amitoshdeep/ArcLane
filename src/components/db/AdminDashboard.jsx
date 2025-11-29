// src/components/db/AdminDashboard.jsx

import React, { useEffect, useState } from "react";
import { getLinks, approveLink, rejectLink } from "@/api/linkApi";
import {
  getPendingCategories,
  approveCategory,
  rejectCategory
} from "@/api/categoryApi";

const AdminDashboard = () => {
  const [pendingLinks, setPendingLinks] = useState([]);
  const [pendingCats, setPendingCats] = useState([]);
  const [loading, setLoading] = useState(false);

  // LOAD EVERYTHING
  const loadAll = async () => {
    setLoading(true);

    try {
      // Load categories
      const cats = await getPendingCategories();
      setPendingCats(cats);

      // Load links
      const links = await getLinks({ status: "pending" });

      // Sort links by section → rank
      links.sort((a, b) => {
        if (a.section === b.section)
          return (a.rank || 999) - (b.rank || 999);

        return (a.section || "").localeCompare(b.section || "");
      });

      setPendingLinks(links);
    } catch (err) {
      console.error("ADMIN LOAD ERROR:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const approveCat = async (id) => {
    await approveCategory(id);
    loadAll();
  };

  const rejectCat = async (id) => {
    await rejectCategory(id);
    loadAll();
  };

  const approveL = async (id) => {
    await approveLink(id);
    loadAll();
  };

  const rejectL = async (id) => {
    await rejectLink(id);
    loadAll();
  };

  return (
    <div className="w-full md:w-[90%] mx-auto text-white space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="md:text-xl font-semibold">Admin Moderation</h2>

        <button
          onClick={loadAll}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/15 hover:bg-white/10 text-[12px] md:text-lg"
        >
          Refresh All
        </button>
      </div>

      {loading && <p className="text-white/50 text-sm">Loading…</p>}

      {/* TWO-COLUMN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT — Pending Categories */}
        <div className="bg-white/5 p-5 rounded-xl border border-white/10">
          <h3 className="text-sm md:text-lg font-semibold mb-3">Pending Categories</h3>

          {pendingCats.length === 0 && (
            <p className="text-white/40 text-sm">No pending categories 🎉</p>
          )}

          <div className="space-y-3">
            {pendingCats.map((c) => (
              <div
                key={c._id}
                className="flex items-center justify-between bg-white/10 p-3 rounded-lg border border-white/20"
              >
                <div className="text-sm md:text-md">
                  {c.icon} {c.name}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => approveCat(c._id)}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => rejectCat(c._id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Pending Links */}
        <div className="bg-white/5 p-5 rounded-xl border border-white/10">
          <h3 className="text-sm md:text-lg font-semibold mb-3">Pending Links</h3>

          {pendingLinks.length === 0 && (
            <p className="text-white/40 text-sm">No pending links 🎉</p>
          )}

          <div className="space-y-3 mt-3">
            {pendingLinks.map((link, idx) => (
              <div
                key={link._id}
                className="border border-white/15 rounded-lg p-3 bg-black/40"
              >
                {/* INFO */}
                <div className="mb-2">
                  <div className="text-sm text-white/50">
                    _id: {link._id}
                  </div>

                  <div className="text-md md:text-lg font-semibold">
                    {idx + 1}. {link.title}
                  </div>

                  <div className="text-xs text-white/60">
                    section: {link.section || "none"}
                    / rank: {link.rank || 999}
                  </div>

                  <div className="text-xs text-white/60">
                    category: {link.categoryId?.name || "none"}
                  </div>

                  <div className="text-xs text-white/60">
                    urls: {link.urls?.length || 0}
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="mt-3 flex gap-3 justify-end">
                  <button
                    onClick={() => approveL(link._id)}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-sm"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => rejectL(link._id)}
                    className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-sm"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
