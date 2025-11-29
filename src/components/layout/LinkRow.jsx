import React, { useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

const LinkRow = ({ link, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-black/20 border border-white/10 rounded-lg">

      {/* ROW HEADER (always visible) */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition"
      >
        <span className="text-white font-semibold text-base">
          {index + 1}. {link.title}
        </span>

        <span className="text-white/40 flex items-center gap-2">
          {link.categoryId?.name || ""}
          {open ? (
            <ChevronUp size={18} className="text-white/50" />
          ) : (
            <ChevronDown size={18} className="text-white/50" />
          )}
        </span>
      </button>

      {/* EXPANDABLE CONTENT */}
      <div
        className={`transition-all overflow-hidden ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 pt-1 space-y-3">

          {/* Description */}
          {link.description && (
            <p className="text-white/60 text-sm leading-relaxed">
              {link.description}
            </p>
          )}

          {/* URLs */}
          {link.urls?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {link.urls.map((u, i) => (
                <a
                  key={i}
                  href={u.link}
                  target="_blank"
                  className="flex items-center gap-2 bg-blue-600/20 border border-blue-600/30 hover:bg-blue-600/40 text-blue-300 px-3 py-1 rounded text-sm"
                >
                  {u.label}
                  <ExternalLink size={14} />
                </a>
              ))}
            </div>
          )}

          {/* TAGS */}
          {link.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
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
      </div>

    </div>
  );
};

export default LinkRow;
