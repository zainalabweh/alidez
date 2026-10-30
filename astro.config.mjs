// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

import { copyFile } from 'node:fs/promises';

/**
 * Cloudflare Pages serves the nearest 404.html for a missing URL, but Astro
 * builds src/pages/en/404.astro as en/404/index.html. Copy it to en/404.html
 * so missing /en/... URLs get the English page instead of the Spanish one.
 * @type {import('astro').AstroIntegration}
 */
const englishNotFoundPage = {
  name: 'english-404-page',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      await copyFile(new URL('en/404/index.html', dir), new URL('en/404.html', dir));
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://alidez.com',

  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: { prefixDefaultLocale: false },
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap({
    i18n: {
      defaultLocale: 'es',
      locales: { es: 'es', en: 'en' }
    },
  }), englishNotFoundPage],
});
