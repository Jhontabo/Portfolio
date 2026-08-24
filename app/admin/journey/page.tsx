"use client";

import { useEffect, useState } from "react";

interface JourneyEntry {
  id: string;
  date_es: string;
  date_en: string;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  link_type: string;
  link: string;
  sort_order: number;
}

const empty: Omit<JourneyEntry, "id"> = {
  date_es: "", date_en: "", title_es: "", title_en: "", description_es: "", description_en: "", link_type: "", link: "", sort_order: 0,
};

export default function JourneyPage() {
  const [entries, setEntries] = useState<JourneyEntry[]>([]);
  const [editing, setEditing] = useState<JourneyEntry | null>(null);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/journey").then((r) => r.json()).then((data) => {
      setEntries(data ?? []);
      setLoading(false);
    });
  }, []);

  function startNew() { setEditing({ ...empty, id: "" } as unknown as JourneyEntry); setForm({ ...empty }); }
  function startEdit(e: JourneyEntry) { setEditing(e); setForm({ ...e }); }

  async function handleSave() {
    setSaving(true);
    const isEdit = editing?.id;
    const url = isEdit ? `/api/admin/journey/${editing.id}` : "/api/admin/journey";
    const res = await fetch(url, { method: isEdit ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) {
      const saved = await res.json();
      setEntries(isEdit ? entries.map((e) => (e.id === saved.id ? saved : e)) : [...entries, saved]);
      setEditing(null);
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta entrada?")) return;
    const res = await fetch(`/api/admin/journey/${id}`, { method: "DELETE" });
    if (res.ok) setEntries(entries.filter((e) => e.id !== id));
  }

  if (loading) return <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>;

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">{editing.id ? "Editar" : "Nueva"} Entrada</h1>
          <button onClick={() => setEditing(null)} className="text-zinc-400 hover:text-white text-sm">Cancelar</button>
        </div>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Fecha (ES)" value={form.date_es} onChange={(v) => setForm({ ...form, date_es: v })} />
            <Field label="Fecha (EN)" value={form.date_en} onChange={(v) => setForm({ ...form, date_en: v })} />
            <Field label="Título (ES)" value={form.title_es} onChange={(v) => setForm({ ...form, title_es: v })} />
            <Field label="Título (EN)" value={form.title_en} onChange={(v) => setForm({ ...form, title_en: v })} />
            <Field label="Link Type (github)" value={form.link_type} onChange={(v) => setForm({ ...form, link_type: v })} />
            <Field label="Link URL" value={form.link} onChange={(v) => setForm({ ...form, link: v })} />
            <Field label="Orden" value={String(form.sort_order)} onChange={(v) => setForm({ ...form, sort_order: Number(v) })} />
          </div>
          <TextArea label="Descripción (ES)" value={form.description_es} onChange={(v) => setForm({ ...form, description_es: v })} />
          <TextArea label="Descripción (EN)" value={form.description_en} onChange={(v) => setForm({ ...form, description_en: v })} />
          <button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Ruta Profesional</h1>
          <p className="text-zinc-500 text-sm">{entries.length} entradas</p>
        </div>
        <button onClick={startNew} className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">+ Nueva</button>
      </div>
      <div className="space-y-3">
        {entries.map((e) => (
          <div key={e.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">{e.date_es}</span>
                <h3 className="text-white font-semibold truncate">{e.title_es}</h3>
              </div>
            </div>
            <div className="flex gap-2 ml-4 shrink-0">
              <button onClick={() => startEdit(e)} className="text-zinc-400 hover:text-emerald-400 text-sm px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors">Editar</button>
              <button onClick={() => handleDelete(e.id)} className="text-zinc-400 hover:text-red-400 text-sm px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (<div><label className="block text-zinc-400 text-sm mb-1">{label}</label><input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors" /></div>);
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (<div><label className="block text-zinc-400 text-sm mb-1">{label}</label><textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-y" /></div>);
}
