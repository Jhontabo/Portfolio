"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { navLinks, personalInfo } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
            {navLinks.slice(0, 4).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-zinc-500 hover:text-emerald-500 transition-colors text-sm"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
