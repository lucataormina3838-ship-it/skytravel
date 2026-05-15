import { getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { Apartment } from '@/lib/types';
import ApartmentsGrid from '@/components/ApartmentsGrid';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'apartments' });
  const isFr = locale === 'fr';
  return {
    title: isFr ? 'Appartements & Villas en Sardaigne | Sky Travel' : 'Apartments & Villas in Sardinia | Sky Travel',
    description: isFr
      ? 'Découvrez nos appartements et villas en Sardaigne sélectionnés par des francophones. Locations vue mer, piscine, plage à pied à Costa Paradiso et dans tout le nord de la Sardaigne.'
      : 'Discover our apartments and villas in Sardinia selected by French speakers. Sea view rentals, pool, beach access in Costa Paradiso and northern Sardinia.',
    alternates: {
      canonical: `https://skytravel-sardinia.vercel.app/${locale}/apartments`,
      languages: {
        fr: 'https://skytravel-sardinia.vercel.app/fr/apartments',
        en: 'https://skytravel-sardinia.vercel.app/en/apartments',
      },
    },
  };
}

async function getApartments() {
  const supabase = await createClient();
  const { data } = await supabase.from('apartments').select('*').order('featured', { ascending: false }).order('created_at', { ascending: false });
  return (data || []) as Apartment[];
}

export default async function ApartmentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'apartments' });
  const apartments = await getApartments();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800 to-sky-900 pt-32 pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-sky-300 font-semibold text-sm uppercase tracking-wider mb-3">Sardaigne</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h1>
          <p className="text-slate-300 text-lg">{t('subtitle')}</p>
        </div>
      </div>

      <ApartmentsGrid apartments={apartments} locale={locale} noResultsText={t('no_results')} />
    </div>
  );
}
