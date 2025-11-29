const CategoryBar = ({ categories, activeCategoryId, onSelect }) => {
  return (
    <div className="flex gap-3 overflow-x-auto py-3 no-scrollbar">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-xl border ${
          !activeCategoryId
            ? "bg-white/10 border-white text-white"
            : "bg-black/40 border-white/10 text-gray-300"
        }`}
      >
        Any
      </button>

      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => onSelect(cat._id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border whitespace-nowrap ${
            activeCategoryId === cat._id
              ? "bg-white/10 border-white text-white"
              : "bg-black/40 border-white/10 text-gray-300 hover:bg-white/5"
          }`}
        >
          <span className="text-xl">{cat.icon}</span>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
