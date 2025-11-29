// src/components/layout/Section.jsx
import React, { useState } from "react";
import LinkRow from "./LinkRow";

const ROW_LIMIT = 10; // how many rows before collapsing

const Section = ({ title, items }) => {
  const [expanded, setExpanded] = useState(false);

  const visibleItems = expanded ? items : items.slice(0, ROW_LIMIT);
  const hiddenCount = items.length - ROW_LIMIT;

  return (
    <div className="bg-black/40 break-inside-avoid border border-white/10 rounded-xl p-4 mb-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-semibold text-white text-lg">{title}</span>
      </div>

      {/* ROWS */}
      <div className="space-y-3">
        {visibleItems.map((link, i) => (
          <LinkRow key={link._id} link={link} index={i} />
        ))}
      </div>

      {/* SHOW MORE / LESS BUTTON */}
      {hiddenCount > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-center mt-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white/80 hover:bg-white/20 transition"
        >
          {expanded
            ? "Show less ▴"
            : `Show ${hiddenCount} more ▾`}
        </button>
      )}
    </div>
  );
};

export default Section;
