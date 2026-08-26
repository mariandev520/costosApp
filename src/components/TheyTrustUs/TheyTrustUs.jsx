'use client';

import Image from 'next/image';
import HoverText from '@/components/HoverText/HoverText';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './TheyTrustUs.module.css';

/* ─── Logo data ─────────────────────────────────────────────────── */
const LOGOS = [
  { src: '/images/logo-coquinaria.webp', alt: 'Coquinaria', width: 160, height: 60 },
  { src: '/images/logo-criollo.webp',    alt: 'Criollo',    width: 160, height: 60 },
  { src: '/images/logo-evofit.webp',     alt: 'Evofit',     width: 160, height: 60 },
  { src: '/images/logo-turemito.webp',   alt: 'Turemito',   width: 160, height: 60 },
];

export default function TheyTrustUs() {
  const sectionRef = useScrollReveal({ threshold: 0.08 });
  const headingRef = useScrollReveal({ threshold: 0.1 });

  /* Duplicate the list for seamless infinite loop */
  const track = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section
      className={`${styles.section} reveal`}
      ref={sectionRef}
      aria-label="Nuestros clientes"
    >
      <div className="container">
        {/* Header */}
        <div className={`${styles.headerRow} reveal`} ref={headingRef}>
          <h2 className={styles.sectionHeading}>
            <HoverText as="span" type="words">Nuestros clientes</HoverText>
          </h2>
          <p className={styles.sectionSubheading}>
            Empresas que ya confían en nosotros
          </p>
        </div>

        {/* Carousel */}
        <div className={styles.carousel} aria-hidden="true">
          <div className={styles.track}>
            {track.map((logo, i) => (
              <div className={styles.logoItem} key={i}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className={styles.logo}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
