import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://skytravel-sardinia.vercel.app"),
  title: {
    default: "Sky Travel – Location de vacances en Sardaigne",
    template: "%s | Sky Travel Sardaigne",
  },
  description: "Agence de location de vacances en Sardaigne pour francophones. Appartements et villas vue mer soigneusement sélectionnés. Réservez directement avec des Sardes francophones — sans intermédiaire.",
  keywords: [
    "location vacances Sardaigne", "appartement Sardaigne", "villa Sardaigne",
    "séjour Sardaigne francophones", "location Costa Paradiso", "vacances Sardaigne été",
    "agence location Sardaigne", "location piscine Sardaigne", "villa piscine vue mer Sardaigne",
    "excursion bateau Cala Luna", "excursion bateau Cala Gonone", "location appartement Orosei",
    "Sardaigne sans intermédiaire", "location Sardaigne pas cher", "villa Sardaigne piscine privée",
    "séjour Sardaigne agence française", "Cala Mariolu excursion", "Golfe de Orosei location",
  ],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  authors: [{ name: "Sky Travel" }],
  creator: "Sky Travel",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  openGraph: {
    title: "Sky Travel – Location de vacances en Sardaigne",
    description: "Appartements et villas en Sardaigne sélectionnés par des Sardes francophones. Réservation directe, sans intermédiaire.",
    url: "https://skytravel-sardinia.vercel.app",
    siteName: "Sky Travel",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Sky Travel – Sardaigne" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sky Travel – Location de vacances en Sardaigne",
    description: "Appartements et villas en Sardaigne sélectionnés par des Sardes francophones.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://skytravel-sardinia.vercel.app/fr",
    languages: {
      "fr": "https://skytravel-sardinia.vercel.app/fr",
      "en": "https://skytravel-sardinia.vercel.app/en",
    },
  },
  verification: {
    google: "0S7RkzFZCtUs67H5NV20sPmGrff1ok8XDWizcDheIhk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
