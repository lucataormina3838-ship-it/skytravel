import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/server';
import ApartmentCard from '@/components/ApartmentCard';
import PackCard from '@/components/PackCard';
import { Apartment, Pack } from '@/lib/types';
import { ChevronRight } from 'lucide-react';
import ExclusivePacks from '@/components/home/ExclusivePacks';
import HeroSection from '@/components/home/HeroSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaBanner from '@/components/home/CtaBanner';
import AnimatedSection from '@/components/ui/AnimatedSection';
import InfiniteMarquee from '@/components/ui/InfiniteMarquee';
import MapSection from '@/components/home/MapSection';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === 'fr';
  return {
    title: isFr
      ? 'Sky Travel – Location de vacances en Sardaigne pour francophones'
      : 'Sky Travel – Holiday rentals in Sardinia for French speakers',
    description: isFr
      ? 'Agence de location en Sardaigne tenue par des Sardes francophones. Appartements et villas vue mer, packs découverte authentiques. Réservation directe, sans intermédiaire, en français.'
      : 'Sardinia rental agency run by Sardinian French speakers. Sea view apartments and villas, authentic discovery packs. Direct booking, no middleman, in French.',
    alternates: {
      canonical: `https://skytravel-sardinia.vercel.app/${locale}`,
      languages: {
        fr: 'https://skytravel-sardinia.vercel.app/fr',
        en: 'https://skytravel-sardinia.vercel.app/en',
      },
    },
  };
}

async function getData() {
  const supabase = await createClient();
  const [{ data: apartments }, { data: packs }] = await Promise.all([
    supabase.from('apartments').select('*').eq('featured', true).limit(3),
    supabase.from('packs').select('*').eq('featured', true).limit(3),
  ]);
  return {
    apartments: (apartments || []) as Apartment[],
    packs: (packs || []) as Pack[],
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { apartments, packs } = await getData();
  const t = await getTranslations({ locale, namespace: 'hero' });
  const tHome = await getTranslations({ locale, namespace: 'home' });

  const stats = [
    { value: '8', label: tHome('stats_apartments') },
    { value: '3', label: locale === 'fr' ? 'PACKS EXCLUSIFS' : 'EXCLUSIVE PACKS' },
    { value: '100%', label: locale === 'fr' ? 'FRANCOPHONE' : 'FRENCH SPEAKING' },
    { value: '4.8/5', label: tHome('stats_rating') },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Sky Travel Sardaigne',
    description: locale === 'fr'
      ? 'Agence de location de vacances en Sardaigne pour francophones. Appartements et villas avec piscine, vue mer. Excursions bateau Cala Luna, Cala Mariolu. Réservation directe sans intermédiaire.'
      : 'Holiday rental agency in Sardinia for French speakers. Apartments and villas with pool, sea view. Boat trips to Cala Luna, Cala Mariolu. Direct booking, no middleman.',
    url: `https://skytravel-sardinia.vercel.app/${locale}`,
    email: 'skytravel.sardegna@gmail.com',
    telephone: '+33770018291',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Orosei',
      addressRegion: 'Sardaigne',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.3784,
      longitude: 9.6966,
    },
    areaServed: {
      '@type': 'Place',
      name: 'Sardaigne, Italie',
      geo: { '@type': 'GeoCoordinates', latitude: 40.1209, longitude: 9.0129 },
    },
    availableLanguage: [
      { '@type': 'Language', name: 'French' },
      { '@type': 'Language', name: 'English' },
    ],
    priceRange: '€€',
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '19:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '10:00', closes: '17:00' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'fr' ? 'Logements en Sardaigne' : 'Sardinia accommodations',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'LodgingBusiness', name: 'Villetta Blanca', address: 'Costa Paradiso, Sardaigne' } },
        { '@type': 'Offer', itemOffered: { '@type': 'LodgingBusiness', name: 'Résidence Badesi', address: 'Badesi, Sardaigne' } },
        { '@type': 'Offer', itemOffered: { '@type': 'LodgingBusiness', name: "Resort L'Émeraude", address: 'Santa Maria e Mare, Orosei, Sardaigne' } },
      ],
    },
    sameAs: [
      'https://www.instagram.com/skytravel_sardinia',
      'https://www.facebook.com/skytravel.sardinia',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '24',
      bestRating: '5',
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <HeroSection
        badge={t('badge')}
        title={t('title')}
        subtitle={t('subtitle')}
        ctaApartments={t('cta_apartments')}
        ctaPacks={t('cta_packs')}
        stats={stats}
      />

      {/* Marquee */}
      <InfiniteMarquee />

      {/* Featured Apartments */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#fef9e8] to-white relative overflow-hidden">
        {/* Sardinian sun glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block text-amber-600 text-xs font-bold tracking-[0.3em] uppercase mb-4">Hébergements</span>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-5 leading-tight">{tHome('featured_title')}</h2>
            <p className="text-slate-600 text-lg max-w-xl mx-auto">{tHome('featured_subtitle')}</p>
          </AnimatedSection>

          {apartments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {apartments.map(apt => <ApartmentCard key={apt.id} apartment={apt} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-slate-100 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          )}

          <AnimatedSection className="text-center">
            <Link href="/apartments" className="inline-flex items-center gap-2 text-amber-600 font-bold hover:text-amber-500 transition-colors group">
              Voir toutes les villas <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Second marquee reversed */}
      <InfiniteMarquee reverse />

      {/* Packs */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#e0f7ff] to-[#fef9e8] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[300px] bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block text-cyan-700 text-xs font-bold tracking-[0.3em] uppercase mb-4">Expériences</span>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-5 leading-tight">{tHome('packs_title')}</h2>
            <p className="text-slate-600 text-lg max-w-xl mx-auto">{tHome('packs_subtitle')}</p>
          </AnimatedSection>

          {packs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {packs.map(pack => <PackCard key={pack.id} pack={pack} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-slate-200 rounded-2xl h-72 animate-pulse" />
              ))}
            </div>
          )}

          <AnimatedSection className="text-center">
            <Link href="/packs" className="inline-flex items-center gap-2 text-cyan-700 font-bold hover:text-cyan-600 transition-colors group">
              Voir toutes les expériences <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Exclusive Packs */}
      <ExclusivePacks />

      {/* Map interactive Sardaigne */}
      <MapSection />

      {/* Why choose us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Banner */}
      <CtaBanner />
    </div>
  );
}
