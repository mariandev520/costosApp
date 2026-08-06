'use client';

import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (el) {
      requestAnimationFrame(() => {
        setTimeout(() => el.classList.add(styles.visible), 150);
      });
    }
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={styles.hero}
      aria-labelledby="hero-heading"
    >
      <div className={`${styles.content} container`}>
        <div className={styles.left}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}>Nuevo</span>
            <span>Nuevas funcionalidades para usuarios activos 🔥</span>
          </div>

          <h1 id="hero-heading" className={styles.heading}>
            Tu cocina, bajo control desde una sola pantalla.
          </h1>

          <p className={styles.subtitle}>
            Compras, costos, recetas y stock — centralizados y siempre actualizados, para decidir con datos.
          </p>

          <div className={styles.ctas}>
            <a href="#precio" className={styles.ctaPrimary}>
              Quiero ver una demo
            </a>
            <a href="#contacto" className={styles.ctaSecondary}>
              Contacto
            </a>
          </div>
        </div>

        <div className={styles.right} aria-hidden="true">
          <div className={styles.mockupContainer}>
            <img
              src="https://res.cloudinary.com/aerhzjuo/image/upload/v1786049090/img-hero-landing-coquinaria_yp0ebj.png"
              alt="Coquinaria App Interface"
              className={styles.heroImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
