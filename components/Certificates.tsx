"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar } from "lucide-react";
import { certificates } from "@/lib/data";
import { useLocale } from "./LocaleProvider";

export default function Certificates() {
  const { t } = useLocale();

  return (
    <section id="certificates" className="py-20 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t.certificates.title}
          </h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded" />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
      </div>
    </section>
  );
}
