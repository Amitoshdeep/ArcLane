// src/components/Main/LinkRow.jsx

import React from "react";
import { ExternalLink } from "lucide-react";

const LinkRow = ({ link, index }) => {
  return (
    <div className="border border-white/10 bg-black/30 hover:bg-white/5 transition rounded-lg p-4">

      {/* Title Row */}
      <div className="flex items-center justify-between">
        <div className="font-semibold text-white text-lg">
          {index + 1}. {link.title}
        </div>

        <div className="text-white/40 text-sm">
          {link.categoryId?.name || "Unknown"}
        </div>
      </div>

      {/* Description */}
      {link.description && (
        <p className="text-white/60 text-sm mt-2 leading-relaxed">
          {link.description}
        </p>
      )}

      {/* Mirror Links */}
      {link.urls?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {link.urls.map((url, i) => (
            <a
              key={i}
              href={url.link}
              target="_blank"
              className="flex items-center gap-2 bg-blue-600/20 border border-blue-600/50 hover:bg-blue-600/40 px-3 py-1 rounded text-blue-300 text-sm transition"
            >
              {url.label}
              <ExternalLink size={14} />
            </a>
          ))}
        </div>
      )}

      {/* Tags */}
      {link.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
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
