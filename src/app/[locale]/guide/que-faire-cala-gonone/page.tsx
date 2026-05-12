import { Metadata } from 'next';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';
  return {
    title: isFr
      ? 'Que faire à Cala Gonone ? Les 10 incontournables en 2026'
      : 'What to do in Cala Gonone? Top 10 must-dos in 2026',
    description: isFr
      ? 'Activités, plages, restaurants et excursions à Cala Gonone (Sardaigne). Guide pratique rédigé par des locaux francophones : excursion bateau, snorkeling, Cala Luna, villages typiques.'
      : 'Activities, beaches, restaurants and excursions in Cala Gonone (Sardinia). Practical guide by local French speakers: boat trip, snorkeling, Cala Luna, typical villages.',
    alternates: {
      canonical: `https://skytravel-sardinia.vercel.app/${locale}/guide/que-faire-cala-gonone`,
      languages: {
        fr: 'https://skytravel-sardinia.vercel.app/fr/guide/que-faire-cala-gonone',
        en: 'https://skytravel-sardinia.vercel.app/en/guide/que-faire-cala-gonone',
      },
    },
  };
}

export default async function GuideCalaGononePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: 'Cala Gonone',
    description: isFr
      ? 'Village côtier de Sardaigne, point de départ pour les plus belles calanques du Golfe de Orosei.'
      : 'Sardinian coastal village, starting point for the most beautiful coves of the Gulf of Orosei.',
    url: `https://skytravel-sardinia.vercel.app/${locale}/guide/que-faire-cala-gonone`,
    geo: { '@type': 'GeoCoordinates', latitude: 40.2833, longitude: 9.6167 },
    address: { '@type': 'PostalAddress', addressLocality: 'Cala Gonone', addressRegion: 'Nuoro, Sardaigne', addressCountry: 'IT' },
    touristType: ['Familles', 'Couples', 'Amoureux de la nature', 'Plongeurs'],
    includesAttraction: [
      { '@type': 'TouristAttraction', name: 'Cala Luna' },
      { '@type': 'TouristAttraction', name: 'Cala Mariolu' },
      { '@type': 'TouristAttraction', name: 'Grottes de Bue Marino' },
      { '@type': 'TouristAttraction', name: 'Cala Fuili' },
    ],
  };

  const activities = isFr ? [
    { num: '1', title: 'Excursion en bateau vers Cala Luna', desc: 'La reine des calanques, accessible uniquement par la mer. Réservez tôt : les places partent vite en juillet-août.' },
    { num: '2', title: 'Snorkeling à Cala Fuili', desc: 'À 5 minutes de Cala Gonone, cette petite crique offre des eaux cristallines parfaites pour le snorkeling.' },
    { num: '3', title: 'Visiter les Grottes de Bue Marino', desc: 'Ces grottes marines abritent l\'une des dernières colonies de phoques moines de Méditerranée.' },
    { num: '4', title: 'Randonnée Gorropu', desc: 'L\'un des canyons les plus profonds d\'Europe, à 1h de voiture de Cala Gonone. Sensation garantie.' },
    { num: '5', title: 'Marché local d\'Orosei', desc: 'À 8km, le marché d\'Orosei est idéal pour acheter fromages locaux (Pecorino), charcuteries et céramiques.' },
  ] : [
    { num: '1', title: 'Boat trip to Cala Luna', desc: 'The queen of coves, only accessible by sea. Book early — spots fill fast in July-August.' },
    { num: '2', title: 'Snorkeling at Cala Fuili', desc: 'Just 5 minutes from Cala Gonone, this small cove offers crystal-clear waters perfect for snorkeling.' },
    { num: '3', title: 'Visit the Bue Marino Caves', desc: 'These sea caves shelter one of the last monk seal colonies in the Mediterranean.' },
    { num: '4', title: 'Gorropu Canyon hike', desc: 'One of the deepest canyons in Europe, 1 hour by car from Cala Gonone. An unforgettable experience.' },
    { num: '5', title: 'Orosei local market', desc: '8km away, the Orosei market is perfect for buying local cheeses (Pecorino), cured meats and ceramics.' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="max-w-3xl mx-auto px-6 py-16">

        <div className="text-sky-600 text-sm font-semibold uppercase tracking-wider mb-3">Guide local</div>
        <h1 className="text-4xl font-bold text-slate-800 mb-4 leading-tight">
          {isFr ? 'Que faire à Cala Gonone ? Les 10 incontournables (2026)' : 'What to do in Cala Gonone? Top 10 must-dos (2026)'}
        </h1>
        <p className="text-slate-500 text-lg mb-10 leading-relaxed">
          {isFr
            ? 'Cala Gonone est le point de départ idéal pour explorer le Golfe de Orosei. Village pittoresque niché entre falaises et mer turquoise, il offre une concentration unique d\'activités et de paysages époustouflants.'
            : 'Cala Gonone is the ideal starting point for exploring the Gulf of Orosei. A picturesque village nestled between cliffs and turquoise sea, it offers a unique concentration of activities and breathtaking scenery.'}
        </p>

        <div className="space-y-8 mb-12">
          {activities.map(act => (
            <div key={act.num} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-lg">{act.num}</div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-1">{act.title}</h2>
                <p className="text-slate-500 leading-relaxed">{act.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-3">{isFr ? 'Comment s\'y rendre ?' : 'How to get there?'}</h2>
          <ul className="space-y-2 text-slate-600">
            <li>✈ {isFr ? 'Aéroport d\'Olbia (OLB) : 1h30 de route' : 'Olbia Airport (OLB): 1.5h drive'}</li>
            <li>✈ {isFr ? 'Aéroport de Cagliari (CAG) : 2h30 de route' : 'Cagliari Airport (CAG): 2.5h drive'}</li>
            <li>🚗 {isFr ? 'Voiture indispensable pour explorer la région' : 'Car essential for exploring the region'}</li>
          </ul>
        </div>

        <div className="p-6 bg-sky-50 rounded-2xl border border-sky-100">
          <h3 className="text-xl font-bold text-slate-800 mb-2">{isFr ? 'Séjourner près de Cala Gonone avec Sky Travel' : 'Stay near Cala Gonone with Sky Travel'}</h3>
          <p className="text-slate-500 mb-4">{isFr ? 'Nos logements à Orosei et Cala Gonone, avec excursions bateau organisées en français.' : 'Our properties in Orosei and Cala Gonone, with boat trips organized in French.'}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/apartments" className="inline-block bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-sky-700 transition-colors">
              {isFr ? 'Voir les logements →' : 'Browse properties →'}
            </Link>
            <Link href="/packs" className="inline-block border border-sky-600 text-sky-600 font-semibold px-6 py-3 rounded-xl hover:bg-sky-50 transition-colors">
              {isFr ? 'Excursions bateau →' : 'Boat trips →'}
            </Link>
          </div>
        </div>

      </main>
    </>
  );
}
