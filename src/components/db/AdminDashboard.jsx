// src/components/db/AdminDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";

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
  const [section, setSection] = useState("links");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [search, setSearch] = useState("");

  const [links, setLinks] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  // pagination
  const [page, setPage] = useState(0);
  const [itemsPerPage] = useState(5);

  const [editItem, setEditItem] = useState(null);
  const [editType, setEditType] = useState(null);
  const [saving, setSaving] = useState(false);

  // LOAD DATA
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

  // FILTER LINKS
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

  // FILTER CATEGORIES
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

  // SLICE BASED ON PAGINATION
  const activeList = section === "links" ? filteredLinks : filteredCategories;
  const pageCount = Math.ceil(activeList.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const start = page * itemsPerPage;
    return activeList.slice(start, start + itemsPerPage);
  }, [activeList, page, itemsPerPage]);

  // New Pagination Logic
  const Pagination = ({ page, totalPages, setPage }) => {
    if (totalPages <= 1) return null;

    const pagesToShow = [];

    // SHOW: first, current-1, current, current+1, last
    for (let p = 1; p <= totalPages; p++) {
      if (
        p === 1 ||
        p === totalPages ||
        Math.abs(p - (page + 1)) <= 1
      ) {
        pagesToShow.push(p);
      } else if (
        Math.abs(p - (page + 1)) === 2
      ) {
        pagesToShow.push("...");
      }
    }

    const uniquePages = pagesToShow.filter(
      (v, i, arr) => arr.indexOf(v) === i
    );

    return (
      <div className="flex justify-center items-center gap-2 mt-6 text-sm">

        {/* PREV */}
        <button
          onClick={() => page > 0 && setPage(page - 1)}
          className={`px-3 py-1.5 rounded-lg border ${
            page === 0
              ? "opacity-40 cursor-not-allowed bg-white/5 border-white/10"
              : "bg-white/5 border-white/10 hover:bg-white/10"
          }`}
        >
          ← Prev
        </button>

        {/* PAGES */}
        {uniquePages.map((p, idx) =>
          p === "..." ? (
            <div
              key={idx}
              className="px-2 py-1 text-white/40"
            >
              ...
            </div>
          ) : (
            <button
              key={p}
              onClick={() => setPage(p - 1)}
              className={`px-3 py-1.5 rounded-lg border ${
                page + 1 === p
                  ? "bg-emerald-500 text-black border-emerald-400"
                  : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
              }`}
            >
              {p}
            </button>
          )
        )}

        {/* NEXT */}
        <button
          onClick={() => page < totalPages - 1 && setPage(page + 1)}
          className={`px-3 py-1.5 rounded-lg border ${
            page === totalPages - 1
              ? "opacity-40 cursor-not-allowed bg-white/5 border-white/10"
              : "bg-white/5 border-white/10 hover:bg-white/10"
          }`}
        >
          Next →
        </button>

      </div>
    );
  };


  // CATEGORY ACTIONS
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

  // LINK ACTIONS
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

  // SAVE EDIT MODAL
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
          urls: editItem.urls,
          section: editItem.section,
          rank: editItem.rank,
          description: editItem.description,
          status: editItem.status,
        });
      }

      setEditItem(null);
      setEditType(null);
      await loadData();
    } catch (err) {
      console.error("SAVE FAILED:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 min-h-[70vh]">

      {/* SIDEBAR */}
      <aside className="flex flex-col md:w-64 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white">ArcLane Admin</h2>
          <p className="text-xs text-white/50">
            Moderate links & categories
          </p>
        </div>

        <nav className="space-y-2">
          <SidebarButton
            active={section === "links"}
            label="Links"
            badge={links.length}
            onClick={() => {
              setSection("links");
              setPage(0);
            }}
            icon="🔗"
          />
          <SidebarButton
            active={section === "categories"}
            label="Categories"
            badge={categories.length}
            onClick={() => {
              setSection("categories");
              setPage(0);
            }}
            icon="📂"
          />
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold text-white">
            {section === "links" ? "Links" : "Categories"} Moderation
          </h1>

          <button
            onClick={loadData}
            className="px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-xs hover:bg-white/15"
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </div>

        {/* STATUS FILTER */}
        <div className="flex gap-2 mb-4">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatusFilter(s);
                setPage(0);
              }}
              className={`px-3 py-1.5 rounded-full text-xs border ${
                statusFilter === s
                  ? "bg-emerald-500 text-black border-emerald-400"
                  : "bg-white/5 border-white/15 text-white/70 hover:bg-white/10"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* SEARCH */}
        <input
          className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-sm outline-none placeholder:text-white/40 mb-4"
          value={search}
          placeholder="Search…"
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
        />

        {/* LIST */}
        {section === "categories" ? (
          <CategoryTable
            items={paginatedItems}
            onEdit={(i) => { setEditItem(i); setEditType("category"); }}
            onApprove={handleApproveCategory}
            onReject={handleRejectCategory}
            onDelete={handleDeleteCategory}
          />
        ) : (
          <LinkTable
            items={paginatedItems}
            onEdit={(i) => { setEditItem(i); setEditType("link"); }}
            onApprove={handleApproveLink}
            onReject={handleRejectLink}
            onDelete={handleDeleteLink}
          />
        )}

        {/* PAGINATION */}
        <Pagination
          page={page}
          totalPages={pageCount}
          setPage={setPage}
        />

      </main>

      {/* EDIT MODAL */}
      {editItem && (
        <EditModal
          editItem={editItem}
          setEditItem={setEditItem}
          editType={editType}
          saving={saving}
          setEditType={setEditType}
          setSaving={setSaving}
          handleSaveEdit={handleSaveEdit}
        />
      )}
    </div>
  );
};

// ---------------- SMALL COMPONENTS ----------------

const SidebarButton = ({ active, label, badge, icon, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm border ${
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

const StatusChip = ({ status }) => (
  <span
    className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] ${
      status === "approved"
        ? "bg-emerald-600/40 text-emerald-300"
        : status === "pending"
        ? "bg-yellow-600/40 text-yellow-200"
        : "bg-red-700/40 text-red-300"
    }`}
  >
    {status}
  </span>
);

