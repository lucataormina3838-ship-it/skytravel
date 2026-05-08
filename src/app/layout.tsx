import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sky Travel – Séjours en Sardaigne",
  description: "Location de vacances et packs découverte en Sardaigne. Appartements vue mer, sorties en bateau, excursions quad, nuits en forêt.",
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
