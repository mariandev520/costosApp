'use client';

import { useEffect, useRef } from 'react';
import { useScrollRevealMultiple } from '@/hooks/useScrollReveal';
import HoverText from '@/components/HoverText/HoverText';
import { gsap } from '@/lib/gsap';
import styles from './AIScanner.module.css';

const STEPS = [
  {
    title: 'Fotografía',
    desc: 'Desde el móvil, subes la foto, una imagen guardada o un PDF.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
    ),
  },
  {
    title: 'Lectura por IA',
    desc: 'Reconoce productos, cantidades, unidades, precios e IVA.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h5.25v5.25h-5.25v-5.25z" />
      </svg>
    ),
  },
  {
    title: 'Revisas y confirmas',
    desc: 'Corriges cualquier dato antes de guardar. Nada se guarda sin tu confirmación.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: 'Todo actualizado',
    desc: 'Precios, proveedor y movimientos de stock quedan registrados solos.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
];

export default function AIScanner() {
  const containerRef = useScrollRevealMultiple();
  const demoRef = useScrollRevealMultiple();
  const trackRef = useRef(null);
  const lineRef = useRef(null);
  const beamRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const line = lineRef.current;
    const beam = beamRef.current;
    if (!track || !line || !beam) return undefined;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.set(line, { drawSVG: '0%' });
      gsap.set(beam, { left: '0%', opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top 75%',
          end: 'bottom 55%',
          scrub: 0.6,
        },
      });

      tl.to(beam, { opacity: 1, duration: 0.05 }, 0)
        .to(line, { drawSVG: '100%', duration: 1, ease: 'none' }, 0)
        .to(beam, { left: '100%', duration: 1, ease: 'none' }, 0)
        .to(beam, { opacity: 0, duration: 0.05 }, 0.95);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="escaner-ia" className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>
          Sacale una foto a la factura.<br />La IA carga los datos por vos.
        </h2>

        {/* Steps Flow */}
        <div className={styles.stepsContainer} ref={containerRef}>
          {STEPS.map((step, index) => (
            <div key={index} className={`${styles.step} reveal reveal--delay-${index + 1}`}>
              <div className={styles.iconCircle}>
                {step.icon}
              </div>
              <h3 className={styles.stepTitle}><HoverText as="span" type="chars">{step.title}</HoverText></h3>
              <HoverText as="p" type="words" className={styles.stepDesc}>{step.desc}</HoverText>
            </div>
          ))}
          {/* Connector Line (desktop) — draws itself as a scanning beam travels across */}
          <div className={styles.connectorTrack} ref={trackRef} aria-hidden="true">
            <svg className={styles.connectorSvg} viewBox="0 0 100 4" preserveAspectRatio="none">
              <line ref={lineRef} className={styles.connectorPath} x1="0" y1="2" x2="100" y2="2" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className={styles.connectorBeam} ref={beamRef} />
          </div>
        </div>

        {/* Visual Demo Flow */}
        <div className={styles.demoFlow} ref={demoRef}>
          <div className={`${styles.demoCol} reveal reveal--delay-1`}>
            <span className={styles.demoLabel}>Toma la foto al factura</span>
            <div className={styles.demoIconWrapper}>
              <img
                src="/images/captura-de-foto.svg"
                alt="Toma la foto al factura"
                className={styles.demoIconImg}
              />
            </div>
          </div>

          <div className={`${styles.demoCol} reveal reveal--delay-2`}>
            <HoverText as="span" type="words" className={styles.demoLabel}>La IA hace el proceso</HoverText>
            <div className={styles.demoIconWrapper}>
              <img
                src="/images/IA-proceso.svg"
                alt="La IA hace el proceso"
                className={styles.demoIconImg}
              />
            </div>
          </div>

          <div className={`${styles.demoCol} reveal reveal--delay-3`}>
            <HoverText as="span" type="words" className={styles.demoLabel}>Resultado de la lectura de los datos</HoverText>
            <div className={styles.resultCard}>
              <div className={styles.resultHeader}>
                <h4>Distribuidora Molino Azul</h4>
                <span>12/03</span>
              </div>
              <div className={styles.resultItems}>
                <div className={styles.resultItem}>
                  <div className={styles.check}>✓</div>
                  <span className={styles.itemName}>Harina 000 - 25kg</span>
                  <span className={styles.itemPrice}>18,40</span>
                </div>
                <div className={styles.resultItem}>
                  <div className={styles.check}>✓</div>
                  <span className={styles.itemName}>Aceite oliva - 5L</span>
                  <span className={styles.itemPrice}>27,90</span>
                </div>
                <div className={styles.resultItem}>
                  <div className={styles.check}>✓</div>
                  <span className={styles.itemName}>Tomate triturado - 12u</span>
                  <span className={styles.itemPrice}>14,60</span>
                </div>
                <div className={styles.resultTotal}>
                  <div className={styles.check}>✓</div>
                  <span className={styles.itemName}>Total + IVA</span>
                  <span className={styles.itemPrice}>66,63</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
