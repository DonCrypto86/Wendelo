import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="shell">
        <div className="footerTop">
          <div className="footerWendelo">
            <div className="footerBrand">
              <Image src="/brand/wendelo-symbol.png" alt="" width={58} height={58} />
              <Image src="/brand/wendelo-wordmark.png" alt="WENDELO" width={155} height={39} />
            </div>
            <p>Digitale Kataloge für den Verkauf über WhatsApp.</p>
          </div>
          <a className="footerCreator" href="https://michael-iseli.online/es" target="_blank">
            <span>WENDELO ist ein Produkt von</span>
            <Image src="/brand/michael-iseli-logo.webp" alt="Michael Iseli" width={280} height={75} />
          </a>
        </div>
        <div className="footerBottom">
          <div className="footerLinks">
            <a href="/aviso-legal">Impressum</a>
            <a href="/privacidad">Datenschutzerklärung</a>
            <a href="/terminos">AGB</a>
          </div>
          <p className="footerCopyright">© 2026 WENDELO. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
