"use client";

import { useEffect, useState } from "react";

interface PersonalInfo {
  id?: string;
  name: string;
  title: string;
  email: string;
  linkedin: string;
  github: string;
  bio_es: string;
  bio_en: string;
  cv_url: string;
}

export default function PersonalPage() {
  const [form, setForm] = useState<PersonalInfo>({
    name: "", title: "", email: "", linkedin: "", github: "", bio_es: "", bio_en: "", cv_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/personal")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.id) setForm(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/personal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setMsg("Guardado correctamente");
      else setMsg("Error al guardar");
    } catch {
      setMsg("Error de conexión");
    } finally {
      setSaving(false);
    }
  }

  function update(key: keyof PersonalInfo, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  if (loading) {
    return <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Info Personal</h1>
      <p className="text-zinc-500 text-sm mb-8">Edita tu información personal y biografía</p>

      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nombre" value={form.name} onChange={(v) => update("name", v)} />
          <Field label="Título" value={form.title} onChange={(v) => update("title", v)} />
          <Field label="Email" value={form.email} onChange={(v) => update("email", v)} />
          <Field label="LinkedIn URL" value={form.linkedin} onChange={(v) => update("linkedin", v)} />
          <Field label="GitHub URL" value={form.github} onChange={(v) => update("github", v)} />
          <Field label="CV URL" value={form.cv_url} onChange={(v) => update("cv_url", v)} />
        </div>

        <TextArea label="Bio (ES)" value={form.bio_es} onChange={(v) => update("bio_es", v)} rows={4} />
        <TextArea label="Bio (EN)" value={form.bio_en} onChange={(v) => update("bio_en", v)} rows={4} />

        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
          {msg && <span className={`text-sm ${msg.includes("Error") ? "text-red-400" : "text-emerald-400"}`}>{msg}</span>}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-zinc-400 text-sm mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="block text-zinc-400 text-sm mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-y"
      />
    </div>
  );
}
