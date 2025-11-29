import { useState } from "react";
import { addCategory } from "@/api/categoryApi";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  const submit = async () => {
    if (!name) return alert("Enter name");

    try {
      const res = await addCategory(name, icon);
      alert("Category added!");
      setName("");
      setIcon("");
      console.log("Saved:", res);
    } catch (err) {
      alert("Error saving category");
      console.log(err);
    }
  };

  return (
    <div className="p-4 bg-black/20 rounded-xl border border-white/20">
      <input
        className="bg-black/50 w-full p-2 rounded mb-2"
        placeholder="Category name (e.g. Anime)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="bg-black/50 w-full p-2 rounded mb-2"
        placeholder="Icon (e.g. 🍥)"
        value={icon}
        onChange={(e) => setIcon(e.target.value)}
      />

      <button
        onClick={submit}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Category
      </button>
    </div>
  );
};

export default AddCategory;
