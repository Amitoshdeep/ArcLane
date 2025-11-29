// src/utils/linkHelpers.js

//------------------------------------------------------
// 1. AUTO TAG EXTRACTION FROM URLS
//------------------------------------------------------
export function inferTagsFromUrls(urls = []) {
  const tagSet = new Set();

  const rules = [
    { keyword: "ddl", tag: "DDL" },
    { keyword: "direct", tag: "DDL" },

    { keyword: "raw", tag: "RAW" },
    { keyword: "sub", tag: "Subbed" },
    { keyword: "dub", tag: "Dubbed" },

    { keyword: "torrent", tag: "Torrent" },
    { keyword: "nyaa", tag: "Torrent" },

    { keyword: "stream", tag: "Streaming" },
    { keyword: "watch", tag: "Streaming" },
    { keyword: "player", tag: "Streaming" },

    { keyword: "api", tag: "API" },
    { keyword: "github", tag: "Github" },
    { keyword: "docs", tag: "Docs" },
  ];

  urls.forEach((u) => {
    const url = u.link.toLowerCase();

    rules.forEach((rule) => {
      if (url.includes(rule.keyword)) {
        tagSet.add(rule.tag);
      }
    });
  });

  return [...tagSet];
}

//------------------------------------------------------
// 2. AUTO SECTION DETECTION
//------------------------------------------------------
export function inferSectionFromCategoryAndTags(categoryName = "", tags = []) {
  const name = categoryName.toLowerCase();

  // If user already added the section manually, keep it unchanged.
  // This function is called only when section is empty.

  // --- Anime / Manga / Otaku ---
  if (name.includes("anime")) {
    if (tags.includes("Streaming")) return "Anime Streaming";
    if (tags.includes("DDL")) return "Anime Download";
    if (tags.includes("Torrent")) return "Anime Torrent";
    return "Anime";
  }

  // --- Movies ---
  if (name.includes("movie")) {
    if (tags.includes("Streaming")) return "Movie Streaming";
    if (tags.includes("DDL")) return "Movie Download";
    if (tags.includes("Torrent")) return "Movie Torrent";
    return "Movies";
  }

  // --- Tech ---
  if (name.includes("tech") || name.includes("developer")) {
    if (tags.includes("API")) return "API Tools";
    if (tags.includes("Github")) return "Developer Tools";
    if (tags.includes("Docs")) return "Documentation";
    return "Tech Tools";
  }

  // --- Tools ---
  if (name.includes("tool")) {
    if (tags.includes("API")) return "API Tools";
    if (tags.includes("Github")) return "Dev Tools";
    return "Tools";
  }

  // --- General fallback ---
  if (tags.includes("Torrent")) return "Torrents";
  if (tags.includes("Streaming")) return "Streaming";
  if (tags.includes("DDL")) return "Direct Download";

  return "General";
}

//------------------------------------------------------
// 3. OPTIONAL: CLEAN TITLE (for future auto-clean)
//------------------------------------------------------
export function cleanTitle(title = "") {
  return title
    .replace(/Official/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}
