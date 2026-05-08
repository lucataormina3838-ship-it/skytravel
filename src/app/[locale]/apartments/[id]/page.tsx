import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Apartment } from '@/lib/types';
import ApartmentDetailClient from './ApartmentDetailClient';

async function getApartment(id: string) {
  const supabase = await createClient();
  const [{ data: apartment }, { data: blockedDates }] = await Promise.all([
    supabase.from('apartments').select('*').eq('id', id).single(),
    supabase.from('blocked_dates').select('blocked_date').eq('item_id', id).eq('item_type', 'apartment'),
  ]);
  return {
    apartment: apartment as Apartment | null,
    blockedDates: (blockedDates || []).map(d => d.blocked_date),
  };
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const { apartment } = await getApartment(id);
  if (!apartment) return { title: 'Not Found' };
  return { title: `Sky Travel – ${locale === 'fr' ? apartment.title_fr : apartment.title_en}` };
}

export default async function ApartmentDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const { apartment, blockedDates } = await getApartment(id);

  if (!apartment) notFound();

  return (
    <ApartmentDetailClient
      apartment={apartment}
      blockedDates={blockedDates}
      locale={locale}
    />
  );
}
