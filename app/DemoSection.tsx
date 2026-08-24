"use client";

import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

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
          <a className="secondary light" href={example.href} target="_blank">
            Ver catálogo de ejemplo <ArrowRight />
          </a>
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
    </section>
  );
}
