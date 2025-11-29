export default function SectionSkeleton() {
  return (
    <div className="break-inside-avoid-column bg-black/30 border border-white/10 rounded-xl p-4 animate-pulse">
      <div className="h-5 w-40 bg-white/10 rounded mb-4"></div>

      <div className="space-y-3">
        <div className="h-20 bg-white/5 rounded-lg"></div>
        <div className="h-20 bg-white/5 rounded-lg"></div>
        <div className="h-20 bg-white/5 rounded-lg"></div>
      </div>
    </div>
  );
}
