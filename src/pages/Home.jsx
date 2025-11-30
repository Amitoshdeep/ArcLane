import React, { useEffect, useState, useRef } from "react";
import { Search } from "lucide-react";

import { getCategories } from "api/categoryApi";
import { getLinks } from "api/linkApi";

import Section from "components/layout/Section";
import SectionSkeleton from "components/layout/SectionSkeleton";

function Home() {
  const searchRef = useRef(null);

  const [loading, setLoading] = useState(true);
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
    setLoading(true);
    const data = await getLinks({
      status: "approved",
      categoryId: activeCategory || undefined,
      search: search || undefined,
    });
    setLinks(data);
    setLoading(false);
  };

  // GROUP BY SECTION
  const grouped = Object.entries(
    links.reduce((acc, link) => {
      const sec = link.section || "General";
      if (!acc[sec]) acc[sec] = [];
      acc[sec].push(link);
      return acc;
    }, {})
  );

  // SPLIT INTO 2 COLUMNS (real masonry)
  const col1 = [];
  const col2 = [];
  grouped.forEach((entry, idx) => {
    (idx % 2 === 0 ? col1 : col2).push(entry);
  });

  // Formater Pascal Case
  const formatSection = (str) =>
  str
    ?.split(/(\W+)/)
    .map((p) =>
      /^[a-z0-9]+$/i.test(p)
        ? p.charAt(0).toUpperCase() + p.slice(1)
        : p
    )
    .join("") || "";


  return (
    <div className="min-h-screen flex flex-col items-center pb-20">

      {/* SEARCH BAR */}
      <div className="flex w-full md:w-[80%] px-5 md:px-0 mt-10 gap-2">
        <div className="flex relative w-full">
          <input
            ref={searchRef}
            type="text"
            placeholder="Search ( F )"
            className="border-b border-white/20 px-5 py-2 pr-10 outline-none w-full bg-transparent text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70"
            size={20}
          />
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

      {/* 2-COLUMN EXACT MASONRY */}
      <div className="w-full md:w-[80%] mt-8 flex flex-col md:flex-row gap-6 px-5 md:px-0">

        {/* MOBILE: merged */}
        <div className="flex-1 space-y-6 md:hidden">
          {loading ? (
            <>
              <SectionSkeleton />
              <SectionSkeleton />
            </>
          ) : (
            grouped.map(([sec, items]) => (
              <Section key={sec} title={formatSection(sec)} items={items} />
            ))
          )}
        </div>

        {/* Desktop Column 1 */}
        <div className="hidden md:flex md:flex-col flex-1 space-y-6">
          {loading
            ? <SectionSkeleton />
            : col1.map(([sec, items]) => (
                <Section key={sec} title={formatSection(sec)} items={items} />
              ))
          }
        </div>

        {/* Desktop Column 2 */}
        <div className="hidden md:flex md:flex-col flex-1 space-y-6">
          {loading
            ? <SectionSkeleton />
            : col2.map(([sec, items]) => (
                <Section key={sec} title={formatSection(sec)} items={items} />
              ))
          }
        </div>

      </div>

    </div>
  );
}

export default Home;
