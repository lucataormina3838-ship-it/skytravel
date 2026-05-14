export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return { title: locale === 'fr' ? 'Sky Travel – Conditions Générales de Vente' : 'Sky Travel – Terms & Conditions' };
}

export default async function CGVPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === 'fr';

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-slate-800 to-sky-900 pt-32 pb-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-white">
          {isFr ? 'Conditions Générales de Vente' : 'Terms & Conditions'}
        </h1>
        <p className="text-slate-300 mt-4">{isFr ? 'Dernière mise à jour : mai 2026' : 'Last updated: May 2026'}</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="space-y-8 text-slate-700">
          {isFr ? (
            <>
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">1. Objet et nature du service</h2>
                <p>
                  Les présentes Conditions Générales de Vente régissent les relations entre Sky Travel
                  (intermédiaire de conciergerie touristique, apporteur d'affaires) et ses clients.
                </p>
                <p className="mt-2">
                  Sky Travel propose un <strong>service d'intermédiaire</strong> : recherche, sélection et
                  accompagnement à la réservation d'hébergements et d'excursions en Sardaigne auprès de
                  prestataires tiers (plateformes de location, propriétaires, guides locaux).
                  Sky Travel n'est pas propriétaire des biens proposés et n'agit pas en qualité d'agent de
                  voyages au sens réglementaire.
                </p>
                <p className="mt-2">
                  La prestation de Sky Travel consiste en un <strong>service de conciergerie et de mise en
                  relation</strong> pour lequel une commission de service est facturée.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">2. Réservation et confirmation</h2>
                <p>
                  Toute réservation est soumise à la réception d'un acompte de <strong>30% du montant total</strong>.
                  La réservation est définitivement confirmée à réception de cet acompte et de l'accord écrit de Sky Travel.
                  Le solde (70%) est dû <strong>30 jours avant la date d'arrivée</strong>.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">3. Modalités de paiement</h2>
                <p>
                  Les paiements s'effectuent par virement bancaire, carte bancaire via Stripe, ou tout autre
                  moyen indiqué dans le devis. Tout paiement non reçu à l'échéance peut entraîner l'annulation
                  de la réservation sans remboursement de l'acompte.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">4. Droit de rétractation</h2>
                <p>
                  Conformément à l'article L221-28 du Code de la consommation, <strong>le droit de rétractation
                  de 14 jours ne s'applique pas</strong> aux services d'hébergement, de transport, de restauration
                  ou de loisirs devant être fournis à une date ou une période déterminée.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">5. Annulation par le client</h2>
                <ul className="list-disc ml-5 space-y-1">
                  <li><strong>Plus de 60 jours avant l'arrivée :</strong> remboursement intégral de l'acompte</li>
                  <li><strong>Entre 30 et 60 jours :</strong> remboursement de 50% de l'acompte</li>
                  <li><strong>Moins de 30 jours :</strong> acompte non remboursable</li>
                </ul>
                <p className="mt-2 text-sm text-slate-500">
                  Toute annulation doit être notifiée par email à skytravel.sardegna@gmail.com.
                  La date de réception de l'email fait foi.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">6. Annulation par Sky Travel</h2>
                <p>
                  En cas d'annulation de notre part pour des raisons indépendantes de notre volonté
                  (force majeure, indisponibilité du logement confirmée par le prestataire tiers),
                  un <strong>remboursement intégral</strong> sera effectué dans les 14 jours suivant la notification.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">7. Responsabilités</h2>
                <p>
                  Sky Travel agit en qualité d'<strong>intermédiaire et d'apporteur d'affaires</strong> entre
                  le client et les prestataires locaux. La responsabilité de Sky Travel se limite strictement à :
                </p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>La recherche et la sélection des prestataires</li>
                  <li>La transmission correcte des informations de réservation</li>
                  <li>Le suivi et l'accompagnement pendant le séjour</li>
                </ul>
                <p className="mt-2">
                  Sky Travel ne peut être tenu responsable des défauts de conformité des hébergements ou
                  prestations imputables aux prestataires tiers, ni des événements de force majeure
                  (catastrophes naturelles, grèves, pandémies, etc.).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">8. Prix</h2>
                <p>
                  Les prix affichés incluent la commission de service de Sky Travel. Ils sont indiqués en euros
                  toutes taxes comprises (TTC) selon la réglementation applicable. Sky Travel se réserve le droit
                  de modifier ses tarifs à tout moment ; le prix applicable est celui en vigueur au moment de la
                  confirmation de réservation.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">9. Réclamations et litiges</h2>
                <p>
                  Toute réclamation doit être adressée à{' '}
                  <a href="mailto:skytravel.sardegna@gmail.com" className="text-sky-600">skytravel.sardegna@gmail.com</a>{' '}
                  dans les <strong>48h suivant le constat</strong> du problème.
                  En cas de litige persistant, une solution amiable sera recherchée en priorité.
                  À défaut d'accord amiable, les <strong>tribunaux français sont seuls compétents</strong>,
                  la loi française étant applicable.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">10. Contact</h2>
                <p>
                  Sky Travel —{' '}
                  <a href="mailto:skytravel.sardegna@gmail.com" className="text-sky-600">skytravel.sardegna@gmail.com</a>
                  {' '}— +33 7 70 01 82 91
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">1. Purpose & Nature of Service</h2>
                <p>
                  These Terms & Conditions govern the relationship between Sky Travel (tourism concierge
                  intermediary) and its clients. Sky Travel provides an <strong>intermediary service</strong>:
                  research, selection and booking assistance for accommodations and excursions in Sardinia
                  through third-party providers. Sky Travel does not own the properties listed and does not
                  act as a travel agent in the regulatory sense.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">2. Booking & Confirmation</h2>
                <p>
                  All bookings require a <strong>30% deposit</strong> of the total amount. The booking is
                  confirmed upon receipt of this deposit and Sky Travel's written agreement.
                  The balance (70%) is due <strong>30 days before arrival</strong>.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">3. Right of Withdrawal</h2>
                <p>
                  In accordance with applicable consumer law, <strong>the 14-day right of withdrawal does not
                  apply</strong> to accommodation, transport or leisure services to be provided on a specific date.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">4. Cancellation by Client</h2>
                <ul className="list-disc ml-5 space-y-1">
                  <li><strong>More than 60 days before arrival:</strong> full deposit refund</li>
                  <li><strong>Between 30 and 60 days:</strong> 50% deposit refund</li>
                  <li><strong>Less than 30 days:</strong> deposit non-refundable</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">5. Cancellation by Sky Travel</h2>
                <p>
                  In case of cancellation due to force majeure or unavailability confirmed by the third-party
                  provider, a <strong>full refund</strong> will be made within 14 days.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">6. Liability</h2>
                <p>
                  Sky Travel acts as an <strong>intermediary</strong> between clients and local service
                  providers. Sky Travel's liability is limited to the intermediary service provided and
                  does not cover defects attributable to third-party providers or force majeure events.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">7. Disputes</h2>
                <p>
                  French law applies. French courts have exclusive jurisdiction in case of unresolved disputes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">8. Contact</h2>
                <p>Sky Travel — <a href="mailto:skytravel.sardegna@gmail.com" className="text-sky-600">skytravel.sardegna@gmail.com</a></p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
