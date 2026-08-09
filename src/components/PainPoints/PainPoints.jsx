'use client';

import SectionHeader from '@/components/SectionHeader/SectionHeader';
import { useScrollRevealMultiple } from '@/hooks/useScrollReveal';
import { useTilt } from '@/hooks/useTilt';
import HoverText from '@/components/HoverText/HoverText';
import styles from './PainPoints.module.css';

const PAIN_POINTS = [
  {
    title: 'Precios a ciegas',
    description: 'Un Proveedor Sube Un Coste Y No Te Enteras Hasta Cuadrar Caja A Fin De Mes.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Horas en factura',
    description: 'Cargar Cada Compra A Mano Te Roba Tiempo Que Deberías Pasar En La Cocina O Con Tus Clientes.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Sustos De Stock',
    description: 'Te Quedas Sin Un Ingrediente Clave En Mitad De Un Servicio, Sin Haberlo Visto Venir.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    title: 'Márgenes a ojo',
    description: 'No Sabes Con Certeza Si Un Plato Del Menú Te Da Beneficio O Te Está Costando Dinero.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
];

function PainPointCard({ point, index }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt({ max: 5 });

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`${styles.card} tilt tilt-glare border-glow reveal reveal--delay-${(index % 2) + 1}`}
    >
      <div className={styles.iconWrapper}>
        {point.icon}
      </div>
      <h3 className={styles.cardTitle}><HoverText as="span" type="chars">{point.title}</HoverText></h3>
      <HoverText as="p" type="words" className={styles.cardDescription}>{point.description}</HoverText>
    </div>
  );
}

export default function PainPoints() {
  const containerRef = useScrollRevealMultiple();

  return (
    <section id="pain-points" className={styles.section}>
      <div className="container" ref={containerRef}>
        <div className={styles.header}>
          <h2 className={styles.title}><HoverText as="span" type="words">Cada Semana Se Te Escapa Algo</HoverText></h2>
          <HoverText as="p" type="chars" className={styles.subtitle}>EL DÍA A DÍA SIN COSTOSAPP</HoverText>
        </div>

        <div className={styles.grid}>
          {PAIN_POINTS.map((point, index) => (
            <PainPointCard key={point.title} point={point} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
