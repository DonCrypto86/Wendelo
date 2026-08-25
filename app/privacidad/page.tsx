import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "../Header";
import Footer from "../Footer";

export const metadata: Metadata = {
  title: "Política de Privacidad | WENDELO",
  description: "Cómo WENDELO recopila, utiliza y protege tus datos personales en Paraguay.",
};

export default function PrivacidadPage() {
  return (
    <main>
      <Header/>
      <section className="legalPage shell">
        <div className="legalContent">
          <Link href="/" className="legalBack"><ArrowLeft size={15}/> Volver al inicio</Link>
          <span className="eyebrow">LEGAL</span>
          <h1>Política de Privacidad</h1>
          <p className="legalUpdated">Última actualización: agosto de 2026</p>
          <div className="legalBody">
            <p>Esta Política de Privacidad explica qué datos personales recopila WENDELO a través de wendelo.online, con qué finalidad se utilizan, con quién se comparten y qué derechos tenés sobre ellos.</p>

            <h2>1. Responsable del tratamiento</h2>
            <p>El responsable del tratamiento de los datos recopilados a través de wendelo.online es <strong>Michael Iseli</strong>, con domicilio en Río de Janeiro 1131, 90701 – La Colmena, Paraguarí, República del Paraguay.</p>
            <p>Correo electrónico: <a href="mailto:mike.iseli@outlook.de">mike.iseli@outlook.de</a><br/>WhatsApp: <a href="https://wa.me/595983048976" target="_blank" rel="noreferrer">+595 983 048 976</a></p>

            <h2>2. Qué datos recopilamos</h2>
            <p>Recopilamos únicamente los datos que nos proporcionás voluntariamente a través de los formularios del sitio:</p>
            <ul>
              <li><strong>Formulario de contacto:</strong> nombre, correo electrónico, teléfono/WhatsApp (opcional) y el mensaje que escribís.</li>
              <li><strong>Formulario de referidos:</strong> nombre, número de cédula de identidad y número de WhatsApp, necesarios para identificarte y pagarte la comisión correspondiente.</li>
              <li><strong>Código de referido:</strong> si llegaste a través de un link de referido, registramos el código incluido en la URL para poder atribuir correctamente la referencia.</li>
              <li><strong>Datos técnicos básicos de navegación</strong> (por ejemplo, páginas visitadas) a través de Vercel Analytics, un servicio de analítica que no utiliza cookies de seguimiento individual.</li>
            </ul>
            <p>No solicitamos contraseñas, datos de tarjetas ni información financiera a través de estos formularios.</p>

            <h2>3. Para qué utilizamos tus datos</h2>
            <ul>
              <li>Responder a tus consultas comerciales y armar tu catálogo.</li>
              <li>Gestionar el programa de referidos, incluida la identificación del referente y el pago de comisiones.</li>
              <li>Cumplir obligaciones contables y de facturación cuando corresponda.</li>
              <li>Mejorar el funcionamiento general del sitio.</li>
            </ul>
            <p>No utilizamos tus datos con fines publicitarios ni los cedemos a terceros con fines comerciales.</p>

            <h2>4. Base legal del tratamiento</h2>
            <p>Tratamos tus datos en base a tu consentimiento, otorgado al completar voluntariamente un formulario del sitio, y en base a la ejecución de las gestiones precontractuales o contractuales que vos mismo solicitás (por ejemplo, armar tu catálogo o pagarte una comisión de referido).</p>

            <h2>5. Con quién compartimos tus datos</h2>
            <p>Los datos enviados a través de los formularios se procesan mediante los siguientes proveedores, que actúan como encargados del tratamiento:</p>
            <ul>
              <li><strong>Web3Forms:</strong> servicio utilizado para recibir los formularios y reenviarlos por correo electrónico a WENDELO.</li>
              <li><strong>Vercel Inc.:</strong> aloja el sitio wendelo.online y provee la analítica básica de navegación.</li>
            </ul>
            <p>WENDELO no vende ni cede tus datos personales a terceros con fines comerciales o publicitarios.</p>

            <h2>6. Transferencia internacional de datos</h2>
            <p>Web3Forms y Vercel operan con infraestructura ubicada fuera de Paraguay, por lo que los datos enviados a través de los formularios pueden procesarse en servidores en otros países. Procuramos utilizar proveedores reconocidos y con estándares de seguridad adecuados para este fin.</p>

            <h2>7. Plazo de conservación</h2>
            <p>Conservamos los datos recibidos por correo electrónico durante el tiempo necesario para gestionar tu consulta, tu catálogo o el pago de tu comisión de referido, y posteriormente mientras exista una obligación legal, contable o de facturación que lo justifique.</p>

            <h2>8. Tus derechos</h2>
            <p>Podés ejercer, en relación con tus datos personales, los derechos de información, acceso, rectificación, cancelación/supresión, oposición y portabilidad. Para ejercerlos, escribinos a <a href="mailto:mike.iseli@outlook.de">mike.iseli@outlook.de</a> o por WhatsApp al <a href="https://wa.me/595983048976" target="_blank" rel="noreferrer">+595 983 048 976</a>, indicando el derecho que querés ejercer. Te responderemos en un plazo razonable.</p>

            <h2>9. Seguridad de la información</h2>
            <p>Aplicamos medidas técnicas y organizativas razonables para proteger tus datos, como el uso de conexión cifrada (HTTPS) y proveedores con buenas prácticas de seguridad. Ningún sistema es completamente infalible, por lo que no podemos garantizar una seguridad absoluta.</p>

            <h2>10. Menores de edad</h2>
            <p>WENDELO no está dirigido a menores de 18 años. No recopilamos intencionalmente datos de menores de edad.</p>

            <h2>11. Cookies y tecnologías similares</h2>
            <p>Actualmente WENDELO utiliza Vercel Analytics, un servicio de analítica que no emplea cookies de seguimiento individual. No usamos cookies de publicidad ni de terceros. Si en el futuro incorporamos herramientas que requieran cookies, publicaremos una Política de Cookies específica.</p>

            <h2>12. Marco legal</h2>
            <p>Esta política se elabora conforme a los principios de la Ley N.º 4868/2013 de Comercio Electrónico y de la Ley N.º 7.593/2025 de Protección de Datos Personales de la República del Paraguay. Esta última entrará en plena vigencia en noviembre de 2027; WENDELO aplica sus principios de manera anticipada y voluntaria como buena práctica.</p>

            <h2>13. Cambios en esta política</h2>
            <p>Podemos actualizar esta Política de Privacidad cuando cambie la legislación, cambien las funciones de la plataforma o existan mejoras del servicio. La versión vigente se publica siempre en wendelo.online/privacidad.</p>

            <h2>14. Contacto</h2>
            <p>WENDELO — Michael Iseli<br/>La Colmena, Paraguarí, Paraguay<br/>📧 <a href="mailto:mike.iseli@outlook.de">mike.iseli@outlook.de</a><br/>📱 <a href="https://wa.me/595983048976" target="_blank" rel="noreferrer">+595 983 048 976</a></p>
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}
