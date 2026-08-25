import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "../Header";
import Footer from "../Footer";

export const metadata: Metadata = {
  title: "Términos y Condiciones | WENDELO",
  description: "Términos y condiciones de uso de la plataforma WENDELO en Paraguay.",
};

export default function TerminosPage() {
  return (
    <main>
      <Header/>
      <section className="legalPage shell">
        <div className="legalContent">
          <Link href="/" className="legalBack"><ArrowLeft size={15}/> Volver al inicio</Link>
          <span className="eyebrow">LEGAL</span>
          <h1>Términos y Condiciones de Uso de WENDELO</h1>
          <p className="legalUpdated">Última actualización: agosto de 2026</p>
          <div className="legalBody">
            <p>Bienvenido a WENDELO. Estos Términos y Condiciones regulan el acceso y uso de la plataforma WENDELO, disponible en wendelo.online, así como los servicios ofrecidos a vendedores, revendedores, comercios y empresas dentro de la República del Paraguay.</p>
            <p>Al crear una cuenta, contratar un catálogo o utilizar cualquier servicio de WENDELO, el usuario declara haber leído, comprendido y aceptado íntegramente estos Términos y Condiciones.</p>

            <h2>1. Responsable de la plataforma</h2>
            <p>WENDELO es un producto operado por <strong>Michael Iseli</strong>, persona física con actividad comercial (no una sociedad constituida), con domicilio en Río de Janeiro 1131, 90701 – La Colmena, Paraguarí, República del Paraguay.</p>
            <p>Correo electrónico: <a href="mailto:mike.iseli@outlook.de">mike.iseli@outlook.de</a><br/>WhatsApp: <a href="https://wa.me/595983048976" target="_blank" rel="noreferrer">+595 983 048 976</a><br/>RUC: en trámite. Será incorporado una vez disponible.</p>

            <h2>2. ¿Qué es WENDELO?</h2>
            <p>WENDELO es una plataforma digital que permite crear catálogos online personalizados para vender productos utilizando WhatsApp como canal de comunicación entre el vendedor y sus clientes.</p>
            <p>WENDELO no vende productos propios, salvo que se indique expresamente. Cada usuario administra su propio catálogo y mantiene la relación comercial con sus clientes.</p>

            <h2>3. Quién puede utilizar WENDELO</h2>
            <p>Pueden utilizar WENDELO:</p>
            <ul>
              <li>Personas mayores de 18 años.</li>
              <li>Revendedores independientes.</li>
              <li>Comercios y emprendimientos.</li>
              <li>Empresas.</li>
              <li>Equipos comerciales mediante WENDELO Empresas.</li>
            </ul>
            <p>El usuario garantiza que tiene capacidad legal para contratar el servicio.</p>

            <h2>4. Registro de cuenta</h2>
            <p>Para utilizar determinadas funciones será necesario crear una cuenta. El usuario se compromete a proporcionar información verdadera y mantenerla actualizada. Cada cuenta es personal y no debe compartirse con terceros sin autorización. El usuario es responsable por la confidencialidad de su contraseña y por toda actividad realizada desde su cuenta.</p>

            <h2>5. Qué incluye WENDELO</h2>
            <p>El servicio estándar incluye:</p>
            <ul>
              <li>Catálogo digital personalizado.</li>
              <li>Dirección propia dentro de WENDELO.</li>
              <li>Administración de productos.</li>
              <li>Categorías.</li>
              <li>Fotografías y descripciones.</li>
              <li>Botón de contacto por WhatsApp.</li>
              <li>Diseño optimizado para celulares.</li>
              <li>Estadísticas básicas del catálogo.</li>
            </ul>
            <p>WENDELO podrá agregar nuevas funciones en el futuro.</p>

            <h2>6. Precio y forma de pago</h2>
            <p><strong>Plan WENDELO — Configuración inicial:</strong> Gs. 600.000 (pago único). Incluye la creación y configuración completa del catálogo y el primer año del servicio.</p>
            <p><strong>Renovación anual:</strong> a partir del segundo año, Gs. 180.000 por año. La renovación permite mantener activo el catálogo y la infraestructura del servicio.</p>
            <p><strong>Servicios adicionales</strong> no incluidos en el precio estándar: dominio propio (.com.py u otro), diseño completamente personalizado, carga masiva de productos, desarrollo de funciones especiales, integraciones con sistemas externos, servicios de marketing o publicidad. Estos servicios podrán presupuestarse por separado.</p>

            <h2 id="referidos">7. Programa de Referidos</h2>
            <p>WENDELO ofrece un programa de referidos mediante el cual cualquier persona puede compartir un link o código de referido para recomendar WENDELO a nuevos clientes. Al solicitar un link de referido, el referente acepta las siguientes condiciones:</p>
            <ul>
              <li>El referente recibe una comisión única de <strong>Gs. 90.000</strong> por cada nuevo cliente referido que contrate WENDELO y complete el pago total de la implementación (Gs. 600.000). No se generan comisiones por consultas, registros o contrataciones que no lleguen a pagarse en su totalidad.</li>
              <li>No corresponde comisión por autorreferidos: el referente no puede generar una comisión recomendándose a sí mismo, a su propio negocio, ni utilizando datos de terceros sin su conocimiento.</li>
              <li>Cada cliente referido genera como máximo una comisión, incluso si fue contactado por más de un referente. La comisión se asigna al primer referido válido registrado para ese cliente.</li>
              <li>El pago de la comisión se realiza dentro de un plazo aproximado de 15 días hábiles luego de confirmado el pago completo del cliente referido, mediante el medio de contacto informado por el referente.</li>
              <li>Si la contratación del cliente referido es cancelada, anulada o reembolsada total o parcialmente, WENDELO podrá anular o recuperar la comisión correspondiente ya pagada.</li>
              <li>Participar del programa de referidos no otorga al referente la condición de empleado, socio ni representante oficial de WENDELO. El referente no está autorizado a presentarse como tal ante terceros.</li>
              <li>Para procesar el pago de la comisión, WENDELO podrá solicitar al referente datos como nombre completo, número de cédula de identidad y número de contacto, utilizados exclusivamente para identificarlo y realizar el pago correspondiente, conforme a la <Link href="/privacidad">Política de Privacidad</Link>.</li>
              <li>WENDELO podrá modificar el monto, las condiciones o suspender el programa de referidos en cualquier momento. Los cambios se aplican únicamente a las referencias futuras y no afectan comisiones ya generadas y confirmadas.</li>
            </ul>

            <h2>8. Cancelación y suspensión del servicio</h2>
            <p>El usuario puede solicitar la cancelación de su catálogo en cualquier momento. La cancelación no genera devolución de pagos ya realizados, salvo obligación legal.</p>
            <p>WENDELO podrá suspender temporal o definitivamente una cuenta cuando exista incumplimiento de estos términos, se utilice la plataforma para actividades ilegales, se publique contenido prohibido, exista fraude o intento de fraude, o se afecte la seguridad o funcionamiento de la plataforma.</p>

            <h2>9. Productos publicados por los usuarios</h2>
            <p>Cada vendedor es el único responsable de los productos publicados, incluyendo precios, fotografías, descripciones, disponibilidad, promociones, stock, garantías y el cumplimiento de las leyes aplicables.</p>
            <p>WENDELO no garantiza la existencia, calidad o disponibilidad de ningún producto publicado por sus usuarios.</p>

            <h2>10. Productos prohibidos</h2>
            <p>Está prohibido publicar productos o servicios cuya comercialización sea ilegal en Paraguay o infrinja derechos de terceros. Entre otros: productos falsificados, mercancía robada, armas y explosivos, drogas o sustancias prohibidas, medicamentos cuya venta requiera autorización legal, productos que infrinjan propiedad intelectual, contenido pornográfico o ilegal, y productos destinados a actividades ilícitas.</p>
            <p>WENDELO podrá eliminar inmediatamente dichos contenidos.</p>

            <h2>11. Fotografías, marcas y derechos de autor</h2>
            <p>El usuario declara que posee los derechos necesarios para utilizar las fotografías, logotipos, nombres comerciales, marcas, imágenes y textos que publica. El usuario es responsable por cualquier infracción de derechos de propiedad intelectual.</p>
            <p>Si WENDELO recibe una notificación válida sobre una posible infracción, podrá retirar el contenido mientras analiza el caso.</p>

            <h2>12. WhatsApp</h2>
            <p>WENDELO utiliza WhatsApp únicamente como canal de contacto entre vendedor y cliente. WENDELO no controla WhatsApp, no almacena conversaciones privadas y no garantiza la disponibilidad del servicio de WhatsApp. Toda conversación posterior se realiza bajo las políticas de WhatsApp.</p>

            <h2>13. Estadísticas y analítica</h2>
            <p>WENDELO puede mostrar al usuario estadísticas relacionadas con su catálogo, por ejemplo visitas, productos vistos, clics en WhatsApp y productos más consultados. Estas estadísticas corresponden únicamente a la actividad registrada dentro de WENDELO. WENDELO no mide las visualizaciones de Estados de WhatsApp.</p>

            <h2>14. WENDELO Empresas</h2>
            <p>WENDELO Empresas permite que una organización administre varios vendedores desde una cuenta empresarial. Cada vendedor puede tener un catálogo individual. La empresa puede acceder únicamente a las estadísticas incluidas en el plan contratado, y es responsable de informar a sus colaboradores cuando utilice herramientas de medición relacionadas con sus catálogos.</p>

            <h2>15. Obligaciones del usuario</h2>
            <p>El usuario se compromete a utilizar WENDELO de buena fe, publicar únicamente información verdadera, mantener actualizados sus productos, respetar las leyes paraguayas, respetar los derechos de consumidores y terceros, y no utilizar WENDELO para spam o fraude.</p>

            <h2>16. Responsabilidad de WENDELO</h2>
            <p>WENDELO presta un servicio tecnológico y no participa como comprador ni vendedor de los productos publicados. No garantiza ventas, cantidad de visitas, cantidad de clientes, resultados comerciales ni posicionamiento en buscadores. La responsabilidad de la relación comercial corresponde al vendedor.</p>

            <h2>17. Disponibilidad del servicio</h2>
            <p>WENDELO procura mantener la plataforma disponible de forma continua. Sin embargo, podrán producirse interrupciones por mantenimiento, mejoras, fallas técnicas o causas ajenas al control de WENDELO. WENDELO no garantiza disponibilidad ininterrumpida del servicio.</p>

            <h2>18. Copias de seguridad y contenido</h2>
            <p>WENDELO podrá realizar copias de seguridad por motivos técnicos y de seguridad. El usuario sigue siendo responsable de conservar una copia de la información importante de su negocio.</p>

            <h2>19. Facturación</h2>
            <p>Cuando corresponda, WENDELO emitirá la documentación tributaria conforme a la normativa vigente en Paraguay. El usuario deberá proporcionar los datos de facturación requeridos.</p>

            <h2>20. Derecho de retracto</h2>
            <p>Cuando la legislación paraguaya otorgue derecho de retracto para servicios contratados electrónicamente, dicho derecho será respetado en los casos previstos por la Ley N.º 4868/2013. No obstante, el derecho de retracto puede no aplicar cuando el servicio haya sido completamente personalizado o ejecutado según las especificaciones del cliente (por ejemplo, la creación de un catálogo personalizado), conforme a las excepciones previstas por la propia ley para servicios personalizados.</p>

            <h2>21. Protección de datos</h2>
            <p>El tratamiento de datos personales se encuentra regulado por la <Link href="/privacidad">Política de Privacidad</Link> de WENDELO, que forma parte integrante de estos Términos y Condiciones.</p>

            <h2>22. Modificaciones</h2>
            <p>WENDELO podrá actualizar estos Términos y Condiciones cuando cambie la legislación, cambien las funciones de la plataforma o existan mejoras del servicio. Las modificaciones se publicarán en wendelo.online.</p>

            <h2>23. Legislación aplicable</h2>
            <p>Estos Términos y Condiciones se rigen por las leyes de la República del Paraguay. En particular, serán aplicables las normas paraguayas sobre comercio electrónico, protección del consumidor y protección de datos personales.</p>

            <h2>24. Jurisdicción</h2>
            <p>Cualquier conflicto relacionado con WENDELO será sometido a la jurisdicción de los tribunales competentes de la República del Paraguay, salvo disposición legal imperativa en contrario.</p>

            <h2>25. Contacto</h2>
            <p>WENDELO — Michael Iseli<br/>La Colmena, Paraguarí, Paraguay<br/>📧 <a href="mailto:mike.iseli@outlook.de">mike.iseli@outlook.de</a><br/>📱 <a href="https://wa.me/595983048976" target="_blank" rel="noreferrer">+595 983 048 976</a></p>
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}
