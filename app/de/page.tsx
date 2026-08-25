import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, BarChart3, Building2, Check, ChevronDown, Clock3, Gift, MessageCircle, Palette, Share2, Smartphone, Store, TrendingUp, Users } from "lucide-react";
import DemoSection from "./DemoSection";
import StepsSection from "./StepsSection";
import ContactSection from "./ContactSection";
import ReferralForm from "./ReferralForm";
import Header from "./Header";
import Footer from "./Footer";

export const metadata: Metadata = {
  title: "WENDELO | Dein digitaler Katalog für WhatsApp",
  description: "Einfache digitale Kataloge, um über WhatsApp in Paraguay zu verkaufen.",
};

const faqs = [
["Ist das ein Online-Shop?", "Nein. WENDELO ist ein digitaler Katalog, der den Verkauf über WhatsApp erleichtert – ohne Warenkorb oder komplizierte Zahlungen."],
["Kann ich meine Produkte aktualisieren?", "Ja. Du hast einen privaten Bereich, um Produkte jederzeit hinzuzufügen, zu bearbeiten, auszublenden oder zu löschen."],
["Brauche ich technisches Wissen?", "Nein. Das Panel ist so gestaltet, dass es jeder vom Handy oder Computer aus bedienen kann."],
["Ersetzt WENDELO WhatsApp?", "Nein. Es ergänzt WhatsApp: organisiert deine Produkte und leitet jede Anfrage direkt an dein WhatsApp weiter."],
];

