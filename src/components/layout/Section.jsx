import { useState } from "react";

const Section = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="mt-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-black/50 border border-white/10 px-4 py-2 rounded-lg"
      >
        <span className="font-semibold text-white">{title}</span>
        <span className="text-gray-400 text-sm">{open ? "▾" : "▸"}</span>
      </button>

      {open && <div className="mt-3 space-y-3">{children}</div>}
    </div>
  );
};

export default Section;
