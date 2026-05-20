export interface CardItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  ctaLabel: string;
  accentColor?: string;
}

export const accessories: CardItem[] = [
  {
    id: 'a1',
    icon: 'racing-helmet',
    title: 'Capacete Racing',
    description: 'Capacete full-face em fibra de carbono com viseira anti-embaçante e sistema de ventilação aerodinâmico.',
    ctaLabel: 'Ver Mais',
    accentColor: '#E53935',
  },
  {
    id: 'a2',
    icon: 'hand-back-right',
    title: 'Luvas Esportivas',
    description: 'Luvas reforçadas com Kevlar, proteção nos nós e pontas dos dedos compatíveis com touchscreen.',
    ctaLabel: 'Ver Mais',
    accentColor: '#FF6D00',
  },
  {
    id: 'a3',
    icon: 'tshirt-crew',
    title: 'Jaqueta de Couro',
    description: 'Jaqueta com proteção CE certificada, couro perfurado para ventilação e estilo esportivo.',
    ctaLabel: 'Ver Mais',
    accentColor: '#E53935',
  },
  {
    id: 'a4',
    icon: 'tire',
    title: 'Pneus de Alta Performance',
    description: 'Compostos de alta aderência para máximo grip em pista e nas ruas, com tecnologia de borracha multicamada.',
    ctaLabel: 'Ver Mais',
    accentColor: '#FF6D00',
  },
  {
    id: 'a5',
    icon: 'link-variant',
    title: 'Kit de Corrente',
    description: 'Corrente gold-series com anel O-ring e coroas de aço temperado para máxima durabilidade.',
    ctaLabel: 'Ver Mais',
    accentColor: '#E53935',
  },
];

export const maintenanceTips: CardItem[] = [
  {
    id: 'm1',
    icon: 'air-filter',
    title: 'Limpeza de Filtro de Ar',
    description: 'Limpe ou substitua a cada 10.000 km para garantir a mistura ideal de ar e combustível.',
    ctaLabel: 'Saiba Mais',
  },
  {
    id: 'm2',
    icon: 'oil',
    title: 'Troca de Óleo',
    description: 'Use óleo recomendado pelo fabricante a cada 6.000 km ou 6 meses para proteger o motor.',
    ctaLabel: 'Saiba Mais',
  },
  {
    id: 'm3',
    icon: 'gauge',
    title: 'Calibragem de Pneus',
    description: 'Verifique a pressão a frio semanalmente: dianteiro 33 PSI, traseiro 36 PSI (valores típicos).',
    ctaLabel: 'Saiba Mais',
  },
  {
    id: 'm4',
    icon: 'link-variant',
    title: 'Verificação de Corrente',
    description: 'Limpe e lubrifique a cada 500 km, verificando a tensão regularmente para evitar desgaste.',
    ctaLabel: 'Saiba Mais',
  },
  {
    id: 'm5',
    icon: 'car-brake-alert',
    title: 'Inspeção de Freios',
    description: 'Inspecione as pastilhas a cada 5.000 km e substitua quando abaixo de 2mm de espessura.',
    ctaLabel: 'Saiba Mais',
  },
];
