export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#040406]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-zinc-500 font-mono text-sm animate-pulse">loading...</p>
      </div>
    </div>
  );
}
