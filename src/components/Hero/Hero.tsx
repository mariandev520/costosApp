import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={`${styles.heroContent} ${styles.heroEnter}`}>
          <h1>
            <span className={styles.heroItalic}>Tu cocina</span>{" "}
            <strong>bajo control</strong>
            <br />
            <span className={styles.heroItalic}>desde una sola pantalla.</span>
          </h1>
          <p className="lede">
            Compras, costes, recetas, stock centralizados y siempre
            actualizados, para decidir con datos y no a ojo.
          </p>
          <a className="cta-btn cta-btn-dark cta-btn-pill" href="#demo">
            Quiero ver una demo
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <div className={`${styles.heroImage} ${styles.heroEnter}`} style={{ animationDelay: "0.15s" }}>
          <img
            src="/images/img-hero-landing-coquinaria.webp"
            alt="Pantallas de la app Coquinaria mostrando gestión de proveedores, informes y stock"
            width={600}
            height={600}
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
