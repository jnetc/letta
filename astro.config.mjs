import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  // site: 'https://www.letta.fi',
  site: 'https://jnetc.github.io',
  // base: '/letta',
  compressHTML: true,
  output: 'server',
  adapter: vercel(),
  build: {
    inlineStylesheets: `auto`,
  },
  // image: {
  // Example: Allow remote image optimization from a single domain
  //   domains: ['www.datocms-assets.com'],
  // },
  integrations: [sitemap({ changefreq: 'monthly', priority: 0.9, lastmod: new Date().toISOString() })],
});
