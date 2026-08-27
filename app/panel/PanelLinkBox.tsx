// Zielpfad im Repo: app/panel/PanelLinkBox.tsx
"use client";

import { useState } from "react";
import { Copy, MessageCircle } from "lucide-react";
import { buildWhatsAppShareUrl } from "./materiales";

export default function PanelLinkBox({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);

  const shareText = `¡Hola! Te comparto WENDELO, catálogos digitales para vender por WhatsApp: ${link}`;

  return (
    <div className="referralLinkBox panelLinkBox">
      <code>{link}</code>
      <div className="panelLinkBoxActions">
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(link);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            } catch {
              // no-op
            }
          }}
        >
          <Copy size={14} /> {copied ? "¡Copiado!" : "Copiar"}
        </button>
        <a
          href={buildWhatsAppShareUrl(shareText)}
          target="_blank"
          rel="noopener noreferrer"
          className="panelWhatsAppShare"
        >
          <MessageCircle size={14} /> Compartir por WhatsApp
        </a>
      </div>
    </div>
  );
}
