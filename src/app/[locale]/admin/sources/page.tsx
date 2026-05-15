import { ExternalLink, Lock } from 'lucide-react';

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

export default function SourcesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Lock className="w-6 h-6 text-sky-500" /> Sources des biens
        </h1>
        <p className="text-slate-500 text-sm mt-1">Usage interne uniquement — ne pas partager avec les clients</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {SOURCES.map((s, i) => (
          <div key={i} className="flex items-center justify-between px-6 py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50">
            <div>
              <p className="font-semibold text-slate-800 text-sm">{s.nom}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.site}</p>
            </div>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white font-medium text-xs px-4 py-2 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Voir l'original
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
