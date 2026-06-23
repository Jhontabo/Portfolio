"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Download, Terminal as TermIcon, FileCode, Monitor } from "lucide-react";
import { useLocale } from "./LocaleProvider";
import { useState } from "react";

export default function Hero() {
  const { t } = useLocale();
  const [activeWindow, setActiveWindow] = useState<"terminal" | "editor" | "status">("editor");

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-24 pb-16 relative overflow-hidden dot-grid"
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse duration-[10000ms]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Text and Actions (Left side) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col text-left justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 text-xs font-mono mb-6 w-max">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>jt@archlinux ~ % uptime: 365 days</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight leading-[1.05]">
              Jhon <br className="hidden sm:block" />
              <span className="hypr-gradient-text font-black">Tajumbina</span>
            </h1>

            <p className="text-lg sm:text-2xl text-zinc-400 mb-8 font-medium font-mono">
              <span className="text-purple-400">&gt; </span>
              {t.hero.role}
            </p>

            {/* Glowing Buttons */}
            <div className="flex flex-wrap gap-4 mt-2">
              <motion.a
                href="#portfolio"
                className="flex items-center gap-2 glow-btn-cyan px-6 py-3 rounded-xl font-medium text-sm transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.hero.viewProjects}
                <ArrowRight size={16} />
              </motion.a>

              <motion.a
                href="/cv.pdf"
                download
                className="flex items-center gap-2 border border-white/10 hover:border-purple-500/40 text-zinc-300 hover:text-white px-6 py-3 rounded-xl font-medium text-sm transition-all bg-white/5 backdrop-blur-sm"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={16} />
                {t.hero.downloadCV}
              </motion.a>

              <motion.a
                href="#contact"
                className="flex items-center gap-2 border border-white/10 hover:border-cyan-500/40 text-zinc-300 hover:text-white px-6 py-3 rounded-xl font-medium text-sm transition-all bg-white/5 backdrop-blur-sm"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail size={16} />
                {t.hero.contactMe}
              </motion.a>
            </div>
          </motion.div>

          {/* Tiling Window Manager Simulation (Right side) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 grid grid-cols-12 gap-4 h-[420px] relative pointer-events-auto"
          >
            {/* Editor Window (Neovim / NvChad style) */}
            <div
              onClick={() => setActiveWindow("editor")}
              className={`col-span-12 md:col-span-7 h-[220px] tiling-window cursor-pointer flex flex-col ${
                activeWindow === "editor" ? "active-cyan" : ""
              }`}
            >
              <div className="h-8 bg-zinc-950 px-4 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-1.5">
                  <span className="window-dot bg-[#ff5f56] w-2.5 h-2.5 rounded-full" />
                  <span className="window-dot bg-[#ffbd2e] w-2.5 h-2.5 rounded-full" />
                  <span className="window-dot bg-[#27c93f] w-2.5 h-2.5 rounded-full" />
                </div>
                <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                  <FileCode size={11} className="text-cyan-400" />
                  init.lua
                </span>
                <div className="w-12" />
              </div>
              <div className="p-4 flex-1 font-mono text-[11px] text-zinc-300 overflow-y-auto leading-relaxed bg-[#0b0c10]/90">
                <span className="text-zinc-500">1</span> <span className="text-pink-400">local</span> dev = &#123;<br />
                <span className="text-zinc-500">2</span>   name = <span className="text-emerald-300">&quot;Jhon Tajumbina&quot;</span>,<br />
                <span className="text-zinc-500">3</span>   stack = &#123; <span className="text-cyan-300">&quot;React&quot;</span>, <span className="text-cyan-300">&quot;Laravel&quot;</span>, <span className="text-cyan-300">&quot;Express&quot;</span> &#125;,<br />
                <span className="text-zinc-500">4</span>   setup = <span className="text-purple-400">&quot;Arch Linux + BSPWM&quot;</span><br />
                <span className="text-zinc-500">5</span> &#125;<br />
                <span className="text-zinc-500">6</span> <span className="text-pink-400">function</span> dev:code()<br />
                <span className="text-zinc-500">7</span>   print(<span className="text-emerald-300">&quot;Building awesome projects!&quot;</span>)<br />
                <span className="text-zinc-500">8</span> <span className="text-pink-400">end</span>
              </div>
            </div>

            {/* Terminal Window (Fastfetch style) */}
            <div
              onClick={() => setActiveWindow("terminal")}
              className={`col-span-12 md:col-span-5 h-[220px] tiling-window cursor-pointer flex flex-col ${
                activeWindow === "terminal" ? "active-purple" : ""
              }`}
            >
              <div className="h-8 bg-zinc-950 px-4 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-1.5">
                  <span className="window-dot bg-[#ff5f56] w-2.5 h-2.5 rounded-full" />
                  <span className="window-dot bg-[#ffbd2e] w-2.5 h-2.5 rounded-full" />
                  <span className="window-dot bg-[#27c93f] w-2.5 h-2.5 rounded-full" />
                </div>
                <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                  <TermIcon size={11} className="text-purple-400" />
                  fastfetch
                </span>
                <div className="w-12" />
              </div>
              <div className="p-4 flex-1 font-mono text-[10px] text-zinc-300 overflow-y-auto leading-relaxed bg-[#0b0c10]/95 flex items-start gap-3">
                <div className="text-cyan-400 font-bold leading-none select-none">
                  &nbsp;&nbsp;/\<br />
                  &nbsp;/\/\<br />
                  /\/\/\<br />
                  \/&nbsp;&nbsp;\/<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div className="flex-1">
                  <span className="text-cyan-300 font-bold">jt</span>@<span className="text-cyan-300 font-bold">arch</span><br />
                  <span className="text-zinc-500">----------</span><br />
                  <span className="text-purple-300">OS</span>: Arch Linux x86_64<br />
                  <span className="text-purple-300">WM</span>: BSPWM<br />
                  <span className="text-purple-300">Shell</span>: zsh<br />
                  <span className="text-purple-300">Editor</span>: NvChad<br />
                  <span className="text-purple-300">Theme</span>: Hypr-Nordic
                </div>
              </div>
            </div>

            {/* Performance status or project metrics window */}
            <div
              onClick={() => setActiveWindow("status")}
              className={`col-span-12 h-[180px] tiling-window cursor-pointer flex flex-col ${
                activeWindow === "status" ? "active-blue" : ""
              }`}
            >
              <div className="h-8 bg-zinc-950 px-4 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-1.5">
                  <span className="window-dot bg-[#ff5f56] w-2.5 h-2.5 rounded-full" />
                  <span className="window-dot bg-[#ffbd2e] w-2.5 h-2.5 rounded-full" />
                  <span className="window-dot bg-[#27c93f] w-2.5 h-2.5 rounded-full" />
                </div>
                <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                  <Monitor size={11} className="text-emerald-400" />
                  system-monitor
                </span>
                <div className="w-12" />
              </div>
              <div className="p-4 flex-1 font-mono text-xs text-zinc-400 bg-[#0b0c10]/90 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                <div className="flex flex-col gap-1 border-r border-white/5 pr-4">
                  <span className="text-[10px] uppercase text-zinc-500 font-bold">CPU Usage</span>
                  <span className="text-white font-bold text-lg">12.5%</span>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: "12.5%" }} />
                  </div>
                </div>
                <div className="flex flex-col gap-1 border-r border-white/5 pr-4">
                  <span className="text-[10px] uppercase text-zinc-500 font-bold">RAM Memory</span>
                  <span className="text-white font-bold text-lg">4.2 / 16 GB</span>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-purple-400 h-full rounded-full" style={{ width: "26.25%" }} />
                  </div>
                </div>
                <div className="flex flex-col gap-1 border-r border-white/5 pr-4">
                  <span className="text-[10px] uppercase text-zinc-500 font-bold">Disk Space</span>
                  <span className="text-white font-bold text-lg">182 / 512 GB</span>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: "35.5%" }} />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase text-zinc-500 font-bold">Workspace focused</span>
                  <span className="text-cyan-400 font-bold text-lg flex items-center gap-1.5">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                    ws-1: coding
                  </span>
                  <span className="text-[9px] text-zinc-500">Active layout: BSPWM tiling</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

