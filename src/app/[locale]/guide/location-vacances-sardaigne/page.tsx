import { Metadata } from 'next';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';
  return {
    title: isFr
      ? 'Location de vacances en Sardaigne pour francophones – Guide complet 2026'
      : 'Holiday rentals in Sardinia for French speakers – Complete guide 2026',
    description: isFr
      ? 'Tout savoir sur la location de vacances en Sardaigne : les meilleures zones, prix moyens, villas avec piscine, appartements vue mer. Conseils d\'experts francophones.'
      : 'Everything about holiday rentals in Sardinia: best areas, average prices, villas with pool, sea view apartments. Expert advice in French.',
    alternates: {
      canonical: `https://skytravel-sardinia.vercel.app/${locale}/guide/location-vacances-sardaigne`,
      languages: {
        fr: 'https://skytravel-sardinia.vercel.app/fr/guide/location-vacances-sardaigne',
        en: 'https://skytravel-sardinia.vercel.app/en/guide/location-vacances-sardaigne',
      },
    },
  };
}

export default async function GuideLocationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Location de vacances en Sardaigne pour francophones – Guide 2026',
    description: 'Guide complet pour louer en Sardaigne : zones, prix, conseils.',
    author: { '@type': 'Organization', name: 'Sky Travel Sardaigne' },
    publisher: { '@type': 'Organization', name: 'Sky Travel Sardaigne', url: 'https://skytravel-sardinia.vercel.app' },
    datePublished: '2026-01-01',
    dateModified: new Date().toISOString(),
    inLanguage: locale,
    url: `https://skytravel-sardinia.vercel.app/${locale}/guide/location-vacances-sardaigne`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="max-w-3xl mx-auto px-6 py-16">

        <div className="text-sky-600 text-sm font-semibold uppercase tracking-wider mb-3">Guide Sky Travel</div>
        <h1 className="text-4xl font-bold text-slate-800 mb-4 leading-tight">
          {isFr ? 'Location de vacances en Sardaigne pour francophones : guide complet 2026' : 'Holiday rentals in Sardinia for French speakers: complete guide 2026'}
        </h1>
        <p className="text-slate-500 text-lg mb-10 leading-relaxed">
          {isFr
            ? 'La Sardaigne est l\'une des destinations méditerranéennes les plus prisées. Voici tout ce que vous devez savoir pour organiser votre séjour avec une agence francophone.'
            : 'Sardinia is one of the most sought-after Mediterranean destinations. Here is everything you need to know to plan your stay with a French-speaking agency.'}
        </p>

        <article className="prose prose-slate prose-lg max-w-none">
          <h2>{isFr ? 'Pourquoi choisir la Sardaigne ?' : 'Why choose Sardinia?'}</h2>
          <p>{isFr
            ? 'Avec ses eaux turquoise, ses plages de sable blanc et ses criques inaccessibles, la Sardaigne offre un dépaysement total à moins de 2h de vol de la France. Le Golfe de Orosei, avec ses célèbres Cala Luna et Cala Mariolu, figure parmi les plus beaux paysages côtiers d\'Europe.'
            : 'With its turquoise waters, white sand beaches and inaccessible coves, Sardinia offers a true escape less than 2 hours from France. The Gulf of Orosei, with its famous Cala Luna and Cala Mariolu, ranks among the most beautiful coastal landscapes in Europe.'}
          </p>

          <h2>{isFr ? 'Les meilleures zones pour se loger' : 'Best areas to stay'}</h2>
          <ul>
            <li><strong>Cala Gonone / Orosei</strong> — {isFr ? 'Idéal pour les excursions en bateau. Point de départ pour Cala Luna et Cala Mariolu.' : 'Ideal for boat trips. Starting point for Cala Luna and Cala Mariolu.'}</li>
            <li><strong>Costa Paradiso</strong> — {isFr ? 'Cadre sauvage, roches roses, plage de Li Cossi. Parfait pour fuir la foule.' : 'Wild setting, pink rocks, Li Cossi beach. Perfect for escaping the crowds.'}</li>
            <li><strong>Badesi / Costa Nord-Ouest</strong> — {isFr ? 'Plages immenses, vent favorable pour les sports nautiques.' : 'Huge beaches, wind ideal for water sports.'}</li>
          </ul>

          <h2>{isFr ? 'Prix moyens en 2026' : 'Average prices in 2026'}</h2>
          <p>{isFr
            ? 'Les locations en Sardaigne varient entre 80€ et 200€/nuit selon la période et le type de bien. En réservant directement avec Sky Travel, vous évitez les frais de service des plateformes (Airbnb, Booking) qui peuvent atteindre 15-20%.'
            : 'Rentals in Sardinia range from €80 to €200/night depending on the season and property type. By booking directly with Sky Travel, you avoid platform fees (Airbnb, Booking) which can reach 15-20%.'}
          </p>

          <h2>{isFr ? 'Villas avec piscine en Sardaigne' : 'Villas with pool in Sardinia'}</h2>
          <p>{isFr
            ? 'La piscine est un critère essentiel pour les familles et les groupes. Sky Travel propose plusieurs villas et appartements avec piscine privée ou partagée, dès 98€/nuit.'
            : 'A pool is an essential criterion for families and groups. Sky Travel offers several villas and apartments with private or shared pool, from €98/night.'}
          </p>

          <h2>{isFr ? 'Réserver avec une agence francophone' : 'Booking with a French-speaking agency'}</h2>
          <p>{isFr
            ? 'Avec Sky Travel, vous communiquez en français du premier au dernier jour. Notre équipe vous conseille sur les meilleures activités, les restaurants locaux et organise vos excursions en bateau.'
            : 'With Sky Travel, you communicate in French from day one. Our team advises you on the best activities, local restaurants and organizes your boat trips.'}
          </p>
        </article>

        <div className="mt-12 p-6 bg-sky-50 rounded-2xl border border-sky-100">
          <h3 className="text-xl font-bold text-slate-800 mb-2">{isFr ? 'Voir nos logements disponibles' : 'Browse our available properties'}</h3>
          <p className="text-slate-500 mb-4">{isFr ? 'À partir de 98€/nuit · Piscine · Vue mer · Réservation directe' : 'From €98/night · Pool · Sea view · Direct booking'}</p>
          <Link href="/apartments" className="inline-block bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-sky-700 transition-colors">
            {isFr ? 'Voir les logements →' : 'Browse properties →'}
          </Link>
        </div>

      </main>
    </>
  );
}
