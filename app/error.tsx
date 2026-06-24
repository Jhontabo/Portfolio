"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#040406] px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6 text-red-400/80">!</div>
        <h1 className="text-2xl font-bold text-white mb-3">Something went wrong</h1>
        <p className="text-zinc-400 text-sm mb-8 font-mono">
          <span className="text-red-400">$</span> error: unexpected crash
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 rounded-xl font-mono text-sm hover:bg-cyan-500/20 transition-colors"
        >
          try again
        </button>
      </div>
    </div>
  );
}
