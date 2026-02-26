"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useLocale } from "./LocaleProvider";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2024);
  const [mounted, setMounted] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    setMounted(true);
    setCurrentYear(new Date().getFullYear());
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <footer className="py-8 bg-zinc-900/80 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-zinc-500">
            <span>© {currentYear}</span>
            <span>{personalInfo.name}</span>
            <span className="flex items-center gap-1">
              Hecho con <Heart size={14} className="text-emerald-500" />
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
