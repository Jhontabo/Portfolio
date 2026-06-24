"use client";

import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Folder,
} from "lucide-react";
import { projects } from "@/lib/data";
import { useLocale } from "./LocaleProvider";

export default function PortfolioSection() {
  const { t, locale } = useLocale();

  return (
    <section id="portfolio" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            <span className="hypr-gradient-text font-black">{t.portfolio.title}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-400 mb-8">
            {t.portfolio.subtitle}
          </p>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded mb-8" />
        </motion.div>

        {/* Projects Content */}
        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="tiling-window hover:active-cyan flex flex-col group h-full"
            >
              {/* Window Header */}
              <div className="h-8 bg-zinc-950 px-4 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-1.5">
                  <span className="window-dot bg-[#ff5f56] w-2 h-2 rounded-full" />
                  <span className="window-dot bg-[#ffbd2e] w-2 h-2 rounded-full" />
                  <span className="window-dot bg-[#27c93f] w-2 h-2 rounded-full" />
                </div>
                <span className="text-[10px] font-mono text-zinc-500">project_record_{project.id}.json</span>
                <div className="w-8" />
              </div>

              <div className="h-32 sm:h-40 bg-zinc-900/60 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent" />
                <Folder className="w-10 h-10 text-zinc-600 group-hover:text-cyan-400 transition-colors duration-300" />
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {locale === "en" ? project.nameEn ?? project.name : project.name}
                </h3>
                <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
                  {locale === "en" ? project.descriptionEn ?? project.description : project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 bg-zinc-900 border border-white/5 text-zinc-400 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-2 border-t border-white/5">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono text-cyan-300 hover:text-cyan-200 transition-colors"
                  >
                    <ExternalLink size={14} />
                    [live_demo]
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                  >
                    <Github size={14} />
                    [src_code]
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