export default function HomeDe() {
return <main>
<Header/>

<section className="hero shell" id="inicio">
<div className="heroCopy">
<span className="eyebrow">DIGITALE KATALOGE FÜR DEN VERKAUF ÜBER WHATSAPP</span>
<h1><em>Warum 30 Fotos in deinen Status hochladen,</em><span>wenn ein einziger Link reicht, um deine Kunden zu leiten?</span></h1>
<p>Teile einfach einen Flyer oder ein Angebotsprodukt. Deine Kontakte öffnen den Link und entdecken deinen ganzen Katalog – immer verfügbar und aktuell.</p>
<div className="actions"><a className="primary" href="#contacto">Ich will meinen Katalog <ArrowRight size={19}/></a><a className="secondary" href="#como-funciona">So funktioniert's</a></div>
<div className="trust"><span><Check/> Individuelles Design</span><span><Check/> Einfache Verwaltung</span><span><Check/> Gemacht für Paraguay</span></div>
</div>
<div className="heroVisual" aria-label="Vorschau eines WENDELO-Katalogs">
<div className="glow"></div>
<div className="phone videoPhone">
<video className="phoneVideo" autoPlay muted loop playsInline preload="metadata" aria-label="Demonstration des Liz-Store-Katalogs">
<source src="/media/liz-store-demo.mp4" type="video/mp4" />
</video>
</div>
<div className="floating sequence one"><Share2/> Teile über WhatsApp</div>
<div className="floating sequence two"><BarChart3/> Einfach zu verwalten</div>
<div className="floating sequence three"><Clock3/> Spar Zeit</div>
<div className="floating sequence four"><TrendingUp/> Optimiere deine Verkäufe</div>
</div>
</section>

<section className="problem">
<div className="shell problemGrid"><div><span className="eyebrow">WENIGER CHAOS, MEHR VERKÄUFE</span><h2>Niemand will sich ein Dutzend Fotos in deinem Status ansehen.</h2></div><div><p>Status-Updates verschwinden nach 24 Stunden und du musst alles wieder und wieder neu posten.</p><p className="accent">Mit WENDELO teilst du deinen Katalog nur einmal: Deine Kontakte entdecken ihn von selbst, du sparst jede Woche Stunden an Arbeit, und deine Marke wirkt immer ordentlich und professionell. Und weil niemand ein Produkt verpasst, bekommst du mehr Anfragen — und verkaufst mehr.</p></div></div>
</section>

<StepsSection/>

<section className="solutions" id="soluciones"><div className="shell">
<div className="sectionHead center"><span className="eyebrow">ZWEI LÖSUNGEN, EINE IDEE</span><h2>Wähle das WENDELO, das zu deinem Business passt</h2></div>
<div className="plans">
<article className="plan featured"><div className="planIcon"><Store/></div><span className="tag">FÜR UNTERNEHMER UND GESCHÄFTE</span><h3>WENDELO</h3><p>Dein individueller digitaler Katalog, um Produkte zu zeigen und Anfragen über WhatsApp zu erhalten.</p><ul><li><Check/> Dein vollständiger, organisierter Katalog</li><li><Check/> Design mit deinem Logo und deinen Farben</li><li><Check/> Privates Verwaltungspanel</li><li><Check/> Filter, Preise und WhatsApp-Button</li><li><Check/> Erstes Jahr inklusive</li><li><Check/> Dein Empfehlungslink: du bekommst 20% (Gs. 120.000) für jedes Geschäft, das du empfiehlst</li></ul><div className="price"><small>EINMALIGE EINRICHTUNG</small><strong>Gs. 600.000</strong><span>Ab dem zweiten Jahr: Gs. 180.000/Jahr</span></div><a href="#contacto">Ich will mein WENDELO <ArrowRight/></a></article>
<article className="plan enterprise"><div className="planIcon"><Building2/></div><span className="tag">FÜR VERTRIEBSTEAMS UND UNTERNEHMEN</span><h3>WENDELO <em>UNTERNEHMEN</em></h3><p>Persönliche Kataloge für jeden Verkäufer, mit einheitlichem Erscheinungsbild und zentraler Verwaltung fürs ganze Unternehmen.</p><ul><li><Check/> Ein Katalog pro Verkäufer</li><li><Check/> Zentrale Produktverwaltung</li><li><Check/> Einheitliches visuelles Erscheinungsbild</li><li><Check/> Kennzahlen pro Verkäufer oder Kampagne</li><li><Check/> Einführung über ein Pilotprojekt</li></ul><div className="enterpriseNote"><Users/><div><strong>Maßgeschneidertes Angebot</strong><span>Wir definieren gemeinsam den idealen Umfang für dein Team.</span></div></div><a href="#contacto">Demo anfragen <ArrowRight/></a></article>
</div>
</div></section>

<section className="benefits shell"><div className="benefitVisual"><div className="benefitLogo"><Image src="/brand/wendelo-symbol.png" alt="WENDELO Symbol" width={260} height={260}/></div></div><div><span className="eyebrow">GEMACHT, UM NAH AM KUNDEN ZU VERKAUFEN</span><h2>Dein digitales Schaufenster, in der Tasche jedes Kunden.</h2><div className="benefitList"><article><Smartphone/><div><h3>Immer verfügbar</h3><p>Ein dauerhafter Link, der auf jedem Handy funktioniert.</p></div></article><article><Palette/><div><h3>Deine eigene Identität</h3><p>Design angepasst an Farben, Logo und Stil deines Geschäfts.</p></div></article><article><MessageCircle/><div><h3>Persönlicher Kontakt</h3><p>Jede Anfrage kommt direkt bei deinem WhatsApp an.</p></div></article></div></div></section>

<DemoSection/>

<section className="faq shell" id="preguntas"><div className="sectionHead"><span className="eyebrow">HÄUFIGE FRAGEN</span><h2>Alles, was du wissen musst</h2></div><div className="faqList">{faqs.map(([q,a]) => <details key={q}><summary>{q}<ChevronDown/></summary><p>{a}</p></details>)}</div></section>

<section className="finalCta"><div className="shell"><Image src="/brand/wendelo-symbol.png" alt="" width={70} height={70}/><span className="eyebrow">ZEIG DEINE PRODUKTE BESSER</span><h2>Dein nächster Kunde ist schon auf WhatsApp.</h2><p>Gib ihm eine einfachere Art, alles zu entdecken, was du verkaufst.</p><a className="primary" href="#contacto">Meinen Katalog erstellen <ArrowRight/></a></div></section>

<ContactSection/>

<section className="referral" id="recomienda">
<div className="shell">
<div className="sectionHead center"><span className="eyebrow">EMPFEHLUNGSPROGRAMM</span><h2>Empfiehl WENDELO und verdiene</h2><p>Teile deinen Empfehlungslink und verdiene <strong>Gs. 90.000</strong> für jeden neuen geworbenen Kunden, der WENDELO beauftragt und die Einrichtung bezahlt.</p><p className="referralFine">Die Provision entsteht, sobald die vollständige Zahlung der Einrichtung durch den geworbenen Kunden bestätigt ist. Es gelten die <a href="/terminos#referidos">Bedingungen des Empfehlungsprogramms</a>.</p></div>
<div className="referralCard"><Gift size={20}/><ReferralForm/></div>
</div>
</section>

<Footer/>
</main>;
}
