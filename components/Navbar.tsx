"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useLocale } from "./LocaleProvider";
import LanguageSwitcher from "./LanguageSwitcher";

function GithubIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.journey, href: "#journey" },
    { name: t.nav.portfolio, href: "#portfolio" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-full max-w-5xl pointer-events-auto rounded-full transition-all duration-300 border backdrop-blur-md px-6 py-2 flex items-center justify-between relative shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${
          isScrolled
            ? "bg-[#0b0c10]/80 border-cyan-500/20 shadow-[0_10px_30px_rgba(0,229,208,0.05)]"
            : "bg-[#0b0c10]/40 border-white/5"
        }`}
      >
        <motion.a
          href="#home"
          className="flex items-center gap-1.5 font-mono text-sm sm:text-base font-semibold text-zinc-300 hover:text-white transition-colors"
          whileHover={{ scale: 1.03 }}
        >
          <span className="text-cyan-400">jt</span>
          <span className="text-zinc-500">@</span>
          <span className="text-purple-400 font-bold">arch</span>
          <span className="text-zinc-500 font-normal">~ $</span>
        </motion.a>

        {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {navItems.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-zinc-400 hover:text-cyan-400 transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors group"
            >
              <GithubIcon size={16} />
              <span className="text-xs group-hover:text-white">GitHub</span>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-zinc-400 hover:text-blue-400 transition-colors group"
            >
              <LinkedinIcon size={16} />
              <span className="text-xs group-hover:text-blue-400">LinkedIn</span>
            </a>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <LanguageSwitcher />
        </div>

        {/* Mobile menu trigger */}
        <button
          className="md:hidden text-zinc-300 p-1 hover:text-cyan-400 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile menu drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-4 right-4 mt-2 bg-[#0b0c10]/95 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-lg flex flex-col gap-4"
            >
              <ul className="flex flex-col gap-3 font-medium">
                {navItems.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="block py-2 text-zinc-300 hover:text-cyan-400 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                >
                  <GithubIcon size={16} />
                  <span className="text-xs">GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-zinc-400 hover:text-blue-400 transition-colors"
                >
                  <LinkedinIcon size={16} />
                  <span className="text-xs">LinkedIn</span>
                </a>
              </div>
              <div className="h-px bg-white/10 w-full" />
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 font-mono text-xs">select locale:</span>
                <LanguageSwitcher />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}

