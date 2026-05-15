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
  const isFr = locale === 'fr';
  const title = isFr ? pack.title_fr : pack.title_en;
  const desc = isFr ? pack.description_fr : pack.description_en;
  return {
    title: `${title} – Pack Découverte Sardaigne | Sky Travel`,
    description: desc ? `${desc.slice(0, 155)}…` : `Pack découverte en Sardaigne : ${title}. Réservez avec Sky Travel, votre agence francophone.`,
    alternates: {
      canonical: `https://skytravel-sardinia.vercel.app/${locale}/packs/${pack.id}`,
    },
  };
}

export default async function PackDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const pack = await getPack(id);
  if (!pack) notFound();

  return <PackDetailClient pack={pack} locale={locale} />;
}
