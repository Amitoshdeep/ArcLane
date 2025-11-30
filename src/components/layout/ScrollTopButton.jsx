import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY > 300) setVisible(true);
      else setVisible(false);
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-20 z-50
        p-3 rounded-lg border border-white/10
        bg-black/50 backdrop-blur
        text-white hover:bg-white/10
        transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-3"}
      `}
    >
      <ChevronUp size={20} />
    </button>
  );
}
