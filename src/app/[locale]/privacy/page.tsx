export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return { title: locale === 'fr' ? 'Sky Travel – Politique de confidentialité' : 'Sky Travel – Privacy Policy' };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === 'fr';

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-slate-800 to-sky-900 pt-32 pb-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-white">
          {isFr ? 'Politique de confidentialité' : 'Privacy Policy'}
        </h1>
        <p className="text-slate-300 mt-4">{isFr ? 'Dernière mise à jour : mai 2026' : 'Last updated: May 2026'}</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="space-y-8 text-slate-700">
          {isFr ? (
            <>
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">1. Responsable du traitement</h2>
                <p>
                  Le responsable du traitement des données personnelles est :<br />
                  <strong>Sky Travel</strong> — intermédiaire de conciergerie touristique<br />
                  Contact : <a href="mailto:skytravel.sardegna@gmail.com" className="text-sky-600">skytravel.sardegna@gmail.com</a> — +33 7 70 01 82 91
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">2. Données collectées</h2>
                <p>Sky Travel collecte les données que vous nous fournissez lors d'une demande de réservation :</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Nom, prénom</li>
                  <li>Adresse email</li>
                  <li>Numéro de téléphone</li>
                  <li>Dates de séjour et préférences</li>
                  <li>Données de paiement (traitées par Stripe — Sky Travel n'y a pas accès direct)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">3. Base légale des traitements</h2>
                <ul className="list-disc ml-5 space-y-1">
                  <li><strong>Exécution du contrat (Art. 6.1.b RGPD) :</strong> traitement des réservations et envoi des confirmations</li>
                  <li><strong>Intérêt légitime (Art. 6.1.f RGPD) :</strong> amélioration de nos services et suivi client</li>
                  <li><strong>Obligation légale (Art. 6.1.c RGPD) :</strong> conservation des données comptables et fiscales</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">4. Utilisation des données</h2>
                <p>Vos données sont utilisées uniquement pour :</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Traiter vos demandes de réservation</li>
                  <li>Vous envoyer confirmations, devis et informations pratiques</li>
                  <li>Améliorer nos services</li>
                  <li>Respecter nos obligations légales et comptables</li>
                </ul>
                <p className="mt-2"><strong>Nous ne vendons jamais vos données à des tiers.</strong></p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">5. Destinataires des données</h2>
                <p>Vos données peuvent être transmises aux prestataires techniques suivants, dans le strict cadre de leur mission :</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li><strong>Supabase</strong> (hébergement base de données) — serveurs en UE</li>
                  <li><strong>Vercel</strong> (hébergement du site) — États-Unis, soumis aux clauses contractuelles types UE</li>
                  <li><strong>Stripe</strong> (traitement des paiements) — États-Unis, certifié PCI-DSS</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">6. Transferts hors Union Européenne</h2>
                <p>
                  Vercel et Stripe sont des prestataires américains. Ces transferts sont encadrés par les
                  <strong> Clauses Contractuelles Types (CCT)</strong> approuvées par la Commission européenne,
                  conformément à l'article 46 du RGPD.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">7. Conservation des données</h2>
                <p>
                  Vos données sont conservées pendant <strong>3 ans</strong> à compter de votre dernière
                  interaction, sauf obligation légale de conservation plus longue (données comptables : 10 ans).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">8. Vos droits (RGPD)</h2>
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li><strong>Accès</strong> (Art. 15) : obtenir une copie de vos données</li>
                  <li><strong>Rectification</strong> (Art. 16) : corriger des données inexactes</li>
                  <li><strong>Suppression</strong> (Art. 17) : effacement sous conditions légales</li>
                  <li><strong>Limitation</strong> (Art. 18) : restreindre le traitement</li>
                  <li><strong>Portabilité</strong> (Art. 20) : recevoir vos données dans un format lisible</li>
                  <li><strong>Opposition</strong> (Art. 21) : s'opposer au traitement fondé sur l'intérêt légitime</li>
                </ul>
                <p className="mt-2">
                  Pour exercer ces droits : <a href="mailto:skytravel.sardegna@gmail.com" className="text-sky-600">skytravel.sardegna@gmail.com</a>.
                  Réponse sous 30 jours.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">9. Autorité de contrôle</h2>
                <p>
                  Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une réclamation auprès de la{' '}
                  <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) :{' '}
                  <a href="https://www.cnil.fr" className="text-sky-600" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">10. Cookies</h2>
                <p>
                  Notre site utilise uniquement des <strong>cookies techniques strictement nécessaires</strong>
                  au fonctionnement du site (session, préférences de langue). Aucun cookie publicitaire
                  ou de traçage tiers n'est utilisé.
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">1. Data Controller</h2>
                <p>
                  <strong>Sky Travel</strong> — Tourism concierge intermediary<br />
                  Contact: <a href="mailto:skytravel.sardegna@gmail.com" className="text-sky-600">skytravel.sardegna@gmail.com</a>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">2. Data Collected</h2>
                <p>We collect: name, email, phone number, stay dates, and payment data (processed by Stripe).</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">3. Legal Basis</h2>
                <ul className="list-disc ml-5 space-y-1">
                  <li><strong>Contract performance (Art. 6.1.b GDPR):</strong> booking processing</li>
                  <li><strong>Legitimate interest (Art. 6.1.f GDPR):</strong> service improvement</li>
                  <li><strong>Legal obligation (Art. 6.1.c GDPR):</strong> accounting records</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">4. Data Recipients</h2>
                <p>Data may be shared with: Supabase (database), Vercel (hosting), Stripe (payments). We never sell your data.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">5. International Transfers</h2>
                <p>Vercel and Stripe are US-based. Transfers are covered by EU Standard Contractual Clauses (Art. 46 GDPR).</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">6. Your Rights (GDPR)</h2>
                <p>You have the right to: access, rectification, deletion, restriction, portability, and objection.
                Contact: <a href="mailto:skytravel.sardegna@gmail.com" className="text-sky-600">skytravel.sardegna@gmail.com</a></p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">7. Supervisory Authority</h2>
                <p>You may lodge a complaint with the French data protection authority (CNIL) at <a href="https://www.cnil.fr" className="text-sky-600" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-3">8. Cookies</h2>
                <p>We use only technically necessary cookies. No advertising or third-party tracking cookies are used.</p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
