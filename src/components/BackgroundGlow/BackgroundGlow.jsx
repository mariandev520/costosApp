'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import styles from './BackgroundGlow.module.css';

/**
 * BackgroundGlow — a soft pastel-violet halo, fixed behind all page content,
 * that follows the cursor across the whole landing page and breathes a
 * little more present as the page is scrolled. The existing yellow blobs
 * (defined on body in globals.css) stay untouched at the edges; this layer
 * only tints the area around the pointer, blended with a wide, borderless
 * falloff so there's never a hard edge.
 */
export default function BackgroundGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    gsap.set(el, { '--glow-x': '50%', '--glow-y': '32%' });
    const xTo = gsap.quickTo(el, '--glow-x', { duration: 0.9, ease: 'power3' });
    const yTo = gsap.quickTo(el, '--glow-y', { duration: 0.9, ease: 'power3' });

    const handleMove = (e) => {
      xTo(`${((e.clientX / window.innerWidth) * 100).toFixed(2)}%`);
      yTo(`${((e.clientY / window.innerHeight) * 100).toFixed(2)}%`);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });

    let ticking = false;
    const updateOpacity = () => {
      ticking = false;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
      el.style.setProperty('--glow-opacity', (0.4 + progress * 0.35).toFixed(3));
    };
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateOpacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateOpacity();

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('scroll', handleScroll);
      gsap.killTweensOf(el);
    };
  }, []);

  return <div ref={glowRef} className={styles.glow} aria-hidden="true" />;
}
