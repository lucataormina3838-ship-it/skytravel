import { getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { Pack } from '@/lib/types';
import PackCard from '@/components/PackCard';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === 'fr';
  return {
    title: isFr ? 'Packs Découverte Sardaigne | Sky Travel' : 'Sardinia Discovery Packs | Sky Travel',
    description: isFr
      ? 'Vivez des expériences authentiques en Sardaigne avec nos packs découverte : sorties en bateau, excursions quad, randonnées, nuits en forêt. Conçus par des Sardes pour les francophones.'
      : 'Live authentic experiences in Sardinia with our discovery packs: boat trips, quad excursions, hikes, forest nights. Designed by Sardinians for French speakers.',
    alternates: {
      canonical: `https://skytravel-sardinia.vercel.app/${locale}/packs`,
      languages: {
        fr: 'https://skytravel-sardinia.vercel.app/fr/packs',
        en: 'https://skytravel-sardinia.vercel.app/en/packs',
      },
    },
  };
}

async function getPacks() {
  const supabase = await createClient();
  const { data } = await supabase.from('packs').select('*').order('featured', { ascending: false }).order('created_at', { ascending: false });
  return (data || []) as Pack[];
}

export default async function PacksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'packs' });
  const packs = await getPacks();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-emerald-800 to-sky-900 pt-32 pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-emerald-300 font-semibold text-sm uppercase tracking-wider mb-3">Expériences</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h1>
          <p className="text-slate-300 text-lg">{t('subtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packs.map(pack => <PackCard key={pack.id} pack={pack} />)}
        </div>
      </div>
    </div>
  );
}
