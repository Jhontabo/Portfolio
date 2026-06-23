"use client";

import { Heart } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useLocale } from "./LocaleProvider";

export default function Footer() {
  const { t } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 bg-[#040406] border-t border-white/5 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2 text-zinc-500 text-sm font-mono justify-center">
            <span>© {currentYear}</span>
            <span className="text-zinc-400">{personalInfo.name}</span>
            <span className="text-zinc-600">|</span>
            <span className="flex items-center gap-1.5">
              {t.footer.madeWith} <Heart size={12} className="text-cyan-400 fill-cyan-400/20" />
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 justify-center">
            <a
              href="#home"
              className="text-zinc-500 hover:text-cyan-400 transition-colors text-xs font-mono"
            >
              # {t.nav.home.toLowerCase()}
            </a>
            <a
              href="#journey"
              className="text-zinc-500 hover:text-cyan-400 transition-colors text-xs font-mono"
            >
              # {t.nav.journey.toLowerCase()}
            </a>
            <a
              href="#portfolio"
              className="text-zinc-500 hover:text-cyan-400 transition-colors text-xs font-mono"
            >
              # {t.nav.portfolio.toLowerCase()}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
