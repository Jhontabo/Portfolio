"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Code, Network } from "lucide-react";

export default function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <section id="about" className="py-20 bg-zinc-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Sobre mí
          </h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-zinc-800 p-1">
                <div className="w-full h-full rounded-2xl bg-zinc-900 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-40 h-40 mx-auto mb-4 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <User size={64} className="text-emerald-500" />
                    </div>
                    <p className="text-zinc-500 text-sm">
                      Tu foto aquí
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white">
              Estudiante de Ingeniería de Sistemas
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              Soy un desarrollador full-stack con experiencia en la creación de
              aplicaciones web modernas y escalables. Me especializo en el
              desarrollo tanto del frontend como del backend, utilizando
              tecnologías como React, Next.js, Express.js y Laravel.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Tengo un sólido dominio en el manejo de{" "}
              <span className="text-emerald-500 font-medium">redes</span> y{" "}
              <span className="text-emerald-500 font-medium">
                sistemas de autenticación
              </span>
              , incluyendo JWT, OAuth y implementación de APIs RESTful
              seguras.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-lg">
                <Code className="text-emerald-500" size={24} />
                <span className="text-zinc-300">Desarrollo Web</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-lg">
                <Network className="text-emerald-500" size={24} />
                <span className="text-zinc-300">Redes & Auth</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
