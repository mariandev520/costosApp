/**
 * Zod validation schemas for MDX frontmatter.
 *
 * - baseContentSchema  — shared fields for all content types
 * - projectSchema      — portfolio project frontmatter
 * - blogSchema         — blog post frontmatter (stub, future use)
 *
 * Validation runs at content-load time so missing / malformed
 * fields fail loudly during build rather than breaking silently.
 *
 * IMPORTANT: gray-matter parses empty YAML values as `null`.
 * All optional / array fields use `.nullable()` + `.transform()`
 * to coerce null → safe defaults. This prevents Zod errors when
 * authors leave fields blank in the frontmatter template.
 */

import { z } from 'zod';

/** Helper: accept null and coerce to a string default. */
const nullableString = (fallback = '') =>
  z.string().nullable().optional().transform((v) => v ?? fallback);

/** Helper: accept null and coerce to an empty array. */
const nullableArray = (itemSchema) =>
  z
    .array(itemSchema)
    .nullable()
    .optional()
    .transform((v) => v ?? []);

/* ------------------------------------------------------------------
   Base schema — fields shared by every content type
   ------------------------------------------------------------------ */
export const baseContentSchema = z.object({
  title: z.string().min(1, 'title is required'),
  slug: z.string().min(1, 'slug is required'),
  description: z.string().min(1, 'description is required'),
  publishedAt: nullableString(),
  updatedAt: nullableString(),
  keywords: nullableArray(z.string()),
});

/* ------------------------------------------------------------------
   Project schema — portfolio case-study frontmatter
   ------------------------------------------------------------------ */
export const projectSchema = baseContentSchema.extend({
  category: z.string().min(1, 'category is required'),
  client: nullableString(),
  year: nullableString(),
  services: nullableArray(z.string()),
  technologies: nullableArray(z.string()),

  // Media
  coverImage: nullableString(),
  video: nullableString(),
  gallery: nullableArray(
    z.union([
      z.string(),
      z.object({
        src: z.string(),
        alt: nullableString(),
        width: z.number().optional(),
        height: z.number().optional(),
      }),
    ])
  ),

  // Display
  alt: nullableString(),
  size: z
    .enum(['hero', 'tall', 'default', 'wide'])
    .nullable()
    .optional()
    .transform((v) => v ?? 'default'),
  featured: z
    .boolean()
    .nullable()
    .optional()
    .transform((v) => v ?? false),

  // Extra links
  website: nullableString(),
});

/* ------------------------------------------------------------------
   Blog schema — stub for future blog posts
   ------------------------------------------------------------------ */
export const blogSchema = baseContentSchema.extend({
  author: nullableString('Visualo Studio'),
  coverImage: nullableString(),
  tags: nullableArray(z.string()),
  draft: z
    .boolean()
    .nullable()
    .optional()
    .transform((v) => v ?? false),
});
