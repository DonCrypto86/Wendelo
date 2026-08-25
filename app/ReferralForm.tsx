"use client";

import { useState, type FormEvent } from "react";
import { Check, Send } from "lucide-react";

export default function ReferralForm() {
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

  if (status === "sent") {
    return (
      <div className="referralSent">
        <Check size={15} /> ¡Listo! Te enviamos tu link de referido por WhatsApp a la brevedad.
      </div>
    );
  }

  return (
    <form className="referralForm" onSubmit={handleSubmit}>
      <input type="hidden" name="access_key" value="26fed38b-36d3-49b3-9233-281feb48727b" />
      <input type="hidden" name="subject" value="Solicitud de link de referido - WENDELO" />
      <input type="hidden" name="from_name" value="WENDELO Referidos" />
      <input type="text" name="name" required placeholder="Tu nombre" />
      <input type="text" name="cedula" required placeholder="Tu cédula" />
      <input type="tel" name="whatsapp" required placeholder="Tu WhatsApp (+595 9xx xxx xxx)" />
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Enviando..." : <>Solicitar mi link <Send size={14} /></>}
      </button>
      <p className="referralFormNote">Usamos tu cédula únicamente para identificarte al momento de pagar tu comisión. Ver <a href="/terminos#referidos">Términos del Programa de Referidos</a>.</p>
      {status === "error" && (
        <p className="referralFormError">Hubo un error al enviar tu solicitud. Probá de nuevo.</p>
      )}
    </form>
  );
}
