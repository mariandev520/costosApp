import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import styles from "./CTA.module.css";

export function CTA() {
  return (
    <section className="section raised" id="demo">
      <div className="section-inner">
        <Reveal>
          <div className="eyebrow">Empecemos</div>
          <h2>Convierte cada compra en información útil para tu negocio.</h2>
          <p className="lede">
            Te lo mostramos funcionando con tus propios proveedores y recetas
            — sin compromiso.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <ContactForm />
          <span className={styles.contactNote}>{siteConfig.contactNote}</span>
        </Reveal>
      </div>
    </section>
  );
}
