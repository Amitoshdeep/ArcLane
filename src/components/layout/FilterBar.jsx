// src/components/FilterBar.jsx
const FilterBar = ({ search, setSearch }) => {
  return (
    <div className="flex items-center justify-between gap-4 mt-4">
      <input
        className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
        placeholder="Search links (F)…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button className="bg-black/40 border border-white/10 px-4 py-2 rounded-lg text-sm text-gray-300">
        Any ⌄
      </button>
    </div>
  );
};

export default FilterBar;
