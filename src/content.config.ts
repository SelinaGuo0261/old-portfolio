import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Every project lives in its own folder:
 *
 *   src/content/projects/<slug>/index.mdx   ← frontmatter + page content
 *   src/content/projects/<slug>/images/     ← only this project's images
 *
 * The folder name becomes the URL slug. Image paths in frontmatter and
 * in the MDX body are relative to the folder, e.g. `./images/cover.png`.
 */
const projects = defineCollection({
  loader: glob({
    pattern: '*/index.{md,mdx}',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.split('/')[0]!,
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /**
       * Which section the project belongs to; decides its URL:
       *   professional → /main-work/<slug>
       *   case-study   → /projects/<slug>
       *   playground   → /experiments/<slug>
       */
      category: z.enum(['professional', 'case-study', 'playground']),
      /** Playground only: which heading it appears under. */
      group: z
        .enum([
          'creativity-captain',
          'philosophy-mastermind',
          'compiler-conqueror',
          'workshop-assistant',
          'artistic-alchemist',
          'showcase',
        ])
        .optional(),
      /** Short line above the title, e.g. "Intern @ Fliggy Travel". */
      org: z.string().optional(),
      /** One- or two-sentence pitch used on cards. */
      summary: z.string(),
      /** Longer blurb for the Case Study card stack. */
      description: z.string().optional(),
      /** e.g. "UX Case Study / Product Design / App Design". */
      disciplines: z.string().optional(),
      /** e.g. "09/2024 - 12/2024". */
      period: z.string().optional(),
      tags: z.array(z.string()).default([]),
      /** Title colour on the Case Study card stack. */
      color: z.string().optional(),
      /** Card image. */
      cover: image(),
      /** Image for the Case Study card stack, if different from cover. */
      card: image().optional(),
      /** Full-width banner at the top of the project page. */
      hero: image().optional(),
      /** Extra images shown together (e.g. Workshop Assistant). */
      gallery: z.array(image()).optional(),
      /** When set, cards link here instead of to a project page. */
      externalUrl: z.url().optional(),
      /** Page colours. */
      theme: z
        .object({
          background: z.string().default('#f7f8fa'),
          text: z.string().default('#000000'),
          accent: z.string().default('#fe7505'),
        })
        .default({ background: '#f7f8fa', text: '#000000', accent: '#fe7505' }),
      /** Home page "More interesting..." card; overrides title/summary/image there. */
      showcase: z
        .object({
          title: z.string().optional(),
          summary: z.string().optional(),
          tags: z.array(z.string()).default([]),
          image: image().optional(),
          order: z.number().default(100),
        })
        .optional(),
      /** Lower numbers come first in lists. */
      order: z.number().default(100),
      /** Show in "Latest Works" on the home page. */
      featured: z.boolean().default(false),
      /** Playground "Artistic Alchemist" tile size. */
      tileSize: z.enum(['regular', 'wide', 'tall', 'super-wide']).default('regular'),
      /** List this project in the site footer. */
      footer: z.boolean().default(true),
      /** Card only: no project page of its own. */
      listOnly: z.boolean().default(false),
      /** Hide everywhere (page is not built). */
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
