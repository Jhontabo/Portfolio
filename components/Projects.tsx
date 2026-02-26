"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Folder } from "lucide-react";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Proyectos
          </h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded" />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
      </div>
    </section>
  );
}
