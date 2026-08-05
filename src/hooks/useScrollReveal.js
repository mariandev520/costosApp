'use client';

import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — Observe an element and toggle a `.visible` class
 * when it enters the viewport (using IntersectionObserver).
 *
 * @param {Object} options
 * @param {number} options.threshold - Visibility threshold (0–1)
 * @param {string} options.rootMargin - Root margin for observer
 * @returns {React.RefObject} ref to attach to the element
 */
export function useScrollReveal({ threshold = 0.1, rootMargin = '0px 0px -40px 0px' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}

/**
 * useScrollRevealMultiple — Observe multiple children inside a container
 * and reveal them with staggered delays.
 *
 * @param {Object} options
 * @param {string} options.selector - CSS selector for children to observe
 * @param {number} options.threshold - Visibility threshold (0–1)
 * @param {string} options.rootMargin - Root margin for observer
 * @returns {React.RefObject} ref to attach to the container
 */
export function useScrollRevealMultiple({ selector = '.reveal', threshold = 0.1, rootMargin = '0px 0px -40px 0px' } = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, threshold, rootMargin]);

  return containerRef;
}
