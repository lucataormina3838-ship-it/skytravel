'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Loader2, XCircle, Plane } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = params.locale as string;
  const session_id = searchParams.get('session_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    if (!session_id) { setStatus('error'); return; }

    fetch('/api/stripe/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setBooking(data.booking);
          setStatus('success');
        } else {
          setStatus('error');
        }
      })
      .catch(() => setStatus('error'));
  }, [session_id]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-sky-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Confirmation de votre paiement...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Paiement non confirmé</h1>
          <p className="text-slate-500 mb-6">Une erreur est survenue. Si vous avez été débité, contactez-nous immédiatement.</p>
          <a href="mailto:skytravel.sardegna@gmail.com" className="inline-block bg-sky-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-sky-600 transition-colors">
            Nous contacter
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-emerald-500" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-2">
          <Plane className="w-5 h-5 text-sky-500" />
          <span className="font-bold text-sky-500 text-sm tracking-wide uppercase">Sky Travel</span>
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          {locale === 'fr' ? 'Réservation confirmée !' : 'Booking confirmed!'}
        </h1>

        {booking && (
          <div className="bg-slate-50 rounded-xl p-4 my-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">{locale === 'fr' ? 'Référence' : 'Reference'}</span>
              <span className="font-bold text-slate-800">#{booking.id?.slice(0, 8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">{locale === 'fr' ? 'Bien' : 'Property'}</span>
              <span className="font-semibold text-slate-700">{booking.item_title}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">{locale === 'fr' ? 'Arrivée' : 'Check-in'}</span>
              <span className="font-semibold text-slate-700">
                {new Date(booking.start_date).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">{locale === 'fr' ? 'Départ' : 'Check-out'}</span>
              <span className="font-semibold text-slate-700">
                {new Date(booking.end_date).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
            <div className="flex justify-between text-sm border-t border-slate-200 pt-2 mt-2">
              <span className="text-slate-500">{locale === 'fr' ? 'Total payé' : 'Total paid'}</span>
              <span className="font-bold text-emerald-600 text-base">
                {new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', { style: 'currency', currency: 'EUR' }).format(booking.total_price)}
              </span>
            </div>
          </div>
        )}

        <p className="text-slate-500 text-sm mb-6">
          {locale === 'fr'
            ? 'Un email de confirmation a été envoyé à votre adresse. À très bientôt en Sardaigne ! 🌊'
            : 'A confirmation email has been sent to your address. See you soon in Sardinia! 🌊'}
        </p>

        <Link href={`/${locale}`} className="inline-block bg-sky-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-sky-600 transition-colors">
          {locale === 'fr' ? 'Retour à l\'accueil' : 'Back to home'}
        </Link>
      </div>
    </div>
  );
}
