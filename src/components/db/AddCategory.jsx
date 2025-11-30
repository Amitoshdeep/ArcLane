import React, { useState } from "react";
import { toast } from "react-toastify";
import { addCategory } from "@/api/categoryApi";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (submitting) return; // ⛔ prevents double click

    if (!name.trim()) {
      toast.error("Category name required");
      return;
    }

    setSubmitting(true); // 🔒 lock button

    try {
      await addCategory({
        name: name.trim(),
        icon: icon.trim() || "📁",
      });

      toast.success("Category submitted for approval!");

      // Reset fields
      setName("");
      setIcon("");
    } catch (err) {
      console.error(err);
      toast.error("Error adding category");
    } finally {
      setSubmitting(false); // 🔓 unlock button
    }
  };

  return (
    <div className="md:w-[60%] mt-10 bg-black/40 border border-white/15 rounded-2xl p-5 text-white space-y-5">
      <h2 className="text-xl font-semibold mb-2">Submit New Category</h2>

      {/* Name */}
      <div>
        <label className="text-sm text-white/70">Category Name</label>
        <input
          className="mt-1 w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none"
          placeholder="Anime, Manga, Movies, Tools..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Icon */}
      <div>
        <label className="text-sm text-white/70">
          Icon <span className="text-white/40">(emoji)</span>
        </label>
        <input
          className="mt-1 w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 outline-none"
          placeholder="📺, 📚, 🎬, 🛠️..."
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className={`px-4 py-2 rounded font-semibold transition ${
          submitting
            ? "bg-blue-800 opacity-60 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {submitting ? "Submitting..." : "Add Category"}
      </button>
    </div>
  );
};

export default AddCategory;
