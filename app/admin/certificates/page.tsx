"use client";

import { useEffect, useState } from "react";

interface Certificate {
  id: string;
  name: string;
  name_en: string;
  issuer: string;
  date: string;
  description: string;
  description_en: string;
  link: string;
  sort_order: number;
}

const empty: Omit<Certificate, "id"> = {
  name: "", name_en: "", issuer: "", date: "", description: "", description_en: "", link: "", sort_order: 0,
};

export default function CertificatesPage() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [editing, setEditing] = useState<Certificate | null>(null);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/certificates").then((r) => r.json()).then((data) => {
      setCerts(data ?? []);
      setLoading(false);
    });
  }, []);

  function startNew() { setEditing({ ...empty, id: "" } as unknown as Certificate); setForm({ ...empty }); }
  function startEdit(c: Certificate) { setEditing(c); setForm({ ...c }); }

  async function handleSave() {
    setSaving(true);
    const isEdit = editing?.id;
    const url = isEdit ? `/api/admin/certificates/${editing.id}` : "/api/admin/certificates";
    const res = await fetch(url, { method: isEdit ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) {
      const saved = await res.json();
      setCerts(isEdit ? certs.map((c) => (c.id === saved.id ? saved : c)) : [...certs, saved]);
      setEditing(null);
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este certificado?")) return;
    const res = await fetch(`/api/admin/certificates/${id}`, { method: "DELETE" });
    if (res.ok) setCerts(certs.filter((c) => c.id !== id));
  }

  if (loading) return <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>;

  if (editing) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">{editing.id ? "Editar" : "Nuevo"} Certificado</h1>
          <button onClick={() => setEditing(null)} className="text-zinc-400 hover:text-white text-sm">Cancelar</button>
        </div>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Nombre (ES)" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field label="Nombre (EN)" value={form.name_en} onChange={(v) => setForm({ ...form, name_en: v })} />
            <Field label="Emisor" value={form.issuer} onChange={(v) => setForm({ ...form, issuer: v })} />
            <Field label="Fecha" value={form.date} onChange={(v) => setForm({ ...form, date: v })} />
            <Field label="Link credencial" value={form.link} onChange={(v) => setForm({ ...form, link: v })} />
            <Field label="Orden" value={String(form.sort_order)} onChange={(v) => setForm({ ...form, sort_order: Number(v) })} />
          </div>
          <TextArea label="Descripción (ES)" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
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
          <h1 className="text-2xl font-bold text-white mb-1">Certificados</h1>
          <p className="text-zinc-500 text-sm">{certs.length} certificados</p>
        </div>
        <button onClick={startNew} className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">+ Nuevo</button>
      </div>
      <div className="space-y-3">
        {certs.map((c) => (
          <div key={c.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold truncate">{c.name}</h3>
              <p className="text-zinc-500 text-xs mt-0.5">{c.issuer}</p>
            </div>
            <div className="flex gap-2 ml-4 shrink-0">
              <button onClick={() => startEdit(c)} className="text-zinc-400 hover:text-emerald-400 text-sm px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors">Editar</button>
              <button onClick={() => handleDelete(c.id)} className="text-zinc-400 hover:text-red-400 text-sm px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors">Eliminar</button>
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
