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
        <Check size={15} /> Fertig! Wir schicken dir deinen Empfehlungslink in Kürze über WhatsApp.
      </div>
    );
  }

  return (
    <form className="referralForm" onSubmit={handleSubmit}>
      <input type="hidden" name="access_key" value="26fed38b-36d3-49b3-9233-281feb48727b" />
      <input type="hidden" name="subject" value="Anfrage Empfehlungslink - WENDELO (DE)" />
      <input type="hidden" name="from_name" value="WENDELO Empfehlungen" />
      <input type="text" name="name" required placeholder="Dein Name" />
      <input type="text" name="cedula" required placeholder="Deine Cédula (Ausweisnummer)" />
      <input type="tel" name="whatsapp" required placeholder="Dein WhatsApp (+595 9xx xxx xxx)" />
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Wird gesendet..." : <>Meinen Link anfragen <Send size={14} /></>}
      </button>
      <p className="referralFormNote">Wir verwenden deine Cédula ausschließlich zur Identifizierung bei der Auszahlung deiner Provision. Siehe <a href="/terminos#referidos">Bedingungen des Empfehlungsprogramms</a>.</p>
      {status === "error" && (
        <p className="referralFormError">Beim Senden ist ein Fehler aufgetreten. Versuch es erneut.</p>
      )}
    </form>
  );
}
