/**
 * Content loader — filesystem-glob approach for MDX content.
 *
 * Reads .mdx files from src/content/{contentType}/, parses
 * frontmatter with gray-matter, validates with Zod, and
 * compiles MDX body with @mdx-js/mdx.
 *
 * Functions:
 *   getContentBySlug(type, slug) — single item (frontmatter + compiled body)
 *   getAllContent(type)          — all items (frontmatter only, sorted)
 *   getContentSlugs(type)       — slugs for generateStaticParams
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import { projectSchema, blogSchema } from './schemas.js';

/* ------------------------------------------------------------------
   Paths
   ------------------------------------------------------------------ */
const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content');

/**
 * Schema map — each content type maps to its Zod schema.
 * Extend this object when adding new content types.
 */
const SCHEMAS = {
  projects: projectSchema,
  blog: blogSchema,
};

/* ------------------------------------------------------------------
   Helpers
   ------------------------------------------------------------------ */

/**
 * Resolve the directory for a content type.
 * @param {string} contentType — e.g. 'projects', 'blog'
 */
function contentDir(contentType) {
  return path.join(CONTENT_ROOT, contentType);
}

/**
 * List all .mdx filenames in a content type directory.
 * @param {string} contentType
 * @returns {string[]} array of filenames (e.g. ['palomin.mdx', 'kipu.mdx'])
 */
function listMdxFiles(contentType) {
  const dir = contentDir(contentType);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
}

/**
 * Read and parse a single .mdx file.  Returns raw frontmatter data + body.
 * @param {string} contentType
 * @param {string} slug
 * @returns {{ data: object, content: string } | null}
 */
function readMdxFile(contentType, slug) {
  const filePath = path.join(contentDir(contentType), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  return matter(raw);
}

/**
 * Validate frontmatter against the Zod schema for the content type.
 * Throws a descriptive error on validation failure → build breaks loudly.
 * @param {string} contentType
 * @param {object} data — raw frontmatter object from gray-matter
 * @param {string} slug — for error messages
 * @returns {object} validated data
 */
function validateFrontmatter(contentType, data, slug) {
  const schema = SCHEMAS[contentType];
  if (!schema) {
    throw new Error(`[content] No schema registered for content type "${contentType}"`);
  }

  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  • ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    throw new Error(
      `[content] Frontmatter validation failed for ${contentType}/${slug}.mdx:\n${issues}`
    );
  }
  return result.data;
}

/* ------------------------------------------------------------------
   Public API (cached per-request via React cache)
   ------------------------------------------------------------------ */

/**
 * Get a single content item by slug.
 * Returns validated frontmatter + raw MDX source string.
 * The MDXContent component handles compilation in the render tree.
 *
 * @param {string} contentType — 'projects' | 'blog'
 * @param {string} slug
 * @returns {{ frontmatter: object, source: string } | null}
 */
export const getContentBySlug = cache(function getContentBySlug(
  contentType,
  slug
) {
  const parsed = readMdxFile(contentType, slug);
  if (!parsed) return null;

  const frontmatter = validateFrontmatter(contentType, parsed.data, slug);
  return { frontmatter, source: parsed.content };
});

/**
 * Get only the frontmatter for a content item (no MDX body).
 * Useful for metadata generation without compilation overhead.
 *
 * @param {string} contentType
 * @param {string} slug
 * @returns {object | null}
 */
export const getFrontmatterBySlug = cache(function getFrontmatterBySlug(
  contentType,
  slug
) {
  const parsed = readMdxFile(contentType, slug);
  if (!parsed) return null;
  return validateFrontmatter(contentType, parsed.data, slug);
});

/**
 * Get all content items for a type (frontmatter only — no body compilation).
 * Sorted by updatedAt (newest first), then by publishedAt.
 *
 * @param {string} contentType
 * @returns {object[]} array of validated frontmatter objects
 */
export const getAllContent = cache(function getAllContent(contentType) {
  const files = listMdxFiles(contentType);

  const items = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const parsed = readMdxFile(contentType, slug);
    if (!parsed) return null;
    return validateFrontmatter(contentType, parsed.data, slug);
  }).filter(Boolean);

  // Sort: newest updatedAt first
  items.sort((a, b) => {
    const dateA = a.updatedAt || a.publishedAt || '';
    const dateB = b.updatedAt || b.publishedAt || '';
    return dateB.localeCompare(dateA);
  });

  return items;
});

/**
 * Get all slugs for generateStaticParams.
 *
 * @param {string} contentType
 * @returns {{ slug: string }[]}
 */
export const getContentSlugs = cache(function getContentSlugs(contentType) {
  const files = listMdxFiles(contentType);
  return files.map((filename) => ({
    slug: filename.replace(/\.mdx$/, ''),
  }));
});
