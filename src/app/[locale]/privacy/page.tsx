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

      <div className="max-w-3xl mx-auto px-4 py-16 prose prose-slate">
        {isFr ? (
          <div className="space-y-8 text-slate-700">
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">1. Collecte des données</h2>
              <p>Sky Travel collecte les informations que vous nous fournissez lors d'une demande de réservation : nom, prénom, adresse email, numéro de téléphone, et dates de séjour. Ces données sont utilisées uniquement pour traiter votre réservation et vous contacter.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">2. Utilisation des données</h2>
              <p>Vos données personnelles sont utilisées pour : traiter vos demandes de réservation, vous envoyer les confirmations et devis par email, améliorer nos services. Nous ne vendons jamais vos données à des tiers.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">3. Conservation des données</h2>
              <p>Vos données sont conservées pendant une durée maximale de 3 ans à compter de votre dernière interaction avec nos services, conformément à la réglementation française.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">4. Vos droits (RGPD)</h2>
              <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants : accès, rectification, suppression, portabilité de vos données. Pour exercer ces droits, contactez-nous à : <a href="mailto:skytravel.sardegna@gmail.com" className="text-sky-600">skytravel.sardegna@gmail.com</a></p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">5. Cookies</h2>
              <p>Notre site utilise des cookies techniques nécessaires au bon fonctionnement du site. Aucun cookie publicitaire ou de traçage tiers n'est utilisé.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">6. Contact</h2>
              <p>Pour toute question concernant cette politique : <a href="mailto:skytravel.sardegna@gmail.com" className="text-sky-600">skytravel.sardegna@gmail.com</a></p>
            </section>
          </div>
        ) : (
          <div className="space-y-8 text-slate-700">
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">1. Data Collection</h2>
              <p>Sky Travel collects the information you provide when making a booking request: first name, last name, email address, phone number, and stay dates. This data is used solely to process your booking and contact you.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">2. Use of Data</h2>
              <p>Your personal data is used to: process your booking requests, send you confirmations and quotes by email, improve our services. We never sell your data to third parties.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">3. Data Retention</h2>
              <p>Your data is retained for a maximum of 3 years from your last interaction with our services.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">4. Your Rights (GDPR)</h2>
              <p>Under GDPR, you have the following rights: access, rectification, deletion, and portability of your data. To exercise these rights, contact us at: <a href="mailto:skytravel.sardegna@gmail.com" className="text-sky-600">skytravel.sardegna@gmail.com</a></p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3">5. Contact</h2>
              <p>For any questions regarding this policy: <a href="mailto:skytravel.sardegna@gmail.com" className="text-sky-600">skytravel.sardegna@gmail.com</a></p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
