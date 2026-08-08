'use client';

import { useScrollRevealMultiple } from '@/hooks/useScrollReveal';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useTilt } from '@/hooks/useTilt';
import styles from './Profitability.module.css';

export default function Profitability() {
  const containerRef = useScrollRevealMultiple();
  const dashedRef = useScrollProgress({ property: '--dash-progress' });
  const { ref: tiltRef, onMouseMove, onMouseLeave } = useTilt({ max: 6 });

  return (
    <section className={styles.section}>
      <div className={`container ${styles.content}`} ref={containerRef}>
        
        {/* Left: Text */}
        <div className={`${styles.left} reveal`}>
          <div className={styles.badge}>Rentabilidad Real</div>
          <h2 className={styles.title}>
            Sabe qué plato te hace ganar dinero.
          </h2>
          <p className={styles.description}>
            Añade Los Ingredientes Y Las Cantidades De Una Receta; Coquinaria Calcula El Coste De Materia Prima, 
            Suma Los Gastos Generales, Aplica El IVA Y Propone El Precio De Venta Y El Margen. Si Cambia El Precio 
            De Un Ingrediente, Ves Al Instante Cómo Afecta A Cada Plato.
          </p>
          <a href="#precio" className={styles.cta}>
            Quiero ver una demo
          </a>
        </div>

        {/* Right: Recipe Card Mockup */}
        <div className={`${styles.right} reveal reveal--delay-2`} ref={dashedRef}>
          <div className={styles.cardWrapper}>
            <div className={styles.dashedBox}></div>
            <div
              className={`${styles.card} tilt tilt-glare border-glow`}
              ref={tiltRef}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
            >
              <div className={styles.cardHeader}>
                <h4 className={styles.cardTitle}>Risotto de hongos</h4>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.row}>
                  <span className={styles.label}>Coste materia prima</span>
                  <span className={styles.value}>3,10€</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Gastos generales</span>
                  <span className={styles.value}>0,90€</span>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.row}>
                  <span className={styles.label}>IVA (10%)</span>
                  <span className={styles.value}>0,44€</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
