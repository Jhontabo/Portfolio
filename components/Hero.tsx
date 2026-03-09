"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Download } from "lucide-react";
import { useLocale } from "./LocaleProvider";

export default function Hero() {
  const { t } = useLocale();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-400/5" />
      <div className="absolute left-8 top-36 w-20 h-20 rounded-full border border-emerald-400/30 hidden lg:block" />
      <div className="absolute right-8 bottom-36 w-28 h-28 rounded-full border border-cyan-400/30 hidden lg:block" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="inline-flex items-center gap-2 text-emerald-300 bg-emerald-500/10 border border-emerald-400/20 px-4 py-1.5 rounded-full font-medium text-sm mb-5">
              {t.hero.greeting}
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              Jhon Tajumbina
            </h1>
            <p className="text-xl sm:text-2xl text-zinc-300 mb-6 font-medium">
              {t.hero.role}
            </p>
            <p className="text-zinc-400 mb-8 max-w-lg leading-relaxed">
              {t.hero.description}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <span className="text-xs sm:text-sm px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-zinc-200">
                {t.hero.availability}
              </span>
              <span className="text-xs sm:text-sm px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-zinc-200">
                {t.hero.location}
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#portfolio"
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-emerald-800/40"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.hero.viewProjects}
                <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="/cv.pdf"
                download
                className="flex items-center gap-2 border border-white/20 hover:border-emerald-400 text-zinc-200 hover:text-white px-6 py-3 rounded-xl font-medium transition-colors bg-white/5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={18} />
                {t.hero.downloadCV}
              </motion.a>
              <motion.a
                href="#contact"
                className="flex items-center gap-2 border border-white/20 hover:border-emerald-400 text-zinc-200 hover:text-white px-6 py-3 rounded-xl font-medium transition-colors bg-white/5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={18} />
                {t.hero.contactMe}
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative section-shell rounded-[2rem]">
              <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-[2rem] bg-gradient-to-br from-emerald-500/25 via-sky-400/15 to-transparent p-1">
                <div className="w-full h-full rounded-[1.8rem] bg-slate-950/80 backdrop-blur-xl border border-white/10 flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500/30 to-cyan-400/20 flex items-center justify-center">
                      <span className="text-5xl sm:text-6xl font-bold text-emerald-500">
                        JT
                      </span>
                    </div>
                    <p className="text-zinc-500 text-sm">
                      {t.hero.professionalPhoto}
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-cyan-400/20 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
