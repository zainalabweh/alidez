import type { ImageMetadata } from 'astro';
import type { Lang } from '@/i18n/utils';

export interface TeamMember {
  id: string;
  name: string;
  role: Record<Lang, string>;
  summary: Record<Lang, string>;
  points: Record<Lang, string[]>;
  photo?: ImageMetadata; // TODO: import from src/assets when portraits arrive
  linkedin?: string;
}

export const team: TeamMember[] = [
  {
    id: 'zain-alabweh',
    name: 'Zain Alabweh',
    role: { es: 'Fundadora y CEO', en: 'Founder & CEO' },
    summary: {
      en: 'Leads strategy, partnerships, fundraising and commercialization.',
      es: 'Lidera estrategia, alianzas, financiamiento y comercialización.',
    },
    points: {
      en: [
        'Climate adaptation and dryland food systems specialist',
        'World Food Forum (FAO) Youth Policy Board - Lead on Desertification, Drought and Land Degradation',
        'Former researcher, Columbia Climate School',
      ],
      es: [
        'Especialista en adaptación climática y sistemas alimentarios de zonas áridas',
        'World Food Forum (FAO), Consejo Juvenil de Políticas - Líder en Desertificación, Sequía y Degradación de Tierras',
        'Exinvestigadora, Columbia Climate School',
      ],
    },
  },
  {
    id: 'diaz-villasenor',
    name: 'Xicoténcatl Díaz Villaseñor',
    role: { es: 'CTO', en: 'CTO' },
    summary: {
      en: 'Leads product formulation, agronomy and technology.',
      es: 'Lidera la formulación del producto, agronomía y tecnología.',
    },
    points: {
      en: [
        'Agronomical engineer with 30+ years in dryland agriculture',
        'International expert in forage cactus and livestock feed',
        'Led applied research and technology transfer across Mexico',
      ],
      es: [
        'Ingeniero agrónomo con más de 30 años en agricultura de zonas áridas',
        'Experto internacional en nopal forrajero y alimentación animal',
        'Ha dirigido investigación aplicada y transferencia de tecnología en todo México',
      ],
    },
  },
];
