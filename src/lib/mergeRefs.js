/**
 * mergeRefs — combine multiple refs (ref objects or callback refs) into one
 * callback ref, so a single DOM node can feed several hooks at once.
 */
export function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') ref(node);
      else ref.current = node;
    });
  };
}
