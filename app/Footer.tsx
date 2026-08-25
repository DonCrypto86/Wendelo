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
            <p>Catálogos digitales para vender por WhatsApp.</p>
          </div>
          <a className="footerCreator" href="https://michael-iseli.online/es" target="_blank">
            <span>WENDELO es un producto de</span>
            <Image src="/brand/michael-iseli-logo.webp" alt="Michael Iseli" width={280} height={75} />
          </a>
        </div>
        <div className="footerBottom">
          <div className="footerLinks">
            <a href="/aviso-legal">Aviso legal</a>
            <a href="/privacidad">Política de privacidad</a>
            <a href="/terminos">Términos y condiciones</a>
          </div>
          <p className="footerCopyright">© 2026 WENDELO. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
