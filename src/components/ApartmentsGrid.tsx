'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, Users, Banknote, MapPin } from 'lucide-react';
import { Apartment } from '@/lib/types';
import ApartmentCard from '@/components/ApartmentCard';
import { getStartingPrice } from '@/lib/utils';

interface Props {
  apartments: Apartment[];
  locale: string;
  noResultsText: string;
}

export default function ApartmentsGrid({ apartments, locale, noResultsText }: Props) {
  const isFr = locale === 'fr';

  const [search, setSearch] = useState('');
  const [maxGuests, setMaxGuests] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const maxPriceInDb = useMemo(() =>
    Math.max(...apartments.map(a => getStartingPrice(a.price_per_night))), [apartments]);

  const filtered = useMemo(() => {
    return apartments.filter(apt => {
      const title = locale === 'fr' ? apt.title_fr : apt.title_en;
      const matchSearch = !search ||
        title.toLowerCase().includes(search.toLowerCase()) ||
        apt.location.toLowerCase().includes(search.toLowerCase());
      const matchGuests = !maxGuests || apt.max_guests >= maxGuests;
      const matchPrice = !maxPrice || getStartingPrice(apt.price_per_night) <= maxPrice;
      return matchSearch && matchGuests && matchPrice;
    });
  }, [apartments, search, maxGuests, maxPrice, locale]);

  const hasFilters = search || maxGuests > 0 || maxPrice > 0;

  const resetFilters = () => {
    setSearch('');
    setMaxGuests(0);
    setMaxPrice(0);
  };

  return (
    <div>
      {/* Search + filters bar */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <motion.div
          className="flex flex-col md:flex-row gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={isFr ? 'Rechercher par nom ou localisation...' : 'Search by name or location...'}
              className="w-full pl-11 pr-4 py-4 bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/30 transition-all"
            />
          </div>

          {/* Filter button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-6 py-4 rounded-2xl text-sm font-medium transition-all ${
              showFilters || hasFilters
                ? 'bg-amber-400 text-slate-900 border-amber-400'
                : 'bg-white/[0.04] backdrop-blur-sm text-white border border-white/[0.08] hover:border-amber-400/40'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {isFr ? 'Filtres' : 'Filters'}
            {hasFilters && (
              <span className={`text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${
                showFilters || hasFilters ? 'bg-slate-900 text-amber-400' : 'bg-amber-400 text-slate-900'
              }`}>
                {[search, maxGuests, maxPrice].filter(Boolean).length}
              </span>
            )}
          </button>

          {/* Reset */}
          {hasFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-4 py-4 text-sm text-slate-500 hover:text-red-400 transition-colors"
            >
              <X className="w-4 h-4" />
              {isFr ? 'Effacer' : 'Clear'}
            </button>
          )}
        </motion.div>

        {/* Filters panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Guests */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
                <Users className="w-4 h-4 text-amber-400" />
                {isFr ? 'Voyageurs minimum' : 'Minimum guests'}
              </label>
              <div className="flex gap-2 flex-wrap">
                {[0, 2, 3, 4, 5, 6].map(n => (
                  <button
                    key={n}
                    onClick={() => setMaxGuests(n)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      maxGuests === n
                        ? 'bg-amber-400 text-slate-900'
                        : 'bg-white/[0.05] text-slate-400 hover:text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    {n === 0 ? (isFr ? 'Tous' : 'All') : `${n}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Max price */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
                <Banknote className="w-4 h-4 text-amber-400" />
                {isFr ? `Budget max : ${maxPrice > 0 ? maxPrice + '€/nuit' : 'Tous'}` : `Max budget: ${maxPrice > 0 ? maxPrice + '€/night' : 'All'}`}
              </label>
              <input
                type="range"
                min={50}
                max={maxPriceInDb || 300}
                step={10}
                value={maxPrice || maxPriceInDb}
                onChange={e => setMaxPrice(Number(e.target.value) >= maxPriceInDb ? 0 : Number(e.target.value))}
                className="w-full accent-amber-400"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>50€</span>
                <span>{maxPriceInDb}€+</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results count */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-slate-500">
            <span className="font-bold text-amber-400 text-xl tabular-nums">{filtered.length}</span>{' '}
            <span className="ml-1">
              {isFr
                ? `bien${filtered.length !== 1 ? 's' : ''} disponible${filtered.length !== 1 ? 's' : ''}`
                : `propert${filtered.length !== 1 ? 'ies' : 'y'} available`}
            </span>
          </p>
          {hasFilters && (
            <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full">
              <MapPin className="w-3 h-3" />
              {isFr ? 'Filtres actifs' : 'Filters active'}
            </div>
          )}
        </div>
      </div>

      {/* Grid — staggered reveal */}
      <div className="max-w-7xl mx-auto px-4 pb-32 pt-4">
        {filtered.length === 0 ? (
          <div className="text-center py-32 text-slate-500">
            <p className="text-lg">{noResultsText}</p>
            <button onClick={resetFilters} className="mt-4 text-amber-400 hover:text-amber-300 text-sm transition-colors">
              {isFr ? 'Réinitialiser les filtres' : 'Reset filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((apt, i) => (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <ApartmentCard apartment={apt} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
