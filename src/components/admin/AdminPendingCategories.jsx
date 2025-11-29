import { useEffect, useState } from "react";
import {
  getPendingCategories,
  approveCategory,
  rejectCategory
} from "@/api/categoryApi";

export default function AdminPendingCategories() {
  const [cats, setCats] = useState([]);

  const load = async () => {
    try {
      const data = await getPendingCategories();
      setCats(data);
    } catch (err) {
      console.error("Error loading pending categories", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const approve = async (id) => {
    await approveCategory(id);
    load(); // refresh list
  };

  const reject = async (id) => {
    await rejectCategory(id);
    load();
  };

  return (
    <div className="bg-white/5 p-5 rounded-xl border border-white/10 text-white mt-6">
      <h2 className="text-lg font-semibold mb-3">Pending Categories</h2>

      {cats.length === 0 && (
        <p className="text-white/50">No pending categories 🎉</p>
      )}

      <div className="space-y-3">
        {cats.map((c) => (
          <div
            key={c._id}
            className="flex items-center justify-between bg-white/10 p-3 rounded-lg border border-white/20"
          >
            <div className="text-white text-md">
              {c.icon} {c.name}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => approve(c._id)}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg text-sm"
              >
                Approve
              </button>

              <button
                onClick={() => reject(c._id)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
