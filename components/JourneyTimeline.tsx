"use client";

import { motion } from "framer-motion";
import { CalendarDays, GraduationCap, Microscope, Stethoscope, Github } from "lucide-react";
import { journeyTimeline, personalInfo } from "@/lib/data";
import { useLocale } from "./LocaleProvider";

export default function JourneyTimeline() {
  const { locale, t } = useLocale();

  const icons = [GraduationCap, Stethoscope, Microscope, CalendarDays];

  return (
    <section id="journey" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            <span className="hypr-gradient-text-purple font-black">{t.journey.title}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-zinc-400">{t.journey.subtitle}</p>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded mt-6" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-cyan-500/30 to-transparent sm:-translate-x-1/2" />

          <div className="space-y-8">
            {journeyTimeline.map((item, index) => {
              const Icon = icons[index % icons.length];
              const isLeft = index % 2 === 0;

              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className={`relative sm:w-[calc(50%-1.5rem)] ${isLeft ? "sm:mr-auto" : "sm:ml-auto"}`}
                >
                  <div className="absolute left-4 top-6 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_0_6px_rgba(0,229,208,0.15)] sm:left-auto sm:right-[-1.72rem] sm:top-10 sm:w-3.5 sm:h-3.5" />

                  <div className="ml-10 sm:ml-0 tiling-window hover:active-purple flex flex-col">
                    <div className="h-8 bg-zinc-950 px-4 flex items-center justify-between border-b border-white/5">
                      <div className="flex gap-1.5">
                        <span className="window-dot bg-[#ff5f56] w-2 h-2 rounded-full" />
                        <span className="window-dot bg-[#ffbd2e] w-2 h-2 rounded-full" />
                        <span className="window-dot bg-[#27c93f] w-2 h-2 rounded-full" />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500">journey_step_{item.id}.sh</span>
                      <div className="w-8" />
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-3 mb-3 text-cyan-300">
                        <span className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-300/20">
                          <Icon size={18} />
                        </span>
                        <span className="text-sm font-medium uppercase tracking-wide font-mono">
                          {locale === "en" ? item.dateEn : item.dateEs}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                        {locale === "en" ? item.titleEn : item.titleEs}
                      </h3>
                      <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                        {locale === "en" ? item.descriptionEn : item.descriptionEs}
                      </p>

                      {(item.linkType === "github" || item.link) && (
                        <a
                          href={item.link || personalInfo.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={t.journey.githubProfile}
                          className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 transition-colors"
                        >
                          <Github size={16} />
                          {t.journey.viewGithub}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
