"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Download } from "lucide-react";
import { useLocale } from "./LocaleProvider";

export default function Hero() {
  const { t } = useLocale();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-24 pb-16 relative overflow-hidden dot-grid"
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse duration-[10000ms]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Left: Name, Role, Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight leading-[1.05]">
              Jhon <br className="hidden sm:block" />
              <span className="hypr-gradient-text font-black">Tajumbina</span>
            </h1>

            <p className="text-lg sm:text-2xl text-zinc-400 mb-8 font-medium font-mono">
              <span className="text-purple-400">&gt; </span>
              {t.hero.role}
            </p>

            {/* Glowing Buttons */}
            <div className="flex flex-wrap gap-4 mt-2">
              <motion.a
                href="#portfolio"
                className="flex items-center gap-2 glow-btn-cyan px-6 py-3 rounded-xl font-medium text-sm transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.hero.viewProjects}
                <ArrowRight size={16} />
              </motion.a>

              <motion.a
                href="/cv.pdf"
                download
                className="flex items-center gap-2 border border-white/10 hover:border-purple-500/40 text-zinc-300 hover:text-white px-6 py-3 rounded-xl font-medium text-sm transition-all bg-white/5 backdrop-blur-sm"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={16} />
                {t.hero.downloadCV}
              </motion.a>

              <motion.a
                href="https://github.com/Jhontabo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-white/10 hover:border-cyan-500/40 text-zinc-300 hover:text-white px-6 py-3 rounded-xl font-medium text-sm transition-all bg-white/5 backdrop-blur-sm"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail size={16} />
                {t.hero.contactMe}
              </motion.a>
            </div>
          </motion.div>

          {/* Right: Photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-cyan-400/30 shadow-[0_0_60px_rgba(34,211,238,0.15)] bg-zinc-900">
              <img
                src="/images/jhon.png"
                alt="Jhon Tajumbina"
                className="w-full h-full object-cover object-[center_10%]"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
