// Zielpfad im Repo: app/panel/PanelLinkBox.tsx
"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

export default function PanelLinkBox({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="referralLinkBox panelLinkBox">
      <code>{link}</code>
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
    </div>
  );
}
