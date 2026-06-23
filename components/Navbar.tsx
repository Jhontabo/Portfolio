"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Linkedin, Github } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useLocale } from "./LocaleProvider";
import LanguageSwitcher from "./LanguageSwitcher";

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
        className={`w-full max-w-5xl pointer-events-auto rounded-full transition-all duration-300 border backdrop-blur-md px-6 py-2 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${
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
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-blue-400 transition-colors"
            >
              <Linkedin size={18} />
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
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <Github size={18} />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-blue-400 transition-colors"
                >
                  <Linkedin size={18} />
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

