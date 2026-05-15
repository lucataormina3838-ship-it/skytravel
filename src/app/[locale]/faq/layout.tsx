import { ReactNode } from 'react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === 'fr';
  return {
    title: isFr ? 'FAQ – Questions fréquentes Sardaigne | Sky Travel' : 'FAQ – Frequently Asked Questions Sardinia | Sky Travel',
    description: isFr
      ? 'Toutes les réponses avant de réserver votre séjour en Sardaigne : réservation, paiement, annulation, arrivée, location voiture, meilleure période pour visiter.'
      : 'All the answers before booking your Sardinian stay: booking, payment, cancellation, arrival, car rental, best time to visit.',
    alternates: {
      canonical: `https://skytravel-sardinia.vercel.app/${locale}/faq`,
      languages: {
        fr: 'https://skytravel-sardinia.vercel.app/fr/faq',
        en: 'https://skytravel-sardinia.vercel.app/en/faq',
      },
    },
  };
}

export default function FaqLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
