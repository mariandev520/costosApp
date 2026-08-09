'use client';

import { useEffect, useRef } from 'react';
import { gsap, SplitText } from '@/lib/gsap';

/**
 * useHoverPop — splits the element's text into chars or words and makes each
 * one "pop" (lift + scale + accent flash) as the pointer passes over it, so
 * the reaction follows the cursor letter-by-letter/word-by-word instead of
 * firing once for the whole block. Uses a single delegated mouseover
 * listener rather than per-item listeners.
 */
export function useHoverPop({ type = 'words', lift = 10, scale = 1.08 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (window.matchMedia('(hover: none)').matches) return undefined;

    const className = type === 'chars' ? 'hoverPopChar' : 'hoverPopWord';
    const split = new SplitText(el, { type, charsClass: className, wordsClass: className });
    const targets = type === 'chars' ? split.chars : split.words;

    const handleOver = (e) => {
      const target = e.target.closest(`.${className}`);
      if (!target || !targets.includes(target)) return;
      gsap.killTweensOf(target);
      gsap
        .timeline()
        .to(target, {
          y: -lift,
          scale,
          color: 'var(--color-text-hover-accent)',
          duration: 0.22,
          ease: 'power2.out',
        })
        .to(target, {
          y: 0,
          scale: 1,
          clearProps: 'color',
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
        });
    };

    el.addEventListener('mouseover', handleOver);

    return () => {
      el.removeEventListener('mouseover', handleOver);
      gsap.killTweensOf(targets);
      split.revert();
    };
  }, [type, lift, scale]);

  return ref;
}
