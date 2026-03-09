"use client";

import { motion } from "framer-motion";
import { User, Code, Network } from "lucide-react";
import { useLocale } from "./LocaleProvider";

export default function About() {
  const { t } = useLocale();

  return (
    <section id="about" className="py-20 bg-slate-950/35">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t.about.title}
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
              <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-2xl bg-gradient-to-br from-emerald-500/25 to-cyan-400/10 p-1">
                <div className="w-full h-full rounded-2xl bg-slate-950/85 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center p-6">
                    <div className="w-40 h-40 mx-auto mb-4 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <User size={64} className="text-emerald-500" />
                    </div>
                    <p className="text-zinc-500 text-sm">
                      {t.about.yourPhoto}
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />
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
              {t.about.subtitle}
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              {t.about.description1}
            </p>
            <p className="text-zinc-400 leading-relaxed">
              {t.about.description2
                .replace("{networks}", t.about.networks)
                .replace("{auth}", t.about.auth)}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg">
                <Code className="text-emerald-500" size={24} />
                <span className="text-zinc-300">{t.about.webDev}</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg">
                <Network className="text-emerald-500" size={24} />
                <span className="text-zinc-300">{t.about.networksAuth}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
