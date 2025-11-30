// src/components/db/AdminDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  adminGetCategories,
  adminGetLinks,
  adminApproveCategory,
  adminRejectCategory,
  adminDeleteCategory,
  adminUpdateCategory,
  adminApproveLink,
  adminRejectLink,
  adminDeleteLink,
  adminUpdateLink,
} from "@/api/adminApi";

const STATUS_FILTERS = ["all", "pending", "approved", "rejected"];

const AdminDashboard = () => {
  const [section, setSection] = useState("links"); // "links" | "categories"
  const [statusFilter, setStatusFilter] = useState("pending");
  const [search, setSearch] = useState("");
  const [links, setLinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editItem, setEditItem] = useState(null); // { ...doc }
  const [editType, setEditType] = useState(null); // "link" | "category"
  const [saving, setSaving] = useState(false);

  // -------- LOAD DATA --------
  const loadData = async () => {
    setLoading(true);
    try {
      const [linkData, catData] = await Promise.all([
        adminGetLinks(),
        adminGetCategories(),
      ]);
      setLinks(linkData);
      setCategories(catData);
    } catch (err) {
      console.error("ADMIN LOAD ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // -------- FILTERED LISTS --------
  const filteredLinks = useMemo(() => {
    return links.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        l.title?.toLowerCase().includes(q) ||
        l.section?.toLowerCase().includes(q) ||
        l.description?.toLowerCase().includes(q) ||
        l.categoryId?.name?.toLowerCase().includes(q)
      );
    });
  }, [links, statusFilter, search]);

  const filteredCategories = useMemo(() => {
    return categories.filter((c) => {
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        c.name?.toLowerCase().includes(q) ||
        c.icon?.toLowerCase().includes(q)
      );
    });
  }, [categories, statusFilter, search]);

  // -------- ACTIONS: CATEGORIES --------
  const handleApproveCategory = async (id) => {
    await adminApproveCategory(id);
    await loadData();
  };

  const handleRejectCategory = async (id) => {
    await adminRejectCategory(id);
    await loadData();
  };

  const handleDeleteCategory = async (id) => {
    if (!confirm("Delete this category?")) return;
    await adminDeleteCategory(id);
    await loadData();
  };

  // -------- ACTIONS: LINKS --------
  const handleApproveLink = async (id) => {
    await adminApproveLink(id);
    await loadData();
  };

  const handleRejectLink = async (id) => {
    await adminRejectLink(id);
    await loadData();
  };

  const handleDeleteLink = async (id) => {
    if (!confirm("Delete this link?")) return;
    await adminDeleteLink(id);
    await loadData();
  };

  // -------- EDIT MODAL SAVE --------
  const handleSaveEdit = async () => {
    if (!editItem || !editType) return;
    setSaving(true);
    try {
      if (editType === "category") {
        await adminUpdateCategory(editItem._id, {
          name: editItem.name,
          icon: editItem.icon,
          status: editItem.status,
        });
      } else {
        await adminUpdateLink(editItem._id, {
          title: editItem.title,
          section: editItem.section,
          rank: editItem.rank,
          description: editItem.description,
          status: editItem.status,
        });
      }
      setEditItem(null);
      setEditType(null);
      await loadData();
    } catch (e) {
      console.error("SAVE FAILED", e);
    } finally {
      setSaving(false);
    }
  };

  const activeList = section === "links" ? filteredLinks : filteredCategories;

  // -------- UI --------
  return (
    <div className="flex gap-4 min-h-[70vh]">

      {/* SIDEBAR — CMS style, glassy */}
      <aside className="hidden md:flex flex-col w-64 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/80">
            ArcLane
          </p>
          <h2 className="text-lg font-semibold text-white mt-1">
            Admin Control
          </h2>
          <p className="text-xs text-white/50">
            Approve, review & clean your lanes.
          </p>
        </div>

        <nav className="space-y-2">
          <SidebarButton
            active={section === "links"}
            label="Links"
            badge={links.length}
            onClick={() => setSection("links")}
            icon="🔗"
          />
          <SidebarButton
            active={section === "categories"}
            label="Categories"
            badge={categories.length}
            onClick={() => setSection("categories")}
            icon="📂"
          />
        </nav>

        <div className="mt-auto pt-4 border-t border-white/10 text-[11px] text-white/40">
          <p>Tip: use status filters to clean pending items quickly.</p>
        </div>
      </aside>

      {/* MOBILE top pills instead of sidebar */}
      <div className="md:hidden flex gap-2 mb-3 w-full">
        <button
          onClick={() => setSection("links")}
          className={`flex-1 px-3 py-2 rounded-xl text-sm ${
            section === "links"
              ? "bg-emerald-500 text-black"
              : "bg-white/10 text-white/70"
          }`}
        >
          🔗 Links ({links.length})
        </button>
        <button
          onClick={() => setSection("categories")}
          className={`flex-1 px-3 py-2 rounded-xl text-sm ${
            section === "categories"
              ? "bg-emerald-500 text-black"
              : "bg-white/10 text-white/70"
          }`}
        >
          📂 Categories ({categories.length})
        </button>
      </div>

      {/* MAIN PANEL — glass, dark, calm */}
      <main className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-xl">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
          <div className="flex-1">
            <h1 className="text-lg md:text-xl font-semibold text-white">
              {section === "links" ? "Links" : "Categories"} Moderation
            </h1>
            <p className="text-xs text-white/50">
              {section === "links"
                ? "Manage all submitted links, ranks and statuses."
                : "Manage the sections that organize your lanes."}
            </p>
          </div>

          {/* Status filter pills */}
          <div className="flex gap-2">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs capitalize border ${
                  statusFilter === s
                    ? "bg-emerald-500 text-black border-emerald-400"
                    : "bg-white/5 border-white/15 text-white/70"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Search + refresh */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="flex-1">
            <input
              className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm outline-none placeholder:text-white/40"
              placeholder={`Search ${section === "links" ? "links" : "categories"}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            onClick={loadData}
            className="px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-xs md:text-sm hover:bg-white/15"
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </div>

        {/* TABLE / LIST */}
        {loading && (
          <p className="text-xs text-white/60 mb-3">Loading data…</p>
        )}

        {activeList.length === 0 && !loading && (
          <p className="text-sm text-white/50">
            No items match this filter.
          </p>
        )}

        {section === "categories" ? (
          <CategoryTable
            items={filteredCategories}
            onEdit={(item) => {
              setEditItem({ ...item });
              setEditType("category");
            }}
            onApprove={handleApproveCategory}
            onReject={handleRejectCategory}
            onDelete={handleDeleteCategory}
          />
        ) : (
          <LinkTable
            items={filteredLinks}
            onEdit={(item) => {
              setEditItem({ ...item });
              setEditType("link");
            }}
            onApprove={handleApproveLink}
            onReject={handleRejectLink}
            onDelete={handleDeleteLink}
          />
        )}
      </main>

      {/* EDIT MODAL */}
      {editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-[#050509] border border-white/15 rounded-2xl w-[95%] max-w-md p-5 text-white">
            <h3 className="text-lg font-semibold mb-3">
              Edit {editType === "link" ? "Link" : "Category"}
            </h3>

            {/* CATEGORY FIELDS */}
            {editType === "category" && (
              <>
                <label className="block text-xs mb-1 text-white/60">
                  Name
                </label>
                <input
                  className="w-full mb-3 bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm"
                  value={editItem.name || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, name: e.target.value })
                  }
                />

                <label className="block text-xs mb-1 text-white/60">
                  Icon (emoji)
                </label>
                <input
                  className="w-full mb-3 bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm"
                  value={editItem.icon || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, icon: e.target.value })
                  }
                />

                <StatusSelect editItem={editItem} setEditItem={setEditItem} />
              </>
            )}

            {/* LINK FIELDS */}
            {editType === "link" && (
              <>
                <label className="block text-xs mb-1 text-white/60">
                  Title
                </label>
                <input
                  className="w-full mb-3 bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm"
                  value={editItem.title || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, title: e.target.value })
                  }
                />

                <label className="block text-xs mb-1 text-white/60">
                  Section
                </label>
                <input
                  className="w-full mb-3 bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm"
                  value={editItem.section || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, section: e.target.value })
                  }
                />

                <label className="block text-xs mb-1 text-white/60">
                  Rank
                </label>
                <input
                  type="number"
                  className="w-full mb-3 bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm"
                  value={editItem.rank ?? ""}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      rank: Number(e.target.value) || 0,
                    })
                  }
                />

                <label className="block text-xs mb-1 text-white/60">
                  Description
                </label>
                <textarea
                  className="w-full mb-3 bg:white/5 bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm min-h-[70px]"
                  value={editItem.description || ""}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      description: e.target.value,
                    })
                  }
                />

                <StatusSelect editItem={editItem} setEditItem={setEditItem} />
              </>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setEditItem(null);
                  setEditType(null);
                }}
                className="px-3 py-1.5 rounded-lg text-xs bg-white/10 border border-white/20"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={saving}
                className="px-4 py-1.5 rounded-lg text-xs bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ------------- SMALL COMPONENTS -------------

const SidebarButton = ({ active, label, badge, icon, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm border transition ${
      active
        ? "bg-emerald-500 text-black border-emerald-400"
        : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
    }`}
  >
    <span className="flex items-center gap-2">
      <span>{icon}</span>
      <span>{label}</span>
    </span>
    <span className="text-[11px] px-2 py-0.5 rounded-full bg-black/40">
      {badge}
    </span>
  </button>
);

const StatusChip = ({ status }) => {
  const base = "inline-flex items-center px-2 py-0.5 rounded-sm text-[11px]";
  if (status === "approved")
    return <span className={`${base} bg-emerald-600/40 text-emerald-300`}>approved</span>;
  if (status === "pending")
    return <span className={`${base} bg-yellow-600/40 text-yellow-200`}>pending</span>;
  if (status === "rejected")
    return <span className={`${base} bg-red-700/40 text-red-300`}>rejected</span>;
  return <span className={`${base} bg-white/10 text-white/60`}>{status}</span>;
};

const StatusSelect = ({ editItem, setEditItem }) => (
  <>
    <label className="block text-xs mb-1 text-white/60">Status</label>
    <select
      className="w-full bg-black/90 border border-white/20 rounded-lg px-3 py-2 text-sm"
      value={editItem.status || "pending"}
      onChange={(e) =>
        setEditItem({ ...editItem, status: e.target.value })
      }
    >
      <option value="pending">pending</option>
      <option value="approved">approved</option>
      <option value="rejected">rejected</option>
    </select>
  </>
);

const CategoryTable = ({ items, onEdit, onApprove, onReject, onDelete }) => (
  <div className="space-y-2">
    {items.map((c) => (
      <div
        key={c._id}
        className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm"
      >
        <div className="flex flex-col">
          <span className="font-medium">
            {c.icon} {c.name}
          </span>
          <StatusChip status={c.status} />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(c)}
            className="px-2 py-1 rounded-lg bg-white/10 text-xs"
          >
            Edit
          </button>
          {c.status !== "approved" && (
            <button
              onClick={() => onApprove(c._id)}
              className="px-2 py-1 rounded-lg bg-emerald-600 text-xs"
            >
              Approve
            </button>
          )}
          {c.status !== "rejected" && (
            <button
              onClick={() => onReject(c._id)}
              className="px-2 py-1 rounded-lg bg-red-600 text-xs"
            >
              Reject
            </button>
          )}
          <button
            onClick={() => onDelete(c._id)}
            className="px-2 py-1 rounded-lg bg-red-900/80 text-[11px]"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);

const LinkTable = ({ items, onEdit, onApprove, onReject, onDelete }) => (
  <div className="space-y-3">
    {items.map((l) => (
      <div
        key={l._id}
        className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm"
      >
        <div className="flex justify-between gap-3">
          <div>
            <div className="font-medium">{l.title}</div>
            <div className="text-[11px] text-white/50 mt-0.5">
              section: {l.section || "general"} · rank: {l.rank ?? 999}
            </div>
            <div className="text-[11px] text-white/50">
              category: {l.categoryId?.name || "none"}
            </div>
            {l.description && (
              <p className="text-[11px] text-white/60 mt-1 line-clamp-2">
                {l.description}
              </p>
            )}
          </div>
          <StatusChip status={l.status} />
        </div>

        <div className="mt-2 flex justify-end gap-2">
          <button
            onClick={() => onEdit(l)}
            className="px-2 py-1 rounded-lg bg-white/10 text-xs"
          >
            Edit
          </button>
          {l.status !== "approved" && (
            <button
              onClick={() => onApprove(l._id)}
              className="px-2 py-1 rounded-lg bg-emerald-600 text-xs"
            >
              Approve
            </button>
          )}
          {l.status !== "rejected" && (
            <button
              onClick={() => onReject(l._id)}
              className="px-2 py-1 rounded-lg bg-red-600 text-xs"
            >
              Reject
            </button>
          )}
          <button
            onClick={() => onDelete(l._id)}
            className="px-2 py-1 rounded-lg bg-red-900/80 text-[11px]"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default AdminDashboard;
