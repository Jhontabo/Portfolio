"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, GraduationCap, Stethoscope, Github } from "lucide-react";
import { journeyTimeline, personalInfo } from "@/lib/data";
import { useLocale } from "./LocaleProvider";

export default function JourneyTimeline() {
  const { locale, t } = useLocale();
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const icons = [GraduationCap, Stethoscope, CalendarDays];
  const branchColors = ["#00a8f4", "#a855f7", "#00e5d0"];

  return (
    <section id="journey" className="py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            <span className="hypr-gradient-text-purple font-black">{t.journey.title}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-zinc-400">{t.journey.subtitle}</p>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded mt-6" />
        </motion.div>

        <div className="relative">
          {/* Central trunk */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-400/50 via-purple-500/50 to-cyan-400/50 hidden md:block" />

          <div className="space-y-8 md:space-y-16">
            {journeyTimeline.map((item, index) => {
              const Icon = icons[index % icons.length];
              const color = branchColors[index % branchColors.length];
              const isLeft = index % 2 === 0;
              const isExpanded = !!expanded[item.id];

              const BubbleCircle = () => (
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  onClick={() => !isExpanded && setExpanded((prev) => ({ ...prev, [item.id]: true }))}
                  className="cursor-pointer select-none"
                >
                  {isExpanded ? (
                    /* Expanded: rectangular card */
                    <div
                      className="tiling-window p-5"
                      style={{
                        borderColor: `${color}60`,
                        boxShadow: `0 0 25px ${color}25`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 border rounded-md"
                          style={{ color, borderColor: `${color}30`, backgroundColor: `${color}10` }}
                        >
                          {locale === "en" ? item.dateEn : item.dateEs}
                        </span>
                        <div className="flex gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                          <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                          <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {locale === "en" ? item.titleEn : item.titleEs}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                        {locale === "en" ? item.descriptionEn : item.descriptionEs}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        {(item.linkType === "github" || item.link) && (
                          <a
                            href={item.link || personalInfo.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[10px] font-mono text-cyan-300 hover:text-cyan-200 transition-colors"
                          >
                            <Github size={12} />
                            <span>[view_repo]</span>
                          </a>
                        )}
                        <div />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpanded((prev) => ({ ...prev, [item.id]: false }));
                          }}
                          className="text-[10px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                          [close]
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Collapsed: circle bubble with neon hover */
                    <div
                      className="group w-48 sm:w-56 h-48 sm:h-56 rounded-full flex flex-col items-center justify-center p-4 sm:p-6 text-center border-2 transition-all duration-500 hover:scale-105 bg-[#0b0c10]/90 cursor-pointer"
                      style={{
                        borderColor: `${color}60`,
                        boxShadow: `0 0 20px ${color}20, 0 8px 30px rgba(0,0,0,0.5)`,
                        transition: "all 0.4s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = color;
                        e.currentTarget.style.boxShadow = `0 0 30px ${color}60, 0 0 60px ${color}30, 0 8px 30px rgba(0,0,0,0.5)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = `${color}60`;
                        e.currentTarget.style.boxShadow = `0 0 20px ${color}20, 0 8px 30px rgba(0,0,0,0.5)`;
                      }}
                    >
                      <div
                        className="p-3 rounded-full border mb-3 flex items-center justify-center transition-all duration-400 group-hover:scale-110"
                        style={{ borderColor: `${color}30`, backgroundColor: `${color}10` }}
                      >
                        <Icon size={20} style={{ color }} />
                      </div>
                      <span
                        className="text-sm font-bold font-mono mb-1 transition-all duration-400"
                        style={{ color }}
                      >
                        {locale === "en" ? item.dateEn : item.dateEs}
                      </span>
                      <h3 className="text-sm font-semibold text-zinc-200 mb-3 leading-tight line-clamp-2 max-w-[20ch]">
                        {locale === "en" ? item.titleEn : item.titleEs}
                      </h3>
                      <span
                        className="text-[10px] font-mono uppercase tracking-widest font-semibold transition-all duration-400 group-hover:tracking-[0.15em]"
                        style={{ color }}
                      >
                        {locale === "en" ? "Read more" : "Leer más"}
                      </span>
                    </div>
                  )}
                </motion.div>
              );

              return (
                <div key={item.id} className="relative">
                  {/* Desktop */}
                  <div className="hidden md:flex items-center justify-center">
                    {isLeft ? (
                      <>
                        <div className="flex-[0_0_calc(50%-32px)] flex justify-end pr-10">
                          <BubbleCircle />
                        </div>
                        <div className="shrink-0 w-16 flex justify-center relative z-10">
                          <div
                            className="w-4 h-4 rounded-full border-2 bg-[#040406]"
                            style={{ borderColor: color, boxShadow: `0 0 12px ${color}80` }}
                          />
                        </div>
                        <div className="flex-[0_0_calc(50%-32px)]" />
                      </>
                    ) : (
                      <>
                        <div className="flex-[0_0_calc(50%-32px)]" />
                        <div className="shrink-0 w-16 flex justify-center relative z-10">
                          <div
                            className="w-4 h-4 rounded-full border-2 bg-[#040406]"
                            style={{ borderColor: color, boxShadow: `0 0 12px ${color}80` }}
                          />
                        </div>
                        <div className="flex-[0_0_calc(50%-32px)] flex justify-start pl-10">
                          <BubbleCircle />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Mobile */}
                  <div className="flex md:hidden items-start gap-4">
                    <div className="flex flex-col items-center shrink-0">
                      <div
                        className="w-3.5 h-3.5 rounded-full border-2 shrink-0"
                        style={{ borderColor: color, boxShadow: `0 0 8px ${color}60` }}
                      />
                      {index < journeyTimeline.length - 1 && (
                        <div className="w-0.5 flex-1 bg-gradient-to-b from-cyan-400/40 to-transparent" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <BubbleCircle />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
