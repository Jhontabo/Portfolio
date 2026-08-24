"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, Calendar, X } from "lucide-react";
import Image from "next/image";
import { certificates } from "@/lib/data";
import { useLocale } from "./LocaleProvider";

function getDriveId(link: string) {
  const match = link.match(/\/file\/d\/([^/]+)/);
  return match ? match[1] : null;
}

function getPreviewUrl(link: string) {
  const id = getDriveId(link);
  if (id) return `https://drive.google.com/file/d/${id}/preview`;
  return link;
}

function getThumbnailUrl(link: string) {
  const id = getDriveId(link);
  if (id) return `https://drive.google.com/thumbnail?id=${id}&sz=w800`;
  return null;
}

export default function Certificates() {
  const [previewCertId, setPreviewCertId] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const { t, locale } = useLocale();
  const INITIAL_COUNT = 4;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewCertId(null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const visibleCerts = showAll ? certificates : certificates.slice(0, INITIAL_COUNT);
  const hasMore = certificates.length > INITIAL_COUNT;

  return (
    <section id="certificates" className="py-16 sm:py-24 bg-zinc-900/30 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            <span className="hypr-gradient-text font-black">{t.certificates.title}</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded" />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {visibleCerts.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="tiling-window hover:active-purple flex flex-col group h-full"
            >
              {/* Window Header */}
              <div className="h-8 bg-zinc-950 px-4 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-1.5">
                  <span className="window-dot bg-[#ff5f56] w-2 h-2 rounded-full" />
                  <span className="window-dot bg-[#ffbd2e] w-2 h-2 rounded-full" />
                  <span className="window-dot bg-[#27c93f] w-2 h-2 rounded-full" />
                </div>
                <span className="text-[10px] font-mono text-zinc-500">cert_credential_{cert.id}.pdf</span>
                <div className="w-8" />
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2.5 bg-purple-500/10 rounded-lg shrink-0 border border-purple-300/15">
                    <Award className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                      {locale === "en" ? cert.nameEn ?? cert.name : cert.name}
                    </h3>
                    <p className="text-purple-400 text-xs sm:text-sm font-medium mt-0.5">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                {(() => {
                  const thumb = getThumbnailUrl(cert.link);
                  return thumb ? (
                    <div className="mb-4 rounded-lg overflow-hidden border border-purple-300/15">
                      <Image
                        src={thumb}
                        alt={cert.name}
                        width={400}
                        height={300}
                        className="w-full max-h-64 object-contain bg-zinc-900/50 rounded-lg"
                      />
                    </div>
                  ) : null;
                })()}

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  {cert.date ? (
                    <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-xs">
                      <Calendar size={13} />
                      <span>{cert.date}</span>
                    </div>
                  ) : <div />}
                  <button
                    onClick={() => setPreviewCertId(cert.id)}
                    className="flex items-center gap-1.5 text-xs font-mono text-purple-300 hover:text-purple-200 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    [view_doc]
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="font-mono text-xl px-12 py-4 rounded-xl border-2 border-purple-400 text-white bg-purple-500/20 hover:bg-purple-500/40 hover:border-purple-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all font-semibold"
            >
              {showAll ? t.certificates.showLess : t.certificates.showMore}
            </button>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewCertId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setPreviewCertId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[85vh] bg-zinc-900 rounded-xl border border-zinc-700 overflow-hidden flex flex-col"
            >
              <div className="h-10 bg-zinc-950 px-4 flex items-center justify-between border-b border-zinc-800 shrink-0">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-xs font-mono text-zinc-500">
                  {certificates.find((c) => c.id === previewCertId)?.name ?? "preview.pdf"}
                </span>
                <button
                  onClick={() => setPreviewCertId(null)}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex-1 bg-zinc-800">
                <iframe
                  src={getPreviewUrl(certificates.find((c) => c.id === previewCertId)?.link ?? "")}
                  className="w-full h-full"
                  allow="autoplay"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
