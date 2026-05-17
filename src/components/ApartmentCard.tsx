'use client';

import { useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Users, Bed, Bath, Star, ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Apartment } from '@/lib/types';
import { formatPrice, getStartingPrice } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnyLink = Link as any;

interface ApartmentCardProps {
  apartment: Apartment;
}

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

  // 3D tilt
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [6, -6]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-6, 6]), { stiffness: 220, damping: 22 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovering(false);
  };

  return (
    <motion.div
      ref={ref}
      className="group relative bg-white rounded-3xl overflow-hidden border border-amber-100 hover:border-amber-400 shadow-md shadow-amber-100/30 hover:shadow-xl hover:shadow-amber-200/40 transition-all duration-500"
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.4 } }}
    >
      {/* Glow halo on hover */}
      <motion.div
        className="absolute -inset-px rounded-3xl bg-gradient-to-br from-amber-400/20 to-sky-400/20 opacity-0 blur-xl pointer-events-none"
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative" style={{ transform: 'translateZ(20px)' }}>

        {/* Image with Ken Burns */}
        <div className="relative overflow-hidden h-64 rounded-t-3xl">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovering ? 1.08 : 1.02 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

          {/* Rating badge */}
          <motion.div
            className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5"
            animate={{ scale: isHovering ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            {rating}
          </motion.div>

          {/* Available badge */}
          <div className="absolute top-4 left-4 bg-emerald-500/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
            <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse" />
            {t('available')}
          </div>

          {/* Location tag bottom */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-amber-300 text-[10px] font-bold tracking-[0.3em] uppercase mb-1">
              {apartment.location}
            </div>
            <h3 className="font-bold text-white text-xl leading-tight line-clamp-2">
              {title}
            </h3>
          </div>
        </div>

        {/* Details */}
        <div className="p-6">
          {/* Specs */}
          <div className="flex items-center gap-5 text-slate-600 text-xs mb-5">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400/70" />
              <span>{apartment.max_guests} {t('guests')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-amber-400/70" />
              <span>{apartment.bedrooms} {t('bedrooms')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-amber-400/70" />
              <span>{apartment.bathrooms}</span>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex items-end justify-between pt-5 border-t border-amber-100">
            <div>
              <div className="text-[10px] text-amber-700 uppercase tracking-widest mb-1 font-bold">
                À partir de
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900 tabular-nums">
                  {formatPrice(getStartingPrice(apartment.price_per_night))}
                </span>
                <span className="text-slate-500 text-sm">/nuit</span>
              </div>
            </div>

            <AnyLink
              href={`/apartments/${apartment.id}`}
              className="group/btn relative inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-bold px-4 py-3 rounded-xl transition-colors overflow-hidden"
            >
              <motion.span
                className="absolute inset-0 bg-white/30"
                initial={{ x: '-110%', skewX: '-15deg' }}
                whileHover={{ x: '110%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10">Voir</span>
              <ArrowUpRight className="relative z-10 w-3.5 h-3.5 group-hover/btn:rotate-45 transition-transform duration-300" />
            </AnyLink>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
