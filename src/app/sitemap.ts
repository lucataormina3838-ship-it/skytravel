import { MetadataRoute } from 'next';

const BASE = 'https://skytravel-sardinia.vercel.app';
const LOCALES = ['fr', 'en'];

async function getIds(table: string): Promise<{ id: string; updated_at?: string }[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${table}?select=id,updated_at`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [apartments, packs] = await Promise.all([
    getIds('apartments'),
    getIds('packs'),
  ]);

  const staticPages = [
    { path: '',                                    priority: 1.0, cf: 'weekly'  },
    { path: '/apartments',                         priority: 0.9, cf: 'weekly'  },
    { path: '/packs',                              priority: 0.9, cf: 'weekly'  },
    { path: '/about',                              priority: 0.7, cf: 'monthly' },
    { path: '/faq',                                priority: 0.7, cf: 'monthly' },
    { path: '/contact',                            priority: 0.6, cf: 'monthly' },
    { path: '/guide/location-vacances-sardaigne',  priority: 0.8, cf: 'monthly' },
    { path: '/guide/excursion-bateau-cala-luna',   priority: 0.8, cf: 'monthly' },
    { path: '/guide/que-faire-cala-gonone',        priority: 0.7, cf: 'monthly' },
  ] as const;

  const staticEntries: MetadataRoute.Sitemap = LOCALES.flatMap(locale =>
    staticPages.map(p => ({
      url: `${BASE}/${locale}${p.path}`,
      lastModified: new Date(),
      changeFrequency: p.cf,
      priority: p.priority,
    }))
  );

  const apartmentEntries: MetadataRoute.Sitemap = LOCALES.flatMap(locale =>
    apartments.map(a => ({
      url: `${BASE}/${locale}/apartments/${a.id}`,
      lastModified: a.updated_at ? new Date(a.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }))
  );

  const packEntries: MetadataRoute.Sitemap = LOCALES.flatMap(locale =>
    packs.map(p => ({
      url: `${BASE}/${locale}/packs/${p.id}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  return [...staticEntries, ...apartmentEntries, ...packEntries];
}
