export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return { title: locale === 'fr' ? 'Sky Travel – Mentions légales' : 'Sky Travel – Legal Notice' };
}

export default async function MentionsLegalesPage({ params }: { params: Promise<{ locale: string }> }) {
  await params; // required by Next.js 15
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-slate-800 to-sky-900 pt-32 pb-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-white">Mentions légales</h1>
        <p className="text-slate-300 mt-4">Conformément à la loi n° 2004-575 du 21 juin 2004 (LCEN)</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-8 text-slate-700">

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">1. Éditeur du site</h2>
          <p>
            <strong>Nom commercial :</strong> Sky Travel<br />
            <strong>Activité :</strong> Intermédiaire de services touristiques — apporteur d'affaires<br />
            <strong>Email :</strong> <a href="mailto:skytravel.sardegna@gmail.com" className="text-sky-600">skytravel.sardegna@gmail.com</a><br />
            <strong>Téléphone :</strong> +33 7 70 01 82 91<br />
            <strong>Directeur de publication :</strong> Le responsable de Sky Travel
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">2. Hébergement</h2>
          <p>
            Ce site est hébergé par :<br />
            <strong>Vercel Inc.</strong><br />
            340 Pine Street, Suite 701 — San Francisco, CA 94104 — États-Unis<br />
            <a href="https://vercel.com" className="text-sky-600" target="_blank" rel="noopener noreferrer">vercel.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">3. Nature de l'activité</h2>
          <p>
            Sky Travel exerce une activité d'<strong>apporteur d'affaires et d'intermédiaire de conciergerie touristique</strong>.
            Sky Travel ne détient pas les biens proposés et n'agit pas en qualité d'agent de voyages au sens de la directive européenne 2015/2302.
          </p>
          <p className="mt-2">
            Sky Travel met en relation des voyageurs avec des prestataires locaux (hébergements, excursions) et facture une commission de service pour les prestations de recherche, de sélection et d'accompagnement à la réservation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">4. Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu de ce site (textes, images, vidéos, logos) est la propriété de Sky Travel ou de ses partenaires.
            Toute reproduction, représentation ou diffusion, en tout ou en partie, est interdite sans autorisation écrite préalable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">5. Responsabilité</h2>
          <p>
            Sky Travel s'efforce de maintenir les informations de ce site à jour et exactes.
            Cependant, Sky Travel ne peut garantir l'exactitude, la complétude ou l'actualité des informations diffusées.
            Sky Travel décline toute responsabilité pour tout dommage résultant de l'utilisation de ce site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">6. Données personnelles & RGPD</h2>
          <p>
            Pour toute information relative au traitement de vos données personnelles, consultez notre{' '}
            <a href="/fr/privacy" className="text-sky-600">Politique de confidentialité</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-3">7. Contact</h2>
          <p>
            Pour toute question relative aux présentes mentions légales :<br />
            <a href="mailto:skytravel.sardegna@gmail.com" className="text-sky-600">skytravel.sardegna@gmail.com</a>
          </p>
        </section>

      </div>
    </div>
  );
}
