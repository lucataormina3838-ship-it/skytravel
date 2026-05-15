import { getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { Apartment } from '@/lib/types';
import ApartmentsGrid from '@/components/ApartmentsGrid';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
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
    <div className="min-h-screen bg-slate-950">
      {/* Premium hero header */}
      <div className="relative pt-40 pb-24 px-4 overflow-hidden">
        {/* Background gradient + glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-amber-500/[0.04] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-block text-amber-400 text-xs font-bold tracking-[0.3em] uppercase mb-5">
            Collection · Sardaigne
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
            Nos villas<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
              d&apos;exception
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="h-px w-12 bg-amber-400/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <div className="h-px w-12 bg-amber-400/50" />
          </div>
        </div>
      </div>

      <ApartmentsGrid apartments={apartments} locale={locale} noResultsText={t('no_results')} />
    </div>
  );
}
