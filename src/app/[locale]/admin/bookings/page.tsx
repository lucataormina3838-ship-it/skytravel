import { createAdminClient } from '@/lib/supabase/server';
import { formatPrice, formatDate } from '@/lib/utils';
import BookingActions from './BookingActions';

async function getBookings() {
  const supabase = await createAdminClient();
  const { data } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
  return data || [];
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  confirmed: 'bg-green-100 text-green-700 border-green-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};
const statusLabels: Record<string, string> = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  cancelled: 'Annulée',
};

export default async function BookingsPage() {
  const bookings = await getBookings();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Réservations</h1>
          <p className="text-slate-500 text-sm mt-1">{bookings.length} réservation{bookings.length !== 1 ? 's' : ''} au total</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Réf.', 'Client', 'Hébergement', 'Type', 'Dates', 'Voyageurs', 'Montant', 'Statut', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr><td colSpan={9} className="px-6 py-12 text-center text-slate-400">Aucune réservation pour l&apos;instant</td></tr>
              ) : bookings.map((b: any) => (
                <tr key={b.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">#{b.id.slice(0, 8).toUpperCase()}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-800 whitespace-nowrap">{b.customer_name}</div>
                    <div className="text-xs text-slate-400">{b.customer_email}</div>
                    <div className="text-xs text-slate-400">{b.customer_phone}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-700 max-w-[150px] truncate">{b.item_title}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${b.booking_type === 'apartment' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                      {b.booking_type === 'apartment' ? 'Appart.' : 'Pack'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">
                    {b.start_date}<br />→ {b.end_date}
                  </td>
                  <td className="px-4 py-3 text-center text-slate-700">{b.guests}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{formatPrice(b.total_price)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[b.status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                      {statusLabels[b.status] || b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <BookingActions bookingId={b.id} currentStatus={b.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
