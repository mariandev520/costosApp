'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import styles from './Hero.module.css';

export default function Hero() {
  const sectionRef = useRef(null);
  const mockupRef = useScrollProgress({ property: '--mockup-progress' });

  useEffect(() => {
    const el = sectionRef.current;
    if (el) {
      requestAnimationFrame(() => {
        setTimeout(() => el.classList.add(styles.visible), 150);
      });
    }
  }, []);

  const handlePointerMove = useCallback((e) => {
    const el = sectionRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${(((e.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`);
    el.style.setProperty('--spot-y', `${(((e.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={styles.hero}
      aria-labelledby="hero-heading"
      onMouseMove={handlePointerMove}
    >
      <div className={styles.spotlight} aria-hidden="true" />
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
          <div className={styles.mockupContainer} ref={mockupRef}>
            <div className={styles.mockupGlow} />
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
