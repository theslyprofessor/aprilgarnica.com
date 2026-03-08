// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://aprilgarnica.com',
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  server: { port: 4326 },
  integrations: [react(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    rehypePlugins: [
      ['rehype-external-links', { rel: ['nofollow', 'noreferrer'], target: '_blank' }],
      'rehype-unwrap-images',
    ],
  },
  prefetch: true,
});
