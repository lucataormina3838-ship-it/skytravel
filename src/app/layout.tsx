import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sky Travel – Séjours en Sardaigne",
  description: "Location de vacances et packs découverte en Sardaigne. Appartements vue mer, sorties en bateau, excursions quad, nuits en forêt.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  openGraph: {
    title: "Sky Travel – Séjours en Sardaigne",
    description: "Location de vacances et packs découverte en Sardaigne. Appartements vue mer, sorties en bateau, excursions quad.",
    url: "https://skytravel-sardinia.vercel.app",
    siteName: "Sky Travel",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Sky Travel – Sardaigne" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sky Travel – Séjours en Sardaigne",
    description: "Appartements et packs découverte en Sardaigne",
    images: ["/logo.png"],
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
