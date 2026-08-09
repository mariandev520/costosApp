'use client';

import { forwardRef } from 'react';
import { useHoverPop } from '@/hooks/useHoverPop';
import { mergeRefs } from '@/lib/mergeRefs';

/**
 * HoverText — drop-in wrapper that gives plain text a per-letter/word
 * pointer reaction. `type="chars"` suits short labels/titles, `type="words"`
 * suits longer copy (paragraphs) where per-letter splitting would be noisy.
 * Forwards its ref so callers can still hook the same DOM node into their
 * own effects (scroll reveals, entrance tweens, etc).
 */
const HoverText = forwardRef(function HoverText(
  { as: Tag = 'span', type = 'words', lift, scale, className, children, ...rest },
  forwardedRef
) {
  const hoverRef = useHoverPop({ type, lift, scale });

  return (
    <Tag ref={mergeRefs(hoverRef, forwardedRef)} className={className} {...rest}>
      {children}
    </Tag>
  );
});

export default HoverText;
