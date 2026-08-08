'use client';

import { useEffect, useState } from 'react';

/**
 * useScrollSpy — Track which section is currently in viewport.
 *
 * @param {string[]} sectionIds - Array of section element IDs
 * @param {Object} options
 * @param {number} options.threshold - Visibility threshold
 * @returns {string|null} The ID of the currently active section
 */
export function useScrollSpy(sectionIds, { threshold = 0.4 } = {}) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold }
    );

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds, threshold]);

  return activeId;
}
