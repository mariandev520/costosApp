'use client';

import { useScrollRevealMultiple } from '@/hooks/useScrollReveal';
import styles from './Features.module.css';

export default function Features() {
  const containerRef1 = useScrollRevealMultiple();
  const containerRef2 = useScrollRevealMultiple();

  return (
    <section id="funcionalidades" className={styles.section}>
      <div className="container">
        
        {/* Part 1: Text Left, Cards Right */}
        <div className={styles.row} ref={containerRef1}>
          <div className={`${styles.contentLeft} reveal`}>
            <h2 className={styles.title}>
              Seis áreas de tu negocio, siempre a la vista.
            </h2>
          </div>
          
          <div className={`${styles.cardsRight} reveal reveal--delay-1`}>
            {/* Card 1 */}
            <div className={`${styles.appCard} ${styles.offsetCard1}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Proveedores</span>
                <div className={styles.checkIcon}>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className={styles.cardDesc}>Ficha de cada proveedor: productos, precio actual, IVA y variaciones de coste.</p>
              <div className={styles.cardFooter}>
                <span className={styles.cardTime}>Today 09:00 PM - 11:45 PM</span>
                <div className={styles.avatars}>
                  <div className={styles.avatar} style={{backgroundColor: '#f87171'}} />
                  <div className={styles.avatar} style={{backgroundColor: '#fbbf24', marginLeft: '-8px'}} />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className={`${styles.appCard} ${styles.offsetCard2}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Insumos</span>
              </div>
              <p className={styles.cardDesc}>Cada ingrediente con su unidad, categoría, precio y rendimiento por plato.</p>
              <div className={styles.cardFooter}>
                <span className={styles.cardTime}>Today 08:12 AM</span>
                <div className={styles.avatars}>
                  <div className={styles.avatar} style={{backgroundColor: '#60a5fa'}} />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className={`${styles.appCard} ${styles.offsetCard3}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Historial de precios</span>
              </div>
              <p className={styles.cardDesc}>Compara proveedores y detecta subidas antes de que te afecten.</p>
              <div className={styles.cardFooter}>
                <span className={styles.cardTime}>Today 07:02 AM</span>
                <div className={styles.avatars}>
                  <div className={styles.avatar} style={{backgroundColor: '#f87171'}} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Cards Left, Text Right */}
        <div className={`${styles.row} ${styles.rowReverse}`} ref={containerRef2}>
          <div className={`${styles.contentRight} reveal reveal--delay-1`}>
            <h2 className={styles.title}>
              LLevá el control en base a datos.
            </h2>
            <a href="#precio" className={styles.cta}>
              Quiero ver una demo
            </a>
          </div>

          <div className={`${styles.cardsLeft} reveal`}>
             {/* Card 4 */}
             <div className={`${styles.appCard} ${styles.offsetCard4}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Informes</span>
                <div className={styles.checkIcon}>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className={styles.cardDesc}>Resumen de albaranes, cambios de precio, movimientos de stock y alertas.</p>
              <div className={styles.cardFooter}>
                <span className={styles.cardTime}>Today 09:00 PM - 11:45 PM</span>
                <div className={styles.avatars}>
                  <div className={styles.avatar} style={{backgroundColor: '#f87171'}} />
                  <div className={styles.avatar} style={{backgroundColor: '#fbbf24', marginLeft: '-8px'}} />
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className={`${styles.appCard} ${styles.offsetCard5}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Platos e ingredientes</span>
              </div>
              <p className={styles.cardDesc}>Recetas con coste, margen, IVA y precio de venta calculados al instante.</p>
              <div className={styles.cardFooter}>
                <span className={styles.cardTime}>Today 08:12 AM</span>
                <div className={styles.avatars}>
                  <div className={styles.avatar} style={{backgroundColor: '#f87171'}} />
                </div>
              </div>
            </div>

            {/* Card 6 */}
            <div className={`${styles.appCard} ${styles.offsetCard6}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>Stock</span>
              </div>
              <p className={styles.cardDesc}>Qué falta, qué sobra y cuánto conviene pedir para llegar al objetivo.</p>
              <div className={styles.cardFooter}>
                <span className={styles.cardTime}>Today 07:02 AM</span>
                <div className={styles.avatars}>
                  <div className={styles.avatar} style={{backgroundColor: '#f87171'}} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
