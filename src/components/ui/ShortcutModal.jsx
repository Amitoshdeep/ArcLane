// src/components/ui/ShortcutModal.jsx
import React from "react";

const ShortcutModal = ({ open, onClose }) => {
  if (!open) return null;

  const shortcuts = [
    { group: "Search", keys: ["F"], desc: "Focus search bar" },
    { group: "Search", keys: ["/"], desc: "Focus search (GitHub style)" },
    { group: "Search", keys: ["ESC"], desc: "Clear search" },
    { group: "Search", keys: ["Ctrl", "Backspace"], desc: "Clear search instantly" },

    { group: "Navigation", keys: ["Alt", "↑"], desc: "Previous category" },
    { group: "Navigation", keys: ["Alt", "↓"], desc: "Next category" },

    { group: "General", keys: ["Shift", "?"], desc: "Open shortcuts menu" },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-black/80 border border-white/20 rounded-xl p-6 w-[90%] max-w-md text-white">

        <h2 className="text-xl font-semibold mb-4">Keyboard Shortcuts</h2>

        <div className="space-y-4">
          {shortcuts.map((s, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="text-white/60">{s.desc}</div>

              <div className="flex gap-1">
                {s.keys.map((k, j) => (
                  <span
                    key={j}
                    className="px-2 py-1 text-sm bg-white/10 border border-white/20 rounded"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-white/10 border border-white/20 hover:bg-white/20 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShortcutModal;
