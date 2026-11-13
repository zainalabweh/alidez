# Alidez website

The source for [alidez.com](https://alidez.com), the website of Alidez: climate-resilient livestock feed made from nopal cactus, produced in Mexico.

The site is built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). It's bilingual: English is the default language at `/`, and Spanish lives under `/es/`.

## Getting started

You need Node.js 22.12 or newer (`mise.toml` pins Node 22) and [pnpm](https://pnpm.io).

```sh
pnpm install
pnpm dev
```

The dev server runs at http://localhost:4321.

| Command        | What it does                              |
| :------------- | :---------------------------------------- |
| `pnpm dev`     | Start the dev server at `localhost:4321`  |
| `pnpm build`   | Build the site into `dist/`               |
| `pnpm preview` | Serve the built site locally to check it  |
| `pnpm astro …` | Run other Astro CLI commands              |

## Project structure

```text
src/
├── pages/                One file per page: English at the root, Spanish under es/
│   ├── index.astro         Home
│   ├── solution.astro
│   ├── impact.astro
│   ├── about.astro
│   ├── 404.astro
│   └── es/                 The same pages in Spanish
├── components/           Page sections (Hero, Nav, Footer, ContactCta, …)
│   ├── about/              About page sections, plus PageHeader for the inner pages
│   ├── solution/           Solution page sections
│   └── impact/             Impact page sections
├── layouts/
│   └── BaseLayout.astro    <head> tags (SEO, canonical, hreflang), nav and footer
├── i18n/
│   ├── en.json             All the site's text in English, by key
│   ├── es.json             The same keys in Spanish
│   └── utils.ts            useTranslations() and prefix() helpers
├── data/
│   ├── team.ts             Team members on the About page
│   └── partners.ts         Partners on the About page and the home strip
├── assets/
│   ├── brand/              Logo files for the nav and footer
│   ├── photos/             Real photos
│   └── ai/                 AI placeholder images, kept until real photos replace them
├── styles/
│   └── global.css          Tailwind theme (colors, fonts) and shared utilities
└── config.ts             Contact email
public/                   Static files served as-is: favicons, app icons, the share image, robots.txt and _redirects
```

## Editing content

### Text and translations

All text lives in `src/i18n/en.json` and `src/i18n/es.json`, under the same keys. Components read it with `useTranslations(lang)`:

```astro
---
import { useTranslations } from '@/i18n/utils';
const t = useTranslations(lang);
---
<h2>{t('contact.heading')}</h2>
```

When you add or change a key, update both files. A key missing from one language falls back to English, then to the key itself.

### Pages

Every page exists twice: `src/pages/<page>.astro` in English and `src/pages/es/<page>.astro` in Spanish. Both are thin wrappers that set `lang` and render the same components. The two languages use the same English slugs, so the language switch only adds or removes `/es`.

### Team, partners and contact email

- **Team:** edit `src/data/team.ts`. Set `photo` (an image imported from `src/assets`) to replace the placeholder icon, and `linkedin` to show a LinkedIn button.
- **Partners:** edit `src/data/partners.ts`. Each partner has a tier (`pilot`, `national` or `global`), and `featured` partners also appear in the home page strip. Set `logo` once a partner has agreed to their logo being used. The home strip is hidden in `src/pages/index.astro` and `src/pages/es/index.astro` until the logos arrive, and `PartnersStrip.astro` has a commented-out version that shows them.
- **Contact email:** `CONTACT_EMAIL` in `src/config.ts`.

### Images

Put real photos in `src/assets/photos/` and import them in the component that shows them. Astro's `<Image>` resizes and converts them at build time. AI placeholders stay in `src/assets/ai/` until a real photo replaces them.

Before adding a phone photo, remove its location data, for example with `magick in.jpg -auto-orient -strip out.jpg`, and resize large originals to about 2048px wide.

## Styling

`src/styles/global.css` sets up Tailwind and the design system:

- **Colors:** `brand`, `forest`, `amber`, `cream`, `leaf`, `soil`, `ink`, `ink-soft`, `line` and `panel`, used as Tailwind classes like `bg-forest` or `text-ink-soft`.
- **Fonts:** Hanken Grotesk (`font-sans`) and Playfair Display (`font-serif`), loaded through Fontsource.
- **Utilities:** `wrapper` (page width and side padding), `section-y` (section spacing), `eyebrow`, `heading-display`, `heading-section`, `heading-item` and `lead`.

## Brand assets

The logo and icons were redrawn as vectors in the Claude Design project "Logo redraw project", using the colors from `global.css`.

- **Nav and footer:** the horizontal logo in `src/assets/brand/`. The plain version sits on the cream nav, and the `-on-dark` version on the dark footer.
- **Favicons:** `favicon.svg` for current browsers, which switches to leaf green in dark mode, and `favicon.ico` (16, 32 and 48 px) for Safari and older browsers.
- **App icons:** `apple-touch-icon.png` for iPhone and iPad. `icon-192.png`, `icon-512.png` and `icon-maskable-512.png` are for Android and are listed in `site.webmanifest`.
- **Share image:** `og-image-1200x630.png` shows in link previews on WhatsApp, LinkedIn, Slack and iMessage.

The design project's `brand/` folder has the other formats: PNG and stacked versions of the logo, an email signature logo and an 800px social media avatar. Below 64px, use the compact mark, which has no sun rays.

## SEO

- `site` in `astro.config.mjs` is `https://alidez.com`. `BaseLayout.astro` builds the canonical, `hreflang` and `og:image` links from it.
- `@astrojs/sitemap` generates `sitemap-index.xml` at build time, and `public/robots.txt` points to it.
- The 404 pages are marked `noindex`.

## Deployment

The site is hosted on Cloudflare Pages, which builds it from GitHub:

- Pushes to `main` deploy to [alidez.com](https://alidez.com), which is also served at alidez.pages.dev.
- Pushes to other branches get a preview at `<branch>.alidez.pages.dev`. Merge into `main`, for example through a pull request, to publish.
- `www.alidez.com` redirects to `alidez.com` through a Cloudflare Redirect Rule.
- English used to live under `/en/`. `public/_redirects` sends those old addresses to the same page at the root.
- Cloudflare also runs alidez.com's DNS and the email forwarding for hola@alidez.com. Leave the MX and TXT records alone when changing DNS.

Cloudflare Pages serves the nearest `404.html` for a missing URL. Astro builds the Spanish 404 page as `es/404/index.html`, so a small integration in `astro.config.mjs` copies it to `es/404.html` after each build.
