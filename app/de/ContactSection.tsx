"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Check, Send } from "lucide-react";

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
        <span className="eyebrow">LASS UNS REDEN</span>
        <h2>Erzähl uns von deinem Geschäft</h2>
        <p>Füll das Formular aus und wir melden uns zeitnah, um deinen Katalog zu erstellen.</p>
      </div>

      {status === "sent" ? (
        <div className="contactSuccess">
          <Check />
          <p>Danke! Deine Nachricht wurde gesendet. Wir melden uns bald.</p>
        </div>
      ) : (
        <form className="contactForm" onSubmit={handleSubmit}>
          <input type="hidden" name="access_key" value="26fed38b-36d3-49b3-9233-281feb48727b" />
          <input type="hidden" name="subject" value={refCode ? `Neue Anfrage von wendelo.online/de (Ref: ${refCode})` : "Neue Anfrage von wendelo.online/de"} />
          <input type="hidden" name="from_name" value="WENDELO" />
          {refCode && <input type="hidden" name="referral_code" value={refCode} />}
          {refCode && (
            <div className="contactReferral">
              <Check size={15} /> Du wurdest empfohlen von <strong>{refCode}</strong>
            </div>
          )}
          <div className="contactRow">
            <div className="contactField">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" name="name" required placeholder="Dein Name" />
            </div>
            <div className="contactField">
              <label htmlFor="email">E-Mail</label>
              <input id="email" type="email" name="email" required placeholder="deine@email.com" />
            </div>
          </div>
          <div className="contactField">
            <label htmlFor="phone">WhatsApp (optional)</label>
            <input id="phone" type="tel" name="phone" placeholder="+595 9xx xxx xxx" />
          </div>
          <div className="contactField">
            <label htmlFor="message">Erzähl uns von deinem Geschäft</label>
            <textarea id="message" name="message" required placeholder="Welche Produkte verkaufst du und was möchtest du mit WENDELO erreichen?" rows={5}></textarea>
          </div>
          <button type="submit" className="primary" disabled={status === "sending"}>
            {status === "sending" ? "Wird gesendet..." : <>Nachricht senden <Send size={18} /></>}
          </button>
          {status === "error" && (
            <p className="contactError">Beim Senden ist ein Fehler aufgetreten. Versuch es erneut oder schreib uns über WhatsApp.</p>
          )}
        </form>
      )}
    </section>
  );
}
