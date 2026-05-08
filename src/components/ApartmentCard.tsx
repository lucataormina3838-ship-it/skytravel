'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Users, Bed, Bath, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Apartment } from '@/lib/types';
import { formatPrice, getStartingPrice } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnyLink = Link as any;

interface ApartmentCardProps {
  apartment: Apartment;
}

// Génère une note stable basée sur l'ID (entre 4.6 et 5.0)
function getStableRating(id: string): string {
  const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const ratings = [4.6, 4.7, 4.8, 4.8, 4.9, 4.9, 4.9, 5.0];
  return ratings[hash % ratings.length].toFixed(1);
}

export default function ApartmentCard({ apartment }: ApartmentCardProps) {
  const locale = useLocale();
  const t = useTranslations('apartments');

  const title = locale === 'fr' ? apartment.title_fr : apartment.title_en;
  const image = apartment.images[0] || 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600';
  const rating = getStableRating(apartment.id);

  return (
    <motion.div
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100"
      whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(0,0,0,0.12)', transition: { type: 'spring', stiffness: 280, damping: 22 } }}
    >
      <div className="relative overflow-hidden h-56">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          {rating}
        </div>
        <div className="absolute bottom-3 left-3 bg-sky-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {t('available')}
        </div>
      </div>

      <div className="p-5">
        <div className="text-xs text-sky-600 font-medium mb-1 uppercase tracking-wide">
          {apartment.location}
        </div>
        <h3 className="font-bold text-slate-800 text-lg leading-tight mb-3 line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center gap-4 text-slate-500 text-sm mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{apartment.max_guests} {t('guests')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{apartment.bedrooms} {t('bedrooms')}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{apartment.bathrooms}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <div className="text-xs text-slate-400 mb-0.5">À partir de</div>
            <span className="text-2xl font-bold text-slate-800">
              {formatPrice(getStartingPrice(apartment.price_per_night))}
            </span>
            <span className="text-slate-500 text-sm"> {t('per_night')}</span>
          </div>
          <AnyLink
            href={`/apartments/${apartment.id}`}
            className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            {t('see_details')}
          </AnyLink>
        </div>
      </div>
    </motion.div>
  );
}
