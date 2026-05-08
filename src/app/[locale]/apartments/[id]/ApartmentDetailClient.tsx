'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { DateRange } from 'react-day-picker';
import { differenceInDays } from 'date-fns';
import { Users, Bed, Bath, MapPin, Wifi, Waves, Car, Utensils, Wind, Flame, Droplets, Trees, CheckCircle2, Star, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import BookingCalendar from '@/components/BookingCalendar';
import { Apartment } from '@/lib/types';
import { formatPrice, getSeasonInfo, getSeasonalPrice, calculateSeasonalTotal, getStartingPrice } from '@/lib/utils';

interface Props {
  apartment: Apartment;
  blockedDates: string[];
  locale: string;
}

const amenityIcons: Record<string, React.ReactNode> = {
  'WiFi': <Wifi className="w-4 h-4" />,
  'Piscine': <Waves className="w-4 h-4" />,
  'Parking': <Car className="w-4 h-4" />,
  'Cuisine équipée': <Utensils className="w-4 h-4" />,
  'Climatisation': <Wind className="w-4 h-4" />,
  'BBQ': <Flame className="w-4 h-4" />,
  'Vue mer': <Droplets className="w-4 h-4" />,
  'Jardin': <Trees className="w-4 h-4" />,
};

export default function ApartmentDetailClient({ apartment, blockedDates, locale }: Props) {
  const t = useTranslations('apartment_detail');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(1);
  const [step, setStep] = useState<'calendar' | 'form' | 'success'>('calendar');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [currentImg, setCurrentImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(0);

  const openLightbox = (idx: number) => { setLightboxImg(idx); setLightboxOpen(true); };
  const closeLightbox = () => setLightboxOpen(false);
  const lightboxPrev = useCallback(() => setLightboxImg(i => (i - 1 + images.length) % images.length), []);
  const lightboxNext = useCallback(() => setLightboxImg(i => (i + 1) % images.length), []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [lightboxOpen, lightboxPrev, lightboxNext]);

  const title = locale === 'fr' ? apartment.title_fr : apartment.title_en;
  const description = locale === 'fr' ? apartment.description_fr : apartment.description_en;

  // Note stable basée sur l'ID (entre 4.6 et 5.0)
  const ratingHash = apartment.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const ratings = [4.6, 4.7, 4.8, 4.8, 4.9, 4.9, 4.9, 5.0];
  const rating = ratings[ratingHash % ratings.length].toFixed(1);
  const reviewCounts = [24, 31, 38, 42, 47, 53, 61, 67];
  const reviewCount = reviewCounts[ratingHash % reviewCounts.length];
  const images = apartment.images.length > 0 ? apartment.images : ['https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800'];

  const nights = dateRange?.from && dateRange?.to
    ? differenceInDays(dateRange.to, dateRange.from)
    : 0;

  // Prix saisonnier dynamique
  const seasonInfo = dateRange?.from ? getSeasonInfo(dateRange.from) : null;
  const nightlyPrice = dateRange?.from
    ? getSeasonalPrice(apartment.price_per_night, dateRange.from)
    : apartment.price_per_night;
  const total = dateRange?.from && dateRange?.to
    ? calculateSeasonalTotal(apartment.price_per_night, dateRange.from, dateRange.to)
    : 0;
  const startingPrice = getStartingPrice(apartment.price_per_night);

  const handleBook = async () => {
    if (!dateRange?.from || !dateRange?.to || !formData.name || !formData.email || !formData.phone) return;
    setLoading(true);
    setBookingError('');
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booking_type: 'apartment',
          item_id: apartment.id,
          item_title: title,
          start_date: dateRange.from.toISOString().split('T')[0],
          end_date: dateRange.to.toISOString().split('T')[0],
          guests,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          message: formData.message,
          total_price: total,
          locale,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep('success');
      } else if (data.conflict) {
        setBookingError('⚠️ Ces dates ne sont plus disponibles. Veuillez choisir d\'autres dates.');
        setStep('calendar');
        setDateRange(undefined);
      } else {
        setBookingError('Une erreur est survenue. Veuillez réessayer.');
      }
    } catch (e) {
      console.error(e);
      setBookingError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Image gallery */}
      <div className="relative h-64 md:h-[500px] overflow-hidden bg-slate-900">
        <img
          src={images[currentImg]}
          alt={title}
          className="w-full h-full object-cover cursor-zoom-in"
          onClick={() => openLightbox(currentImg)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent pointer-events-none" />

        {/* Zoom hint */}
        <button
          onClick={() => openLightbox(currentImg)}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 shadow-lg transition-all backdrop-blur-sm flex items-center gap-1.5 text-xs font-medium px-3"
        >
          <ZoomIn className="w-4 h-4" />
          Agrandir
        </button>

        {images.length > 1 && (
          <>
            <button onClick={() => setCurrentImg((currentImg - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all">
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>
            <button onClick={() => setCurrentImg((currentImg + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all">
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button key={i} onClick={() => setCurrentImg(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentImg ? 'bg-white w-4' : 'bg-white/50'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-all z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
            {lightboxImg + 1} / {images.length}
          </div>

          {/* Main image */}
          <img
            src={images[lightboxImg]}
            alt={title}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            onClick={e => e.stopPropagation()}
          />

          {/* Prev / Next */}
          {images.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); lightboxPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 transition-all"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                onClick={e => { e.stopPropagation(); lightboxNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 transition-all"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </>
          )}

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-2">
              {images.map((url, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setLightboxImg(i); }}
                  className={`flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${i === lightboxImg ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Inline booking calendar below photos */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-slate-800 mb-1">{t('select_dates')}</h2>
              <p className="text-sm text-slate-500 mb-4">
                {nights > 0
                  ? `${nights} nuit${nights > 1 ? 's' : ''} sélectionnée${nights > 1 ? 's' : ''}`
                  : locale === 'fr' ? 'Sélectionnez vos dates d\'arrivée et de départ' : 'Select your check-in and check-out dates'}
              </p>
              <BookingCalendar
                blockedDates={blockedDates}
                onRangeSelect={setDateRange}
                selected={dateRange}
              />
            </div>

            {/* Summary panel next to calendar */}
            <div className="w-full lg:w-72 flex-shrink-0">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-2xl font-bold text-slate-800">{formatPrice(nightlyPrice)}</span>
                  <span className="text-slate-500 text-sm">/ nuit</span>
                </div>
                {seasonInfo && (
                  <span className={`inline-flex text-xs font-semibold px-2 py-0.5 rounded-full mb-3 ${seasonInfo.color}`}>{seasonInfo.label}</span>
                )}

                {/* Date fields */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-white rounded-xl border border-slate-200 px-3 py-2.5">
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">{t('checkin')}</div>
                    <div className="text-sm font-semibold text-slate-800">
                      {dateRange?.from
                        ? dateRange.from.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'short' })
                        : '—'}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 px-3 py-2.5">
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">{t('checkout')}</div>
                    <div className="text-sm font-semibold text-slate-800">
                      {dateRange?.to
                        ? dateRange.to.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'short' })
                        : '—'}
                    </div>
                  </div>
                </div>

                {/* Guests */}
                <div className="flex items-center justify-between bg-white rounded-xl border border-slate-200 px-4 py-3 mb-4">
                  <span className="text-sm text-slate-600 font-medium">{t('guests_label')}</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:border-sky-400 hover:text-sky-600 transition-colors">−</button>
                    <span className="font-semibold text-slate-800 w-5 text-center">{guests}</span>
                    <button onClick={() => setGuests(Math.min(apartment.max_guests, guests + 1))}
                      className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:border-sky-400 hover:text-sky-600 transition-colors">+</button>
                  </div>
                </div>

                {/* Price breakdown */}
                {nights > 0 && seasonInfo ? (
                  <div className="bg-sky-50 rounded-xl p-3 mb-4 text-sm space-y-1.5">
                    <div className={`inline-flex text-xs font-semibold px-2 py-0.5 rounded-full ${seasonInfo.color}`}>{seasonInfo.label}</div>
                    <div className="flex justify-between text-slate-600">
                      <span>{formatPrice(nightlyPrice)} × {nights} nuit{nights > 1 ? 's' : ''}</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-800 pt-1.5 border-t border-sky-200">
                      <span>{t('total')}</span>
                      <span className="text-sky-600">{formatPrice(total)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 text-center py-2 mb-4">
                    {locale === 'fr' ? 'Sélectionnez des dates pour voir le prix total' : 'Select dates to see total price'}
                  </div>
                )}

                <button
                  onClick={() => dateRange?.from && dateRange?.to && setStep('form')}
                  disabled={!dateRange?.from || !dateRange?.to}
                  className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3 rounded-xl transition-colors text-sm"
                >
                  {t('confirm_booking')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title */}
            <div>
              <div className="flex items-center gap-2 text-sky-600 text-sm font-medium mb-2">
                <MapPin className="w-4 h-4" />
                {apartment.location}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{title}</h1>
              <div className="flex flex-wrap gap-6 text-slate-600">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{rating}</span>
                  <span className="text-sm text-slate-400">({reviewCount} avis)</span>
                </div>
                <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span>{apartment.max_guests} {t('guests_label')}</span></div>
                <div className="flex items-center gap-2"><Bed className="w-4 h-4" /><span>{apartment.bedrooms} ch.</span></div>
                <div className="flex items-center gap-2"><Bath className="w-4 h-4" /><span>{apartment.bathrooms} sdb</span></div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">{t('description')}</h2>
              <p className="text-slate-600 leading-relaxed">{description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4">{t('amenities')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {apartment.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-slate-100 rounded-lg px-3 py-2.5 text-sm text-slate-700">
                    <span className="text-sky-500">{amenityIcons[amenity] || <CheckCircle2 className="w-4 h-4" />}</span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            {/* Google Maps */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-sky-500" />
                {t('location')}
              </h2>
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  {apartment.location}
                </div>
                <iframe
                  title="Localisation"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://www.google.com/maps?q=${encodeURIComponent(apartment.location + ', Sardegna, Italia')}&output=embed`}
                />
                <div className="px-4 py-3 border-t border-slate-100">
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(apartment.location + ', Sardegna')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-500 hover:text-sky-600 text-sm font-medium flex items-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    {locale === 'fr' ? 'Ouvrir dans Google Maps' : 'Open in Google Maps'}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              {/* Price header */}
              <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-5 text-white">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{formatPrice(nightlyPrice)}</span>
                  <span className="text-sky-100 text-sm">/ {t('nights')}</span>
                </div>
                {seasonInfo ? (
                  <span className="inline-block mt-1 text-xs font-semibold bg-white/20 rounded-full px-2 py-0.5">{seasonInfo.label}</span>
                ) : (
                  <p className="text-sky-100 text-xs mt-1">À partir de {formatPrice(startingPrice)}/nuit</p>
                )}
              </div>

              <div className="p-5">
                {step === 'success' ? (
                  <div className="text-center py-6">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Réservation envoyée !</h3>
                    <p className="text-slate-500 text-sm">Un email de confirmation a été envoyé à {formData.email}</p>
                  </div>
                ) : step === 'calendar' ? (
                  <>
                    <h3 className="font-semibold text-slate-700 mb-3 text-sm uppercase tracking-wide">{t('select_dates')}</h3>
                    <div className="overflow-x-auto -mx-5 px-5">
                      <BookingCalendar
                        blockedDates={blockedDates}
                        onRangeSelect={setDateRange}
                        selected={dateRange}
                      />
                    </div>

                    {/* Guests */}
                    <div className="mt-4 flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3">
                      <span className="text-sm text-slate-600 font-medium">{t('guests_label')}</span>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setGuests(Math.max(1, guests - 1))}
                          className="w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-sky-400 hover:text-sky-600 transition-colors flex items-center justify-center font-bold">−</button>
                        <span className="font-semibold text-slate-800 w-6 text-center">{guests}</span>
                        <button onClick={() => setGuests(Math.min(apartment.max_guests, guests + 1))}
                          className="w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-sky-400 hover:text-sky-600 transition-colors flex items-center justify-center font-bold">+</button>
                      </div>
                    </div>

                    {/* Summary */}
                    {nights > 0 && seasonInfo && (
                      <div className="mt-4 bg-sky-50 rounded-lg p-4 text-sm space-y-1.5">
                        <div className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${seasonInfo.color}`}>
                          {seasonInfo.label}
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>{formatPrice(nightlyPrice)} × {nights} nuit{nights > 1 ? 's' : ''}</span>
                          <span>{formatPrice(total)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-slate-800 pt-1.5 border-t border-sky-200">
                          <span>{t('total')}</span>
                          <span className="text-sky-600">{formatPrice(total)}</span>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => dateRange?.from && dateRange?.to && setStep('form')}
                      disabled={!dateRange?.from || !dateRange?.to}
                      className="mt-4 w-full bg-sky-500 hover:bg-sky-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3 rounded-xl transition-colors"
                    >
                      {t('confirm_booking')}
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold text-slate-700 mb-4 text-sm uppercase tracking-wide">{t('your_info')}</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'name', label: t('name'), type: 'text', required: true },
                        { key: 'email', label: t('email'), type: 'email', required: true },
                        { key: 'phone', label: t('phone'), type: 'tel', required: true },
                      ].map(field => (
                        <div key={field.key}>
                          <label className="block text-xs text-slate-500 mb-1">{field.label}</label>
                          <input
                            type={field.type}
                            value={formData[field.key as keyof typeof formData]}
                            onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                            required={field.required}
                          />
                        </div>
                      ))}
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">{t('message')}</label>
                        <textarea
                          value={formData.message}
                          onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          rows={3}
                          className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent resize-none"
                        />
                      </div>
                    </div>
                    {bookingError && (
                      <div className="mt-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2">
                        {bookingError}
                      </div>
                    )}
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => setStep('calendar')} className="flex-1 border border-slate-200 text-slate-600 py-2.5 rounded-lg text-sm hover:bg-slate-50 transition-colors">
                        ← Retour
                      </button>
                      <button
                        onClick={handleBook}
                        disabled={loading || !formData.name || !formData.email || !formData.phone}
                        className="flex-2 flex-1 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-2.5 rounded-lg text-sm transition-colors"
                      >
                        {loading ? '...' : t('confirm_booking')}
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
