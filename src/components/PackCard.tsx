'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Clock, Users, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Pack } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnyLink = Link as any;

const categoryIcons: Record<string, string> = {
  boat: '⛵',
  quad: '🏍️',
  forest: '🌲',
  combo: '✨',
};

const categoryLabels: Record<string, string> = {
  boat: 'Bateau',
  quad: 'Quad',
  forest: 'Nature',
  combo: 'Combo',
};

const categoryColors: Record<string, string> = {
  boat: 'bg-blue-100 text-blue-700',
  quad: 'bg-orange-100 text-orange-700',
  forest: 'bg-green-100 text-green-700',
  combo: 'bg-purple-100 text-purple-700',
};

interface PackCardProps {
  pack: Pack;
}

export default function PackCard({ pack }: PackCardProps) {
  const locale = useLocale();
  const t = useTranslations('packs');

  const title = locale === 'fr' ? pack.title_fr : pack.title_en;
  const description = locale === 'fr' ? pack.description_fr : pack.description_en;
  const highlights = locale === 'fr' ? pack.highlights_fr : pack.highlights_en;
  const image = pack.images[0] || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600';

  return (
    <motion.div
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100"
      whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(0,0,0,0.12)', transition: { type: 'spring', stiffness: 280, damping: 22 } }}
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${categoryColors[pack.category] || categoryColors.combo}`}>
          {categoryIcons[pack.category]} {categoryLabels[pack.category] || pack.category}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2">
          {title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-4 text-slate-500 text-sm mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{pack.duration_days}j</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>max {pack.max_persons} {t('persons')}</span>
          </div>
        </div>

        {highlights.slice(0, 3).map((h, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-slate-600 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
            <span>{h}</span>
          </div>
        ))}

        <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
          <div>
            <span className="text-2xl font-bold text-slate-800">
              {formatPrice(pack.price_per_person)}
            </span>
            <span className="text-slate-500 text-sm"> {t('per_person')}</span>
          </div>
          <AnyLink
            href={`/packs/${pack.id}`}
            className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            {t('book_pack')}
          </AnyLink>
        </div>
      </div>
    </motion.div>
  );
}
