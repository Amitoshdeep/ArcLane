import React, { useEffect, useState, useRef } from "react";
import { Search } from "lucide-react";

import { getCategories } from "@/api/categoryApi";
import { getLinks } from "@/api/linkApi";

import CategoryBar from "@/components/layout/CategoryBar";
import Section from "@/components/layout/Section";
import LinkRow from "@/components/layout/LinkRow";

function Home() {
  const searchRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const [search, setSearch] = useState("");
  const [links, setLinks] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadLinks();
  }, [activeCategory, search]);

  const loadCategories = async () => {
    setCategories(await getCategories());
  };

  const loadLinks = async () => {
    setLinks(
      await getLinks({
        status: "approved",
        categoryId: activeCategory || undefined,
        search: search || undefined,
      })
    );
    console.log("LOADED LINKS:", links);
  };

  const grouped = links.reduce((acc, link) => {
    const sec = link.section || "General";
    if (!acc[sec]) acc[sec] = [];
    acc[sec].push(link);
    return acc;
  }, {});

  // search
  useEffect(() => {
    const handler = (e) => {
      // If user is already typing in an input/textarea, ignore
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

      {/* Search + dropdown */}
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
          onChange={(e) =>
            setActiveCategory(e.target.value === "" ? null : e.target.value)
          }
        >
          <option value="">Any</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Category Pills */}
      <div className="w-[60%] mt-4">
        <CategoryBar
          categories={categories}
          activeCategoryId={activeCategory}
          onSelect={setActiveCategory}
        />
      </div>

      {/* Sections */}
      <div className="w-[60%] mt-6">
        {Object.entries(grouped).map(([sec, items]) => (
          <Section title={sec} key={sec}>
            {items.map((l, i) => (
              <LinkRow key={l._id} link={l} index={i} />
            ))}
          </Section>
        ))}
      </div>
    </div>
  );
}

export default Home;
