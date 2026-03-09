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
    { id: "projects", label: t.portfolio.tabs.projects, icon: Folder },
    { id: "certificates", label: t.portfolio.tabs.certificates, icon: Award },
    { id: "skills", label: t.portfolio.tabs.skills, icon: Terminal },
  ];

  const categoryLabels = {
    frontend: t.skills.frontend,
    backend: t.skills.backend,
    tools: t.skills.tools,
  };

  return (
    <section id="portfolio" className="py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
            {t.portfolio.title}
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-300/85 mb-6 sm:mb-8">
            {t.portfolio.subtitle}
          </p>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-emerald-400 to-sky-400 mx-auto rounded mb-6 sm:mb-8" />

          <div className="flex justify-start sm:justify-center gap-2 overflow-x-auto pb-2 sm:pb-0 px-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-xl transition-all whitespace-nowrap text-sm sm:text-base border ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-300/40 shadow-lg shadow-emerald-700/30"
                      : "bg-slate-900/70 text-zinc-300 border-white/10 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="section-shell bg-slate-950/85 border border-white/10 rounded-2xl overflow-hidden group backdrop-blur-sm"
                  >
                    <div className="h-36 sm:h-48 bg-slate-900 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-sky-400/10 to-transparent" />
                      <Folder className="w-9 h-9 sm:w-12 sm:h-12 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                    </div>

                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors line-clamp-1">
                        {locale === "en" ? project.nameEn ?? project.name : project.name}
                      </h3>
                      <p className="text-zinc-300/85 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                        {locale === "en"
                          ? project.descriptionEn ?? project.description
                          : project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 bg-white/5 border border-white/10 text-zinc-200 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4 sm:gap-3">
                        <a
                          href={project.demo}
                          className="flex items-center gap-2 text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
                        >
                          <ExternalLink size={16} />
                          Demo
                        </a>
                        <a
                          href={project.github}
                          className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors"
                        >
                          <Github size={16} />
                          GitHub
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {certificates.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="section-shell bg-slate-950/85 border border-white/10 rounded-2xl p-4 sm:p-6 group backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="p-2 sm:p-3 bg-emerald-500/15 rounded-lg shrink-0 border border-emerald-300/15">
                        <Award className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                          {locale === "en" ? cert.nameEn ?? cert.name : cert.name}
                        </h3>
                        <p className="text-emerald-300 text-xs sm:text-sm font-medium mt-1">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>

                    <p className="text-zinc-300/85 text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                      {locale === "en"
                        ? cert.descriptionEn ?? cert.description
                        : cert.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-zinc-400 text-xs sm:text-sm">
                        <Calendar size={14} />
                        <span>{cert.date}</span>
                      </div>
                      <a
                        href={cert.link}
                        className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {t.portfolio.viewCredential}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
                {Object.entries(skills).map(([category, skillList], catIndex) => {
                  const Icon =
                    categoryIcons[category as keyof typeof categoryIcons];

                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                      className="section-shell bg-slate-950/85 border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                        <div className="p-1.5 sm:p-2 bg-emerald-500/15 rounded-lg border border-emerald-300/15">
                          <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-300" />
                        </div>
                        <h3 className="text-base sm:text-xl font-semibold text-white">
                          {
                            categoryLabels[
                              category as keyof typeof categoryLabels
                            ]
                          }
                        </h3>
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        {skillList.map((skill, index) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: catIndex * 0.1 + index * 0.05,
                            }}
                            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                          >
                            <span className="text-base sm:text-xl shrink-0">
                              {skill.icon}
                            </span>
                            <span className="text-zinc-200 text-sm sm:text-base truncate">
                              {skill.name}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 sm:mt-12 p-4 sm:p-6 bg-gradient-to-r from-emerald-500/15 via-cyan-400/10 to-transparent border border-emerald-200/15 rounded-2xl"
              >
                <h4 className="text-base sm:text-lg font-semibold text-white mb-2">
                  {t.portfolio.setupTitle}
                </h4>
                <p className="text-zinc-200/85 text-sm sm:text-base">
                  {t.portfolio.setupDescription}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
