import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wendelo | Tu catálogo digital para WhatsApp",
  description: "Catálogos digitales simples para vender por WhatsApp en Paraguay.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}<Analytics /></body>
    </html>
  );
}
