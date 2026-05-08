'use client';

import { useState, useMemo } from 'react';
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
      {/* Barre de recherche + filtres */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Recherche */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={isFr ? 'Rechercher par nom ou localisation...' : 'Search by name or location...'}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-sm"
            />
          </div>

          {/* Bouton filtres */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium shadow-sm transition-colors ${
              showFilters || hasFilters
                ? 'bg-sky-500 text-white border-sky-500'
                : 'bg-white text-slate-700 border-slate-200 hover:border-sky-400'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {isFr ? 'Filtres' : 'Filters'}
            {hasFilters && (
              <span className="bg-white text-sky-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {[search, maxGuests, maxPrice].filter(Boolean).length}
              </span>
            )}
          </button>

          {/* Reset */}
          {hasFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-4 py-3 text-sm text-slate-500 hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
              {isFr ? 'Effacer' : 'Clear'}
            </button>
          )}
        </div>

        {/* Panel filtres */}
        {showFilters && (
          <div className="mt-3 bg-white border border-slate-200 rounded-xl p-5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Voyageurs */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                <Users className="w-4 h-4 text-sky-500" />
                {isFr ? 'Nombre de voyageurs minimum' : 'Minimum guests'}
              </label>
              <div className="flex gap-2 flex-wrap">
                {[0, 2, 3, 4, 5, 6].map(n => (
                  <button
                    key={n}
                    onClick={() => setMaxGuests(n)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                      maxGuests === n
                        ? 'bg-sky-500 text-white border-sky-500'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-sky-400'
                    }`}
                  >
                    {n === 0 ? (isFr ? 'Tous' : 'All') : `${n}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Prix max */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                <Banknote className="w-4 h-4 text-sky-500" />
                {isFr ? `Budget max : ${maxPrice > 0 ? maxPrice + '€/nuit' : 'Tous'}` : `Max budget: ${maxPrice > 0 ? maxPrice + '€/night' : 'All'}`}
              </label>
              <input
                type="range"
                min={50}
                max={maxPriceInDb || 300}
                step={10}
                value={maxPrice || maxPriceInDb}
                onChange={e => setMaxPrice(Number(e.target.value) >= maxPriceInDb ? 0 : Number(e.target.value))}
                className="w-full accent-sky-500"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>50€</span>
                <span>{maxPriceInDb}€+</span>
              </div>
            </div>
          </div>
        )}

        {/* Résultats */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-slate-700">{filtered.length}</span>{' '}
            {isFr
              ? `bien${filtered.length !== 1 ? 's' : ''} trouvé${filtered.length !== 1 ? 's' : ''}`
              : `propert${filtered.length !== 1 ? 'ies' : 'y'} found`}
          </p>
          {hasFilters && (
            <div className="flex items-center gap-1.5 text-xs text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
              <MapPin className="w-3 h-3" />
              {isFr ? 'Filtres actifs' : 'Filters active'}
            </div>
          )}
        </div>
      </div>

      {/* Grille */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg">{noResultsText}</p>
            <button onClick={resetFilters} className="mt-4 text-sky-500 hover:underline text-sm">
              {isFr ? 'Réinitialiser les filtres' : 'Reset filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(apt => (
              <ApartmentCard key={apt.id} apartment={apt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
