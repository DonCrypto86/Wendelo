import Image from "next/image";
import { ArrowRight, BarChart3, Building2, Check, ChevronDown, MessageCircle, Palette, Share2, Smartphone, Store, Users } from "lucide-react";

const whatsapp = "https://wa.me/595983048976?text=";
const message = (text: string) => `${whatsapp}${encodeURIComponent(text)}`;

const steps = [
  ["01", "Cargás tus productos", "Fotos, precios y detalles, todo desde un panel simple."],
  ["02", "Compartís un solo enlace", "Tu catálogo siempre actualizado, sin reenviar listas ni fotos."],
  ["03", "Tu cliente elige", "Mira, filtra y abre el producto desde cualquier celular."],
  ["04", "La consulta llega a WhatsApp", "Con el producto ya identificado para atender más rápido."],
];

const faqs = [
  ["¿Es una tienda online?", "No. Wendelo es un catálogo digital pensado para facilitar la venta por WhatsApp, sin carrito ni pagos complicados."],
  ["¿Puedo actualizar mis productos?", "Sí. Tenés un área privada para agregar, editar, ocultar o eliminar productos cuando quieras."],
  ["¿Necesito conocimientos técnicos?", "No. El panel está pensado para que cualquier persona pueda manejarlo desde el celular o la computadora."],
  ["¿Wendelo reemplaza WhatsApp?", "No. Lo complementa: organiza tus productos y lleva cada consulta directamente a tu WhatsApp."],
];

