'use client';

import { useCallback, useRef } from 'react';

/**
 * useTilt — subtle 3D pointer-tilt for cards. Writes --tilt-rx/--tilt-ry
 * (rotation) and --tilt-mx/--tilt-my (pointer position, for a glare/spotlight
 * pseudo-element) as CSS custom properties, so the visuals live entirely in
 * CSS and this hook stays framework/animation-library free.
 *
 * Spread the returned handlers onto the element you want to tilt.
 */
export function useTilt({ max = 8 } = {}) {
  const ref = useRef(null);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    el.style.setProperty('--tilt-rx', `${((0.5 - py) * max).toFixed(2)}deg`);
    el.style.setProperty('--tilt-ry', `${((px - 0.5) * max).toFixed(2)}deg`);
    el.style.setProperty('--tilt-mx', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--tilt-my', `${(py * 100).toFixed(1)}%`);
  }, [max]);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--tilt-rx', '0deg');
    el.style.setProperty('--tilt-ry', '0deg');
  }, []);

  return { ref, onMouseMove: handleMove, onMouseLeave: handleLeave };
}
