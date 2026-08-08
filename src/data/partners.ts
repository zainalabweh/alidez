import type { ImageMetadata } from 'astro';
import type { Lang } from '@/i18n/utils';

export type PartnerTier = 'pilot' | 'national' | 'global';

export interface Partner {
  id: string;
  tier: PartnerTier;
  label: Record<Lang, string>;
  /** Shown in the thin strip on the landing page */
  featured?: boolean;
  logo?: ImageMetadata; // import from src/assets once Zain confirms logo permissions
  url?: string;
}

export const partners: Partner[] = [
  // --- Pilot ---
  { id: 'proinova', tier: 'pilot', featured: true, label: { es: 'Grupo Proinova', en: 'Grupo Proinova' } },
  {
    id: 'sedrae',
    tier: 'pilot',
    featured: true,
    label: {
      es: 'Secretaría de Desarrollo Rural y Agroempresarial',
      en: 'Ministry of Rural Development and Agribusiness',
    },
  },

  // --- National ---
  { id: 'inifap', tier: 'national', featured: true, label: { es: 'INIFAP', en: 'INIFAP' } },
  {
    id: 'angus',
    tier: 'national',
    featured: true,
    label: { es: 'Asociación Angus Mexicana', en: 'Mexico Angus Beef Association' },
  },
  {
    id: 'cnog',
    tier: 'national',
    label: {
      es: 'Confederación Nacional de Organizaciones Ganaderas',
      en: 'National Confederation of Livestock Organizations',
    },
  },
  {
    id: 'nopal-network',
    tier: 'national',
    label: { es: 'Red nacional de productores de nopal', en: 'National nopal producer network' },
  },

  // --- Global ---
  { id: 'cactusnet', tier: 'global', featured: true, label: { es: 'FAO CactusNet', en: 'FAO CactusNet' } },
  { id: 'cactismundi', tier: 'global', label: { es: 'CactisMundi (Portugal)', en: 'CactisMundi (Portugal)' } },
  {
    id: 'konya',
    tier: 'global',
    label: { es: 'Instituto Konya (Türkiye)', en: 'Konya Institute (Türkiye)' },
  },
  { id: 'narc', tier: 'global', label: { es: 'NARC (Jordania)', en: 'NARC (Jordan)' } },
];

export const featuredPartners = partners.filter((p) => p.featured);

export function partnersByTier(tier: PartnerTier) {
  return partners.filter((p) => p.tier === tier);
}
