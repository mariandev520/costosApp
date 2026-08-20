'use client';

import { useScrollRevealMultiple } from '@/hooks/useScrollReveal';
import HoverText from '@/components/HoverText/HoverText';
import styles from './AIAgentChat.module.css';

const HIGHLIGHTS = [
  {
    title: 'Conectado a WhatsApp',
    desc: 'Le escribís por el WhatsApp de siempre, sin instalar ni aprender nada nuevo.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    title: 'Datos al instante',
    desc: 'Stock, precios, márgenes y proveedores: te responde con la info actualizada al minuto.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'Disponible 24/7',
    desc: 'Preguntale desde el salón, la cocina o en casa. Siempre tiene la respuesta a mano.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const CHAT_MESSAGES = [
  { from: 'user', text: '¿Cuánto stock de harina me queda?' },
  { from: 'agent', text: 'Te quedan 12kg de Harina 000. Al ritmo de esta semana, alcanza para 4 días.' },
  { from: 'user', text: '¿Subió algo el proveedor este mes?' },
  { from: 'agent', text: 'Sí: Distribuidora Molino Azul subió el aceite de oliva un 6% desde el 12/03.' },
];

export default function AIAgentChat() {
  const containerRef = useScrollRevealMultiple();

  return (
    <section id="agente-ia-whatsapp" className={styles.section}>
      <div className="container" ref={containerRef}>
        <div className={styles.content}>
          <div className={`${styles.textCol} reveal`}>
            <HoverText as="p" type="chars" className={styles.subtitle}>AGENTE IA · WHATSAPP</HoverText>
            <h2 className={styles.title}>
              <HoverText as="span" type="words">Preguntale a tu negocio. Te contesta al instante.</HoverText>
            </h2>
            <HoverText as="p" type="words" className={styles.description}>
              Un agente de IA enlazado a WhatsApp que conoce tus proveedores, tu stock y tus costes.
              Le escribís como a un empleado más y te responde en segundos, sin abrir la app.
            </HoverText>

            <div className={styles.highlights}>
              {HIGHLIGHTS.map((item) => (
                <div key={item.title} className={styles.highlightItem}>
                  <div className={styles.highlightIcon}>{item.icon}</div>
                  <div>
                    <h3 className={styles.highlightTitle}>{item.title}</h3>
                    <p className={styles.highlightDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.chatCol} reveal reveal--delay-2`}>
            <div className={`${styles.chatCard} border-glow`}>
              <div className={styles.chatHeader}>
                <div className={styles.chatAvatar}>IA</div>
                <div>
                  <span className={styles.chatName}>Agente Costos.app</span>
                  <span className={styles.chatStatus}>En línea</span>
                </div>
              </div>
              <div className={styles.chatBody}>
                {CHAT_MESSAGES.map((msg, index) => (
                  <div
                    key={index}
                    className={`${styles.bubble} ${msg.from === 'user' ? styles.bubbleUser : styles.bubbleAgent}`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
