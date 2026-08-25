"use client";

import { useState, type FormEvent } from "react";
import { Check, Send } from "lucide-react";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
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
          <input type="hidden" name="access_key" value="c5a90800-65da-42af-8214-aafd37b857de" />
          <input type="hidden" name="subject" value="Nueva consulta desde wendelo.online" />
          <input type="hidden" name="from_name" value="WENDELO" />
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
