"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-emerald-500 font-medium mb-4">
              Hola, soy
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
              {personalInfo.name}
            </h1>
            <p className="text-xl sm:text-2xl text-zinc-400 mb-6">
              {personalInfo.title}
            </p>
            <p className="text-zinc-500 mb-8 max-w-lg">
              Estudiante de Ingeniería de Sistemas con enfoque en desarrollo web.
              Buscando trabajar en entornos de habla inglesa.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#projects"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver proyectos
                <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="#contact"
                className="flex items-center gap-2 border border-zinc-700 hover:border-emerald-500 text-zinc-300 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={18} />
                Contactarme
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 flex items-center justify-center">
                <div className="w-64 h-64 sm:w-88 sm:h-88 rounded-full bg-zinc-900 border-2 border-emerald-500/30 flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <span className="text-5xl sm:text-6xl font-bold text-emerald-500">
                        JT
                      </span>
                    </div>
                    <p className="text-zinc-500 text-sm">
                      Foto profesional
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
