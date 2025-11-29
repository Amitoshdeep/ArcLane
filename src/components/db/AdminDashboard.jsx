// src/components/db/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { getLinks, approveLink, rejectLink } from "@/api/linkApi";

const AdminDashboard = () => {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await getLinks({ status: "pending" });

    console.log("PENDING FROM API:", data); // <- debug

    // sort by section then rank
    data.sort((a, b) => {
      if (a.section === b.section) return (a.rank || 999) - (b.rank || 999);
      return (a.section || "").localeCompare(b.section || "");
    });

    setPending(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleApprove = async (id) => {
    await approveLink(id);
    await load();
  };

  const handleReject = async (id) => {
    await rejectLink(id);
    await load();
  };

  return (
    <div className="w-[60%] mt-10 text-white">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Admin — Pending Links</h2>
        <button
          onClick={load}
          className="text-sm px-3 py-1 rounded-lg bg-white/5 border border-white/15 hover:bg-white/10"
        >
          Refresh
        </button>
      </div>

      {loading && <p className="text-white/50 text-sm mb-2">Loading…</p>}
      {!loading && pending.length === 0 && (
        <p className="text-white/40 text-sm">No pending links 🎉</p>
      )}

      <div className="space-y-3 mt-3">
        {pending.map((link, idx) => (
          <div
            key={link._id}
            className="border border-white/15 rounded-lg p-3 bg-black/40"
          >
            {/* SIMPLE DEBUG VIEW */}
            <div className="mb-2">
              <div className="text-sm text-white/50">_id: {link._id}</div>
              <div className="text-lg font-semibold">
                {idx + 1}. {link.title || "<no title>"}
              </div>
              <div className="text-xs text-white/60">
                section: {link.section || "none"}, rank: {link.rank || 999}
              </div>
              <div className="text-xs text-white/60">
                category: {link.categoryId?.name || link.categoryId || "none"}
              </div>
              <div className="mt-1 text-xs text-white/60">
                urls: {Array.isArray(link.urls) ? link.urls.length : 0}
              </div>
            </div>

            <div className="mt-3 flex gap-3 justify-end">
              <button
                onClick={() => handleApprove(link._id)}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-sm"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(link._id)}
                className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-sm"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
