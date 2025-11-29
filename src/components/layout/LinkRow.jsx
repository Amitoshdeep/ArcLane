import { useEffect, useState } from "react";
import { getLinks } from "@/api/linkApi";

function LinkGrid() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getLinks({ status: "approved" });
    setLinks(data);
  };

  return (
    <div className="grid grid-cols-3 gap-4 text-white">
      {links.map((l) => (
        <div key={l._id} className="p-4 bg-black/30 border border-white/10 rounded">
          <h2>{l.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default LinkGrid;