const CategoryTable = ({ items, onEdit, onApprove, onReject, onDelete }) => (
  <div className="space-y-2">
    {items.map((c) => (
      <div
        key={c._id}
        className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm"
      >
        <div>
          <div className="font-medium">{c.icon} {c.name}</div>
          <StatusChip status={c.status} />
        </div>

        <div className="flex gap-2">
          <button onClick={() => onEdit(c)} className="action-btn">Edit</button>
          {c.status !== "approved" && (
            <button onClick={() => onApprove(c._id)} className="action-approve">Approve</button>
          )}
          {c.status !== "rejected" && (
            <button onClick={() => onReject(c._id)} className="action-reject">Reject</button>
          )}
          <button onClick={() => onDelete(c._id)} className="action-delete">Delete</button>
        </div>
      </div>
    ))}
  </div>
);

const LinkTable = ({ items, onEdit, onApprove, onReject, onDelete }) => (
  <div className="space-y-3">
    {items.map((l) => (
      <div key={l._id} className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm">
        <div className="flex justify-between">
          <div>
            <div className="font-medium">{l.title}</div>
            {l.urls && l.urls.length > 0 && (
            <div className="mt-1 space-y-1">
              {l.urls.map((u, index) => (
                <div key={index} className="flex items-center gap-2 text-[11px]">
                  <span className="text-white/50">{u.label}:</span>
                  <a
                    href={u.link}
                    target="_blank"
                    className="text-emerald-300 underline break-all"
                  >
                    {u.link}
                  </a>
                </div>
              ))}
            </div>
          )}
            <div className="text-[11px] text-white/50">
              section: {l.section} — rank: {l.rank ?? 999}
            </div>
            <div className="text-[11px] text-white/50">
              category: {l.categoryId?.name}
            </div>
          </div>
          <StatusChip status={l.status} />
        </div>

        <div className="mt-2 flex justify-end gap-2">
          <button onClick={() => onEdit(l)} className="action-btn">Edit</button>
          {l.status !== "approved" && (
            <button onClick={() => onApprove(l._id)} className="action-approve">Approve</button>
          )}
          {l.status !== "rejected" && (
            <button onClick={() => onReject(l._id)} className="action-reject">Reject</button>
          )}
          <button onClick={() => onDelete(l._id)} className="action-delete">Delete</button>
        </div>
      </div>
    ))}
  </div>
);

