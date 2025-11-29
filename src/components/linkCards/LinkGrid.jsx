import { useEffect, useState } from "react";
import { getApprovedLinks } from "@/api/linkApi";
import LinkCard from "./LinkCard";

const LinkGrid = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getApprovedLinks();
    setLinks(data);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Approved Links</h1>

      {links.length === 0 && (
        <p className="text-gray-400">No approved links yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => (
          <LinkCard key={link._id} link={link} />
        ))}
      </div>
    </div>
  );
};

export default LinkGrid;
