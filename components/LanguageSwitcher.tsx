"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "./LocaleProvider";
import { ChevronDown } from "lucide-react";

const languages = [
  { code: "es" as const, name: "Español", flag: "🇨🇴" },
  { code: "en" as const, name: "English", flag: "🇺🇸" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-zinc-300 hover:text-emerald-500 transition-colors text-sm font-medium py-2 px-3 rounded-lg hover:bg-zinc-800/50"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="uppercase">{currentLang.code}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLocale(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-zinc-700 transition-colors ${
                locale === lang.code ? "bg-zinc-700/50" : ""
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="text-zinc-300 text-sm">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
