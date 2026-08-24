"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Cargás todos tus productos",
    short: "Subís varias fotos a la vez y armás tu catálogo en minutos.",
    image: "/steps/step-1.webp",
    paragraphs: [
      "Desde tu propio panel de administración podés subir todos los productos de manera rápida y sencilla. Seleccionás varias fotos al mismo tiempo y WENDELO crea automáticamente un producto por cada imagen. Después solamente agregás el nombre, el precio, la categoría y los detalles necesarios. En pocos minutos, tu catálogo queda completo, organizado y listo para compartir.",
    ],
  },
  {
    n: "02",
    title: "Compartís tu catálogo",
    short: "Un solo enlace, flyers automáticos y productos individuales listos para enviar.",
    image: "/steps/step-2.webp",
    paragraphs: [
      "Ya no necesitás subir cada foto y cada producto por separado a tu Estado. Podés compartir un solo enlace para que tus clientes encuentren todo tu catálogo actualizado.",
      "Además, desde el panel de administración podés seleccionar «Crear flyer». WENDELO genera automáticamente un flyer con cuatro productos elegidos al azar y el enlace a tu catálogo, listo para compartir en tu Estado. Y si preferís promocionar un producto específico, también podés compartirlo directamente desde el catálogo con su imagen, precio y enlace.",
    ],
  },
  {
    n: "03",
    title: "Tu cliente mira y elige",
    short: "Filtra, compara y te escribe directo por WhatsApp cuando le interesa algo.",
    image: "/steps/step-3.webp",
    paragraphs: [
      "Tus clientes pueden recorrer el catálogo tranquilamente desde su celular, filtrar por categorías, comparar precios y abrir cada producto para verlo con más detalle. También pueden compartirlo con otras personas o escribirte directamente para iniciar una conversación de compra.",
      "Vos seguís vendiendo por WhatsApp como siempre; WENDELO solamente hace que todo el proceso sea más claro y ordenado. Así recibís menos preguntas repetidas, ahorrás tiempo y podés concentrarte en atender y vender.",
    ],
  },
  {
    n: "04",
    title: "La consulta llega a WhatsApp",
    short: "Con el producto ya identificado, para responder más rápido.",
    image: "/steps/step-4.webp",
    paragraphs: [
      "Cuando un cliente encuentra algo que le interesa, puede comunicarse con vos directamente por WhatsApp. La consulta incluye el nombre y la referencia del producto elegido, para que sepas inmediatamente por qué artículo está preguntando.",
      "Ya no necesitás pedir capturas de pantalla ni tratar de identificar el producto entre decenas de fotos. Podés responder con mayor rapidez, confirmar disponibilidad, resolver las últimas dudas y continuar la venta personalmente por WhatsApp.",
    ],
  },
];

export default function StepsSection() {
  const [open, setOpen] = useState<number | null>(null);
  const active = open !== null ? steps[open] : null;

  return (
    <section className="how shell" id="como-funciona">
      <div className="sectionHead">
        <span className="eyebrow">SIMPLE DESDE EL PRIMER DÍA</span>
        <h2>Así funciona WENDELO</h2>
        <p>Sin complicaciones técnicas. Una herramienta práctica para vender como ya vendés, pero mucho mejor organizada.</p>
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
              Ver más <ArrowRight size={14} />
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
            <button className="demoModalClose" aria-label="Cerrar" onClick={() => setOpen(null)}>
              <X />
            </button>
            <Image className="stepsModalImage" src={active.image} alt="" width={600} height={600} />
            <span className="eyebrow">PASO {active.n}</span>
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
