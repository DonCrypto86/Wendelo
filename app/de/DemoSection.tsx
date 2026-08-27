"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { ArrowRight, X } from "lucide-react";

const AUTO_ADVANCE_MS = 3000;

const examples = [
  {
    name: "Liz-Store",
    description:
      "Liz-Store nutzt seinen WENDELO-Katalog, um Produkte zu präsentieren, sie aktuell zu halten und jede Anfrage direkt über WhatsApp zu beantworten.",
    href: "https://liz-store.wendelo.online",
    category: "Mode für die ganze Familie",
    stat: "23",
    statLabel: "organisierte Produkte",
    logo: "/brand/liz-store-logo.png",
  },
  {
    name: "Papa Muay Thai",
    description:
      "Papa Muay Thai nutzt seinen WENDELO-Katalog, um sein Menü zu zeigen, es aktuell zu halten und jede Bestellung direkt über WhatsApp zu bearbeiten.",
    href: "https://papamuaythai.wendelo.online",
    category: "Thailändische Küche",
    stat: "35",
    statLabel: "organisierte Produkte",
    logo: "https://papamuaythai.wendelo.online/brand/papa-muay-thai-logo.webp",
  },
  {
    name: "La Hacienda",
    description:
      "La Hacienda nutzt seinen WENDELO-Katalog, um seine Fleischsorten zu zeigen, sie aktuell zu halten und jede Bestellung direkt über WhatsApp zu bearbeiten.",
    href: "https://la-hacienda.wendelo.online",
    category: "Ausgewähltes Fleisch",
    stat: "13",
    statLabel: "organisierte Produkte",
    logo: "https://la-hacienda.wendelo.online/brand/la-hacienda-logo.png",
  },
];

export default function DemoSection() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const example = examples[index];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % examples.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, []);

  const cardStyle = {
    "--demo-card-logo": `url(${example.logo})`,
  } as CSSProperties;

  return (
    <section className="demo">
      <div className="shell demoInner">
        <div>
          <span className="eyebrow">EINE ECHTE ERFAHRUNG</span>
          <h2>Funktioniert bereits für Geschäfte in Paraguay.</h2>
          <p>{example.description}</p>
          <button type="button" className="secondary light" onClick={() => setOpen(true)}>
            Beispielkatalog ansehen <ArrowRight />
          </button>
        </div>
        <div className="demoCard" style={cardStyle}>
          <span>ECHTER FALL</span>
          <strong>{example.name}</strong>
          <p>{example.category}</p>
          <div>
            <i>{example.stat}</i>
            <small>{example.statLabel}</small>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="demoModalOverlay"
          role="dialog"
          aria-modal="true"
          aria-label="Beispielkataloge"
          onClick={() => setOpen(false)}
        >
          <div className="demoModal" onClick={(e) => e.stopPropagation()}>
            <button className="demoModalClose" aria-label="Schließen" onClick={() => setOpen(false)}>
              <X />
            </button>
            <span className="eyebrow">BEISPIELKATALOGE</span>
            <h3>Wähle einen Katalog zum Ansehen</h3>
            <ul className="demoModalList">
              {examples.map((item) => (
                <li key={item.name}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    <span>
                      <strong>{item.name}</strong>
                      <small>{item.category}</small>
                    </span>
                    <ArrowRight />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
