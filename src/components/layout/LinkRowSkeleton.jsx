export default function LinkRowSkeleton() {
  return (
    <div className="animate-pulse bg-white/5 border border-white/10 rounded-lg p-4">

      {/* Title + category */}
      <div className="flex justify-between">
        <div className="h-4 w-32 bg-white/10 rounded"></div>
        <div className="h-4 w-16 bg-white/10 rounded"></div>
      </div>

      {/* Description */}
      <div className="h-3 w-48 bg-white/10 rounded mt-3"></div>
      <div className="h-3 w-40 bg-white/10 rounded mt-2"></div>

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <div className="h-7 w-20 bg-white/10 rounded"></div>
        <div className="h-7 w-16 bg-white/10 rounded"></div>
      </div>

    </div>
  );
}
