// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

import { copyFile } from 'node:fs/promises';

/**
 * Cloudflare Pages serves the nearest 404.html for a missing URL, but Astro
 * builds src/pages/es/404.astro as es/404/index.html. Copy it to es/404.html
 * so missing /es/... URLs get the Spanish page instead of the English one.
 * @type {import('astro').AstroIntegration}
 */
const spanishNotFoundPage = {
  name: 'spanish-404-page',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      await copyFile(new URL('es/404/index.html', dir), new URL('es/404.html', dir));
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://alidez.com',

  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: { prefixDefaultLocale: false },
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap({
    i18n: {
      defaultLocale: 'en',
      locales: { en: 'en', es: 'es' }
    },
  }), spanishNotFoundPage],
});
