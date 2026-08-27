// Zielpfad im Repo: app/ReferralForm.tsx (ersetzt die bestehende Datei)
"use client";

import { useState, type FormEvent } from "react";
import { Check, Copy, Send } from "lucide-react";
import { createClient } from "./lib/supabase/client";

export default function ReferralForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const cedula = String(data.get("cedula") ?? "");
    const whatsapp = String(data.get("whatsapp") ?? "");

    const supabase = createClient();
    const { data: code, error } = await supabase.rpc("request_referral_code", {
      p_name: name,
      p_cedula: cedula,
      p_whatsapp: whatsapp,
    });

    if (error || !code) {
      setStatus("error");
      return;
    }

    // Notificación por email a modo de aviso; el link ya quedó generado
    // independientemente de si esto falla.
    try {
      const fd = new FormData();
      fd.append("access_key", "26fed38b-36d3-49b3-9233-281feb48727b");
      fd.append("subject", "Nuevo link de referido generado - WENDELO");
      fd.append("from_name", "WENDELO Referidos");
      fd.append("name", name);
      fd.append("cedula", cedula);
      fd.append("whatsapp", whatsapp);
      fd.append("codigo", code);
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
    } catch {
      // no-op
    }

    setLink(`https://wendelo.online?ref=${code}`);
    setStatus("sent");
    form.reset();
  }

  async function handleCopy() {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // no-op
    }
  }

  if (status === "sent" && link) {
    return (
      <div className="referralSent">
        <Check size={15} />
        <div>
          <p>¡Listo! Este es tu link de referido:</p>
          <div className="referralLinkBox">
            <code>{link}</code>
            <button type="button" onClick={handleCopy}>
              <Copy size={14} /> {copied ? "¡Copiado!" : "Copiar"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="referralForm" onSubmit={handleSubmit}>
      <input type="text" name="name" required placeholder="Tu nombre" />
      <input type="text" name="cedula" required placeholder="Tu cédula" />
      <input type="tel" name="whatsapp" required placeholder="Tu WhatsApp (+595 9xx xxx xxx)" />
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Generando..." : <>Solicitar mi link <Send size={14} /></>}
      </button>
      <p className="referralFormNote">
        Usamos tu cédula únicamente para identificarte al momento de pagar tu comisión. Ver{" "}
        <a href="/terminos#referidos">Términos del Programa de Referidos</a>.
      </p>
      {status === "error" && (
        <p className="referralFormError">Hubo un error al generar tu link. Probá de nuevo.</p>
      )}
    </form>
  );
}