// ---------------------------------

const EditModal = ({ editItem, setEditItem, editType, setEditType, saving, handleSaveEdit }) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-[#0b0b0f] border border-white/10 rounded-2xl p-5 w-[90%] max-w-md text-white">
      <h3 className="text-lg font-semibold mb-3">Edit {editType}</h3>

      {editType === "category" && (
        <>
          <FormInput
            label="Name"
            value={editItem.name}
            onChange={(v) => setEditItem({ ...editItem, name: v })}
          />

          <FormInput
            label="Icon"
            value={editItem.icon}
            onChange={(v) => setEditItem({ ...editItem, icon: v })}
          />

          <StatusSelect editItem={editItem} setEditItem={setEditItem} />
        </>
      )}

      {editType === "link" && (
        <>
          <FormInput
            label="Title"
            value={editItem.title}
            onChange={(v) => setEditItem({ ...editItem, title: v })}
          />
          {/* URL LIST */}
          <div className="mb-3">
            <label className="block text-xs text-white/60 mb-1">URLs</label>

            <div className="space-y-2">
              {editItem.urls?.map((u, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    className="flex w-15 md:w-25 bg-white/5 border border-white/20 rounded-lg px-2 py-1 text-xs"
                    placeholder="Label"
                    value={u.label}
                    onChange={(e) => {
                      const copy = [...editItem.urls];
                      copy[idx].label = e.target.value;
                      setEditItem({ ...editItem, urls: copy });
                    }}
                  />

                  <input
                    className="flex w-full bg-white/5 border border-white/20 rounded-lg px-2 py-1 text-xs"
                    placeholder="https://..."
                    value={u.link}
                    onChange={(e) => {
                      const copy = [...editItem.urls];
                      copy[idx].link = e.target.value;
                      setEditItem({ ...editItem, urls: copy });
                    }}
                  />

                  <button
                    onClick={() => {
                      const filtered = editItem.urls.filter((_, i) => i !== idx);
                      setEditItem({ ...editItem, urls: filtered });
                    }}
                    className="px-2 py-1 text-xs bg-red-700/40 border border-red-800 rounded-lg"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* ADD URL BUTTON */}
            <button
              onClick={() =>
                setEditItem({
                  ...editItem,
                  urls: [...(editItem.urls || []), { label: "", link: "" }],
                })
              }
              className="mt-2 px-3 py-1.5 text-xs bg-white/10 border border-white/20 rounded-lg"
            >
              + Add URL
            </button>
          </div>

          <FormInput
            label="Section"
            value={editItem.section}
            onChange={(v) => setEditItem({ ...editItem, section: v })}
          />

          <FormInput
            label="Rank"
            value={editItem.rank}
            type="number"
            onChange={(v) => setEditItem({ ...editItem, rank: Number(v) })}
          />

          <div className="mb-3">
            <label className="block text-xs text-white/60 mb-1">Description</label>
            <textarea
              className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm"
              value={editItem.description || ""}
              onChange={(e) =>
                setEditItem({ ...editItem, description: e.target.value })
              }
            />
          </div>

          <StatusSelect editItem={editItem} setEditItem={setEditItem} />
        </>
      )}

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => { setEditItem(null); setEditType(null); }}
          className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs"
        >
          Cancel
        </button>

        <button
          onClick={handleSaveEdit}
          disabled={saving}
          className="px-4 py-1.5 bg-emerald-500 text-black rounded-lg text-xs disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  </div>
);

// ----------- UTIL COMPONENTS -----------

const FormInput = ({ label, value, onChange, type = "text" }) => (
  <div className="mb-3">
    <label className="block text-xs text-white/60 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-sm"
    />
  </div>
);

const StatusSelect = ({ editItem, setEditItem }) => (
  <>
    <label className="block text-xs text-white/60 mb-1">Status</label>
    <select
      className="w-full bg-black/90 border border-white/20 rounded-lg px-3 py-2 text-sm"
      value={editItem.status}
      onChange={(e) => setEditItem({ ...editItem, status: e.target.value })}
    >
      <option value="pending">pending</option>
      <option value="approved">approved</option>
      <option value="rejected">rejected</option>
    </select>
  </>
);

export default AdminDashboard;
