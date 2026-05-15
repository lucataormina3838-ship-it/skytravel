import { createAdminClient } from '@/lib/supabase/server';
import { Users, TrendingUp, Eye, Calendar, Globe, ExternalLink, Lock } from 'lucide-react';

const SOURCES: Record<string, { url: string; site: string }> = {
  'Villetta Blanche – Cote Nord Sauvage': { url: 'https://www.sardiniaunlimited.com/italy/sardinia/costa-paradiso/villetta-ambra-white/', site: 'sardiniaunlimited.com' },
  'Villa Cedrino – Nature et Vue Montagne': { url: 'https://www.booking.com/hotel/it/b-b-valle-del-cedrino.fr.html', site: 'booking.com' },
  'Suite Corallo – Village Sarde Authentique': { url: 'https://www.booking.com/hotel/it/alloggio-in-pieno-centro-storico-di-orosei.fr.html', site: 'booking.com' },
  'Villa Marina – Vue Mer et Jardin Fleuri': { url: 'https://www.booking.com/hotel/it/le-residenze-del-maria-rosaria-via-leonardo-da-vinci-14.fr.html', site: 'booking.com' },
  "Resort L'Emeraude – Piscine et Spa": { url: 'https://www.booking.com/hotel/it/santa-maria-resort.fr.html', site: 'booking.com' },
  'Villa Pietra – Coeur Historique de Sardaigne': { url: 'https://www.booking.com/hotel/it/etra-vacanze.fr.html', site: 'booking.com' },
  'Mas des Collines Sardes – Nature et Authenticite': { url: 'https://www.booking.com/hotel/it/funtan-39-arva.fr.html', site: 'booking.com' },
  'Villa Acqua Cristallo': { url: 'https://www.sardiniaunlimited.com/italy/sardinia/costa-paradiso/casa-rosa-blu/', site: 'sardiniaunlimited.com' },
};

async function getStats() {
  const supabase = await createAdminClient();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const [{ count: total }, { count: todayCount }, { count: weekCount }, { count: monthCount }, { data: allPages }, { data: recent }] = await Promise.all([
    supabase.from('page_views').select('*', { count: 'exact', head: true }),
    supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', today),
    supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', weekAgo),
    supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', monthAgo),
    supabase.from('page_views').select('page').gte('created_at', monthAgo),
    supabase.from('page_views').select('created_at').gte('created_at', weekAgo).order('created_at', { ascending: true }),
  ]);

  // Pages les plus visitées
  const pageCounts: Record<string, number> = {};
  allPages?.forEach(v => { pageCounts[v.page] = (pageCounts[v.page] || 0) + 1; });
  const topPages = Object.entries(pageCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);

  // Visites par jour sur 7 jours
  const days: { label: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dayStr = d.toDateString();
    const count = recent?.filter(v => new Date(v.created_at).toDateString() === dayStr).length || 0;
    days.push({ label: d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }), count });
  }

  const maxDay = Math.max(...days.map(d => d.count), 1);

  return { total, todayCount, weekCount, monthCount, topPages, days, maxDay };
}

export default async function AnalyticsPage() {
  const { total, todayCount, weekCount, monthCount, topPages, days, maxDay } = await getStats();

  const pageLabels: Record<string, string> = {
    '/fr': '🏠 Accueil (FR)', '/en': '🏠 Accueil (EN)',
    '/fr/apartments': '🏠 Appartements', '/en/apartments': '🏠 Apartments',
    '/fr/packs': '🎒 Packs', '/en/packs': '🎒 Packs',
    '/fr/contact': '📧 Contact', '/fr/privacy': '🔒 Confidentialité',
  };

  const stats = [
    { label: "Aujourd'hui", value: todayCount || 0, icon: Eye, color: 'bg-sky-500' },
    { label: '7 derniers jours', value: weekCount || 0, icon: Calendar, color: 'bg-violet-500' },
    { label: '30 derniers jours', value: monthCount || 0, icon: TrendingUp, color: 'bg-emerald-500' },
    { label: 'Total visites', value: total || 0, icon: Globe, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Users className="w-6 h-6 text-sky-500" /> Statistiques de visites
        </h1>
        <p className="text-slate-500 text-sm mt-1">Visiteurs en temps réel de ton site</p>
      </div>

      {/* Cartes stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className={`${s.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-3xl font-bold text-slate-800">{s.value.toLocaleString()}</div>
            <div className="text-sm text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Graphique 7 jours */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="font-bold text-slate-800 mb-6">Visites des 7 derniers jours</h2>
        <div className="flex items-end gap-3 h-40">
          {days.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-semibold text-slate-700">{d.count || ''}</span>
              <div className="w-full rounded-t-lg bg-sky-500 transition-all" style={{ height: `${Math.max((d.count / maxDay) * 100, d.count > 0 ? 8 : 2)}%`, opacity: d.count === 0 ? 0.2 : 1 }} />
              <span className="text-xs text-slate-400 capitalize text-center">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pages les plus visitées */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="font-bold text-slate-800 mb-4">Pages les plus visitées (30 jours)</h2>
        {topPages.length === 0 ? (
          <p className="text-slate-400 text-sm">Pas encore de données. Les visites apparaîtront ici dès que des clients accèderont au site.</p>
        ) : (
          <div className="space-y-3">
            {topPages.map(([page, count], i) => {
              const label = pageLabels[page] || `📄 ${page}`;
              const maxCount = topPages[0]?.[1] || 1;
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-4">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-slate-700">{label}</span>
                      <span className="text-sm font-semibold text-slate-800">{count}</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-500 rounded-full" style={{ width: `${(count / maxCount) * 100}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Sources des biens */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="font-bold text-slate-800 mb-1 flex items-center gap-2">
          <Lock className="w-4 h-4 text-slate-400" /> Sources des biens
        </h2>
        <p className="text-xs text-slate-400 mb-4">Usage interne — ne pas partager avec les clients</p>
        <div className="space-y-2">
          {Object.entries(SOURCES).map(([name, source]) => (
            <div key={name} className="flex items-center justify-between gap-4 py-2.5 border-b border-slate-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-slate-800">{name}</p>
                <p className="text-xs text-slate-400">{source.site}</p>
              </div>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 bg-sky-50 hover:bg-sky-100 text-sky-600 font-medium text-xs px-3 py-1.5 rounded-lg transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Voir
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