export default function Home() {
  return <main>
    <header className="nav shell">
      <a href="#inicio" className="brand" aria-label="Wendelo inicio">
        <Image className="brandSymbol" src="/brand/wendelo-symbol.png" alt="" width={58} height={58} priority />
        <Image className="brandWordmark" src="/brand/wendelo-wordmark.png" alt="Wendelo" width={300} height={74} priority />
      </a>
      <nav><a href="#como-funciona">Cómo funciona</a><a href="#soluciones">Soluciones</a><a href="#preguntas">Preguntas</a></nav>
      <a className="navCta" href={message("Hola, quiero conocer Wendelo.")} target="_blank"><MessageCircle size={18}/> Hablemos</a>
    </header>

    <section className="hero shell" id="inicio">
      <div className="heroCopy">
        <span className="eyebrow">CATÁLOGOS DIGITALES PARA VENDER POR WHATSAPP</span>
        <h1><em>¿30 fotos en tu Estado?</em><br/>Mejor, un solo enlace.</h1>
        <p>Compartí solamente un flyer o un producto en oferta. Tus contactos abren el enlace y descubren todo tu catálogo, siempre disponible y actualizado.</p>
        <div className="actions"><a className="primary" href={message("Hola, quiero mi catálogo Wendelo.")} target="_blank">Quiero mi catálogo <ArrowRight size={19}/></a><a className="secondary" href="#como-funciona">Ver cómo funciona</a></div>
        <div className="trust"><span><Check/> Diseño personalizado</span><span><Check/> Administración simple</span><span><Check/> Hecho para Paraguay</span></div>
      </div>
      <div className="heroVisual" aria-label="Vista previa de un catálogo Wendelo">
        <div className="glow"></div>
        <div className="phone">
          <div className="phoneTop"><Image src="/brand/wendelo-symbol.png" alt="" width={34} height={34}/><span>Mi catálogo</span><MessageCircle size={18}/></div>
          <div className="miniHero"><small>NUEVA COLECCIÓN</small><strong>Todo lo que buscás,<br/>más cerca.</strong></div>
          <div className="chips"><i>Todos</i><i>Ofertas</i><i>Nuevos</i></div>
          <div className="products"><div><b>Nuevo</b><span>Producto favorito</span><strong>Gs. 89.000</strong></div><div><b>Nuevo</b><span>Selección especial</span><strong>Gs. 120.000</strong></div></div>
        </div>
        <div className="floating one"><Share2/> Compartí por WhatsApp</div>
        <div className="floating two"><BarChart3/> Fácil de administrar</div>
      </div>
    </section>

    <section className="problem">
      <div className="shell problemGrid"><div><span className="eyebrow">MENOS CAOS, MÁS VENTAS</span><h2>Nadie quiere mirar decenas de fotos en un Estado.</h2></div><div><p>Además, desaparecen después de 24 horas y tenés que volver a publicar todo una y otra vez.</p><p className="accent">Con Wendelo compartís una sola oferta y tus contactos descubren automáticamente todo tu catálogo.</p></div></div>
    </section>

    <section className="how shell" id="como-funciona">
      <div className="sectionHead"><span className="eyebrow">SIMPLE DESDE EL PRIMER DÍA</span><h2>Así funciona Wendelo</h2><p>Sin complicaciones técnicas. Una herramienta práctica para vender como ya vendés, pero mucho mejor organizada.</p></div>
      <div className="steps">{steps.map(([n,t,d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
    </section>

    <section className="solutions" id="soluciones"><div className="shell">
      <div className="sectionHead center"><span className="eyebrow">DOS SOLUCIONES, UNA MISMA IDEA</span><h2>Elegí el Wendelo que acompaña tu negocio</h2></div>
      <div className="plans">
        <article className="plan featured"><div className="planIcon"><Store/></div><span className="tag">PARA EMPRENDEDORES Y COMERCIOS</span><h3>Wendelo</h3><p>Tu catálogo digital personalizado para mostrar productos y recibir consultas por WhatsApp.</p><ul><li><Check/> Tu catálogo completo y organizado</li><li><Check/> Diseño con tu logo y colores</li><li><Check/> Panel privado de administración</li><li><Check/> Filtros, precios y botón de WhatsApp</li><li><Check/> Primer año incluido</li></ul><div className="price"><small>IMPLEMENTACIÓN ÚNICA</small><strong>Gs. 600.000</strong><span>Desde el segundo año: Gs. 180.000/año</span></div><a href={message("Hola, quiero contratar Wendelo para mi negocio.")} target="_blank">Quiero mi Wendelo <ArrowRight/></a></article>
        <article className="plan enterprise"><div className="planIcon"><Building2/></div><span className="tag">PARA EQUIPOS DE VENTA Y EMPRESAS</span><h3>Wendelo <em>Empresas</em></h3><p>Catálogos personales para cada vendedor, con imagen unificada y gestión central para toda la empresa.</p><ul><li><Check/> Un catálogo por vendedor</li><li><Check/> Gestión centralizada de productos</li><li><Check/> Identidad visual consistente</li><li><Check/> Métricas por vendedor o campaña</li><li><Check/> Implementación mediante piloto</li></ul><div className="enterpriseNote"><Users/><div><strong>Propuesta a medida</strong><span>Definimos juntos el alcance ideal para tu equipo.</span></div></div><a href={message("Hola, quiero solicitar una demostración de Wendelo Empresas.")} target="_blank">Solicitar una demostración <ArrowRight/></a></article>
      </div>
    </div></section>

    <section className="benefits shell"><div className="benefitVisual"><Image src="/brand/wendelo-symbol.png" alt="Símbolo Wendelo" width={260} height={260}/></div><div><span className="eyebrow">PENSADO PARA VENDER CERCA</span><h2>Tu vidriera digital, en el bolsillo de cada cliente.</h2><div className="benefitList"><article><Smartphone/><div><h3>Siempre disponible</h3><p>Un enlace permanente que funciona en cualquier celular.</p></div></article><article><Palette/><div><h3>Tu propia identidad</h3><p>Diseño adaptado a los colores, logo y estilo de tu negocio.</p></div></article><article><MessageCircle/><div><h3>Atención personal</h3><p>Cada consulta llega directamente a tu WhatsApp.</p></div></article></div></div></section>

    <section className="demo"><div className="shell demoInner"><div><span className="eyebrow">UNA EXPERIENCIA REAL</span><h2>Ya funciona para comercios de Paraguay.</h2><p>Liz Store usa su catálogo Wendelo para presentar sus productos, mantenerlos actualizados y atender cada consulta directamente por WhatsApp.</p><a className="secondary light" href="https://liz-store-two.vercel.app" target="_blank">Ver catálogo de ejemplo <ArrowRight/></a></div><div className="demoCard"><span>CASO REAL</span><strong>Liz Store</strong><p>Moda para toda la familia</p><div><i>23</i><small>productos organizados</small></div></div></div></section>

    <section className="faq shell" id="preguntas"><div className="sectionHead"><span className="eyebrow">PREGUNTAS FRECUENTES</span><h2>Todo lo que necesitás saber</h2></div><div className="faqList">{faqs.map(([q,a]) => <details key={q}><summary>{q}<ChevronDown/></summary><p>{a}</p></details>)}</div></section>

    <section className="finalCta"><div className="shell"><Image src="/brand/wendelo-symbol.png" alt="" width={70} height={70}/><span className="eyebrow">EMPEZÁ A MOSTRAR MEJOR</span><h2>Tu próximo cliente ya está en WhatsApp.</h2><p>Dale una forma más simple de descubrir todo lo que vendés.</p><a className="primary" href={message("Hola, quiero empezar con Wendelo.")} target="_blank">Crear mi catálogo <ArrowRight/></a></div></section>

    <footer className="shell"><Image src="/brand/wendelo-wordmark.png" alt="Wendelo" width={180} height={45}/><p>Catálogos digitales para vender por WhatsApp.</p><span>Paraguay · +595 983 048 976</span></footer>
  </main>;
}
