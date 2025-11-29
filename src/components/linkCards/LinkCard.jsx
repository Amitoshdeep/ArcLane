import React from 'react';
import {ExternalLink} from 'lucide-react'

const LinkCard = ({ link }) => {
  return (
    <div className="bg-black/30 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition group">

      {/* Title */}
      <h2 className="text-xl font-semibold text-white group-hover:text-blue-300">
        {link.title}
      </h2>

      {/* Category Tag */}
      <p className="text-gray-400 text-sm mt-1">
        Category: {link.categoryId?.name || "Unknown"}
      </p>

      {/* Description */}
      {link.description && (
        <p className="text-gray-300 text-sm mt-2">
          {link.description}
        </p>
      )}

      {/* Mirror URLs */}
      <div className="mt-3 space-y-1">
        {link.urls.map((url, i) => (
          <a
            key={i}
            href={url.link}
            target="_blank"
            className="w-max flex items-center gap-2 bg-blue-600/20 border border-blue-600/40 text-blue-300 px-3 py-1 rounded text-sm hover:bg-blue-600/40"
          >
            {url.label}
            <ExternalLink size={15}/>
          </a>
        ))}
      </div>

      {/* Tags */}
      {link.tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {link.tags.map((t, i) => (
            <span
              key={i}
              className="text-xs bg-white/10 px-2 py-1 rounded border border-white/20"
            >
              #{t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkCard;
