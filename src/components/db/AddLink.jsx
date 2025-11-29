import { useEffect, useState } from "react";
import { getCategories } from "@/api/categoryApi";
import { addLink } from "@/api/linkApi";

const AddLink = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [urls, setUrls] = useState([{ label: "Primary", link: "" }]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const addUrlField = () => {
    setUrls([...urls, { label: `Mirror ${urls.length}`, link: "" }]);
  };

  const updateUrlField = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const removeUrlField = (i) => {
    const updated = urls.filter((_, index) => index !== i);
    setUrls(updated);
  };

  const submit = async () => {
    if (!title) return alert("Enter title");
    if (!selectedCategory) return alert("Choose category");
    if (!urls[0].link) return alert("Primary link required");

    try {
      await addLink({
        title,
        urls,
        categoryId: selectedCategory,
        tags: tags.split(",").map(t => t.trim()),
        description,
        addedBy: "admin"
      });

      alert("Link added!");
      setTitle("");
      setUrls([{ label: "Primary", link: "" }]);
      setSelectedCategory("");
      setTags("");
      setDescription("");

    } catch (err) {
      console.error(err);
      alert("Error adding link");
    }
  };

  return (
    <div className="p-4 bg-black/20 rounded-xl border border-white/20 text-white space-y-5">

      {/* Title */}
      <div>
        <label>Title</label>
        <input
          className="bg-black/40 w-full p-2 rounded mt-1"
          placeholder="e.g. MyAnimeList"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* URL array */}
      <div>
        <label>URLs (Mirrors)</label>

        {urls.map((u, i) => (
          <div key={i} className="mt-2 flex gap-2">

            {/* Label */}
            <input
              className="bg-black/40 p-2 rounded w-1/4"
              value={u.label}
              onChange={(e) => updateUrlField(i, "label", e.target.value)}
            />

            {/* URL */}
            <input
              className="bg-black/40 p-2 rounded w-full"
              placeholder="https://example.com"
              value={u.link}
              onChange={(e) => updateUrlField(i, "link", e.target.value)}
            />

            {/* Delete btn */}
            {i !== 0 && (
              <button
                className="px-2 bg-red-600 rounded"
                onClick={() => removeUrlField(i)}
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addUrlField}
          className="mt-2 bg-blue-600 px-3 py-1 rounded"
        >
          + Add Mirror
        </button>
      </div>

      {/* Categories */}
      <div>
        <label>Category</label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <label
              key={cat._id}
              className="flex items-center gap-2 bg-black/40 p-2 rounded border border-white/10 cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                value={cat._id}
                checked={selectedCategory === cat._id}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />
              <span>{cat.icon} {cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <label>Tags</label>
        <input
          className="bg-black/40 w-full p-2 rounded mt-1"
          placeholder="e.g. anime, ratings, list"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      {/* Description */}
      <div>
        <label>Description</label>
        <textarea
          className="bg-black/40 w-full p-2 rounded mt-1"
          placeholder="Short description about the site..."
          value={description}
          rows={3}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Submit button */}
      <button
        onClick={submit}
        className="w-full bg-green-600 p-3 rounded mt-2 text-lg font-bold hover:bg-green-700"
      >
        Save Link
      </button>
    </div>
  );
};

export default AddLink;
