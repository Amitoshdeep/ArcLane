import { FaDiscord, FaGithub, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-20 border-t border-white/10 text-white/60 relative">

      <div className="max-w-[80%] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

        {/* LEFT SECTION */}
        <div className="space-y-1">
          <h1 className="text-lg font-semibold text-white">
            Arclane
          </h1>

          <div className="flex gap-4 text-sm">
            <a href="/about" className="hover:text-white duration-200">
              About
            </a>
            <a href="/disclaimer" className="hover:text-white duration-200">
              Disclaimer
            </a>
            {/* <a href="/changelog" className="hover:text-white duration-200">
              Changelog
            </a> */}
          </div>
        </div>

        {/* RIGHT SECTION – SOCIAL */}
        <div className="text-sm">
          <p className="mb-2 text-right md:text-left">Socials</p>
          <div className="flex gap-4 text-xl">
            <FaGithub
            onClick={()=> window.open("https://github.com/Amitoshdeep/ArcLane")}
            className="cursor-pointer hover:text-white hover:scale-110 duration-200" />
            {/* <FaInstagram className="cursor-pointer hover:text-pink-400 hover:scale-110 duration-200" /> */}
            <FaDiscord
            onClick={()=> window.open("https://discord.gg/Dd3cR2JXD8")}
            className="cursor-pointer hover:text-indigo-400 hover:scale-110 duration-200" />
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <p className="text-center mt-6 text-xs text-white/40 tracking-wide">
        © {new Date().getFullYear()} Arclane — Community Driven.
      </p>
    </footer>
  );
}
