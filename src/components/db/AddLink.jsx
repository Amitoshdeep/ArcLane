// src/components/db/AddLink.jsx
import React, { useEffect, useState } from "react";
import { getCategories } from "@/api/categoryApi";
import { addLink } from "@/api/linkApi";
import { inferTagsFromUrls, inferSectionFromCategoryAndTags } from "@/utils/linkHelpers";

const AddLink = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [urls, setUrls] = useState([{ label: "Main", link: "" }]);
  const [section, setSection] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [description, setDescription] = useState("");
  const [rank, setRank] = useState("");

  useEffect(() => {
    (async () => {
      const data = await getCategories();
      setCategories(data);
    })();
  }, []);

  const addUrlField = () => {
    setUrls([...urls, { label: `Mirror ${urls.length}`, link: "" }]);
  };

  const updateUrlField = (index, field, value) => {
    const next = [...urls];
    next[index][field] = value;
    setUrls(next);
  };

  const removeUrlField = (index) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const handleAutoFill = () => {
    // infer tags and section
    const autoTags = inferTagsFromUrls(urls);
    const manualTags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const combinedTags = Array.from(new Set([...manualTags, ...autoTags]));

    const category = categories.find((c) => c._id === selectedCategoryId);
    const inferredSection = inferSectionFromCategoryAndTags(
      category?.name,
      combinedTags
    );

    setTagsInput(combinedTags.join(", "));
    if (!section) setSection(inferredSection);
  };

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
      urls,
      categoryId: selectedCategoryId,
      section: section || "General",
      rank: rank ? Number(rank) : 999,
      description,
      tags: finalTags,
      addedBy: "admin",
    };

    try {
      await addLink(payload);
      alert("Link added (pending)!");
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
    <div className="w-[60%] mt-10 bg-black/40 border border-white/15 rounded-2xl p-5 text-white space-y-5 relative">
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
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-sm text-white/70">Category</label>
          <select
            className="mt-1 w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none"
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

        <div className="w-32">
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

      {/* URLs */}
      <div>
        <label className="text-sm text-white/70">URLs (mirrors)</label>
        <div className="space-y-2 mt-1">
          {urls.map((u, i) => (
            <div key={i} className="flex gap-2">
              <input
                className="w-32 bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none text-sm"
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
        <label className="text-sm text-white/70">
          Tags <span className="text-white/40">(comma separated)</span>
        </label>
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
          Auto-detect tags + section from URLs
        </button>
      </div>

      {/* Description */}
      <div>
        <label className="text-sm text-white/70">Description</label>
        <textarea
          rows={3}
          className="mt-1 w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none text-sm"
          placeholder="+ Largest anime library&#10;+ Modern site design&#10;- Sometimes has popups"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="pt-2">
        <button
          onClick={handleSubmit}
          className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-semibold"
        >
          Save Link (Pending)
        </button>
      </div>
    </div>
  );
};

export default AddLink;
