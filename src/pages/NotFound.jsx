export default function NotFound() {
  return (
    <div className="h-max w-full flex flex-col items-center justify-center text-white text-center p-6">
      <h1 className="text-7xl font-bold mb-4">404</h1>

      <p className="text-xl opacity-70">
        You wandered too far… even Google Maps can’t save you here.
      </p>

      <img
        src="https://media1.tenor.com/m/UX9HHGc0XzkAAAAd/bangdream-bandori.gif"
        alt="lost anime girl"
        className="w-72 my-6 rounded-xl border border-white/10"
      />

      <a
        href="/"
        className="px-6 py-3 mt-4 bg-white text-black rounded-xl hover:bg-gray-300 transition"
      >
        Take Me Home 😭
      </a>
    </div>
  );
}
