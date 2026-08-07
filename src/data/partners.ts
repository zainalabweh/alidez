// src/data/partners.ts
import type { ImageMetadata } from 'astro';
import type { Lang } from '@/i18n/utils';

export interface Partner {
  id: string;
  label: Record<Lang, string>;
  logo?: ImageMetadata; // import from src/assets when Zain sends them
  url?: string;
}

export const partners: Partner[] = [
  { id: 'inifap', label: { es: 'INIFAP', en: 'INIFAP' } },
  { id: 'sedrae', label: { es: 'Secretaría de Desarrollo Rural', en: 'Ministry of Rural Development' } },
  { id: 'angus', label: { es: 'Asociación Angus Mexicana', en: 'Mexico Angus Beef Association' } },
  { id: 'proinova', label: { es: 'Grupo Proinova', en: 'Grupo Proinova' } },
  { id: 'cactusnet', label: { es: 'FAO CactusNet', en: 'FAO CactusNet' } },
];
