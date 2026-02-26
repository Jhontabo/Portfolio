"use client";

import { motion } from "framer-motion";
import { Terminal, Server, Wrench } from "lucide-react";
import { skills } from "@/lib/data";

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

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-zinc-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Habilidades
          </h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, skillList], catIndex) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons];
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 p-6 bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-xl"
        >
          <h4 className="text-lg font-semibold text-white mb-2">
            🖥️ Mi Setup de Desarrollo
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
      </div>
    </section>
  );
}
