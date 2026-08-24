"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Stats {
  projects: number;
  certificates: number;
  skills: number;
  journey: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ projects: 0, certificates: 0, skills: 0, journey: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/projects").then((r) => r.json()),
      fetch("/api/admin/certificates").then((r) => r.json()),
      fetch("/api/admin/skills").then((r) => r.json()),
      fetch("/api/admin/journey").then((r) => r.json()),
    ]).then(([projects, certificates, skills, journey]) => {
      setStats({
        projects: projects.length ?? 0,
        certificates: certificates.length ?? 0,
        skills: skills.length ?? 0,
        journey: journey.length ?? 0,
      });
    });
  }, []);

  const cards = [
    { label: "Info Personal", href: "/admin/personal", icon: "👤", desc: "Nombre, bio, links" },
    { label: "Proyectos", href: "/admin/projects", icon: "📁", count: stats.projects, desc: "Gestionar proyectos" },
    { label: "Certificados", href: "/admin/certificates", icon: "🎓", count: stats.certificates, desc: "Gestionar certs" },
    { label: "Skills", href: "/admin/skills", icon: "⚡", count: stats.skills, desc: "Gestionar habilidades" },
    { label: "Ruta Profesional", href: "/admin/journey", icon: "🗺️", count: stats.journey, desc: "Timeline" },
    { label: "CV", href: "/admin/cv", icon: "📄", desc: "Subir curriculum" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
      <p className="text-zinc-500 text-sm mb-8">Gestiona tu portfolio desde aquí</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{card.icon}</span>
              {card.count !== undefined && (
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  {card.count}
                </span>
              )}
            </div>
            <h3 className="text-white font-semibold mb-1 group-hover:text-emerald-400 transition-colors">
              {card.label}
            </h3>
            <p className="text-zinc-500 text-sm">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
