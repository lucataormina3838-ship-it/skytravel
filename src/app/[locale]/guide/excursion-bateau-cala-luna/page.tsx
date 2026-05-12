import { Metadata } from 'next';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';
  return {
    title: isFr
      ? 'Excursion en bateau Cala Luna & Cala Mariolu – Prix, départs, conseils 2026'
      : 'Boat trip to Cala Luna & Cala Mariolu – Prices, departures, tips 2026',
    description: isFr
      ? 'Tout savoir sur l\'excursion en bateau depuis Cala Gonone vers Cala Luna et Cala Mariolu : prix, durée, ce qu\'il faut prévoir. Réservez avec Sky Travel dès 150€/personne.'
      : 'Everything about the boat trip from Cala Gonone to Cala Luna and Cala Mariolu: prices, duration, what to bring. Book with Sky Travel from €150/person.',
    alternates: {
      canonical: `https://skytravel-sardinia.vercel.app/${locale}/guide/excursion-bateau-cala-luna`,
      languages: {
        fr: 'https://skytravel-sardinia.vercel.app/fr/guide/excursion-bateau-cala-luna',
        en: 'https://skytravel-sardinia.vercel.app/en/guide/excursion-bateau-cala-luna',
      },
    },
  };
}

export default async function GuideExcursionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: 'Excursion en bateau Cala Luna – Golfe de Orosei',
    description: 'Excursion en bateau depuis Cala Gonone vers les plus belles calanques de Sardaigne.',
    url: `https://skytravel-sardinia.vercel.app/${locale}/guide/excursion-bateau-cala-luna`,
    touristType: 'Amateurs de nature, familles, couples',
    geo: { '@type': 'GeoCoordinates', latitude: 40.2833, longitude: 9.6167 },
    address: { '@type': 'PostalAddress', addressLocality: 'Cala Gonone', addressRegion: 'Sardaigne', addressCountry: 'IT' },
    offers: {
      '@type': 'Offer',
      price: '150',
      priceCurrency: 'EUR',
      priceSpecification: { '@type': 'UnitPriceSpecification', price: 150, priceCurrency: 'EUR', unitText: 'PERSON' },
      availability: 'https://schema.org/InStock',
      url: `https://skytravel-sardinia.vercel.app/${locale}/packs`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="max-w-3xl mx-auto px-6 py-16">

        <div className="text-sky-600 text-sm font-semibold uppercase tracking-wider mb-3">Guide excursions</div>
        <h1 className="text-4xl font-bold text-slate-800 mb-4 leading-tight">
          {isFr ? 'Excursion en bateau Cala Luna & Cala Mariolu : tout savoir avant de partir' : 'Boat trip to Cala Luna & Cala Mariolu: everything you need to know'}
        </h1>
        <p className="text-slate-500 text-lg mb-10 leading-relaxed">
          {isFr
            ? 'Cala Luna et Cala Mariolu sont deux des plus belles criques de la Méditerranée. Inaccessibles par la terre, elles ne se découvrent qu\'en bateau depuis Cala Gonone.'
            : 'Cala Luna and Cala Mariolu are two of the most beautiful coves in the Mediterranean. Inaccessible by land, they can only be reached by boat from Cala Gonone.'}
        </p>

        <article className="prose prose-slate prose-lg max-w-none">
          <h2>{isFr ? 'Cala Luna : la reine du Golfe de Orosei' : 'Cala Luna: queen of the Gulf of Orosei'}</h2>
          <p>{isFr
            ? 'Avec ses eaux émeraude et sa grotte naturelle, Cala Luna est souvent citée parmi les 10 plus belles plages du monde. Elle est accessible uniquement par la mer, ce qui lui garantit une authenticité rare.'
            : 'With its emerald waters and natural cave, Cala Luna is often listed among the 10 most beautiful beaches in the world. It is only accessible by sea, which guarantees its rare authenticity.'}
          </p>

          <h2>{isFr ? 'Cala Mariolu : les eaux les plus transparentes d\'Europe' : 'Cala Mariolu: Europe\'s most transparent waters'}</h2>
          <p>{isFr
            ? 'Les galets multicolores et les eaux d\'un bleu électrique de Cala Mariolu en font un site exceptionnel pour le snorkeling. La faune sous-marine y est d\'une richesse rare.'
            : 'The multicolored pebbles and electric blue waters of Cala Mariolu make it an exceptional snorkeling site. The underwater fauna is exceptionally rich.'}
          </p>

          <h2>{isFr ? 'Informations pratiques' : 'Practical information'}</h2>
          <ul>
            <li><strong>{isFr ? 'Départ' : 'Departure'}</strong> : {isFr ? 'Port de Cala Gonone, chaque matin' : 'Cala Gonone harbour, every morning'}</li>
            <li><strong>{isFr ? 'Durée' : 'Duration'}</strong> : {isFr ? 'Journée complète (8h-18h environ)' : 'Full day (approx. 8am-6pm)'}</li>
            <li><strong>{isFr ? 'Prix' : 'Price'}</strong> : {isFr ? 'À partir de 150€/personne avec Sky Travel (déjeuner inclus)' : 'From €150/person with Sky Travel (lunch included)'}</li>
            <li><strong>{isFr ? 'Groupe' : 'Group'}</strong> : {isFr ? 'Maximum 10 personnes — excursion privée et intimiste' : 'Maximum 10 people — private and intimate trip'}</li>
            <li><strong>{isFr ? 'Inclus' : 'Included'}</strong> : {isFr ? 'Équipement snorkeling, déjeuner local, guide bilingue' : 'Snorkeling equipment, local lunch, bilingual guide'}</li>
          </ul>

          <h2>{isFr ? 'Pourquoi réserver avec Sky Travel ?' : 'Why book with Sky Travel?'}</h2>
          <p>{isFr
            ? 'Notre équipe francophone connaît le Golfe de Orosei comme sa poche. Nous sélectionnons les meilleurs moments et conditions météo pour que votre excursion soit inoubliable. Groupe limité à 10 personnes pour une expérience privée.'
            : 'Our French-speaking team knows the Gulf of Orosei inside out. We select the best times and weather conditions to make your trip unforgettable. Group limited to 10 people for a private experience.'}
          </p>
        </article>

        <div className="mt-12 p-6 bg-sky-50 rounded-2xl border border-sky-100">
          <h3 className="text-xl font-bold text-slate-800 mb-2">{isFr ? 'Réserver votre excursion bateau' : 'Book your boat trip'}</h3>
          <p className="text-slate-500 mb-4">{isFr ? 'À partir de 150€/personne · 10 pers. max · Déjeuner inclus' : 'From €150/person · 10 people max · Lunch included'}</p>
          <Link href="/packs" className="inline-block bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-sky-700 transition-colors">
            {isFr ? 'Voir nos packs excursions →' : 'View our excursion packs →'}
          </Link>
        </div>

      </main>
    </>
  );
}
