import React, { useState } from "react";
import { addCategory } from "@/api/categoryApi";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  const handleSubmit = async () => {
    if (!name) return alert("Category name required");

    await addCategory({ name, icon: icon || "📁" });

    alert("Category added!");

    setName("");
    setIcon("");
  };

  return (
    <div className="w-[60%] mt-10 bg-black/40 border border-white/15 rounded-2xl p-5 text-white space-y-5">
      <h2 className="text-xl font-semibold mb-2">Add Category</h2>

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
        Save Category
      </button>
    </div>
  );
};

export default AddCategory;
