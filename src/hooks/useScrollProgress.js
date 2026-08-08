'use client';

import { useEffect, useRef } from 'react';

/**
 * useScrollProgress — tracks how far an element has travelled through the
 * viewport (0 = just entering from the bottom, 1 = fully exited past the top)
 * and writes it to a CSS custom property on the element itself. CSS can then
 * drive parallax/scale/rotation purely with calc(), no per-frame React work.
 *
 * Only listens to scroll while the element is actually near the viewport
 * (gated by IntersectionObserver), so idle sections cost nothing.
 */
export function useScrollProgress({ property = '--scroll-progress' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const total = rect.height + vh;
      const passed = vh - rect.top;
      const progress = Math.min(1, Math.max(0, total > 0 ? passed / total : 0));
      el.style.setProperty(property, progress.toFixed(4));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          update();
          window.addEventListener('scroll', onScroll, { passive: true });
          window.addEventListener('resize', onScroll, { passive: true });
        } else {
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onScroll);
        }
      },
      { threshold: 0, rootMargin: '25% 0px 25% 0px' }
    );

    observer.observe(el);
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [property]);

  return ref;
}
