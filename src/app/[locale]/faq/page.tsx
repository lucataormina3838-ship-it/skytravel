'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

const getFaqs = (isFr: boolean) => [
  {
    category: isFr ? '📅 Réservation' : '📅 Booking',
    items: [
      {
        q: isFr ? 'Comment fonctionne la réservation ?' : 'How does booking work?',
        a: isFr
          ? 'Vous choisissez votre bien et vos dates, puis vous remplissez le formulaire de demande. Notre équipe vous répond sous 24h avec une confirmation et les modalités de paiement. Pas de paiement en ligne immédiat — vous êtes guidé étape par étape.'
          : 'You choose your property and dates, then fill in the booking request form. Our team gets back to you within 24 hours with confirmation and payment details. No immediate online payment — you\'re guided step by step.',
      },
      {
        q: isFr ? 'Quelle est la durée minimum de séjour ?' : 'What is the minimum stay?',
        a: isFr
          ? 'La durée minimum est généralement de 7 nuits en haute saison (juillet-août) et de 3 nuits en basse saison. Chaque bien a ses propres conditions précisées sur sa fiche.'
          : 'The minimum stay is generally 7 nights in high season (July-August) and 3 nights in low season. Each property has its own conditions stated on its listing.',
      },
      {
        q: isFr ? 'Puis-je modifier ou annuler ma réservation ?' : 'Can I modify or cancel my booking?',
        a: isFr
          ? 'Toute demande de modification ou annulation doit être faite par email à skytravel.sardegna@gmail.com. Les conditions d\'annulation varient selon la période et sont précisées dans votre devis. En règle générale, l\'acompte n\'est pas remboursable.'
          : 'Any modification or cancellation request must be made by email to skytravel.sardegna@gmail.com. Cancellation conditions vary by period and are specified in your quote. As a general rule, the deposit is non-refundable.',
      },
    ],
  },
  {
    category: isFr ? '💳 Paiement' : '💳 Payment',
    items: [
      {
        q: isFr ? 'Quelles sont les modalités de paiement ?' : 'What are the payment terms?',
        a: isFr
          ? 'Le paiement intégral est demandé à la confirmation de réservation. Nous acceptons les virements bancaires et les paiements par carte via notre système sécurisé.'
          : 'Full payment is required on booking confirmation. We accept bank transfers and card payments via our secure system.',
      },
      {
        q: isFr ? 'Y a-t-il des frais cachés ?' : 'Are there any hidden fees?',
        a: isFr
          ? 'Non. Le prix affiché inclut tout sauf la taxe de séjour locale (environ 1-2€/personne/nuit selon la commune) et les éventuels frais de ménage final indiqués sur chaque fiche bien.'
          : 'No. The displayed price includes everything except the local tourist tax (approximately €1-2/person/night depending on the municipality) and any final cleaning fees indicated on each property listing.',
      },
    ],
  },
  {
    category: isFr ? '🏠 Les biens' : '🏠 Properties',
    items: [
      {
        q: isFr ? 'Les biens correspondent-ils bien aux photos ?' : 'Do the properties match the photos?',
        a: isFr
          ? 'Absolument. Nous sélectionnons personnellement chaque bien et vérifions que la réalité correspond aux photos. Si un bien ne répond pas à vos attentes à l\'arrivée, contactez-nous immédiatement — nous trouvons une solution.'
          : 'Absolutely. We personally select each property and verify that reality matches the photos. If a property does not meet your expectations on arrival, contact us immediately — we will find a solution.',
      },
      {
        q: isFr ? 'Les animaux sont-ils acceptés ?' : 'Are pets allowed?',
        a: isFr
          ? 'Cela dépend de chaque bien. La politique concernant les animaux est précisée sur chaque fiche. En cas de doute, contactez-nous avant de réserver et nous vous confirmons si votre compagnon est le bienvenu.'
          : 'It depends on each property. The pet policy is stated on each listing. If in doubt, contact us before booking and we will confirm whether your companion is welcome.',
      },
      {
        q: isFr ? 'Y a-t-il un accès WiFi ?' : 'Is WiFi available?',
        a: isFr
          ? 'La grande majorité de nos biens disposent du WiFi. Cela est indiqué dans les équipements de chaque fiche. Si la connexion est essentielle pour vous, précisez-le lors de votre demande et nous vous orientons vers les biens les mieux équipés.'
          : 'The vast majority of our properties have WiFi. This is listed in the amenities of each listing. If connectivity is essential for you, mention it in your enquiry and we will direct you to the best-equipped properties.',
      },
    ],
  },
  {
    category: isFr ? '✈️ Arriver en Sardaigne' : '✈️ Getting to Sardinia',
    items: [
      {
        q: isFr ? 'Quel aéroport utiliser ?' : 'Which airport should I use?',
        a: isFr
          ? 'La Sardaigne dispose de 3 aéroports : Cagliari (sud), Olbia (nord-est, Costa Smeralda) et Alghero (nord-ouest). Olbia est idéal pour le nord de l\'île où se trouvent la plupart de nos biens. Des vols directs depuis Paris, Lyon, Marseille sont disponibles en été.'
          : 'Sardinia has 3 airports: Cagliari (south), Olbia (north-east, Costa Smeralda) and Alghero (north-west). Olbia is ideal for the north of the island where most of our properties are located. Direct flights from major cities are available in summer.',
      },
      {
        q: isFr ? 'Est-il nécessaire de louer une voiture ?' : 'Is it necessary to rent a car?',
        a: isFr
          ? 'Oui, nous le recommandons vivement. La Sardaigne se explore en voiture — les plus belles plages et criques sont souvent accessibles uniquement en voiture. Nous pouvons vous recommander des loueurs locaux à des tarifs préférentiels.'
          : 'Yes, we strongly recommend it. Sardinia is best explored by car — the most beautiful beaches and coves are often only accessible by car. We can recommend local rental companies at preferential rates.',
      },
      {
        q: isFr ? 'Quelle est la meilleure période pour visiter ?' : 'What is the best time to visit?',
        a: isFr
          ? 'Juin et septembre sont les mois idéaux : moins de monde, eau chaude (27-28°C), températures agréables (28-30°C). Juillet-août c\'est la haute saison — plus animé mais aussi plus cher. Mai et octobre conviennent aux randonneurs et amateurs de calme.'
          : 'June and September are the ideal months: fewer crowds, warm water (27-28°C), pleasant temperatures (28-30°C). July-August is peak season — more lively but also more expensive. May and October are perfect for hikers and those seeking peace.',
      },
    ],
  },
  {
    category: isFr ? '📞 Assistance' : '📞 Support',
    items: [
      {
        q: isFr ? 'Que faire en cas de problème sur place ?' : 'What to do if there is a problem on site?',
        a: isFr
          ? 'Vous pouvez nous contacter directement par email à skytravel.sardegna@gmail.com. Notre équipe fait le maximum pour résoudre tout problème rapidement. Nous avons des contacts locaux en Sardaigne pour intervenir si nécessaire.'
          : 'You can contact us directly by email at skytravel.sardegna@gmail.com. Our team does everything possible to resolve any problem quickly. We have local contacts in Sardinia to intervene if necessary.',
      },
      {
        q: isFr ? 'Proposez-vous des transferts aéroport ?' : 'Do you offer airport transfers?',
        a: isFr
          ? 'Nous ne proposons pas directement ce service mais pouvons vous mettre en relation avec des prestataires locaux de confiance. Faites-en la demande lors de votre réservation.'
          : 'We do not directly offer this service but can put you in touch with trusted local providers. Please request this at the time of booking.',
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-800 pr-4">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-sky-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
      </button>
      {open && (
        <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';
  const faqs = getFaqs(isFr);

  const allQuestions = faqs.flatMap((s) => s.items);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allQuestions.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <div className="bg-gradient-to-br from-sky-500 to-sky-700 py-20 px-4 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">
          {isFr ? 'Questions fréquentes' : 'Frequently Asked Questions'}
        </h1>
        <p className="text-sky-100 text-xl max-w-xl mx-auto">
          {isFr
            ? 'Tout ce que vous devez savoir avant de réserver votre séjour en Sardaigne.'
            : 'Everything you need to know before booking your Sardinian stay.'}
        </p>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-12">
        {faqs.map((section, i) => (
          <div key={i}>
            <h2 className="text-xl font-bold text-slate-800 mb-5">{section.category}</h2>
            <div className="space-y-3">
              {section.items.map((item, j) => (
                <FaqItem key={j} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="bg-slate-50 rounded-2xl p-8 text-center">
          <h3 className="font-bold text-slate-800 text-lg mb-2">
            {isFr ? 'Vous n\'avez pas trouvé votre réponse ?' : 'Didn\'t find your answer?'}
          </h3>
          <p className="text-slate-500 mb-5">
            {isFr ? 'Notre équipe répond sous 24h.' : 'Our team responds within 24 hours.'}
          </p>
          <Link href="/contact"
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
            {isFr ? 'Nous contacter' : 'Contact us'}
          </Link>
        </div>
      </div>
    </div>
  );
}
