import { getTranslations } from 'next-intl/server';
import { createClient } from '@/lib/supabase/server';
import { Apartment } from '@/lib/types';
import ApartmentCard from '@/components/ApartmentCard';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'apartments' });
  return { title: `Sky Travel – ${t('title')}` };
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

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {apartments.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg">{t('no_results')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apartments.map(apt => (
              <ApartmentCard key={apt.id} apartment={apt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
