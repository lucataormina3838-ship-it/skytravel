import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency = 'EUR') {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: string | Date, locale = 'fr-FR') {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

export function calculateNights(start: Date, end: Date): number {
  const diff = end.getTime() - start.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// ─── Seasonal pricing ────────────────────────────────────────────────────────
export type Season = 'low' | 'mid' | 'high' | 'peak';

export interface SeasonInfo {
  season: Season;
  label: string;
  labelEn: string;
  multiplier: number;
  color: string;
}

export function getSeasonInfo(date: Date): SeasonInfo {
  const month = date.getMonth() + 1; // 1–12
  if (month === 7 || month === 8) {
    return { season: 'peak', label: 'Très haute saison', labelEn: 'Peak season', multiplier: 1.45, color: 'text-red-600 bg-red-50' };
  }
  if (month === 6 || month === 9) {
    return { season: 'high', label: 'Haute saison', labelEn: 'High season', multiplier: 1.20, color: 'text-orange-600 bg-orange-50' };
  }
  if (month === 5 || month === 10) {
    return { season: 'mid', label: 'Moyenne saison', labelEn: 'Mid season', multiplier: 1.00, color: 'text-yellow-600 bg-yellow-50' };
  }
  return { season: 'low', label: 'Basse saison', labelEn: 'Low season', multiplier: 0.85, color: 'text-green-600 bg-green-50' };
}

/** Calcule le prix saisonnier arrondi à l'euro */
export function getSeasonalPrice(basePrice: number, date: Date): number {
  return Math.round(basePrice * getSeasonInfo(date).multiplier);
}

/** Calcule le total nuit par nuit sur toute la période */
export function calculateSeasonalTotal(basePrice: number, start: Date, end: Date): number {
  let total = 0;
  const current = new Date(start);
  while (current < end) {
    total += getSeasonalPrice(basePrice, current);
    current.setDate(current.getDate() + 1);
  }
  return total;
}

/** Prix minimum affiché sur les cartes (basse saison) */
export function getStartingPrice(basePrice: number): number {
  return Math.round(basePrice * 0.85);
}
