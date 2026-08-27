// Zielpfad im Repo: app/panel/materiales.ts
// Textos y banners para que cada referidor comparta su link. Los textos usan
// {link} como marcador, que se reemplaza por el link real del referidor.

export const PROMO_TEXTS = [
  {
    id: "estado",
    label: "Para tu Estado de WhatsApp",
    text: "¿Por qué subir 30 fotos a tu Estado si un solo enlace alcanza? 👀 Descubrí WENDELO, catálogos digitales para vender por WhatsApp: {link}",
  },
  {
    id: "chat",
    label: "Para mandar por chat",
    text: "Te comento sobre WENDELO 🔗 Es un catálogo digital para mostrar todos tus productos con un solo link, siempre actualizado, y cada consulta te llega directo por WhatsApp. Sin carrito, sin complicaciones. Mirá cómo funciona: {link}",
  },
  {
    id: "bio",
    label: "Para tu bio de Instagram",
    text: "Vendé más, publicá menos 📲 Tu catálogo digital en un solo enlace → {link}",
  },
] as const;

export const PROMO_BANNERS = [
  { id: "vende-mas-1", label: "Vendé más. Publicá menos.", file: "banner-vende-mas-1.png" },
  { id: "catalogo-digital-2", label: "Tu catálogo digital", file: "banner-catalogo-digital-2.png" },
] as const;

export function buildWhatsAppShareUrl(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function buildEmbedSnippet(link: string, bannerFile: string) {
  return `<a href="${link}" target="_blank" rel="noopener" style="display:inline-block;text-decoration:none">
  <img src="https://wendelo.online/materiales/${bannerFile}" alt="WENDELO — Catálogos digitales para vender por WhatsApp" style="max-width:320px;width:100%;border-radius:16px;display:block" />
</a>`;
}
