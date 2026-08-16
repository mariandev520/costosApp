'use client';

import { useEffect, useRef, useState } from 'react';
import { useScrollRevealMultiple } from '@/hooks/useScrollReveal';
import { useMagnetic } from '@/hooks/useMagnetic';
import HoverText from '@/components/HoverText/HoverText';
import DemoModal from '@/components/DemoModal/DemoModal';
import { mergeRefs } from '@/lib/mergeRefs';
import { gsap } from '@/lib/gsap';
import styles from './Features.module.css';

export default function Features() {
  const containerRef1 = useScrollRevealMultiple();
  const containerRef2 = useScrollRevealMultiple();
  const ctaRef = useMagnetic({ strength: 0.4 });
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const pinRowRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  const pinRowRef2 = useRef(null);
  const card4Ref = useRef(null);
  const card5Ref = useRef(null);
  const card6Ref = useRef(null);

  useEffect(() => {
    const rowCards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean);
    const rowCards2 = [card4Ref.current, card5Ref.current, card6Ref.current].filter(Boolean);

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const cleanups = [];

      // dir: 1 makes cards drift in from the right (row 1), -1 from the left (row 2)
      const buildPin = (rowEl, cards, dir) => {
        if (!rowEl || cards.length !== 3) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rowEl,
            start: 'top top+=90',
            end: '+=45%',
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.from(cards[0], { xPercent: 8 * dir, opacity: 0, rotate: 2 * dir, duration: 1, clearProps: 'transform,opacity' })
          .from(cards[1], { xPercent: 11 * dir, opacity: 0, rotate: 3 * dir, duration: 1, clearProps: 'transform,opacity' }, 0.15)
          .from(cards[2], { xPercent: 14 * dir, opacity: 0, rotate: 4 * dir, duration: 1, clearProps: 'transform,opacity' }, 0.3);

        cleanups.push(() => {
          tl.scrollTrigger?.kill();
          tl.kill();
        });
      };

      buildPin(pinRowRef.current, rowCards, 1);
      buildPin(pinRowRef2.current, rowCards2, -1);

      return () => cleanups.forEach((fn) => fn());
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="funcionalidades" className={styles.section}>
      <div className="container">
        
        {/* Part 1: Text Left, Cards Right */}
        <div className={styles.row} ref={mergeRefs(containerRef1, pinRowRef)}>
          <div className={`${styles.contentLeft} reveal`}>
            <h2 className={styles.title}>
              <HoverText as="span" type="words">Seis áreas de tu negocio, siempre a la vista.</HoverText>
            </h2>
          </div>
          
          <div className={`${styles.cardsRight} reveal reveal--delay-1`}>
            {/* Card 1 */}
            <div ref={card1Ref} className={`${styles.appCard} ${styles.offsetCard1} border-glow`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}><HoverText as="span" type="chars">Proveedores</HoverText></span>
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
            <div ref={card2Ref} className={`${styles.appCard} ${styles.offsetCard2} border-glow`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}><HoverText as="span" type="chars">Insumos</HoverText></span>
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
            <div ref={card3Ref} className={`${styles.appCard} ${styles.offsetCard3} border-glow`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}><HoverText as="span" type="chars">Historial de precios</HoverText></span>
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
        <div className={`${styles.row} ${styles.rowReverse}`} ref={mergeRefs(containerRef2, pinRowRef2)}>
          <div className={`${styles.contentRight} reveal reveal--delay-1`}>
            <h2 className={styles.title}>
              <HoverText as="span" type="words">LLevá el control en base a datos.</HoverText>
            </h2>
            <button
              type="button"
              ref={ctaRef}
              className={styles.cta}
              onClick={() => setIsDemoModalOpen(true)}
            >
              <HoverText as="span" type="chars">Quiero ver una demo</HoverText>
            </button>
          </div>

          <div className={`${styles.cardsLeft} reveal`}>
             {/* Card 4 */}
             <div ref={card4Ref} className={`${styles.appCard} ${styles.offsetCard4} border-glow`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}><HoverText as="span" type="chars">Informes</HoverText></span>
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
            <div ref={card5Ref} className={`${styles.appCard} ${styles.offsetCard5} border-glow`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}><HoverText as="span" type="chars">Platos e ingredientes</HoverText></span>
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
            <div ref={card6Ref} className={`${styles.appCard} ${styles.offsetCard6} border-glow`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}><HoverText as="span" type="chars">Stock</HoverText></span>
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

      {isDemoModalOpen && (
        <DemoModal onClose={() => setIsDemoModalOpen(false)} />
      )}
    </section>
  );
}
