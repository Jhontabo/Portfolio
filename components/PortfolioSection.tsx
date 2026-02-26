"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Folder, Award, Calendar, Terminal, Server, Wrench } from "lucide-react";
import { projects, certificates, skills } from "@/lib/data";

const tabs = [
  { id: "projects", label: "Proyectos", icon: Folder },
  { id: "certificates", label: "Certificados", icon: Award },
  { id: "skills", label: "Habilidades", icon: Terminal },
];

const categoryIcons = {
  frontend: Terminal,
  backend: Server,
  tools: Wrench,
};

const categoryLabels = {
  frontend: "Frontend",
  backend: "Backend",
  tools: "Herramientas",
};

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <section id="portfolio" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Portafolio
          </h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded mb-8" />

          <div className="flex justify-center gap-2 flex-wrap">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? "bg-emerald-500 text-white"
                      : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
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
              <div className="grid sm:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-colors group"
                  >
                    <div className="h-48 bg-zinc-800 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
                      <Folder size={48} className="text-zinc-600 group-hover:text-emerald-500 transition-colors" />
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-500 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-zinc-400 text-sm mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 bg-zinc-800 text-zinc-300 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <a
                          href={project.demo}
                          className="flex items-center gap-2 text-sm text-emerald-500 hover:text-emerald-400 transition-colors"
                        >
                          <ExternalLink size={16} />
                          Demo
                        </a>
                        <a
                          href={project.github}
                          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
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
              <div className="grid sm:grid-cols-2 gap-6">
                {certificates.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-emerald-500/50 transition-colors group"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-emerald-500/10 rounded-lg">
                        <Award size={28} className="text-emerald-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white group-hover:text-emerald-500 transition-colors">
                          {cert.name}
                        </h3>
                        <p className="text-emerald-500 text-sm font-medium">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>

                    <p className="text-zinc-400 text-sm mb-4">
                      {cert.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-zinc-500 text-sm">
                        <Calendar size={14} />
                        <span>{cert.date}</span>
                      </div>
                      <a
                        href={cert.link}
                        className="flex items-center gap-2 text-sm text-emerald-500 hover:text-emerald-400 transition-colors"
                      >
                        <ExternalLink size={16} />
                        Ver certificado
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
              <div className="grid md:grid-cols-3 gap-8">
                {Object.entries(skills).map(([category, skillList], catIndex) => {
                  const Icon = categoryIcons[category as keyof typeof categoryIcons];
                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                      className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                          <Icon className="text-emerald-500" size={24} />
                        </div>
                        <h3 className="text-xl font-semibold text-white">
                          {categoryLabels[category as keyof typeof categoryLabels]}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {skillList.map((skill, index) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: catIndex * 0.1 + index * 0.05,
                            }}
                            className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors"
                          >
                            <span className="text-xl">{skill.icon}</span>
                            <span className="text-zinc-300">{skill.name}</span>
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
                className="mt-12 p-6 bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-xl"
              >
                <h4 className="text-lg font-semibold text-white mb-2">
                  Mi Setup de Desarrollo
                </h4>
                <p className="text-zinc-400">
                  <span className="text-emerald-500 font-medium">Linux Arch</span>{" "}
                  con{" "}
                  <span className="text-emerald-500 font-medium">BSPWM</span> como
                  window manager y{" "}
                  <span className="text-emerald-500 font-medium">NvChad</span> como
                  editor de código. Todo potencializado con{" "}
                  <span className="text-emerald-500 font-medium">WSL</span> para
                  entornos Windows.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
