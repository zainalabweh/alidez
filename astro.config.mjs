// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

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
  })],
});
