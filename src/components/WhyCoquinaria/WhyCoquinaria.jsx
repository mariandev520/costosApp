
'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './WhyCoquinaria.module.css';

const CARDS_DATA = [
    {
        id: 1,
        icon: '/images/icon-reels.svg',
        title: 'Edición de Reels',
        copy: 'Ediciones profesionales diseñadas para mejorar el tiempo de visualización y la interacción con el espectador.',
    },
    {
        id: 2,
        icon: '/images/icon-shorts.svg',
        title: 'Edición de vídeos cortos de YouTube',
        copy: 'Ediciones dinámicas optimizadas para plataformas de formato corto.',
    },
    {
        id: 3,
        icon: '/images/icon-talking.svg',
        title: 'Vídeos de personas hablando a cámara',
        copy: 'Subtítulos, efectos de zoom, transiciones y edición para mantener la atención del público.',
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
                    <p className={styles.subtitle}>SERVICIOS</p>
                    <h2 className={styles.title}>
                        Soluciones audiovisuales diseñadas para impactar.
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
                                <div className={styles.iconWrapper}>
                                    <img
                                        src={card.icon}
                                        alt={card.title}
                                        className={styles.cardIcon}
                                    />
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>{card.title}</h3>
                                    <p className={styles.cardCopy}>{card.copy}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}