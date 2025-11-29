import React, { useState } from "react";
import LinkRow from "./LinkRow";

const ROW_LIMIT = 10;

// pastel color palette generator
const colors = [
  "#60A5FA", "#A78BFA", "#34D399", "#F472B6", "#FBBF24",
  "#38BDF8", "#F87171", "#4ADE80", "#C084FC", "#FACC15"
];

const Section = ({ title, items }) => {
  const [expanded, setExpanded] = useState(false);

  const color = colors[Math.abs(title.charCodeAt(0)) % colors.length];

  const visible = expanded ? items : items.slice(0, ROW_LIMIT);
  const hiddenCount = items.length - ROW_LIMIT;

  return (
    <div className="break-inside-avoid bg-black/40 border border-white/10 rounded-xl p-4 mb-6">

      {/* SECTION HEADER (sticky inside card) */}
      <div
        className="sticky top-0 pb-2 z-10 bg-black/40 backdrop-blur-sm"
        style={{ borderBottom: `1px solid ${color}40` }}
      >
        <h2 className="font-semibold text-white text-lg">{title}</h2>
      </div>

      <div className="mt-3 space-y-3">
        {visible.map((l, i) => (
          <LinkRow key={l._id} link={l} index={i} color={color} />
        ))}
      </div>

      {hiddenCount > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-center mt-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white/80 hover:bg-white/20 transition"
        >
          {expanded ? "Show less ▴" : `Show ${hiddenCount} more ▾`}
        </button>
      )}
    </div>
  );
};

export default Section;
