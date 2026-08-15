'use client';

import { forwardRef } from 'react';

/**
 * HoverText — drop-in wrapper that gives plain text a per-letter/word
 * Keeps the existing text markup and forwards refs without hover animation.
 */
const HoverText = forwardRef(function HoverText(
  { as: Tag = 'span', type, lift, scale, className, children, ...rest },
  forwardedRef
) {
  return (
    <Tag ref={forwardedRef} className={className} {...rest}>
      {children}
    </Tag>
  );
});

export default HoverText;
