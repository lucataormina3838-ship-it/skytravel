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
                <h2 className="text-xl font-bold text-slate-800 mb-3">1. Objet</h2>
                <p>Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Sky Travel (agence de voyages basée en France) et ses clients dans le cadre de réservations de séjours en Sardaigne.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">2. Réservation et confirmation</h2>
                <p>Toute réservation est soumise à la réception d'un acompte de 30% du montant total. La réservation est définitivement confirmée à réception de cet acompte. Le solde (70%) est dû 30 jours avant la date d'arrivée.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">3. Modalités de paiement</h2>
                <p>Les paiements s'effectuent par virement bancaire ou via les moyens de paiement indiqués dans le devis. Tout paiement tardif peut entraîner l'annulation de la réservation.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">4. Annulation par le client</h2>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Plus de 60 jours avant : remboursement intégral de l'acompte</li>
                  <li>Entre 30 et 60 jours : remboursement de 50% de l'acompte</li>
                  <li>Moins de 30 jours : acompte non remboursable</li>
                </ul>
              </section>
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">5. Annulation par Sky Travel</h2>
                <p>En cas d'annulation de notre part pour des raisons indépendantes de notre volonté (force majeure, indisponibilité du logement), un remboursement intégral sera effectué dans les 14 jours suivant l'annulation.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">6. Responsabilités</h2>
                <p>Sky Travel agit en qualité d'intermédiaire entre le client et les propriétaires de biens. Notre responsabilité se limite à la mise en relation et au suivi de la réservation. Les descriptions des biens sont établies de bonne foi d'après les informations fournies par les propriétaires.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">7. Litiges</h2>
                <p>En cas de litige, une solution amiable sera recherchée en priorité. À défaut, les tribunaux français seront seuls compétents.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">8. Contact</h2>
                <p>Sky Travel — <a href="mailto:skytravel.sardegna@gmail.com" className="text-sky-600">skytravel.sardegna@gmail.com</a> — +33 7 70 01 82 91</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">1. Purpose</h2>
                <p>These Terms & Conditions govern the contractual relationship between Sky Travel (a travel agency based in France) and its clients for holiday bookings in Sardinia.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">2. Booking & Confirmation</h2>
                <p>All bookings require a 30% deposit of the total amount. The booking is confirmed upon receipt of this deposit. The balance (70%) is due 30 days before the arrival date.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">3. Cancellation by Client</h2>
                <ul className="list-disc ml-5 space-y-1">
                  <li>More than 60 days before: full deposit refund</li>
                  <li>Between 30 and 60 days: 50% deposit refund</li>
                  <li>Less than 30 days: deposit non-refundable</li>
                </ul>
              </section>
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">4. Contact</h2>
                <p>Sky Travel — <a href="mailto:skytravel.sardegna@gmail.com" className="text-sky-600">skytravel.sardegna@gmail.com</a></p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
