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
            {/* Main app card - Informes */}
            <div className={`${styles.card} ${styles.cardMain}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardDot} />
                <span className={styles.cardTitle}>Informes</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.statRow}>
                  <span className={styles.statLabel}>Margen bruto</span>
                  <span className={styles.statValue} style={{color: '#4ade80'}}>71%</span>
                </div>
                <div className={styles.barChart}>
                  <div className={styles.bar} style={{height: '60%', background: '#e5e7eb'}} />
                  <div className={styles.bar} style={{height: '80%', background: '#e5e7eb'}} />
                  <div className={styles.bar} style={{height: '50%', background: '#e5e7eb'}} />
                  <div className={styles.bar} style={{height: '90%', background: '#1f2937'}} />
                  <div className={styles.bar} style={{height: '70%', background: '#e5e7eb'}} />
                  <div className={styles.bar} style={{height: '65%', background: '#e5e7eb'}} />
                  <div className={styles.bar} style={{height: '85%', background: '#e5e7eb'}} />
                </div>
                <div className={styles.cardRow}>
                  <span className={styles.cardLabel}>Semana anterior</span>
                  <span className={styles.cardBadgeUp}>+4.2%</span>
                </div>
              </div>
            </div>

            {/* Secondary card - Proveedores */}
            <div className={`${styles.card} ${styles.cardSecondary}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardDot} style={{background: '#f59e0b'}} />
                <span className={styles.cardTitle}>Proveedores</span>
              </div>
              <div className={styles.cardMini}>
                <div className={styles.miniRow}><div className={styles.miniLine} style={{width:'70%'}} /><div className={styles.miniNum}>€ 480</div></div>
                <div className={styles.miniRow}><div className={styles.miniLine} style={{width:'50%'}} /><div className={styles.miniNum}>€ 312</div></div>
                <div className={styles.miniRow}><div className={styles.miniLine} style={{width:'85%'}} /><div className={styles.miniNum}>€ 890</div></div>
              </div>
            </div>

            {/* Tertiary card - Recetas */}
            <div className={`${styles.card} ${styles.cardTertiary}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardDot} style={{background: '#60a5fa'}} />
                <span className={styles.cardTitle}>Recetas</span>
              </div>
              <div className={styles.cardMini}>
                <div className={styles.miniRow}><div className={styles.miniLine} style={{width:'60%'}} /><div className={styles.miniNum} style={{color:'#4ade80'}}>67%</div></div>
                <div className={styles.miniRow}><div className={styles.miniLine} style={{width:'40%'}} /><div className={styles.miniNum} style={{color:'#f87171'}}>48%</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
