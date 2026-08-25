"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Du lädst alle deine Produkte hoch",
    short: "Lade mehrere Fotos gleichzeitig hoch und erstelle deinen Katalog in Minuten.",
    image: "/steps/step-1.webp",
    paragraphs: [
      "Über dein eigenes Verwaltungspanel kannst du alle Produkte schnell und einfach hochladen. Du wählst mehrere Fotos gleichzeitig aus und WENDELO erstellt automatisch ein Produkt pro Bild. Danach fügst du nur noch Name, Preis, Kategorie und die nötigen Details hinzu. In wenigen Minuten ist dein Katalog vollständig, organisiert und bereit zum Teilen.",
    ],
  },
  {
    n: "02",
    title: "Du teilst deinen Katalog",
    short: "Ein einziger Link, automatische Flyer und einzelne Produkte, versandbereit.",
    image: "/steps/step-2.webp",
    paragraphs: [
      "Du musst nicht mehr jedes Foto und jedes Produkt einzeln in deinen Status hochladen. Du teilst einfach einen einzigen Link, damit deine Kunden deinen gesamten aktuellen Katalog finden.",
      "Außerdem kannst du im Verwaltungspanel «Flyer erstellen» auswählen. WENDELO generiert automatisch einen Flyer mit vier zufällig ausgewählten Produkten und dem Link zu deinem Katalog, bereit zum Teilen in deinem Status. Und wenn du lieber ein bestimmtes Produkt bewerben willst, kannst du es auch direkt aus dem Katalog teilen – mit Bild, Preis und Link.",
    ],
  },
  {
    n: "03",
    title: "Dein Kunde schaut und wählt",
    short: "Filtert, vergleicht und schreibt dir direkt über WhatsApp, wenn etwas interessiert.",
    image: "/steps/step-3.webp",
    paragraphs: [
      "Deine Kunden können den Katalog in Ruhe von ihrem Handy aus durchstöbern, nach Kategorien filtern, Preise vergleichen und jedes Produkt im Detail ansehen. Sie können ihn auch mit anderen teilen oder dir direkt schreiben, um ein Verkaufsgespräch zu beginnen.",
      "Du verkaufst weiterhin über WhatsApp wie gewohnt; WENDELO macht den ganzen Prozess nur klarer und geordneter. So bekommst du weniger wiederholte Fragen, sparst Zeit und kannst dich aufs Betreuen und Verkaufen konzentrieren.",
    ],
  },
  {
    n: "04",
    title: "Die Anfrage kommt bei WhatsApp an",
    short: "Mit bereits identifiziertem Produkt, um schneller zu antworten.",
    image: "/steps/step-4.webp",
    paragraphs: [
      "Wenn ein Kunde etwas findet, das ihn interessiert, kann er dich direkt über WhatsApp kontaktieren. Die Anfrage enthält Name und Referenz des gewählten Produkts, damit du sofort weißt, nach welchem Artikel gefragt wird.",
      "Du musst nicht mehr um Screenshots bitten oder versuchen, das Produkt unter Dutzenden Fotos zu identifizieren. Du kannst schneller antworten, Verfügbarkeit bestätigen, letzte Fragen klären und den Verkauf persönlich über WhatsApp fortsetzen.",
    ],
  },
];

export default function StepsSection() {
  const [open, setOpen] = useState<number | null>(null);
  const active = open !== null ? steps[open] : null;

  return (
    <section className="how shell" id="como-funciona">
      <div className="sectionHead">
        <span className="eyebrow">EINFACH VOM ERSTEN TAG AN</span>
        <h2>So funktioniert WENDELO</h2>
        <p>Ohne technische Komplikationen. Ein praktisches Tool, um so zu verkaufen wie bisher – nur viel besser organisiert.</p>
      </div>
      <div className="steps">
        {steps.map((step, i) => (
          <article
            key={step.n}
            onClick={() => setOpen(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setOpen(i);
            }}
          >
            <span>{step.n}</span>
            <h3>{step.title}</h3>
            <p>{step.short}</p>
            <span className="stepsMore">
              Mehr sehen <ArrowRight size={14} />
            </span>
          </article>
        ))}
      </div>

      {active && (
        <div
          className="demoModalOverlay"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setOpen(null)}
        >
          <div className="stepsModal" onClick={(e) => e.stopPropagation()}>
            <button className="demoModalClose" aria-label="Schließen" onClick={() => setOpen(null)}>
              <X />
            </button>
            <Image className="stepsModalImage" src={active.image} alt="" width={600} height={600} />
            <span className="eyebrow">SCHRITT {active.n}</span>
            <h3>{active.title}</h3>
            {active.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
