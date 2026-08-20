'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import HoverText from '@/components/HoverText/HoverText';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Testimonial.module.css';

/* ─── Editable data ─────────────────────────────────────────────── */
const SECTION_HEADING = 'Lo que dicen nuestros clientes';
const SECTION_SUBHEADING =
  '';

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      '"Desde que uso Costos.app sé exactamente cuánto me cuesta cada plato. Antes calculaba a ojo; ahora tengo los números claros y el margen controlado."',
    caption: 'Elegante, preciso & muy fácil de usar.',
    name: 'María González',
    role: 'Chef y propietaria · Buenos Aires',
    image: '/images/girl.png',
    stars: 5,
  },
  {
    id: 2,
    quote:
      '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Desde que empezamos a usarlo, el control de costos mejoró notablemente y el equipo trabaja con más confianza."',
    caption: 'Herramienta esencial para cualquier restaurante.',
    name: 'Carlos Ramírez',
    role: 'Gerente de operaciones · Córdoba',
    image: '/images/girl.png',
    stars: 5,
  },
  {
    id: 3,
    quote:
      '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nuestros márgenes mejoraron un 18% en el primer trimestre. Una solución que realmente funciona."',
    caption: 'Resultados reales desde el primer mes.',
    name: 'Laura Fernández',
    role: 'Directora · Rosario',
    image: '/images/girl.png',
    stars: 5,
  },
];

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 19l7-7-7-7" />
    </svg>
  );
}

export default function Testimonial() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const sectionRef = useScrollReveal({ threshold: 0.08 });
  const headingRef = useScrollReveal({ threshold: 0.1 });

  const total = TESTIMONIALS.length;
  const current = TESTIMONIALS[active];

  const navigate = (dir) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive((prev) => (prev + dir + total) % total);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <section
      className={`${styles.section} reveal`}
      ref={sectionRef}
      aria-label="Testimonios de clientes"
    >
      <div className="container">

        {/* Header */}
        <div className={`${styles.headerRow} reveal`} ref={headingRef}>
          <h2 className={styles.sectionHeading}>
            <HoverText as="span" type="words">{SECTION_HEADING}</HoverText>
          </h2>
          <p className={styles.sectionSubheading}>{SECTION_SUBHEADING}</p>
        </div>

        {/* Card */}
        <div className={`${styles.card} border-glow`}>

          {/* Photo column */}
          <div className={styles.photoCol}>
            <div className={styles.photoWrapper}>
              <Image
                src={current.image}
                alt={`Foto de ${current.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 380px"
                className={styles.photo}
                priority
              />
              <div className={styles.photoOverlay} aria-hidden="true" />
              <p className={styles.photoCaption}>{current.caption}</p>
            </div>
          </div>

          {/* Quote column */}
          <div className={`${styles.quoteCol} ${animating ? styles.animOut : styles.animIn}`}>

            {/* Stars */}
            <div className={styles.stars} aria-label={`${current.stars} estrellas`}>
              {Array.from({ length: current.stars }).map((_, i) => (
                <span key={i} className={styles.star}><StarIcon /></span>
              ))}
            </div>

            {/* Quote */}
            <blockquote className={styles.quote}>{current.quote}</blockquote>

            {/* Author */}
            <div className={styles.author}>
              <span className={styles.authorName}>{current.name}</span>
              <span className={styles.authorRole}>{current.role}</span>
            </div>

            {/* Nav */}
            <div className={styles.navRow}>
              <div className={styles.dots} role="tablist" aria-label="Seleccionar testimonio">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === active}
                    aria-label={`Testimonio ${i + 1}`}
                    className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                    onClick={() => {
                      if (animating || i === active) return;
                      setAnimating(true);
                      setTimeout(() => { setActive(i); setAnimating(false); }, 300);
                    }}
                  />
                ))}
              </div>

              <div className={styles.arrows}>
                <button type="button" className={styles.arrowBtn} onClick={() => navigate(-1)} aria-label="Testimonio anterior">
                  <ArrowLeft />
                </button>
                <button type="button" className={styles.arrowBtn} onClick={() => navigate(1)} aria-label="Testimonio siguiente">
                  <ArrowRight />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
