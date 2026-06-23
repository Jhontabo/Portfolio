"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  Folder,
  Award,
  Calendar,
  Terminal,
  Server,
  Wrench,
  Monitor,
} from "lucide-react";
import { projects, certificates, skills } from "@/lib/data";
import { useLocale } from "./LocaleProvider";

const categoryIcons = {
  frontend: Terminal,
  backend: Server,
  tools: Wrench,
};

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState("projects");
  const { t, locale } = useLocale();

  const tabs = [
    { id: "projects", label: t.portfolio.tabs.projects, icon: Folder, ws: "ws-1" },
    { id: "certificates", label: t.portfolio.tabs.certificates, icon: Award, ws: "ws-2" },
    { id: "skills", label: t.portfolio.tabs.skills, icon: Terminal, ws: "ws-3" },
  ];

  const categoryLabels = {
    frontend: t.skills.frontend,
    backend: t.skills.backend,
    tools: t.skills.tools,
  };

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

          {/* Workspace Switcher Tabs */}
          <div className="flex justify-start sm:justify-center gap-3 overflow-x-auto pb-3 sm:pb-0 px-1 select-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all whitespace-nowrap text-sm font-mono border ${
                    isActive
                      ? "bg-cyan-500/10 text-white border-cyan-400/40 shadow-[0_0_15px_rgba(0,229,208,0.1)]"
                      : "bg-zinc-900/40 text-zinc-400 border-white/5 hover:bg-zinc-800/40 hover:text-zinc-200"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-cyan-400 animate-pulse" : "bg-zinc-600"}`} />
                  <span className="text-zinc-500 text-xs">{tab.ws}:</span>
                  <Icon size={14} className={isActive ? "text-cyan-400" : "text-zinc-550"} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
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
                          className="flex items-center gap-1.5 text-xs font-mono text-cyan-300 hover:text-cyan-200 transition-colors"
                        >
                          <ExternalLink size={14} />
                          [live_demo]
                        </a>
                        <a
                          href={project.github}
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
            </motion.div>
          )}

          {activeTab === "certificates" && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <div className="grid sm:grid-cols-2 gap-6">
                {certificates.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="tiling-window hover:active-purple flex flex-col group h-full"
                  >
                    {/* Window Header */}
                    <div className="h-8 bg-zinc-950 px-4 flex items-center justify-between border-b border-white/5">
                      <div className="flex gap-1.5">
                        <span className="window-dot bg-[#ff5f56] w-2 h-2 rounded-full" />
                        <span className="window-dot bg-[#ffbd2e] w-2 h-2 rounded-full" />
                        <span className="window-dot bg-[#27c93f] w-2 h-2 rounded-full" />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500">cert_credential_{cert.id}.pdf</span>
                      <div className="w-8" />
                    </div>

                    <div className="p-5 sm:p-6 flex-1 flex flex-col">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-2.5 bg-purple-500/10 rounded-lg shrink-0 border border-purple-300/15">
                          <Award className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                            {locale === "en" ? cert.nameEn ?? cert.name : cert.name}
                          </h3>
                          <p className="text-purple-400 text-xs sm:text-sm font-medium mt-0.5">
                            {cert.issuer}
                          </p>
                        </div>
                      </div>

                      <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
                        {locale === "en" ? cert.descriptionEn ?? cert.description : cert.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-xs">
                          <Calendar size={13} />
                          <span>{cert.date}</span>
                        </div>
                        <a
                          href={cert.link}
                          className="flex items-center gap-1.5 text-xs font-mono text-purple-300 hover:text-purple-200 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          [view_doc]
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <div className="grid gap-6 md:grid-cols-3">
                {Object.entries(skills).map(([category, skillList], catIndex) => {
                  const Icon = categoryIcons[category as keyof typeof categoryIcons];

                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: catIndex * 0.08 }}
                      className="tiling-window hover:active-cyan flex flex-col"
                    >
                      {/* Window Header */}
                      <div className="h-8 bg-zinc-950 px-4 flex items-center justify-between border-b border-white/5">
                        <div className="flex gap-1.5">
                          <span className="window-dot bg-[#ff5f56] w-2 h-2 rounded-full" />
                          <span className="window-dot bg-[#ffbd2e] w-2 h-2 rounded-full" />
                          <span className="window-dot bg-[#27c93f] w-2 h-2 rounded-full" />
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500">skills_{category}.yaml</span>
                        <div className="w-8" />
                      </div>

                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-300/15">
                            <Icon className="w-5 h-5 text-cyan-300" />
                          </div>
                          <h3 className="text-base sm:text-lg font-semibold text-white">
                            {categoryLabels[category as keyof typeof categoryLabels]}
                          </h3>
                        </div>

                        <div className="space-y-2.5">
                          {skillList.map((skill, index) => (
                            <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: catIndex * 0.08 + index * 0.04,
                              }}
                              className="flex items-center gap-3 p-2.5 bg-zinc-900/50 border border-white/5 rounded-lg hover:border-cyan-500/20 transition-all"
                            >
                              <span className="text-base shrink-0 select-none">
                                {skill.icon}
                              </span>
                              <span className="text-zinc-300 font-mono text-sm truncate">
                                {skill.name}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Dev Setup terminal block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mt-8 tiling-window active-cyan flex flex-col"
              >
                {/* Window Header */}
                <div className="h-8 bg-zinc-950 px-4 flex items-center justify-between border-b border-white/5">
                  <div className="flex gap-1.5">
                    <span className="window-dot bg-[#ff5f56] w-2 h-2 rounded-full" />
                    <span className="window-dot bg-[#ffbd2e] w-2 h-2 rounded-full" />
                    <span className="window-dot bg-[#27c93f] w-2 h-2 rounded-full" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1.5">
                    <Monitor size={10} className="text-cyan-400" />
                    setup_info.sh
                  </span>
                  <div className="w-8" />
                </div>

                <div className="p-5 sm:p-6 font-mono text-sm leading-relaxed bg-[#0b0c10]/95">
                  <div className="flex items-center gap-2 mb-2 text-cyan-300 font-bold">
                    <span>$</span>
                    <span>cat setup_profile.md</span>
                  </div>
                  <h4 className="text-white font-bold mb-2 text-base">
                    {t.portfolio.setupTitle}
                  </h4>
                  <p className="text-zinc-400">
                    {t.portfolio.setupDescription}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
