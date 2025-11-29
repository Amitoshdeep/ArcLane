import { useEffect, useState } from "react";
import { getPendingLinks, approveLink, rejectLink } from "@/api/adminApi";

const AdminDashboard = () => {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getPendingLinks();
    setPending(data);
  };

  const handleApprove = async (id) => {
    await approveLink(id);
    load();
  };

  const handleReject = async (id) => {
    await rejectLink(id);
    load();
  };

  return (
    <div className="p-6 text-white space-y-5">
      <h1 className="text-2xl font-bold mb-3">Admin Dashboard — Pending Links</h1>

      {pending.length === 0 && (
        <p className="text-gray-400">No pending links 🎉</p>
      )}

      <div className="space-y-4">
        {pending.map((link) => (
          <div
            key={link._id}
            className="bg-black/30 border border-white/10 p-4 rounded-xl"
          >
            <h2 className="text-xl font-semibold">{link.title}</h2>
            <p className="mt-1 text-gray-400">{link.description}</p>

            {/* URLs */}
            <div className="mt-2 space-y-1">
              {link.urls.map((u, i) => (
                <div
                  key={i}
                  className="bg-black/50 px-3 py-1 rounded text-sm border border-white/10"
                >
                  <strong>{u.label}:</strong> {u.link}
                </div>
              ))}
            </div>

            {/* Tags */}
            {link.tags.length > 0 && (
              <p className="mt-2 text-sm text-blue-300">
                Tags: {link.tags.join(", ")}
              </p>
            )}

            {/* Buttons */}
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleApprove(link._id)}
                className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
              >
                Approve
              </button>

              <button
                onClick={() => handleReject(link._id)}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
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
