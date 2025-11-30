// src/components/db/AddLink.jsx
import React, { useEffect, useState } from "react";
import { getCategories } from "@/api/categoryApi";
import { addLink } from "@/api/linkApi";
import {
  inferTagsFromUrls,
  inferSectionFromCategoryAndTags
} from "@/utils/linkHelpers";

const AddLink = () => {
  const [categories, setCategories] = useState([]);

  // Form State
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [urls, setUrls] = useState([{ label: "Main", link: "" }]);
  const [section, setSection] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [description, setDescription] = useState("");
  const [rank, setRank] = useState("");

  // Load categories on mount
  useEffect(() => {
    (async () => {
      const data = await getCategories();
      setCategories(data);
    })();
  }, []);

  // Add new mirror URL field
  const addUrlField = () => {
    setUrls([...urls, { label: `Mirror ${urls.length}`, link: "" }]);
  };

  // Update URL field
  const updateUrlField = (index, field, value) => {
    const next = [...urls];

    if (field === "link") {
      next[index][field] = normalizeUrl(value.trim());
    } else {
      next[index][field] = value;
    }

    setUrls(next);
  };

  // --- Auto-fix URL helper ---
  function normalizeUrl(url) {
    if (!url) return "";

    // If it already starts correctly, return it
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    // Otherwise prefix
    return `https://${url}`;
  }


  // Remove mirror
  const removeUrlField = (index) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  // Auto-detect tags & section
  const handleAutoFill = () => {
    const autoTags = inferTagsFromUrls(urls);

    const manualTags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // merge + dedupe tags
    const combined = Array.from(new Set([...manualTags, ...autoTags]));

    const category = categories.find((c) => c._id === selectedCategoryId);

    const autoSection = inferSectionFromCategoryAndTags(
      category?.name,
      combined
    );

    setTagsInput(combined.join(", "));

    if (!section) setSection(autoSection);
  };

  // Submit
  const handleSubmit = async () => {
    if (!title) return alert("Title required");
    if (!selectedCategoryId) return alert("Choose a category");
    if (!urls[0].link) return alert("At least one URL required");

    const finalTags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title,
      urls: urls.map(u => ({
        label: u.label,
        link: normalizeUrl(u.link)
      })),
      categoryId: selectedCategoryId,
      section: section || "General",
      rank: rank ? Number(rank) : 999,
      description,
      tags: finalTags,
      addedBy: "admin"
    };

    try {
      await addLink(payload);
      alert("Link added (pending)!");

      // Reset
      setTitle("");
      setUrls([{ label: "Main", link: "" }]);
      setSection("");
      setTagsInput("");
      setDescription("");
      setRank("");
    } catch (err) {
      console.error(err);
      alert("Error adding link");
    }
  };

  return (
    <div className="md:w-[80%] w-full mt-10 bg-black/40 border border-white/15 rounded-2xl p-5 text-white space-y-5 relative">
      <h2 className="text-xl font-semibold mb-2">Add New Link</h2>

      {/* Title */}
      <div>
        <label className="text-sm text-white/70">Title</label>
        <input
          className="mt-1 w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none"
          placeholder="AnimeKai, MyAnimeList, Nyaa…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Category + Rank */}
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="flex-1">
          <label className="text-sm text-white/70">Category</label>
          <select
            className="mt-1 w-full bg-black border border-white/15 rounded-lg px-3 py-2 outline-none"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          >
            <option value="">Select category…</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.icon} {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="md:w-32 w-full">
          <label className="text-sm text-white/70">Rank</label>
          <input
            type="number"
            className="mt-1 w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none"
            placeholder="1"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
          />
        </div>
      </div>

      {/* URLs / Mirrors */}
      <div>
        <label className="text-sm text-white/70">URLs (mirrors)</label>

        <div className="space-y-2 mt-1">
          {urls.map((u, i) => (
            <div key={i} className="flex gap-2 flex-col md:flex-row">
              <input
                className="md:w-32 w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none text-sm"
                value={u.label}
                onChange={(e) => updateUrlField(i, "label", e.target.value)}
              />
              <input
                className="flex-1 bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none text-sm"
                placeholder="https://…"
                value={u.link}
                onChange={(e) => updateUrlField(i, "link", e.target.value)}
              />
              {i !== 0 && (
                <button
                  onClick={() => removeUrlField(i)}
                  className="px-3 rounded-lg bg-red-600/70 hover:bg-red-700 text-sm"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addUrlField}
          className="mt-2 text-sm px-3 py-1 rounded-lg bg-blue-600/80 hover:bg-blue-700"
        >
          + Add Mirror
        </button>
      </div>

      {/* Section */}
      <div>
        <label className="text-sm text-white/70">Section</label>
        <input
          className="mt-1 w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none"
          placeholder="Anime Streaming, Download, Tools…"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />
      </div>

      {/* Tags */}
      <div>
        <label className="text-sm text-white/70">Tags</label>
        <input
          className="mt-1 w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none"
          placeholder="DDL, RAW, Streaming…"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
        />
        <button
          onClick={handleAutoFill}
          className="mt-2 text-xs px-3 py-1 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15"
        >
          Auto-detect tags + section
        </button>
      </div>

      {/* Description */}
      <div>
        <label className="text-sm text-white/70">Description</label>
        <textarea
          rows={3}
          className="mt-1 w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none text-sm"
          placeholder="+ Largest anime library&#10;+ Modern UI&#10;- Occasional popups"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-semibold"
      >
        Save Link (Pending)
      </button>
    </div>
  );
};

export default AddLink;
