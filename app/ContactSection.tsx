// Zielpfad im Repo: app/ContactSection.tsx (ersetzt die bestehende Datei)
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Check, Send } from "lucide-react";
import { createClient } from "./lib/supabase/client";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [refCode, setRefCode] = useState<string | null>(null);

  useEffect(() => {
    try {
      const ref = new URLSearchParams(window.location.search).get("ref");
      if (ref) setRefCode(ref);
    } catch {}
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    // Best-effort: registra el lead referido para el panel interno. No debe
    // bloquear ni afectar el envío principal si falla.
    if (refCode) {
      const supabase = createClient();
      supabase
        .from("referral_leads")
        .insert({
          referral_code: refCode,
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          whatsapp: String(data.get("phone") ?? ""),
          message: String(data.get("message") ?? ""),
        })
        .then(() => {});
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="contact shell" id="contacto">
      <div className="sectionHead center">
        <span className="eyebrow">HABLEMOS</span>
        <h2>Contanos sobre tu negocio</h2>
        <p>Completá el formulario y te respondemos a la brevedad para armar tu catálogo.</p>
      </div>

      {status === "sent" ? (
        <div className="contactSuccess">
          <Check />
          <p>¡Gracias! Tu mensaje fue enviado. Te responderemos pronto.</p>
        </div>
      ) : (
        <form className="contactForm" onSubmit={handleSubmit}>
          <input type="hidden" name="access_key" value="26fed38b-36d3-49b3-9233-281feb48727b" />
          <input type="hidden" name="subject" value={refCode ? `Nueva consulta desde wendelo.online (Ref: ${refCode})` : "Nueva consulta desde wendelo.online"} />
          <input type="hidden" name="from_name" value="WENDELO" />
          {refCode && <input type="hidden" name="referral_code" value={refCode} />}
          {refCode && (
            <div className="contactReferral">
              <Check size={15} /> Fuiste recomendado por <strong>{refCode}</strong>
            </div>
          )}
          <div className="contactRow">
            <div className="contactField">
              <label htmlFor="name">Nombre</label>
              <input id="name" type="text" name="name" required placeholder="Tu nombre" />
            </div>
            <div className="contactField">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" required placeholder="tu@email.com" />
            </div>
          </div>
          <div className="contactField">
            <label htmlFor="phone">WhatsApp (opcional)</label>
            <input id="phone" type="tel" name="phone" placeholder="+595 9xx xxx xxx" />
          </div>
          <div className="contactField">
            <label htmlFor="message">Contanos sobre tu negocio</label>
            <textarea id="message" name="message" required placeholder="¿Qué productos vendés y qué te gustaría lograr con WENDELO?" rows={5}></textarea>
          </div>
          <button type="submit" className="primary" disabled={status === "sending"}>
            {status === "sending" ? "Enviando..." : <>Enviar mensaje <Send size={18} /></>}
          </button>
          {status === "error" && (
            <p className="contactError">Hubo un error al enviar tu mensaje. Probá de nuevo o escribinos por WhatsApp.</p>
          )}
        </form>
      )}
    </section>
  );
}
