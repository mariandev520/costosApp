/**
 * MDX compilation wrapper.
 *
 * Uses the `evaluate` function from @mdx-js/mdx to compile MDX
 * strings into React components at request/build time inside
 * React Server Components.
 *
 * This replaces the need for next-mdx-remote entirely.
 */

import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';

/**
 * Compile an MDX string and return the default export (a React component).
 *
 * @param {string} source  — raw MDX body (frontmatter already stripped)
 * @param {Record<string, React.ComponentType>} components — custom component map
 * @returns {Promise<React.ComponentType>} compiled MDX component
 */
export async function compileMDX(source, components = {}) {
  const { default: MDXContent } = await evaluate(source, {
    ...runtime,
    // Provide the component map so <DetailImage>, <Video>, etc. resolve
    useMDXComponents: () => components,
  });

  return MDXContent;
}
