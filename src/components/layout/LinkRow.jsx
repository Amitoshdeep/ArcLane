import React, { useState, useEffect } from "react";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

const LinkRow = ({ link, index, color }) => {
  const [open, setOpen] = useState(false);
  const [favicon, setFavicon] = useState(null);

  useEffect(() => {
    if (!link?.urls?.length) return;
    try {
      const urlObj = new URL(link.urls[0].link.startsWith("http") ? link.urls[0].link : `https://${link.urls[0].link}`);
      const base = urlObj.origin;
      const iconUrl = `https://www.google.com/s2/favicons?sz=64&domain_url=${base}`;
      setFavicon(iconUrl);
    } catch {
      setFavicon(null);
    }
  }, [link]);

  return (
    <div
      className="bg-black/20 border rounded-lg overflow-hidden"
      style={{ borderColor: color + "33" }} // soft tint
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition"
      >
        <span className="flex items-center gap-3 text-white font-semibold text-base">
          {index + 1}.
          {favicon && (
            <img src={favicon} alt="" className="w-5 h-5 rounded-md object-contain" />
          )}
          {link.title}
        </span>

        <span className="text-white/40 flex items-center gap-2">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      <div
        className={`transition-all overflow-hidden ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 pt-1 space-y-3">
          {/* DESCRIPTION (auto format: + = green, - = red) */}
          {link.description && (
            <div className="flex flex-col gap-1 mt-2">

              {link.description
                .split(/[\n]+|(?=\+ )|(?=\- )/g) // smart split
                .map((line, i) => {
                  const t = line.trim();
                  if (!t) return null;

                  const isPositive = t.startsWith("+");
                  const isNegative = t.startsWith("-");

                  return (
                    <p
                      key={i}
                      className={`text-sm leading-relaxed ${
                        isPositive
                          ? "text-green-400"
                          : isNegative
                          ? "text-red-400"
                          : "text-white/60"
                      }`}
                    >
                      {t}
                    </p>
                  );
                })}
            </div>
          )}

          {link.urls?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {link.urls.map((u, i) => (
                <a
                  key={i}
                  href={u.link.startsWith("http") ? u.link : `https://${u.link}`}
                  target="_blank"
                  className="flex items-center gap-2 bg-blue-600/20 border border-blue-600/30 px-3 py-1 rounded text-blue-300 text-sm hover:bg-blue-600/40 transition"
                >
                  {u.label}
                  <ExternalLink size={14} />
                </a>
              ))}
            </div>
          )}

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
      </div>
    </div>
  );
};

export default LinkRow;
