// src/pages/Home.jsx
import React, { useEffect, useState, useRef } from "react";
import { Search } from "lucide-react";

import { getCategories } from "@/api/categoryApi";
import { getLinks } from "@/api/linkApi";

import Section from "@/components/layout/Section";

function Home() {
  const searchRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [links, setLinks] = useState([]);

  useEffect(() => { loadCategories(); }, []);
  useEffect(() => { loadLinks(); }, [activeCategory, search]);

  const loadCategories = async () => {
    setCategories(await getCategories());
  };

  const loadLinks = async () => {
    const data = await getLinks({
      status: "approved",
      categoryId: activeCategory || undefined,
      search: search || undefined,
    });
    setLinks(data);
  };

  // group by section
  const grouped = links.reduce((acc, link) => {
    const sec = link.section || "General";
    if (!acc[sec]) acc[sec] = [];
    acc[sec].push(link);
    return acc;
  }, {});

  // search (F)
  useEffect(() => {
    const handler = (e) => {
      const tag = e.target.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center pb-20">

      {/* SEARCH BAR */}
      <div className="flex w-[60%] mt-10 gap-2">
        <div className="flex relative w-full">
          <input
            ref={searchRef}
            type="text"
            placeholder="Search ( F )"
            className="border-b border-white/20 px-5 py-2 pr-10 outline-none w-full bg-transparent text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70" size={20} />
        </div>

        <select
          className="outline-0 bg-black px-5 py-2 border-b border-white/20 text-white"
          value={activeCategory || ""}
          onChange={(e) => setActiveCategory(e.target.value || null)}
        >
          <option value="">Any</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* TRUE MASONRY GRID */}
      <div className="w-[80%] mt-8 columns-1 md:columns-2 gap-6 space-y-6">
        {Object.entries(grouped).map(([sec, items]) => (
          <Section key={sec} title={sec} items={items} />
        ))}
      </div>

    </div>
  );
}

export default Home;
