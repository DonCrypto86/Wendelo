// Zielpfad im Repo: app/panel/MaterialesSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Download, MessageCircle } from "lucide-react";
import { PROMO_TEXTS, PROMO_BANNERS, buildEmbedSnippet, buildWhatsAppShareUrl } from "./materiales";

function CopyButton({ text, label = "Copiar" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="panelCopyButton"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // no-op
        }
      }}
    >
      <Copy size={13} /> {copied ? "¡Copiado!" : label}
    </button>
  );
}

export default function MaterialesSection({ link }: { link: string }) {
  return (
    <section className="panelMateriales">
      <h2>Materiales para compartir</h2>

      <div className="panelMaterialesBlock">
        <h3>Textos listos para usar</h3>
        <div className="panelPromoTexts">
          {PROMO_TEXTS.map((item) => {
            const finalText = item.text.replace("{link}", link);
            return (
              <div key={item.id} className="panelPromoText">
                <span>{item.label}</span>
                <p>{finalText}</p>
                <div className="panelPromoTextActions">
                  <CopyButton text={finalText} />
                  <a
                    href={buildWhatsAppShareUrl(finalText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="panelWhatsAppShare"
                  >
                    <MessageCircle size={13} /> Compartir por WhatsApp
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="panelMaterialesBlock">
        <h3>Banners para descargar</h3>
        <div className="panelBanners">
          {PROMO_BANNERS.map((banner) => (
            <div key={banner.id} className="panelBanner">
              <Image src={`/materiales/${banner.file}`} alt={banner.label} width={941} height={1672} />
              <a href={`/materiales/${banner.file}`} download className="panelBannerDownload">
                <Download size={13} /> Descargar
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="panelMaterialesBlock">
        <h3>Para pegar en tu web o bio-link (HTML)</h3>
        <p className="panelMaterialesNote">Muestra un banner con tu link, listo para pegar en tu sitio.</p>
        <pre className="panelEmbedCode">{buildEmbedSnippet(link, PROMO_BANNERS[0].file)}</pre>
        <CopyButton text={buildEmbedSnippet(link, PROMO_BANNERS[0].file)} label="Copiar código HTML" />
      </div>
    </section>
  );
}
