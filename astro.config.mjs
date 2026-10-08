// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// SITE / BASE_PATH let the same build serve a custom domain (base "/")
// or a GitHub Pages project URL (base "/old-portfolio").
export default defineConfig({
  site: process.env.SITE ?? 'https://www.selinaguo.world',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'ignore',
  integrations: [mdx()],
  redirects: {
    '/aroute': '/projects/aroute',
    '/exp-liberals/aigc': '/experiments/aigc',
    '/projects/nimbus': '/main-work/nimbus',
  },
});
