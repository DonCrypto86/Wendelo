import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "../Header";
import Footer from "../Footer";

export const metadata: Metadata = {
  title: "Aviso Legal | WENDELO",
  description: "Identificación del responsable de la plataforma WENDELO en Paraguay.",
};

export default function AvisoLegalPage() {
  return (
    <main>
      <Header/>
      <section className="legalPage shell">
        <div className="legalContent">
          <Link href="/" className="legalBack"><ArrowLeft size={15}/> Volver al inicio</Link>
          <span className="eyebrow">LEGAL</span>
          <h1>Aviso Legal</h1>
          <p className="legalUpdated">Última actualización: agosto de 2026</p>
          <div className="legalBody">
            <h2>1. Identificación del responsable</h2>
            <p>WENDELO es un producto digital operado por <strong>Michael Iseli</strong>, persona física con actividad comercial, con domicilio en Río de Janeiro 1131, 90701 – La Colmena, Paraguarí, República del Paraguay.</p>
            <p>Correo electrónico: <a href="mailto:mike.iseli@outlook.de">mike.iseli@outlook.de</a><br/>WhatsApp: <a href="https://wa.me/595983048976" target="_blank" rel="noreferrer">+595 983 048 976</a><br/>RUC: en trámite. Será publicado en esta página una vez emitido.</p>

            <h2>2. Naturaleza de WENDELO</h2>
            <p>WENDELO es una marca y un producto, no una sociedad ni una persona jurídica independiente. Todas las obligaciones legales, contractuales y fiscales relacionadas con el servicio son asumidas directamente por Michael Iseli.</p>

            <h2>3. Actividad</h2>
            <p>Desarrollo y operación de una plataforma digital de catálogos online para la venta de productos y servicios por WhatsApp, dirigida a comercios, emprendedores y empresas en la República del Paraguay.</p>

            <h2>4. Alojamiento (hosting)</h2>
            <p>El sitio wendelo.online está alojado por Vercel Inc., proveedor internacional de infraestructura web.</p>

            <h2>5. Propiedad intelectual</h2>
            <p>El nombre WENDELO, su logotipo, diseño y los contenidos propios del sitio son propiedad de Michael Iseli, salvo que se indique lo contrario. Su reproducción total o parcial sin autorización está prohibida.</p>

            <h2>6. Más información</h2>
            <p>Para conocer las condiciones de uso del servicio y el tratamiento de tus datos personales, consultá los <Link href="/terminos">Términos y Condiciones</Link> y la <Link href="/privacidad">Política de Privacidad</Link> de WENDELO.</p>

            <h2>7. Legislación aplicable</h2>
            <p>Este aviso legal se rige por las leyes de la República del Paraguay.</p>

            <h2>8. Contacto</h2>
            <p>WENDELO — Michael Iseli<br/>La Colmena, Paraguarí, Paraguay<br/>📧 <a href="mailto:mike.iseli@outlook.de">mike.iseli@outlook.de</a><br/>📱 <a href="https://wa.me/595983048976" target="_blank" rel="noreferrer">+595 983 048 976</a></p>
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}
