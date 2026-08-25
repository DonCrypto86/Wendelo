import Image from "next/image";
import { ArrowRight, BarChart3, Building2, Check, ChevronDown, Clock3, Gift, MessageCircle, Palette, Share2, Smartphone, Store, TrendingUp, Users } from "lucide-react";
import DemoSection from "./DemoSection";
import StepsSection from "./StepsSection";
import ContactSection from "./ContactSection";
import ReferralForm from "./ReferralForm";
import Header from "./Header";
import Footer from "./Footer";

const faqs = [
["¿Es una tienda online?", "No. WENDELO es un catálogo digital pensado para facilitar la venta por WhatsApp, sin carrito ni pagos complicados."],
["¿Puedo actualizar mis productos?", "Sí. Tenés un área privada para agregar, editar, ocultar o eliminar productos cuando quieras."],
["¿Necesito conocimientos técnicos?", "No. El panel está pensado para que cualquier persona pueda manejarlo desde el celular o la computadora."],
["¿WENDELO reemplaza WhatsApp?", "No. Lo complementa: organiza tus productos y lleva cada consulta directamente a tu WhatsApp."],
];

export default function Home() {
return <main>
<Header/>

<section className="hero shell" id="inicio">
<div className="heroCopy">
<span className="eyebrow">CATÁLOGOS DIGITALES PARA VENDER POR WHATSAPP</span>
<h1><em>Por qué subir 30 fotos a tu Estado</em><span>si un solo enlace basta para guiar a tus clientes?</span></h1>
<p>Compartí solamente un flyer o un producto en oferta. Tus contactos abren el enlace y descubren todo tu catálogo, siempre disponible y actualizado.</p>
<div className="actions"><a className="primary" href="#contacto">Quiero mi catálogo <ArrowRight size={19}/></a><a className="secondary" href="#como-funciona">Ver cómo funciona</a></div>
<div className="trust"><span><Check/> Diseño personalizado</span><span><Check/> Administración simple</span><span><Check/> Hecho para Paraguay</span></div>
</div>
<div className="heroVisual" aria-label="Vista previa de un catálogo WENDELO">
<div className="glow"></div>
<div className="phone videoPhone">
<video className="phoneVideo" autoPlay muted loop playsInline preload="metadata" aria-label="Demostración del catálogo Liz-Store">
<source src="/media/liz-store-demo.mp4" type="video/mp4" />
</video>
</div>
<div className="floating sequence one"><Share2/> Compartí por WhatsApp</div>
<div className="floating sequence two"><BarChart3/> Fácil de administrar</div>
<div className="floating sequence three"><Clock3/> Ahorrá tiempo</div>
<div className="floating sequence four"><TrendingUp/> Optimizá tus ventas</div>
</div>
</section>

<section className="problem">
<div className="shell problemGrid"><div><span className="eyebrow">MENOS CAOS, MÁS VENTAS</span><h2>Nadie quiere mirar una docena de fotos en tu Estado.</h2></div><div><p>Los Estados desaparecen a las 24 horas y tenés que volver a publicar todo, una y otra vez.</p><p className="accent">Con WENDELO compartís tu catálogo una sola vez: tus contactos lo descubren solos, vos ahorrás horas de trabajo cada semana, y tu marca se presenta siempre prolija y profesional. Y como nadie se pierde ningún producto, te llegan más consultas — y vendés más.</p></div></div>
</section>

<StepsSection/>

<section className="solutions" id="soluciones"><div className="shell">
<div className="sectionHead center"><span className="eyebrow">DOS SOLUCIONES, UNA MISMA IDEA</span><h2>Elegí el WENDELO que acompaña tu negocio</h2></div>
<div className="plans">
<article className="plan featured"><div className="planIcon"><Store/></div><span className="tag">PARA EMPRENDEDORES Y COMERCIOS</span><h3>WENDELO</h3><p>Tu catálogo digital personalizado para mostrar productos y recibir consultas por WhatsApp.</p><ul><li><Check/> Tu catálogo completo y organizado</li><li><Check/> Diseño con tu logo y colores</li><li><Check/> Panel privado de administración</li><li><Check/> Filtros, precios y botón de WhatsApp</li><li><Check/> Primer año incluido</li><li><Check/> Tu link de referidos: ganás el 20% (Gs. 120.000) por cada negocio que recomendés</li></ul><div className="price"><small>IMPLEMENTACIÓN ÚNICA</small><strong>Gs. 600.000</strong><span>Desde el segundo año: Gs. 180.000/año</span></div><a href="#contacto">Quiero mi WENDELO <ArrowRight/></a></article>
<article className="plan enterprise"><div className="planIcon"><Building2/></div><span className="tag">PARA EQUIPOS DE VENTA Y EMPRESAS</span><h3>WENDELO <em>EMPRESAS</em></h3><p>Catálogos personales para cada vendedor, con imagen unificada y gestión central para toda la empresa.</p><ul><li><Check/> Un catálogo por vendedor</li><li><Check/> Gestión centralizada de productos</li><li><Check/> Identidad visual consistente</li><li><Check/> Métricas por vendedor o campaña</li><li><Check/> Implementación mediante piloto</li></ul><div className="enterpriseNote"><Users/><div><strong>Propuesta a medida</strong><span>Definimos juntos el alcance ideal para tu equipo.</span></div></div><a href="#contacto">Solicitar una demostración <ArrowRight/></a></article>
</div>
</div></section>

<section className="benefits shell"><div className="benefitVisual"><div className="benefitLogo"><Image src="/brand/wendelo-symbol.png" alt="Símbolo WENDELO" width={260} height={260}/></div></div><div><span className="eyebrow">PENSADO PARA VENDER CERCA</span><h2>Tu vidriera digital, en el bolsillo de cada cliente.</h2><div className="benefitList"><article><Smartphone/><div><h3>Siempre disponible</h3><p>Un enlace permanente que funciona en cualquier celular.</p></div></article><article><Palette/><div><h3>Tu propia identidad</h3><p>Diseño adaptado a los colores, logo y estilo de tu negocio.</p></div></article><article><MessageCircle/><div><h3>Atención personal</h3><p>Cada consulta llega directamente a tu WhatsApp.</p></div></article></div></div></section>

<DemoSection/>

<section className="faq shell" id="preguntas"><div className="sectionHead"><span className="eyebrow">PREGUNTAS FRECUENTES</span><h2>Todo lo que necesitás saber</h2></div><div className="faqList">{faqs.map(([q,a]) => <details key={q}><summary>{q}<ChevronDown/></summary><p>{a}</p></details>)}</div></section>

<section className="finalCta"><div className="shell"><Image src="/brand/wendelo-symbol.png" alt="" width={70} height={70}/><span className="eyebrow">EMPEZÁ A MOSTRAR MEJOR</span><h2>Tu próximo cliente ya está en WhatsApp.</h2><p>Dale una forma más simple de descubrir todo lo que vendés.</p><a className="primary" href="#contacto">Crear mi catálogo <ArrowRight/></a></div></section>

<ContactSection/>

<section className="referral" id="recomienda">
<div className="shell">
<div className="sectionHead center"><span className="eyebrow">PROGRAMA DE REFERIDOS</span><h2>Recomendá WENDELO y ganá</h2><p>Compartí tu link de referido y ganá <strong>Gs. 90.000</strong> por cada nuevo cliente referido que contrate y pague la implementación de WENDELO.</p><p className="referralFine">La comisión se genera una vez confirmado el pago completo de la implementación del cliente referido. Sujeto a los <a href="/terminos#referidos">Términos del Programa de Referidos</a>.</p></div>
<div className="referralCard"><Gift size={20}/><ReferralForm/></div>
</div>
</section>

<Footer/>
</main>;
}
