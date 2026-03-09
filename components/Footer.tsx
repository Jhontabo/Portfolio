"use client";

import { Heart } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useLocale } from "./LocaleProvider";

export default function Footer() {
  const { t } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-slate-950/70 border-t border-white/10 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <span>© {currentYear}</span>
            <span>{personalInfo.name}</span>
            <span className="flex items-center gap-1">
              {t.footer.madeWith} <Heart size={14} className="text-emerald-400" />
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#home"
              className="text-zinc-500 hover:text-emerald-500 transition-colors text-sm"
            >
              {t.nav.home}
            </a>
            <a
              href="#about"
              className="text-zinc-500 hover:text-emerald-500 transition-colors text-sm"
            >
              {t.nav.about}
            </a>
            <a
              href="#journey"
              className="text-zinc-500 hover:text-emerald-500 transition-colors text-sm"
            >
              {t.nav.journey}
            </a>
            <a
              href="#portfolio"
              className="text-zinc-500 hover:text-emerald-500 transition-colors text-sm"
            >
              {t.nav.portfolio}
            </a>
            <a
              href="#contact"
              className="text-zinc-500 hover:text-emerald-500 transition-colors text-sm"
            >
              {t.nav.contact}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
