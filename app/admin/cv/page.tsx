"use client";

import { useState } from "react";

export default function CvPage() {
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");
  const [cvUrl, setCvUrl] = useState("");

  useState(() => {
    fetch("/api/admin/personal")
      .then((r) => r.json())
      .then((data) => {
        if (data?.cv_url) setCvUrl(data.cv_url);
      });
  });

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMsg("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "cv");

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (res.ok && data.url) {
        setCvUrl(data.url);

        // Update personal_info with new CV URL
        const personalRes = await fetch("/api/admin/personal");
        const personal = await personalRes.json();
        await fetch("/api/admin/personal", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...personal, cv_url: data.url }),
        });

        setMsg("CV subido correctamente");
      } else {
        setMsg("Error al subir");
      }
    } catch {
      setMsg("Error de conexión");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">CV</h1>
      <p className="text-zinc-500 text-sm mb-8">Sube o actualiza tu curriculum vitae (PDF)</p>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div className="mb-4">
          <label className="block text-zinc-400 text-sm mb-2">Seleccionar PDF</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleUpload}
            disabled={uploading}
            className="block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 file:cursor-pointer file:transition-colors"
          />
        </div>

        {uploading && (
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            Subiendo...
          </div>
        )}

        {msg && (
          <p className={`text-sm mt-2 ${msg.includes("Error") ? "text-red-400" : "text-emerald-400"}`}>{msg}</p>
        )}

        {cvUrl && (
          <div className="mt-4 pt-4 border-t border-zinc-800">
            <p className="text-zinc-400 text-sm mb-2">CV actual:</p>
            <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 text-sm underline">
              Ver CV actual
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
