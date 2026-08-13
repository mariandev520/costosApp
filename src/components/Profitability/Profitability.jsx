'use client';

import { useEffect, useRef, useState } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useTilt } from '@/hooks/useTilt';
import { useMagnetic } from '@/hooks/useMagnetic';
import HoverText from '@/components/HoverText/HoverText';
import DemoModal from '@/components/DemoModal/DemoModal';
import { gsap } from '@/lib/gsap';
import styles from './Profitability.module.css';

export default function Profitability() {
  const dashedRef = useScrollProgress({ property: '--dash-progress' });
  const { ref: tiltRef, onMouseMove: onTiltMove, onMouseLeave: onTiltLeave } = useTilt({ max: 6 });
  const ctaRef = useMagnetic({ strength: 0.4 });
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const cardWrapRef = useRef(null);
  const holoRef = useRef(null);
  const valueRefs = useRef([]);
  valueRefs.current = [];
  const collectValueRef = (el) => {
    if (el) valueRefs.current.push(el);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      });

      tl.fromTo(
        titleRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power4.inOut' }
      )
        .from(badgeRef.current, { opacity: 0, y: 12, duration: 0.5, ease: 'power2.out' }, '<')
        .from(descRef.current, { opacity: 0, y: 16, duration: 0.6, ease: 'power2.out' }, '-=0.5')
        .from(ctaRef.current, { opacity: 0, y: 16, duration: 0.5, ease: 'power2.out' }, '-=0.4')
        .from(cardWrapRef.current, { opacity: 0, y: 40, scale: 0.9, rotate: -4, duration: 0.9, ease: 'back.out(1.6)' }, '-=0.6');

      valueRefs.current.forEach((el, i) => {
        const target = parseFloat(el.dataset.target);
        const counter = { val: 0 };
        tl.to(
          counter,
          {
            val: target,
            duration: 0.8,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = `${counter.val.toFixed(2).replace('.', ',')}€`;
            },
          },
          i === 0 ? '-=0.5' : '<0.1'
        );
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  const handleCardMove = (e) => {
    onTiltMove(e);
    const cardEl = tiltRef.current;
    const holoEl = holoRef.current;
    if (!cardEl || !holoEl) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = cardEl.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;

    gsap.to(holoEl, {
      backgroundPosition: `${px}% ${py}%`,
      opacity: 0.55,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  const handleCardLeave = () => {
    onTiltLeave();
    const holoEl = holoRef.current;
    if (!holoEl) return;
    gsap.to(holoEl, { opacity: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
  };

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={`container ${styles.content}`}>

        {/* Left: Text */}
        <div className={styles.left}>
          <div className={styles.badge} ref={badgeRef}><HoverText as="span" type="chars">Rentabilidad Real</HoverText></div>
          <h2 className={styles.title} ref={titleRef}>
            <HoverText as="span" type="words">Sabe qué plato te hace ganar dinero.</HoverText>
          </h2>
          <HoverText as="p" type="words" className={styles.description} ref={descRef}>
            Añade los ingredientes y las cantidades de una receta; Coquinaria calcula el coste de materia prima,
            suma los gastos generales, aplica el IVA y propone el precio de venta y el margen. Si cambia el precio
            de un ingrediente, ves al instante cómo afecta a cada plato.
          </HoverText>
          <button
            type="button"
            ref={ctaRef}
            className={styles.cta}
            onClick={() => setIsDemoModalOpen(true)}
          >
            <HoverText as="span" type="chars">Quiero ver una demo</HoverText>
          </button>
        </div>

        {/* Right: Recipe Card Mockup */}
        <div className={styles.right} ref={dashedRef}>
          <div className={styles.cardWrapper} ref={cardWrapRef}>
            <div className={styles.dashedBox}></div>
            <div
              className={`${styles.card} tilt tilt-glare border-glow`}
              ref={tiltRef}
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
            >
              <div className={styles.holoOverlay} ref={holoRef} aria-hidden="true" />
              <div className={styles.cardHeader}>
                <h4 className={styles.cardTitle}>Risotto de hongos</h4>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.row}>
                  <span className={styles.label}>Coste materia prima</span>
                  <span className={styles.value} ref={collectValueRef} data-target="3.10">0,00€</span>
                </div>
                <div className={styles.row}>
                  <span className={styles.label}>Gastos generales</span>
                  <span className={styles.value} ref={collectValueRef} data-target="0.90">0,00€</span>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.row}>
                  <span className={styles.label}>IVA (10%)</span>
                  <span className={styles.value} ref={collectValueRef} data-target="0.44">0,00€</span>
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
