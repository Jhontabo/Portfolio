"use client";

import { useEffect, useRef, useState } from "react";

function CMatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const columns = Math.floor(canvas.offsetWidth / 14);
    const drops: number[] = Array(columns).fill(1);
    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789<>/{}[]|&^%$#@!";

    function draw() {
      if (!ctx) return;
      ctx.fillStyle = "rgba(11, 12, 16, 0.05)";
      ctx.fillRect(0, 0, canvas!.offsetWidth, canvas!.offsetHeight);

      ctx.font = "12px monospace";

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 14;
        const y = drops[i] * 14;

        ctx.fillStyle = i % 2 === 0 ? "#00ff41" : "#00cc33";
        ctx.fillText(char, x, y);

        if (y > canvas!.offsetHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-b-lg"
    />
  );
}

const packages = [
  "linux-zen", "nvidia-dkms", "hyprland-git", "waybar-hyprland", "wofi",
  "dunst", "kitty", "neovim", "zsh", "starship",
  "firefox-developer-edition", "thunderbird", "vlc", "gimp",
  "nodejs-lts-iron", "npm", "rustup", "base-devel", "git", "htop",
];

function PacmanInstall() {
  const [batch, setBatch] = useState(0);
  const [progresses, setProgresses] = useState<number[]>([0, 0, 0, 0, 0]);
  const [phase, setPhase] = useState<"resolving" | "installing" | "done">("resolving");
  const [pacOpen, setPacOpen] = useState(true);
  const batchSize = 5;

  // Pac-Man mouth animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPacOpen((p) => !p);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Installation flow
  useEffect(() => {
    if (phase === "resolving") {
      const t = setTimeout(() => setPhase("installing"), 1200);
      return () => clearTimeout(t);
    }
    if (phase === "done") {
      const t = setTimeout(() => {
        setBatch(0);
        setProgresses([0, 0, 0, 0, 0]);
        setPhase("resolving");
      }, 3500);
      return () => clearTimeout(t);
    }

    const start = batch * batchSize;
    if (start >= packages.length) {
      setTimeout(() => setPhase("done"), 0);
      return;
    }

    const interval = setInterval(() => {
      setProgresses((prev) => {
        const next = [...prev];
        let allDone = true;
        for (let i = 0; i < batchSize; i++) {
          const idx = start + i;
          if (idx >= packages.length) break;
          if (next[i] < 100) {
            next[i] = Math.min(100, next[i] + Math.random() * 15 + 5);
            if (next[i] < 100) allDone = false;
          }
        }
        if (allDone) {
          setBatch((b) => b + 1);
          return [0, 0, 0, 0, 0];
        }
        return next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [phase, batch]);

  const pacChar = pacOpen ? "C" : "c";

  function renderProgressBar(pct: number) {
    const barLen = 20;
    const filled = Math.floor((pct / 100) * barLen);
    const pacPos = Math.min(filled, barLen - 1);

    let bar = "";
    for (let i = 0; i < barLen; i++) {
      if (i < pacPos) bar += "#";
      else if (i === pacPos) bar += pacChar;
      else bar += "-";
    }

    return `[${bar}] ${pct.toFixed(0)}%`;
  }

  const start = batch * batchSize;
  const batchPackages = packages.slice(start, start + batchSize);

  return (
    <div className="p-3 font-mono text-[10px] bg-[#0b0c10]/95 min-h-[240px] overflow-hidden">
      <p className="text-cyan-300 mb-2">
        <span className="text-purple-400">❯</span> sudo pacman -S full-stack-dev-env
      </p>

      {phase === "resolving" && (
        <div className="space-y-1.5">
          <p className="text-zinc-400 animate-pulse">
            resolving dependencies...
          </p>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
          <p className="text-zinc-600 text-[9px]">looking for conflicting packages...</p>
        </div>
      )}

      {phase === "installing" && (
        <div className="space-y-2">
          <p className="text-zinc-500 mb-1">
            ({start + 1}-{Math.min(start + batchSize, packages.length)}/{packages.length})
          </p>
          <div className="space-y-2">
            {batchPackages.map((pkg, i) => (
              <div key={pkg}>
                <p className="text-yellow-300 truncate max-w-full mb-0.5">
                  {pkg}
                </p>
                <pre className="text-cyan-400 leading-tight">
                  {renderProgressBar(progresses[i] || 0)}
                </pre>
              </div>
            ))}
          </div>
          <p className="text-zinc-600 text-[9px]">
            total installed size: {((batch * batchSize + progresses.reduce((a, b) => a + (b > 0 ? 1 : 0), 0)) * 9.2 + 5).toFixed(1)} MiB
          </p>
        </div>
      )}

      {phase === "done" && (
        <div className="space-y-2">
          <p className="text-green-400">✓ transaction completed</p>
          <p className="text-zinc-500 text-[9px]">
            {packages.length} packages installed
          </p>
          {[0, 1, 2, 3, 4].map((i) => (
            <pre key={i} className="text-green-400/70 leading-tight text-[9px]">
              [####################] 100%
            </pre>
          ))}
          <p className="text-zinc-600 text-[9px] animate-pulse">restarting in 3s...</p>
        </div>
      )}
    </div>
  );
}

const weatherIcons: Record<number, string> = {
  0: "☀️", 1: "🌤", 2: "⛅", 3: "☁️",
  45: "🌫", 48: "🌫",
  51: "🌦", 53: "🌦", 55: "🌦",
  61: "🌧", 63: "🌧", 65: "🌧",
  71: "🌨", 73: "🌨", 75: "🌨",
  80: "🌦", 81: "🌦", 82: "🌦",
  95: "⛈", 96: "⛈", 99: "⛈",
};

const weatherLabels: Record<number, string> = {
  0: "Clear", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
  45: "Foggy", 48: "Foggy",
  51: "Drizzle", 53: "Drizzle", 55: "Drizzle",
  61: "Rain", 63: "Rain", 65: "Rain",
  71: "Snow", 73: "Snow", 75: "Snow",
  80: "Rain showers", 81: "Rain showers", 82: "Rain showers",
  95: "Thunderstorm", 96: "Thunderstorm", 99: "Thunderstorm",
};

function InfoPanel() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<{ temp: number; feelsLike: number; humidity: number; wind: number; code: number } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("es-CO", { timeZone: "America/Bogota", hour12: false }));
      setDate(now.toLocaleDateString("es-CO", { timeZone: "America/Bogota", weekday: "long", day: "numeric", month: "long" }));
    };
    updateTime();
    const t = setInterval(updateTime, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=1.21&longitude=-77.28&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m")
      .then((r) => r.json())
      .then((data) => {
        if (data?.current) {
          setWeather({
            temp: data.current.temperature_2m,
            feelsLike: data.current.apparent_temperature,
            humidity: data.current.relative_humidity_2m,
            wind: data.current.wind_speed_10m,
            code: data.current.weather_code,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="p-4 font-mono text-xs bg-[#0b0c10]/95 min-h-[240px] flex flex-col justify-center space-y-3">
      {/* Location */}
      <div className="text-center">
        <p className="text-zinc-500 text-[10px] uppercase tracking-wider">Location</p>
        <p className="text-cyan-300 font-bold">San Juan de Pasto</p>
        <p className="text-zinc-500 text-[10px]">Colombia</p>
      </div>

      {/* Time */}
      <div className="text-center">
        <p className="text-zinc-500 text-[10px] uppercase tracking-wider">Time</p>
        <p className="text-white text-2xl font-bold tabular-nums">{time || "--:--:--"}</p>
        <p className="text-zinc-400 text-[10px] capitalize">{date}</p>
      </div>

      {/* Weather */}
      <div className="text-center">
        <p className="text-zinc-500 text-[10px] uppercase tracking-wider">Weather</p>
        {weather ? (
          <div className="space-y-1">
            <p className="text-3xl">{weatherIcons[weather.code] || "☀️"}</p>
            <p className="text-white text-lg font-bold">{weather.temp.toFixed(0)}°C</p>
            <p className="text-zinc-400 text-[10px]">{weatherLabels[weather.code] || "Unknown"}</p>
            <div className="flex justify-center gap-4 text-zinc-500 text-[10px]">
              <span>Feels {weather.feelsLike.toFixed(0)}°</span>
              <span>💧 {weather.humidity}%</span>
              <span>💨 {weather.wind.toFixed(0)} km/h</span>
            </div>
          </div>
        ) : (
          <p className="text-zinc-600 animate-pulse">loading...</p>
        )}
      </div>
    </div>
  );
}

function HtopMonitor() {
  const [data, setData] = useState({
    cpu: [12, 8, 23, 15],
    mem: 47,
    procs: [
      { pid: 4201, user: "jt", cpu: 5.2, mem: 2.1, time: "0:12.5", cmd: "nvim init.lua" },
      { pid: 3892, user: "jt", cpu: 12.8, mem: 4.5, time: "2:34.1", cmd: "node server.js" },
      { pid: 1533, user: "root", cpu: 0.3, mem: 0.8, time: "12:05.2", cmd: "/usr/bin/bspwm" },
      { pid: 2104, user: "jt", cpu: 1.1, mem: 1.6, time: "0:45.8", cmd: "kitty" },
      { pid: 5102, user: "jt", cpu: 8.4, mem: 6.2, time: "15:22.0", cmd: "firefox" },
      { pid: 6123, user: "jt", cpu: 2.3, mem: 1.2, time: "0:08.3", cmd: "spotify" },
    ],
    uptime: "14h 23m",
    tasks: 187,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        cpu: prev.cpu.map((c) => Math.min(100, Math.max(0, c + (Math.random() - 0.5) * 10))),
        mem: Math.min(100, Math.max(0, prev.mem + (Math.random() - 0.5) * 3)),
        procs: prev.procs.map((p) => ({
          ...p,
          cpu: Math.max(0, p.cpu + (Math.random() - 0.5) * 2),
          mem: Math.max(0.1, p.mem + (Math.random() - 0.5) * 0.4),
        })),
        tasks: Math.max(150, prev.tasks + Math.floor(Math.random() * 5 - 2)),
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-2 font-mono text-[9px] bg-[#0b0c10]/95 min-h-[240px] leading-[1.4]">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-[10px] text-white font-bold mb-1">
        <span className="text-yellow-300">htop</span>
        <span className="text-zinc-500 font-normal">|</span>
        <span className="text-green-400 font-normal">CPU</span>
        <span className="text-white font-normal">@{data.cpu.reduce((a, b) => a + b, 0) / data.cpu.length | 0}%</span>
        <span className="text-zinc-500 font-normal">|</span>
        <span className="text-green-400 font-normal">Mem</span>
        <span className="text-white font-normal">@{data.mem | 0}%</span>
        <span className="text-zinc-500 font-normal ml-auto hidden sm:inline">Tasks: {data.tasks}, uptime: {data.uptime}</span>
      </div>

      {/* CPU bars */}
      <div className="mb-1">
        {data.cpu.map((c, i) => (
          <div key={i} className="flex items-center gap-0.5 leading-[1.2]">
            <span className="text-green-400 w-10 text-right text-[8px]">CPU{i + 1}</span>
            <span className="text-green-400 text-[8px]">
              [{Array.from({ length: 20 }, (_, j) => {
                const filled = Math.floor(c / 5);
                if (j < filled) {
                  if (c > 70) return <span key={j} className="text-red-400">█</span>;
                  if (c > 40) return <span key={j} className="text-yellow-300">█</span>;
                  return <span key={j} className="text-green-400">█</span>;
                }
                return <span key={j} className="text-zinc-700">·</span>;
              })}]
            </span>
            <span className="text-cyan-300 w-6 text-right text-[8px] tabular-nums">{c.toFixed(0)}%</span>
          </div>
        ))}
      </div>

      {/* Memory bar */}
      <div className="flex items-center gap-0.5 leading-[1.2] mb-1">
        <span className="text-green-400 w-10 text-right text-[8px]">Mem</span>
        <span className="text-green-400 text-[8px]">
          [{Array.from({ length: 20 }, (_, j) => {
            const filled = Math.floor(data.mem / 5);
            if (j < filled) return <span key={j} className="text-green-400">█</span>;
            return <span key={j} className="text-zinc-700">·</span>;
          })}]
        </span>
        <span className="text-cyan-300 w-6 text-right text-[8px] tabular-nums">{data.mem.toFixed(0)}%</span>
      </div>

      {/* Separator */}
      <div className="text-zinc-700 text-[8px] leading-[1.2]">
        {"─".repeat(48)}
      </div>

      {/* Column headers */}
      <div className="flex items-center text-zinc-500 text-[8px] leading-[1.4]">
        <span className="w-8">PID</span>
        <span className="w-6">CPU%</span>
        <span className="w-6">MEM%</span>
        <span className="w-10">TIME</span>
        <span className="flex-1">COMMAND</span>
      </div>

      {/* Processes */}
      <div>
        {data.procs.map((p) => (
          <div key={p.pid} className="flex items-center text-[8px] leading-[1.4]">
            <span className="w-8 text-zinc-500">{p.pid}</span>
            <span className="w-6 text-green-400 tabular-nums">{p.cpu.toFixed(1)}</span>
            <span className="w-6 tabular-nums" style={{ color: p.mem > 4 ? "#fbbf24" : "#6ee7b7" }}>{p.mem.toFixed(1)}</span>
            <span className="w-10 text-zinc-500 tabular-nums">{p.time}</span>
            <span className="flex-1 truncate">
              {p.user === "root" ? (
                <span className="text-red-400">{p.cmd}</span>
              ) : (
                <span className="text-white">{p.cmd}</span>
              )}
            </span>
          </div>
        ))}
      </div>

      {/* F-keys */}
      <div className="flex gap-1 text-zinc-600 text-[8px] mt-1 leading-[1.4] border-t border-zinc-800 pt-1">
        <span className="text-zinc-500">F1</span>
        <span className="text-zinc-600">Help</span>
        <span className="text-zinc-500 ml-1">F2</span>
        <span className="text-zinc-600">Setup</span>
        <span className="text-zinc-500 ml-1">F3</span>
        <span className="text-zinc-600">Search</span>
        <span className="text-zinc-500 ml-1">F4</span>
        <span className="text-zinc-600">Filter</span>
        <span className="text-zinc-500 ml-1">F5</span>
        <span className="text-zinc-600">Tree</span>
        <span className="text-zinc-500 ml-auto">Quit: q</span>
      </div>
    </div>
  );
}

export default function TerminalFooter() {
  return (
    <div className="relative border-t border-cyan-500/10 bg-[#040406]">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            <span className="hypr-gradient-text font-black">
              <span className="text-cyan-400">$</span> dev_environment
            </span>
          </h2>
          <p className="text-zinc-400 text-sm">Arch Linux · BSPWM · Developer Setup</p>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded mt-4" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Htop Window */}
          <div className="tiling-window active-blue flex flex-col">
            <div className="h-8 bg-zinc-950 px-4 flex items-center justify-between border-b border-white/5">
              <div className="flex gap-1.5">
                <span className="window-dot bg-[#ff5f56] w-2.5 h-2.5 rounded-full" />
                <span className="window-dot bg-[#ffbd2e] w-2.5 h-2.5 rounded-full" />
                <span className="window-dot bg-[#27c93f] w-2.5 h-2.5 rounded-full" />
              </div>
              <span className="text-[11px] font-mono text-zinc-500">htop</span>
              <div className="w-10" />
            </div>
            <HtopMonitor />
          </div>
          {/* Tux Window */}
          <div className="tiling-window flex flex-col">
            <div className="h-8 bg-zinc-950 px-4 flex items-center justify-between border-b border-white/5">
              <div className="flex gap-1.5">
                <span className="window-dot bg-[#ff5f56] w-2.5 h-2.5 rounded-full" />
                <span className="window-dot bg-[#ffbd2e] w-2.5 h-2.5 rounded-full" />
                <span className="window-dot bg-[#27c93f] w-2.5 h-2.5 rounded-full" />
              </div>
              <span className="text-[11px] font-mono text-zinc-500">tux</span>
              <div className="w-10" />
            </div>
            <div className="p-6 font-mono bg-[#0b0c10]/95 flex items-center justify-center min-h-[240px]">
              <pre className="text-cyan-400 leading-tight select-none text-base">
{`    .--.
   |o_o |
   |:_/ |
  //   \\\\
 (|     |)
/'\\_   _/\\\\
\\___)=(___/`}
              </pre>
            </div>
          </div>

          {/* fastfetch Window */}
          <div className="tiling-window active-purple flex flex-col">
            <div className="h-8 bg-zinc-950 px-4 flex items-center justify-between border-b border-white/5">
              <div className="flex gap-1.5">
                <span className="window-dot bg-[#ff5f56] w-2.5 h-2.5 rounded-full" />
                <span className="window-dot bg-[#ffbd2e] w-2.5 h-2.5 rounded-full" />
                <span className="window-dot bg-[#27c93f] w-2.5 h-2.5 rounded-full" />
              </div>
              <span className="text-[11px] font-mono text-zinc-500">fastfetch</span>
              <div className="w-10" />
            </div>
            <div className="p-6 font-mono text-sm bg-[#0b0c10]/95 flex items-center justify-center min-h-[240px]">
              <div className="flex items-start gap-4">
                <div className="text-cyan-400 font-bold leading-none select-none text-lg">
                  &nbsp;&nbsp;/\<br />
                  &nbsp;/\/\<br />
                  /\/\/\<br />
                  \/&nbsp;&nbsp;\/<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div className="space-y-1 text-zinc-300">
                  <span className="text-cyan-300 font-bold">jt</span>@<span className="text-cyan-300 font-bold">arch</span><br />
                  <span className="text-zinc-600">----------</span><br />
                  <span className="text-purple-300">OS</span>: Arch Linux x86_64<br />
                  <span className="text-purple-300">WM</span>: BSPWM<br />
                  <span className="text-purple-300">Shell</span>: zsh<br />
                  <span className="text-purple-300">Editor</span>: NvChad<br />
                  <span className="text-purple-300">Theme</span>: Hypr-Nordic
                </div>
              </div>
            </div>
          </div>

          {/* cmatrix Window */}
          <div className="tiling-window flex flex-col">
            <div className="h-8 bg-zinc-950 px-4 flex items-center justify-between border-b border-white/5">
              <div className="flex gap-1.5">
                <span className="window-dot bg-[#ff5f56] w-2.5 h-2.5 rounded-full" />
                <span className="window-dot bg-[#ffbd2e] w-2.5 h-2.5 rounded-full" />
                <span className="window-dot bg-[#27c93f] w-2.5 h-2.5 rounded-full" />
              </div>
              <span className="text-[11px] font-mono text-zinc-500">cmatrix</span>
              <div className="w-10" />
            </div>
            <div className="bg-[#0b0c10]/95 min-h-[240px] relative overflow-hidden">
              <CMatrixRain />
            </div>
          </div>

          {/* Pacman Window */}
          <div className="tiling-window active-cyan flex flex-col">
            <div className="h-8 bg-zinc-950 px-4 flex items-center justify-between border-b border-white/5">
              <div className="flex gap-1.5">
                <span className="window-dot bg-[#ff5f56] w-2.5 h-2.5 rounded-full" />
                <span className="window-dot bg-[#ffbd2e] w-2.5 h-2.5 rounded-full" />
                <span className="window-dot bg-[#27c93f] w-2.5 h-2.5 rounded-full" />
              </div>
              <span className="text-[11px] font-mono text-zinc-500">pacman</span>
              <div className="w-10" />
            </div>
            <PacmanInstall />
          </div>

          {/* Info Panel Window */}
          <div className="tiling-window flex flex-col">
            <div className="h-8 bg-zinc-950 px-4 flex items-center justify-between border-b border-white/5">
              <div className="flex gap-1.5">
                <span className="window-dot bg-[#ff5f56] w-2.5 h-2.5 rounded-full" />
                <span className="window-dot bg-[#ffbd2e] w-2.5 h-2.5 rounded-full" />
                <span className="window-dot bg-[#27c93f] w-2.5 h-2.5 rounded-full" />
              </div>
              <span className="text-[11px] font-mono text-zinc-500">pasto</span>
              <div className="w-10" />
            </div>
            <InfoPanel />
          </div>
        </div>

        {/* Bottom prompt */}
        <div className="mt-6 font-mono text-sm text-zinc-500 text-center">
          <span className="text-cyan-300">jt@arch</span>
          <span className="text-zinc-600">:</span>
          <span className="text-purple-400">~/dotfiles</span>
          <span className="text-zinc-600"> $</span>
          <span className="animate-pulse text-zinc-400 ml-1">▊</span>
        </div>
      </div>
    </div>
  );
}
