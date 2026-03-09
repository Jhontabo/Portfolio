"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Github, Mail, Send } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useLocale } from "./LocaleProvider";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { t } = useLocale();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t.contact.title}
          </h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white">
              {t.contact.subtitle}
            </h3>
            <p className="text-zinc-400">
              {t.contact.description}
            </p>

            <div className="space-y-4">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-slate-950/80 border border-white/10 rounded-xl hover:border-emerald-300/40 transition-colors group backdrop-blur-sm"
              >
                <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <Linkedin className="text-blue-500" size={24} />
                </div>
                <div>
                  <p className="text-white font-medium">LinkedIn</p>
                  <p className="text-zinc-400 text-sm">{t.contact.linkedinHint}</p>
                </div>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-slate-950/80 border border-white/10 rounded-xl hover:border-emerald-300/40 transition-colors group backdrop-blur-sm"
              >
                <div className="p-3 bg-zinc-800 rounded-lg group-hover:bg-zinc-700 transition-colors">
                  <Github className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-white font-medium">GitHub</p>
                  <p className="text-zinc-400 text-sm">{t.contact.githubHint}</p>
                </div>
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 p-4 bg-slate-950/80 border border-white/10 rounded-xl hover:border-emerald-300/40 transition-colors group backdrop-blur-sm"
              >
                <div className="p-3 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                  <Mail className="text-emerald-500" size={24} />
                </div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-zinc-500 text-sm">{personalInfo.email}</p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-4 bg-slate-950/80 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                {t.contact.subtitle}
              </h3>

              <div>
                <label className="block text-zinc-400 text-sm mb-2">
                  {t.contact.name}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder={t.contact.namePlaceholder}
                  required
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-sm mb-2">
                  {t.contact.email}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder={t.contact.emailPlaceholder}
                  required
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-sm mb-2">
                  {t.contact.message}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  placeholder={t.contact.messagePlaceholder}
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={18} />
                {t.contact.send}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
