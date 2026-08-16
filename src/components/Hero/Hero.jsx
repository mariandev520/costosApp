'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';
import HoverText from '@/components/HoverText/HoverText';
import DemoModal from '@/components/DemoModal/DemoModal';
import { gsap, SplitText } from '@/lib/gsap';
import styles from './Hero.module.css';

const HEADLINE = 'Tu cocina, bajo control desde una sola pantalla.';

export default function Hero() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const mockupRef = useRef(null);
  const rotateXRef = useRef(null);
  const rotateYRef = useRef(null);
  const primaryCtaRef = useMagnetic({ strength: 0.4 });
  const secondaryCtaRef = useMagnetic({ strength: 0.4 });
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (el) {
      requestAnimationFrame(() => {
        setTimeout(() => el.classList.add(styles.visible), 150);
      });
    }
  }, []);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = HEADLINE;
      return undefined;
    }

    const split = new SplitText(el, { type: 'words', wordsClass: 'word' });
    gsap.set(split.words, { display: 'inline-block' });

    const tween = gsap.from(split.words, {
      opacity: 0,
      y: 28,
      scale: 0.82,
      rotate: () => gsap.utils.random(-8, 8),
      duration: 0.85,
      delay: 0.35,
      stagger: 0.06,
      ease: 'back.out(1.8)',
    });

    return () => {
      tween.kill();
      gsap.killTweensOf(split.words);
      split.revert();
    };
  }, []);

  useEffect(() => {
    const mockupEl = mockupRef.current;
    const sectionEl = sectionRef.current;
    if (!mockupEl || !sectionEl) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    gsap.set(mockupEl, { transformPerspective: 900 });
    rotateXRef.current = gsap.quickTo(mockupEl, 'rotationX', { duration: 0.6, ease: 'power3' });
    rotateYRef.current = gsap.quickTo(mockupEl, 'rotationY', { duration: 0.6, ease: 'power3' });

    const scrollTween = gsap.to(mockupEl, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionEl,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
      },
    });

    return () => {
      scrollTween.scrollTrigger?.kill();
      scrollTween.kill();
      gsap.killTweensOf(mockupEl);
      rotateXRef.current = null;
      rotateYRef.current = null;
    };
  }, []);

  const handlePointerMove = useCallback((e) => {
    const el = sectionRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty('--spot-x', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--spot-y', `${(py * 100).toFixed(1)}%`);
    rotateXRef.current?.((0.5 - py) * 12);
    rotateYRef.current?.((px - 0.5) * 12);
  }, []);

  const handlePointerLeave = useCallback(() => {
    rotateXRef.current?.(0);
    rotateYRef.current?.(0);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={styles.hero}
      aria-labelledby="hero-heading"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
    >
      <div className={styles.spotlight} aria-hidden="true" />
      <div className={`${styles.content} container`}>
        <div className={styles.left}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}><HoverText as="span" type="chars">Nuevo</HoverText></span>
            <HoverText as="span" type="words">Nuevas funcionalidades para usuarios activos 🔥</HoverText>
          </div>

          <h1 id="hero-heading" className={styles.heading} aria-label={HEADLINE}>
            <span ref={headingRef} aria-hidden="true">{HEADLINE}</span>
          </h1>

          <HoverText as="p" type="words" className={styles.subtitle}>
            Compras, costos, recetas y stock — centralizados y siempre actualizados, para decidir con datos.
          </HoverText>

          <div className={styles.ctas}>
            <button
              type="button"
              ref={primaryCtaRef}
              className={styles.ctaPrimary}
              onClick={() => setIsDemoModalOpen(true)}
            >
              <HoverText as="span" type="chars">Quiero ver una demo</HoverText>
            </button>
            <a href="#contacto" ref={secondaryCtaRef} className={styles.ctaSecondary}>
              <HoverText as="span" type="chars">Contacto</HoverText>
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

      {isDemoModalOpen && (
        <DemoModal onClose={() => setIsDemoModalOpen(false)} />
      )}
    </section>
  );
}
