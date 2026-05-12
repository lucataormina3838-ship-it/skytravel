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
  const isFr = locale === 'fr';
  const title = isFr ? apartment.title_fr : apartment.title_en;
  const desc = isFr ? apartment.description_fr : apartment.description_en;
  return {
    title: `${title} – Location Sardaigne | Sky Travel`,
    description: desc ? `${desc.slice(0, 155)}…` : `Location de vacances en Sardaigne : ${title}. Réservez directement avec Sky Travel, agence francophone.`,
    alternates: {
      canonical: `https://skytravel-sardinia.vercel.app/${locale}/apartments/${apartment.id}`,
    },
  };
}

export default async function ApartmentDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const { apartment, blockedDates } = await getApartment(id);

  if (!apartment) notFound();

  const isFr = locale === 'fr';
  const title = isFr ? apartment.title_fr : apartment.title_en;
  const desc  = isFr ? apartment.description_fr : apartment.description_en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
    name: title,
    description: desc,
    url: `https://skytravel-sardinia.vercel.app/${locale}/apartments/${apartment.id}`,
    image: apartment.images?.[0] ?? undefined,
    numberOfRooms: apartment.bedrooms,
    occupancy: { '@type': 'QuantitativeValue', maxValue: apartment.max_guests },
    floorSize: apartment.area_sqm ? { '@type': 'QuantitativeValue', value: apartment.area_sqm, unitCode: 'MTK' } : undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: apartment.location || 'Sardaigne',
      addressCountry: 'IT',
    },
    containedInPlace: {
      '@type': 'TouristDestination',
      name: 'Sardaigne, Italie',
    },
    amenityFeature: (apartment.amenities || []).map((a: string) => ({
      '@type': 'LocationFeatureSpecification',
      name: a,
      value: true,
    })),
    offers: {
      '@type': 'Offer',
      price: apartment.price_per_night,
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: apartment.price_per_night,
        priceCurrency: 'EUR',
        unitText: 'NIGHT',
      },
      availability: 'https://schema.org/InStock',
      url: `https://skytravel-sardinia.vercel.app/${locale}/apartments/${apartment.id}`,
    },
    provider: {
      '@type': 'TravelAgency',
      name: 'Sky Travel Sardaigne',
      url: 'https://skytravel-sardinia.vercel.app',
      telephone: '+33770018291',
      email: 'skytravel.sardegna@gmail.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ApartmentDetailClient
        apartment={apartment}
        blockedDates={blockedDates}
        locale={locale}
      />
    </>
  );
}
