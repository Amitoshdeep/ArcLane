// src/components/layout/LinkRow.jsx
import React from "react";
import { ExternalLink } from "lucide-react";

const LinkRow = ({ link, index }) => {
  return (
    <div className="bg-black/20 border border-white/10 rounded-lg p-4 hover:bg-white/5 transition">

      {/* Title Row */}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-white">
          {index + 1}. {link.title}
        </span>
        <span className="text-white/40 text-sm">
          {link.categoryId?.name || "Unknown"}
        </span>
      </div>

      {/* Description */}
      {link.description && (
        <p className="text-white/60 text-sm mt-1">{link.description}</p>
      )}

      {/* URLs */}
      {link.urls?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {link.urls.map((u, i) => (
            <a
              key={i}
              href={u.link}
              target="_blank"
              className="flex items-center gap-2 bg-blue-600/20 border border-blue-600/30 hover:bg-blue-600/40 text-blue-300 px-3 py-1 rounded text-sm transition"
            >
              {u.label}
              <ExternalLink size={14} />
            </a>
          ))}
        </div>
      )}

      {/* TAGS */}
      {link.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {link.tags.map((t, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded bg-white/10 border border-white/20 text-white/70"
            >
              #{t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkRow;
