"use client";

import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";

const examples = [
  {
    name: "Liz-Store",
    description:
      "Liz-Store usa su catálogo WENDELO para presentar sus productos, mantenerlos actualizados y atender cada consulta directamente por WhatsApp.",
    href: "https://liz-store.wendelo.online",
    category: "Moda para toda la familia",
    stat: "23",
    statLabel: "productos organizados",
  },
  {
    name: "Papa Muay Thai",
    description:
      "Papa Muay Thai usa su catálogo WENDELO para mostrar su menú, mantenerlo actualizado y atender cada pedido directamente por WhatsApp.",
    href: "https://papamuaythai.wendelo.online",
    category: "Cocina tailandesa",
    stat: "35",
    statLabel: "productos organizados",
  },
];

export default function DemoSection() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const go = (next: number) =>
    setIndex(((next % examples.length) + examples.length) % examples.length);
  const example = examples[index];

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
        <div className="demoCard">
          <span>CASO REAL</span>
          <strong>{example.name}</strong>
          <p>{example.category}</p>
          <div>
            <i>{example.stat}</i>
            <small>{example.statLabel}</small>
          </div>
        </div>
      </div>
      <div className="shell demoNav">
        <button aria-label="Caso anterior" onClick={() => go(index - 1)}>
          <ChevronLeft />
        </button>
        <div className="demoDots">
          {examples.map((item, i) => (
            <button
              key={item.name}
              aria-label={`Ver caso: ${item.name}`}
              aria-current={i === index}
              className={i === index ? "demoDot active" : "demoDot"}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button aria-label="Siguiente caso" onClick={() => go(index + 1)}>
          <ChevronRight />
        </button>
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
