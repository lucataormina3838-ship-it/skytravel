'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { DateRange } from 'react-day-picker';
import { differenceInDays } from 'date-fns';
import { Users, Clock, CheckCircle2, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import BookingCalendar from '@/components/BookingCalendar';
import { Pack } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

const categoryIcons: Record<string, string> = { boat: '⛵', quad: '🏍️', forest: '🌲', combo: '✨' };
const categoryLabels: Record<string, Record<string, string>> = {
  boat: { fr: 'Sortie en mer', en: 'Boat trip' },
  quad: { fr: 'Excursion quad', en: 'Quad excursion' },
  forest: { fr: 'Nature & Forêt', en: 'Nature & Forest' },
  combo: { fr: 'Pack complet', en: 'Full pack' },
};

interface Props { pack: Pack; locale: string; }

export default function PackDetailClient({ pack, locale }: Props) {
  const t = useTranslations('packs');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [persons, setPersons] = useState(2);
  const [step, setStep] = useState<'calendar' | 'form' | 'success'>('calendar');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  const title = locale === 'fr' ? pack.title_fr : pack.title_en;
  const description = locale === 'fr' ? pack.description_fr : pack.description_en;
  const includes = locale === 'fr' ? pack.includes_fr : pack.includes_en;
  const highlights = locale === 'fr' ? pack.highlights_fr : pack.highlights_en;
  const images = pack.images.length > 0 ? pack.images : ['https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800'];

  const total = persons * pack.price_per_person;

  const handleBook = async () => {
    if (!dateRange?.from || !formData.name || !formData.email || !formData.phone) return;
    setLoading(true);
    const startDate = dateRange.from.toISOString().split('T')[0];
    const endDate = dateRange.to
      ? dateRange.to.toISOString().split('T')[0]
      : new Date(dateRange.from.getTime() + pack.duration_days * 86400000).toISOString().split('T')[0];
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booking_type: 'pack',
          item_id: pack.id,
          item_title: title,
          start_date: startDate,
          end_date: endDate,
          guests: persons,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          message: formData.message,
          total_price: total,
          locale,
        }),
      });
      if (res.ok) setStep('success');
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Gallery */}
      <div className="relative h-64 md:h-[450px] bg-slate-900">
        <img src={images[currentImg]} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent" />
        <div className="absolute bottom-4 left-6">
          <span className="bg-white/90 backdrop-blur-sm text-slate-700 text-sm font-semibold px-3 py-1.5 rounded-full">
            {categoryIcons[pack.category]} {categoryLabels[pack.category]?.[locale] || pack.category}
          </span>
        </div>
        {images.length > 1 && (
          <>
            <button onClick={() => setCurrentImg((currentImg - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => setCurrentImg((currentImg + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg">
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Details */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{title}</h1>
              <div className="flex flex-wrap gap-6 text-slate-600 text-sm">
                <div className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /><span className="font-semibold">4.9</span></div>
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /><span>{pack.duration_days} jour{pack.duration_days > 1 ? 's' : ''}</span></div>
                <div className="flex items-center gap-1.5"><Users className="w-4 h-4" /><span>max {pack.max_persons} {t('persons')}</span></div>
              </div>
            </div>

            <div>
              <p className="text-slate-600 leading-relaxed text-lg">{description}</p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4">{t('highlights')}</h2>
              <div className="grid grid-cols-2 gap-3">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-slate-100 rounded-lg px-4 py-3 text-sm text-slate-700">
                    <span className="text-lg">{['⛵', '🗺️', '🤿', '🍽️', '🌅', '🎉'][i % 6]}</span>
                    {h}
                  </div>
                ))}
              </div>
            </div>

            {/* Included */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4">{t('included')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {includes.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-sky-600 px-6 py-5 text-white">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{formatPrice(pack.price_per_person)}</span>
                  <span className="text-emerald-100 text-sm"> {t('per_person')}</span>
                </div>
              </div>

              <div className="p-5">
                {step === 'success' ? (
                  <div className="text-center py-6">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Pack réservé !</h3>
                    <p className="text-slate-500 text-sm">Confirmation envoyée à {formData.email}</p>
                  </div>
                ) : step === 'calendar' ? (
                  <>
                    <h3 className="font-semibold text-slate-700 mb-3 text-sm uppercase tracking-wide">Choisir une date</h3>
                    <div className="overflow-x-auto -mx-5 px-5">
                      <BookingCalendar onRangeSelect={setDateRange} selected={dateRange} />
                    </div>

                    <div className="mt-4 flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3">
                      <span className="text-sm text-slate-600 font-medium">Personnes</span>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setPersons(Math.max(1, persons - 1))}
                          className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:border-sky-400 hover:text-sky-600 transition-colors">−</button>
                        <span className="font-semibold w-6 text-center">{persons}</span>
                        <button onClick={() => setPersons(Math.min(pack.max_persons, persons + 1))}
                          className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:border-sky-400 hover:text-sky-600 transition-colors">+</button>
                      </div>
                    </div>

                    <div className="mt-4 bg-sky-50 rounded-lg p-4 text-sm">
                      <div className="flex justify-between text-slate-600 mb-1">
                        <span>{formatPrice(pack.price_per_person)} × {persons} pers.</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-slate-800 pt-2 border-t border-sky-200 mt-2">
                        <span>Total</span>
                        <span className="text-sky-600">{formatPrice(total)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => dateRange?.from && setStep('form')}
                      disabled={!dateRange?.from}
                      className="mt-4 w-full bg-sky-500 hover:bg-sky-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3 rounded-xl transition-colors"
                    >
                      Continuer
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold text-slate-700 mb-4 text-sm uppercase tracking-wide">Vos informations</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'name', label: 'Nom complet', type: 'text' },
                        { key: 'email', label: 'Email', type: 'email' },
                        { key: 'phone', label: 'Téléphone', type: 'tel' },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="block text-xs text-slate-500 mb-1">{f.label}</label>
                          <input type={f.type} value={formData[f.key as keyof typeof formData]}
                            onChange={e => setFormData(p => ({ ...p, [f.key]: e.target.value }))}
                            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                        </div>
                      ))}
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Message</label>
                        <textarea value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                          rows={2} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-400" />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => setStep('calendar')} className="flex-1 border border-slate-200 text-slate-600 py-2.5 rounded-lg text-sm hover:bg-slate-50">← Retour</button>
                      <button onClick={handleBook} disabled={loading || !formData.name || !formData.email || !formData.phone}
                        className="flex-1 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-2.5 rounded-lg text-sm transition-colors">
                        {loading ? '...' : 'Réserver'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
