import { createAdminClient } from '@/lib/supabase/server';
import { formatPrice } from '@/lib/utils';
import { CalendarCheck, Home, Package, TrendingUp, Clock, CheckCircle, ExternalLink, Lock } from 'lucide-react';
import Link from 'next/link';

const SOURCES = [
  { nom: 'Villetta Blanche – Cote Nord Sauvage', url: 'https://www.sardiniaunlimited.com/italy/sardinia/costa-paradiso/villetta-ambra-white/', site: 'sardiniaunlimited.com' },
  { nom: 'Villa Cedrino – Nature et Vue Montagne', url: 'https://www.booking.com/hotel/it/b-b-valle-del-cedrino.fr.html', site: 'booking.com' },
  { nom: 'Suite Corallo – Village Sarde Authentique', url: 'https://www.booking.com/hotel/it/alloggio-in-pieno-centro-storico-di-orosei.fr.html', site: 'booking.com' },
  { nom: 'Villa Marina – Vue Mer et Jardin Fleuri', url: 'https://www.booking.com/hotel/it/le-residenze-del-maria-rosaria-via-leonardo-da-vinci-14.fr.html', site: 'booking.com' },
  { nom: "Resort L'Emeraude – Piscine et Spa", url: 'https://www.booking.com/hotel/it/santa-maria-resort.fr.html', site: 'booking.com' },
  { nom: 'Villa Pietra – Coeur Historique de Sardaigne', url: 'https://www.booking.com/hotel/it/etra-vacanze.fr.html', site: 'booking.com' },
  { nom: 'Mas des Collines Sardes – Nature et Authenticite', url: 'https://www.booking.com/hotel/it/funtan-39-arva.fr.html', site: 'booking.com' },
  { nom: 'Villa Acqua Cristallo', url: 'https://www.sardiniaunlimited.com/italy/sardinia/costa-paradiso/casa-rosa-blu/', site: 'sardiniaunlimited.com' },
];

async function getStats() {
  const supabase = await createAdminClient();
  const [{ data: bookings }, { data: apartments }, { data: packs }] = await Promise.all([
    supabase.from('bookings').select('*'),
    supabase.from('apartments').select('id'),
    supabase.from('packs').select('id'),
  ]);

  const total = bookings?.length || 0;
  const pending = bookings?.filter(b => b.status === 'pending').length || 0;
  const confirmed = bookings?.filter(b => b.status === 'confirmed').length || 0;
  const revenue = bookings?.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + (b.total_price || 0), 0) || 0;
  const recent = (bookings || []).slice(0, 5);

  return { total, pending, confirmed, revenue, recent, apartmentsCount: apartments?.length || 0, packsCount: packs?.length || 0 };
}

export default async function AdminDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const stats = await getStats();

  const statCards = [
    { label: 'Réservations totales', value: stats.total, icon: CalendarCheck, color: 'bg-sky-500', change: '+12%' },
    { label: 'En attente', value: stats.pending, icon: Clock, color: 'bg-amber-500', change: '' },
    { label: 'Confirmées', value: stats.confirmed, icon: CheckCircle, color: 'bg-green-500', change: '' },
    { label: 'Revenus estimés', value: formatPrice(stats.revenue), icon: TrendingUp, color: 'bg-purple-500', change: '' },
    { label: 'Appartements', value: stats.apartmentsCount, icon: Home, color: 'bg-blue-500', change: '' },
    { label: 'Packs', value: stats.packsCount, icon: Package, color: 'bg-orange-500', change: '' },
  ];

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    confirmed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };
  const statusLabels: Record<string, string> = {
    pending: 'En attente',
    confirmed: 'Confirmée',
    cancelled: 'Annulée',
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Tableau de bord</h1>
        <p className="text-slate-500 text-sm mt-1">Vue d&apos;ensemble de l&apos;activité Sky Travel — v2</p>
      </div>

      {/* Sources des biens */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <Lock className="w-4 h-4 text-slate-400" />
          <h2 className="font-semibold text-slate-800">Sources des biens</h2>
          <span className="text-xs text-red-400 font-medium ml-1">— usage interne uniquement</span>
        </div>
        <div className="divide-y divide-slate-50">
          {SOURCES.map((s, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-3 hover:bg-slate-50">
              <div>
                <p className="text-sm font-medium text-slate-800">{s.nom}</p>
                <p className="text-xs text-slate-400">{s.site}</p>
              </div>
              <a href={s.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors shrink-0">
                <ExternalLink className="w-3 h-3" /> Voir
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className={`w-9 h-9 ${card.color} rounded-lg flex items-center justify-center mb-3`}>
              <card.icon className="w-4 h-4 text-white" />
            </div>
            <div className="text-xl font-bold text-slate-800">{card.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { href: `/${locale}/admin/apartments`, label: 'Gérer les appartements', desc: `${stats.apartmentsCount} appartements`, icon: Home, color: 'text-blue-500' },
          { href: `/${locale}/admin/packs`, label: 'Gérer les packs', desc: `${stats.packsCount} packs`, icon: Package, color: 'text-orange-500' },
          { href: `/${locale}/admin/bookings`, label: 'Voir les réservations', desc: `${stats.pending} en attente`, icon: CalendarCheck, color: 'text-sky-500' },
        ].map((action, i) => (
          <Link key={i} href={action.href} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-sky-200 transition-all group">
            <action.icon className={`w-6 h-6 ${action.color} mb-3`} />
            <div className="font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">{action.label}</div>
            <div className="text-sm text-slate-400 mt-0.5">{action.desc}</div>
          </Link>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">Réservations récentes</h2>
          <Link href={`/${locale}/admin/bookings`} className="text-sky-500 text-sm hover:text-sky-600">Voir tout →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['Client', 'Hébergement', 'Dates', 'Montant', 'Statut'].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.recent.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">Aucune réservation</td></tr>
              ) : stats.recent.map((b: any) => (
                <tr key={b.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3">
                    <div className="font-medium text-slate-800">{b.customer_name}</div>
                    <div className="text-xs text-slate-400">{b.customer_email}</div>
                  </td>
                  <td className="px-6 py-3 text-slate-600">{b.item_title}</td>
                  <td className="px-6 py-3 text-slate-600 text-xs">{b.start_date} → {b.end_date}</td>
                  <td className="px-6 py-3 font-medium text-slate-800">{formatPrice(b.total_price)}</td>
                  <td className="px-6 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[b.status] || 'bg-slate-100 text-slate-600'}`}>
                      {statusLabels[b.status] || b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Sources des biens */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <Lock className="w-4 h-4 text-slate-400" />
          <h2 className="font-semibold text-slate-800">Sources des biens</h2>
          <span className="text-xs text-slate-400 ml-1">— usage interne uniquement</span>
        </div>
        <div className="divide-y divide-slate-50">
          {SOURCES.map((s, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-3 hover:bg-slate-50">
              <div>
                <p className="text-sm font-medium text-slate-800">{s.nom}</p>
                <p className="text-xs text-slate-400">{s.site}</p>
              </div>
              <a href={s.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors shrink-0">
                <ExternalLink className="w-3 h-3" /> Voir
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
