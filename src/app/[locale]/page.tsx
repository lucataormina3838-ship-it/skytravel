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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  return { title: `Sky Travel – ${t('title')}` };
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

  return (
    <div>
      {/* Hero */}
      <HeroSection
        badge={t('badge')}
        title={t('title')}
        subtitle={t('subtitle')}
        ctaApartments={t('cta_apartments')}
        ctaPacks={t('cta_packs')}
        stats={stats}
      />

      {/* Featured Apartments */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <div className="text-sky-500 font-semibold text-sm uppercase tracking-wider mb-2">Hébergements</div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{tHome('featured_title')}</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">{tHome('featured_subtitle')}</p>
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
            <Link href="/apartments" className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700 transition-colors">
              Voir tous les appartements <ChevronRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Packs */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <div className="text-sky-500 font-semibold text-sm uppercase tracking-wider mb-2">Expériences</div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{tHome('packs_title')}</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">{tHome('packs_subtitle')}</p>
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
            <Link href="/packs" className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700 transition-colors">
              Voir tous les packs <ChevronRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Exclusive Packs */}
      <ExclusivePacks />

      {/* Why choose us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Banner */}
      <CtaBanner />
    </div>
  );
}
