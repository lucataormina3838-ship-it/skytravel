import { getTranslations } from 'next-intl/server';
import { MapPin, Heart, Shield, Phone, Mail, Star, Users, Award } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === 'fr';
  return {
    title: isFr ? 'À propos – 2 Sardes francophones | Sky Travel' : 'About – 2 Sardinian French speakers | Sky Travel',
    description: isFr
      ? 'Sky Travel, c\'est 2 Sardes et un ami d\'enfance passionnés par leur île. Agence certifiée, 100% francophone, sans intermédiaire. On partage la vraie Sardaigne avec vous.'
      : 'Sky Travel is 2 Sardinians and a childhood friend passionate about their island. Certified agency, 100% French-speaking, no middleman. We share real Sardinia with you.',
    alternates: {
      canonical: `https://skytravel-sardinia.vercel.app/${locale}/about`,
      languages: {
        fr: 'https://skytravel-sardinia.vercel.app/fr/about',
        en: 'https://skytravel-sardinia.vercel.app/en/about',
      },
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const values = [
    {
      icon: Heart,
      title: isFr ? 'Originaires de Sardaigne' : 'From Sardinia',
      desc: isFr
        ? 'Deux Sardes et un ami d\'enfance — ensemble, nous avons grandi entre les plages de cristal, les maquis parfumés et les villages de caractère de cette île. On la connaît mieux que personne.'
        : 'Two Sardinians and a childhood friend — together, we grew up among crystal beaches, fragrant maquis and characterful villages of this island. We know it better than anyone.',
    },
    {
      icon: Shield,
      title: isFr ? 'Agence certifiée' : 'Certified Agency',
      desc: isFr
        ? 'Titulaires de la carte professionnelle d\'agent immobilier (carte T), nous opérons en toute légalité et transparence. Votre séjour est entre des mains professionnelles et responsables.'
        : 'Holding a professional real estate agent card (carte T), we operate with full legality and transparency. Your stay is in professional and responsible hands.',
    },
    {
      icon: Users,
      title: isFr ? '100% Francophones' : '100% French Speaking',
      desc: isFr
        ? 'Français avant tout, nous comprenons exactement ce que vous cherchez. Pas de barrière linguistique, pas d\'intermédiaire — vous parlez directement avec les personnes qui connaissent les biens.'
        : 'French first and foremost, we understand exactly what you\'re looking for. No language barrier, no middleman — you speak directly with the people who know the properties.',
    },
    {
      icon: Award,
      title: isFr ? 'Sélection personnelle' : 'Personal Selection',
      desc: isFr
        ? 'Chaque bien de notre catalogue a été soigneusement sélectionné et validé. Pas de surprise à l\'arrivée — ce que vous voyez sur le site est exactement ce que vous trouverez sur place.'
        : 'Every property in our catalogue has been carefully selected and validated. No surprises on arrival — what you see on the site is exactly what you\'ll find on site.',
    },
  ];

  const stats = [
    { value: '3', label: isFr ? 'Fondateurs' : 'Founders' },
    { value: '8', label: isFr ? 'Biens sélectionnés' : 'Selected Properties' },
    { value: '100%', label: isFr ? 'Francophones' : 'French Speaking' },
    { value: '4.8/5', label: isFr ? 'Satisfaction' : 'Satisfaction' },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="relative bg-slate-900 py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-40"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900/80" />
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {isFr ? 'Notre histoire' : 'Our Story'}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            {isFr
              ? 'Sky Travel est née d\'une évidence : 2 Sardes et un ami d\'enfance qui voulaient partager leur île avec le monde francophone.'
              : 'Sky Travel was born from an obvious idea: 2 Sardinians and a childhood friend who wanted to share their island with the French-speaking world.'}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-sky-500 py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-4xl font-bold">{s.value}</div>
              <div className="text-sm text-sky-100 mt-1 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Story */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-sky-500 font-semibold text-sm uppercase tracking-wider mb-3">
                {isFr ? 'Qui sommes-nous' : 'Who we are'}
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">
                {isFr ? '2 Sardes & un ami d\'enfance' : '2 Sardinians & a childhood friend'}
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  {isFr
                    ? 'Nous sommes deux Sardes et un ami d\'enfance, Français avant tout, qui avons eu la chance de grandir entre deux cultures : la France et la richesse incomparable de la Sardaigne.'
                    : 'We are two Sardinians and a childhood friend, French above all, who had the chance to grow up between two cultures: France and the incomparable richness of Sardinia.'}
                </p>
                <p>
                  {isFr
                    ? 'Notre mission ? Vous faire découvrir toute la richesse de cette île — sa culture millénaire, sa cuisine généreuse, ses traditions vivantes, ses paysages à couper le souffle. Pas seulement les plages, mais l\'âme profonde d\'un peuple et d\'une terre unique.'
                    : 'Our mission? To help you discover all the richness of this island — its thousand-year-old culture, its generous cuisine, its living traditions, its breathtaking landscapes. Not just the beaches, but the deep soul of a unique people and land.'}
                </p>
                <p>
                  {isFr
                    ? 'Sky Travel est né de cette évidence. Chaque conseil qu\'on vous donne, c\'est celui qu\'on donnerait à nos propres familles. C\'est pas du tourisme de masse — c\'est la Sardaigne authentique, vue de l\'intérieur.'
                    : 'Sky Travel was born from this obvious truth. Every piece of advice we give, it\'s what we\'d tell our own families. This isn\'t mass tourism — it\'s authentic Sardinia, seen from the inside.'}
                </p>
                <p className="font-semibold text-slate-700 italic border-l-4 border-sky-400 pl-4">
                  {isFr
                    ? '"La Sardaigne nous a tout donné. On veut vous la donner à vous aussi."'
                    : '"Sardinia gave us everything. We want to give it to you too."'}
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=600&q=80"
                alt="Sardaigne"
                className="rounded-2xl shadow-2xl w-full object-cover h-96"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-3">
                <div className="bg-amber-400 rounded-xl p-2.5">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-slate-800">
                    {isFr ? 'Originaires de Sardaigne' : 'From Sardinia'}
                  </div>
                  <div className="text-xs text-slate-500">
                    {isFr ? '2 Sardes & un ami d\'enfance' : '2 Sardinians & a childhood friend'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engagements */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-sky-500 font-semibold text-sm uppercase tracking-wider mb-3">
              {isFr ? 'Nos engagements' : 'Our commitments'}
            </div>
            <h2 className="text-3xl font-bold text-slate-800">
              {isFr ? 'Ce qui nous différencie' : 'What sets us apart'}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 flex gap-5">
                <div className="bg-sky-50 rounded-xl p-3 h-fit shrink-0">
                  <v.icon className="w-6 h-6 text-sky-500" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-2">{v.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 bg-amber-50 border-y border-amber-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-6">🌊</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            {isFr ? 'Notre mission' : 'Our mission'}
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            {isFr
              ? 'Faire découvrir la vraie Sardaigne — pas celle des brochures, mais celle qu\'on connaît et qu\'on aime. Des lieux authentiques, des séjours qui marquent, des souvenirs qui durent toute une vie. Et tout ça, en français, avec des gens qui vous comprennent.'
              : 'To reveal the real Sardinia — not the one in brochures, but the one we know and love. Authentic places, stays that leave a mark, memories that last a lifetime. And all this, in French, with people who truly understand you.'}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            {isFr ? 'On vous attend en Sardaigne !' : 'We\'re waiting for you in Sardinia!'}
          </h2>
          <p className="text-slate-500 mb-8">
            {isFr
              ? 'Une question, un projet de vacances, une envie de découvrir notre île ? Écrivez-nous — on répond dans la journée.'
              : 'A question, a holiday project, a desire to discover our island? Write to us — we reply the same day.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact"
              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              {isFr ? 'Nous contacter' : 'Contact us'}
            </Link>
            <Link href="/apartments"
              className="border border-slate-200 hover:border-sky-300 text-slate-700 font-semibold px-8 py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
              {isFr ? 'Voir nos biens' : 'View our properties'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
