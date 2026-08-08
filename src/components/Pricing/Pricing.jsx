'use client';

import { useScrollRevealMultiple } from '@/hooks/useScrollReveal';
import styles from './Pricing.module.css';

export default function Pricing() {
  const containerRef = useScrollRevealMultiple();

  return (
    <section id="precio" className={styles.section}>
      <div className={`container ${styles.content}`} ref={containerRef}>
        
        {/* Left: Illustration Table */}
        <div className={`${styles.left} reveal`}>
          <div className={styles.tableHeader}>EJEMPLO ILUSTRATIVO - NIVEL ACTUAL VS. MÍNIMO</div>
          
          <div className={styles.tableRow}>
            <span className={styles.item}>Harina 000</span>
            <div className={styles.barContainer}>
              <div className={styles.barFill} style={{'--target-width': '70%', backgroundColor: '#4ade80'}}></div>
            </div>
            <span className={styles.value}>18 / 25 kg</span>
          </div>

          <div className={styles.tableRow}>
            <span className={styles.item}>Aceite oliva</span>
            <div className={styles.barContainer}>
              <div className={styles.barFill} style={{'--target-width': '20%', backgroundColor: '#f59e0b'}}></div>
            </div>
            <span className={styles.value}>2 / 11 L</span>
          </div>

          <div className={styles.tableRow}>
            <span className={styles.item}>Tomate</span>
            <div className={styles.barContainer}>
              <div className={styles.barFill} style={{'--target-width': '45%', backgroundColor: '#10b981'}}></div>
            </div>
            <span className={styles.value}>11 / 20 kg</span>
          </div>
        </div>

        {/* Right: Text */}
        <div className={`${styles.right} reveal reveal--delay-2`}>
          <h2 className={styles.title}>
            Ninguna Sorpresa En Pleno Servicio.
          </h2>
          <p className={styles.description}>
            Define Un Mínimo Y Un Objetivo Para Cada Ingrediente. CostosApp Avisa Qué Está Agotado 
            O Por Debajo Del Mínimo, Y Te Dice Cuánto Conviene Pedir.
          </p>
          <a href="#contacto" className={styles.cta}>
            Quiero ver una demo
          </a>
        </div>

      </div>
    </section>
  );
}
