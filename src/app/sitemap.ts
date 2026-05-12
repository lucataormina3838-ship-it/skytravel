import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

const BASE = 'https://skytravel-sardinia.vercel.app';
const LOCALES = ['fr', 'en'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const [{ data: apartments }, { data: packs }] = await Promise.all([
    supabase.from('apartments').select('id, updated_at'),
    supabase.from('packs').select('id, updated_at'),
  ]);

  const staticPages = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/apartments', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/packs', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/faq', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/guide/location-vacances-sardaigne', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/guide/excursion-bateau-cala-luna', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/guide/que-faire-cala-gonone', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  const staticEntries: MetadataRoute.Sitemap = LOCALES.flatMap(locale =>
    staticPages.map(p => ({
      url: `${BASE}/${locale}${p.path}`,
      lastModified: new Date(),
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      alternates: {
        languages: Object.fromEntries(LOCALES.map(l => [l, `${BASE}/${l}${p.path}`])),
      },
    }))
  );

  const apartmentEntries: MetadataRoute.Sitemap = LOCALES.flatMap(locale =>
    (apartments || []).map(apt => ({
      url: `${BASE}/${locale}/apartments/${apt.id}`,
      lastModified: apt.updated_at ? new Date(apt.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
      alternates: {
        languages: Object.fromEntries(LOCALES.map(l => [l, `${BASE}/${l}/apartments/${apt.id}`])),
      },
    }))
  );

  const packEntries: MetadataRoute.Sitemap = LOCALES.flatMap(locale =>
    (packs || []).map(pack => ({
      url: `${BASE}/${locale}/packs/${pack.id}`,
      lastModified: pack.updated_at ? new Date(pack.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(LOCALES.map(l => [l, `${BASE}/${l}/packs/${pack.id}`])),
      },
    }))
  );

  return [...staticEntries, ...apartmentEntries, ...packEntries];
}
