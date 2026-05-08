import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Pack } from '@/lib/types';
import PackDetailClient from './PackDetailClient';

async function getPack(id: string) {
  const supabase = await createClient();
  const { data } = await supabase.from('packs').select('*').eq('id', id).single();
  return data as Pack | null;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const pack = await getPack(id);
  if (!pack) return { title: 'Not Found' };
  return {
    title: `Sky Travel – ${locale === 'fr' ? pack.title_fr : pack.title_en}`,
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  };
}

export default async function PackDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const pack = await getPack(id);
  if (!pack) notFound();

  return <PackDetailClient pack={pack} locale={locale} />;
}
