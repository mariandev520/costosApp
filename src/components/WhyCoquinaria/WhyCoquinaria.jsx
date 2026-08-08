
'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './WhyCoquinaria.module.css';

const CARDS_DATA = [
    {
        id: 1,
        title: 'Precios al día',
        copy: 'Actualiza costes en segundos con una foto, no a mano y con calculadora.',
    },
    {
        id: 2,
        title: 'Protección de márgenes',
        copy: 'Detecta subidas de precio en ingredientes antes de que afecten a la rentabilidad de tus platos.',
    },
    {
        id: 3,
        title: 'Costes reales, no estimados',
        copy: 'Cada receta muestra su coste actual, margen de beneficio y precio recomendado al instante.',
    },
    {
        id: 4,
        title: 'Stock sin sorpresas',
        copy: 'Evita roturas de stock y compras innecesarias sabiendo exactamente qué ingredientes necesitas reposición.',
    },
];

export default function WhyCoquinaria() {
    const containerRef = useRef(null);
    const cardRefs = useRef([]);
    const [activeCardIndex, setActiveCardIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const cards = cardRefs.current;
            const viewportHeight = window.innerHeight;

            cards.forEach((card, idx) => {
                if (!card) return;
                const rect = card.getBoundingClientRect();
                if (rect.top <= viewportHeight * 0.4 && rect.bottom >= viewportHeight * 0.2) {
                    setActiveCardIndex(idx);
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="por-que-coquinaria" className={styles.section} ref={containerRef}>
            <div className="container">
                {/* Section Header */}
                <div className={styles.header}>
                    <p className={styles.subtitle}>¿POR QUÉ COQUINARIA?</p>
                    <h2 className={styles.title}>
                        Cuatro pilares para transformar la gestión de tu restaurante.
                    </h2>
                </div>

                {/* Stacked Cards Container */}
                <div className={styles.cardsStack}>
                    {CARDS_DATA.map((card, index) => {
                        const stickyTop = 120 + index * 32;

                        return (
                            <div
                                key={card.id}
                                ref={(el) => (cardRefs.current[index] = el)}
                                className={`${styles.card} ${activeCardIndex === index ? styles.cardActive : ''}`}
                                style={{
                                    top: `${stickyTop}px`,
                                    zIndex: index + 1,
                                }}
                            >
                                <h3 className={styles.cardTitle}>{card.title}</h3>
                                <p className={styles.cardCopy}>{card.copy}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}