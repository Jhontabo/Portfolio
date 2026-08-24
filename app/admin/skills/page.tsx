"use client";

import { useEffect, useState } from "react";

const CATEGORIES = ["languages", "frontend", "backend", "mobile", "tools"] as const;
const ICON_OPTIONS = [
  "react", "nextjs", "tailwindcss", "javascript", "typescript", "express", "laravel",
  "nodedotjs", "mysql", "jwt", "flutter", "dart", "android", "git", "github", "linux",
  "bash", "neovim", "aws", "windows", "php", "python", "html5", "css3",
];

interface Skill {
  id: string;
  name: string;
  icon: string;
  category: string;
  sort_order: number;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(ICON_OPTIONS[0]);
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/skills").then((r) => r.json()).then((data) => {
      setSkills(data ?? []);
      setLoading(false);
    });
  }, []);

  async function handleAdd() {
    if (!name.trim()) return;
    setSaving(true);
    const res = await fetch("/api/admin/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), icon, category, sort_order: skills.length }),
    });
    if (res.ok) {
      const saved = await res.json();
      setSkills([...skills, saved]);
      setName("");
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta skill?")) return;
    const res = await fetch(`/api/admin/skills/${id}`, { method: "DELETE" });
    if (res.ok) setSkills(skills.filter((s) => s.id !== id));
  }

  if (loading) return <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Skills</h1>
      <p className="text-zinc-500 text-sm mb-8">{skills.length} habilidades</p>

      {/* Add form */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-8">
        <div className="grid sm:grid-cols-4 gap-3 items-end">
          <div>
            <label className="block text-zinc-400 text-sm mb-1">Nombre</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500" placeholder="Ej: React" />
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-1">Ícono</label>
            <select value={icon} onChange={(e) => setIcon(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500">
              {ICON_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-1">Categoría</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={handleAdd} disabled={saving || !name.trim()} className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors h-10">
            {saving ? "..." : "+ Agregar"}
          </button>
        </div>
      </div>

      {/* Skills by category */}
      {CATEGORIES.map((cat) => {
        const catSkills = skills.filter((s) => s.category === cat);
        if (catSkills.length === 0) return null;
        return (
          <div key={cat} className="mb-6">
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">{cat}</h2>
            <div className="space-y-2">
              {catSkills.map((s) => (
                <div key={s.id} className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded font-mono">{s.icon}</span>
                    <span className="text-zinc-300 text-sm">{s.name}</span>
                  </div>
                  <button onClick={() => handleDelete(s.id)} className="text-zinc-500 hover:text-red-400 text-xs px-2 py-1 rounded hover:bg-zinc-800 transition-colors">Eliminar</button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
