import React, { useState } from "react";
import { addCategory } from "@/api/categoryApi";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) return alert("Category name required");

    try {
      await addCategory({
        name: name.trim(),
        icon: icon.trim() || "📁"
      });

      alert("Category submitted for approval!");

      setName("");
      setIcon("");
    } catch (err) {
      console.error(err);
      alert("Error adding category");
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
        className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold"
      >
        Submit Category (Pending)
      </button>
    </div>
  );
};

export default AddCategory;
