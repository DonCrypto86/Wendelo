"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { ArrowRight, X } from "lucide-react";

const AUTO_ADVANCE_MS = 3000;

const examples = [
  {
    name: "Liz-Store",
    description:
      "Liz-Store usa su catálogo WENDELO para presentar sus productos, mantenerlos actualizados y atender cada consulta directamente por WhatsApp.",
    href: "https://liz-store.wendelo.online",
    category: "Moda para toda la familia",
    stat: "23",
    statLabel: "productos organizados",
    logo: "/brand/liz-store-logo.png",
  },
  {
    name: "Papa Muay Thai",
    description:
      "Papa Muay Thai usa su catálogo WENDELO para mostrar su menú, mantenerlo actualizado y atender cada pedido directamente por WhatsApp.",
    href: "https://papamuaythai.wendelo.online",
    category: "Cocina tailandesa",
    stat: "35",
    statLabel: "productos organizados",
    logo: "https://papamuaythai.wendelo.online/brand/papa-muay-thai-logo.webp",
  },
  {
    name: "La Hacienda",
    description:
      "La Hacienda usa su catálogo WENDELO para mostrar sus cortes de carne, mantenerlos actualizados y atender cada pedido directamente por WhatsApp.",
    href: "https://la-hacienda.wendelo.online",
    category: "Carnes seleccionadas",
    stat: "13",
    statLabel: "productos organizados",
    logo: "https://la-hacienda.wendelo.online/brand/la-hacienda-logo.png",
  },
  {
    name: "Goshena",
    description:
      "Goshena usa su catálogo WENDELO para mostrar sus productos naturales, mantenerlos actualizados y atender cada pedido directamente por WhatsApp.",
    href: "https://goshena.wendelo.online",
    category: "Productos naturales",
    stat: "8",
    statLabel: "productos organizados",
    logo: "https://goshena.wendelo.online/brand/goshena-logo.png",
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
          <span className="eyebrow">UNA EXPERIENCIA REAL</span>
          <h2>Ya funciona para comercios de Paraguay.</h2>
          <p>{example.description}</p>
          <button type="button" className="secondary light" onClick={() => setOpen(true)}>
            Ver catálogo de ejemplo <ArrowRight />
          </button>
        </div>
        <div className="demoCard" style={cardStyle}>
          <span>CASO REAL</span>
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
          aria-label="Catálogos de ejemplo"
          onClick={() => setOpen(false)}
        >
          <div className="demoModal" onClick={(e) => e.stopPropagation()}>
            <button className="demoModalClose" aria-label="Cerrar" onClick={() => setOpen(false)}>
              <X />
            </button>
            <span className="eyebrow">CATÁLOGOS DE EJEMPLO</span>
            <h3>Elegí un catálogo para ver</h3>
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
