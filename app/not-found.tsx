import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#040406] px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6 text-zinc-600 font-mono">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-zinc-400 text-sm mb-8 font-mono">
          <span className="text-red-400">$</span> ls: cannot access &apos;page&apos;: No such file
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 rounded-xl font-mono text-sm hover:bg-cyan-500/20 transition-colors"
        >
          cd ~
        </Link>
      </div>
    </div>
  );
}
