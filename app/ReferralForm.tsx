// Zielpfad im Repo: app/ReferralForm.tsx (ersetzt die bestehende Datei)
"use client";

import { useState, type FormEvent } from "react";
import { Check, Send } from "lucide-react";
import { createClient } from "./lib/supabase/client";

export default function ReferralForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

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

    // Notificación por email a modo de aviso; la solicitud ya quedó
    // registrada independientemente de si esto falla. El link NO se
    // muestra ni se envía automáticamente: queda pendiente de revisión
    // manual en /admin/referidos.
    try {
      const fd = new FormData();
      fd.append("access_key", "26fed38b-36d3-49b3-9233-281feb48727b");
      fd.append("subject", "Nueva solicitud de referido - WENDELO");
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

    setStatus("sent");
    form.reset();
  }

  if (status === "sent") {
    return (
      <div className="referralSent">
        <Check size={15} />
        <p>¡Gracias! Recibimos tu solicitud. Te vamos a escribir para confirmar tu link de referido.</p>
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
