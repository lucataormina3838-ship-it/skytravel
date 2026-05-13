import { MetadataRoute } from 'next';

const BASE = 'https://skytravel-sardinia.vercel.app';
const LOCALES = ['fr', 'en'] as const;

const APARTMENT_IDS = [
  'f58a99a6-ed0f-4e41-bf3d-d182a98a276a',
  '233b42ed-59d6-4579-acc8-aa0c01229b2c',
  '5d27803c-93d5-42fd-a444-5520140f1e4e',
  'c0f0c936-a023-45d3-b7f7-a9789a47f298',
  '8223e796-0a9f-4b4d-b5bb-593e0e98c9a6',
  'bb6ac2c7-5bec-48ff-b35e-4dbb5ab4a96b',
  '7c7a4460-ad51-43ee-81d1-36ff19f7e059',
  '6359ca73-81b8-4006-9a02-5593664d0e88',
];

const PACK_IDS = [
  'ac7d584d-ba98-489e-81d1-c986e4f392f1',
  '1db3f238-6ac7-4465-a843-767cc84c67f2',
  '20683a70-3cd3-440e-ae30-8b03df0acb0a',
];

const STATIC_PAGES = [
  { path: '',                                    priority: 1.0, cf: 'weekly'  },
  { path: '/apartments',                         priority: 0.9, cf: 'weekly'  },
  { path: '/packs',                              priority: 0.9, cf: 'weekly'  },
  { path: '/faq',                                priority: 0.7, cf: 'monthly' },
  { path: '/about',                              priority: 0.7, cf: 'monthly' },
  { path: '/contact',                            priority: 0.6, cf: 'monthly' },
  { path: '/guide/location-vacances-sardaigne',  priority: 0.8, cf: 'monthly' },
  { path: '/guide/excursion-bateau-cala-luna',   priority: 0.8, cf: 'monthly' },
  { path: '/guide/que-faire-cala-gonone',        priority: 0.7, cf: 'monthly' },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = LOCALES.flatMap(locale =>
    STATIC_PAGES.map(p => ({
      url: `${BASE}/${locale}${p.path}`,
      lastModified: now,
      changeFrequency: p.cf,
      priority: p.priority,
    }))
  );

  const apartments = LOCALES.flatMap(locale =>
    APARTMENT_IDS.map(id => ({
      url: `${BASE}/${locale}/apartments/${id}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }))
  );

  const packs = LOCALES.flatMap(locale =>
    PACK_IDS.map(id => ({
      url: `${BASE}/${locale}/packs/${id}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  return [...pages, ...apartments, ...packs];
}
