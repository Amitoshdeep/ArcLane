// src/utils/linkHelpers.js

// Simple helpers to pull tags out of URLs and decide section

export const inferTagsFromUrls = (urls) => {
  const tags = new Set();

  urls.forEach(({ link }) => {
    if (!link) return;
    const lower = link.toLowerCase();

    if (lower.includes("ddl")) tags.add("DDL");
    if (lower.includes("raw")) tags.add("RAW");
    if (lower.includes("usenet")) tags.add("USENET");
    if (lower.includes("torrent") || lower.includes("nyaa")) tags.add("Torrent");
    if (lower.includes("stream")) tags.add("Streaming");
    if (lower.includes("download")) tags.add("Download");

    // domain-based tags
    try {
      const urlObj = new URL(link);
      const host = urlObj.hostname;
      const tld = host.split(".").pop();
      if (tld) tags.add(`.${tld}`);
    } catch {
      // ignore invalid URL
    }
  });

  return Array.from(tags);
};

export const inferSectionFromCategoryAndTags = (categoryName, tags) => {
  const t = tags.map((x) => x.toLowerCase());
  const hasDownload = t.some((x) =>
    ["download", "ddl", "raw", "torrent"].some((k) => x.includes(k))
  );

  if (!categoryName) return hasDownload ? "Download" : "General";

  const cat = categoryName.toLowerCase();

  if (cat.includes("anime")) {
    return hasDownload ? "Anime Download" : "Anime Streaming";
  }

  if (cat.includes("manga")) {
    return hasDownload ? "Manga Download" : "Manga Reading";
  }

  if (cat.includes("movie") || cat.includes("film")) {
    return hasDownload ? "Movies Download" : "Streaming";
  }

  if (cat.includes("tools") || cat.includes("apps")) {
    return "Tools";
  }

  return hasDownload ? "Download" : "General";
};
