'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Star, Upload, X, Image as ImageIcon } from 'lucide-react';
import { Pack } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface Props { initialPacks: Pack[]; }

const emptyForm = {
  title_fr: '', title_en: '',
  description_fr: '', description_en: '',
  price_per_person: '', duration_days: '1', max_persons: '8',
  includes_fr: '', includes_en: '',
  highlights_fr: '', highlights_en: '',
  category: 'boat' as 'boat' | 'quad' | 'forest' | 'combo',
  images: [] as string[],
  featured: false,
};

const categoryOptions = [
  { value: 'boat', label: '⛵ Bateau' },
  { value: 'quad', label: '🏍️ Quad' },
  { value: 'forest', label: '🌲 Forêt' },
  { value: 'combo', label: '✨ Pack complet' },
];

export default function PackManager({ initialPacks }: Props) {
  const [packs, setPacks] = useState(initialPacks);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [loading, setLoading] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const router = useRouter();

  const openCreate = () => { setForm({ ...emptyForm }); setEditId(null); setShowForm(true); };
  const openEdit = (pack: Pack) => {
    setForm({
      title_fr: pack.title_fr, title_en: pack.title_en,
      description_fr: pack.description_fr, description_en: pack.description_en,
      price_per_person: String(pack.price_per_person),
      duration_days: String(pack.duration_days),
      max_persons: String(pack.max_persons),
      includes_fr: pack.includes_fr.join('\n'),
      includes_en: pack.includes_en.join('\n'),
      highlights_fr: pack.highlights_fr.join('\n'),
      highlights_en: pack.highlights_en.join('\n'),
      category: pack.category,
      images: pack.images,
      featured: pack.featured,
    });
    setEditId(pack.id);
    setShowForm(true);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImg(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', 'packs');
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.url) setForm(prev => ({ ...prev, images: [...prev.images, data.url] }));
    setUploadingImg(false);
    e.target.value = '';
  };

  const handleSave = async () => {
    setLoading(true);
    const payload = {
      ...form,
      price_per_person: Number(form.price_per_person),
      duration_days: Number(form.duration_days),
      max_persons: Number(form.max_persons),
      includes_fr: form.includes_fr.split('\n').map(s => s.trim()).filter(Boolean),
      includes_en: form.includes_en.split('\n').map(s => s.trim()).filter(Boolean),
      highlights_fr: form.highlights_fr.split('\n').map(s => s.trim()).filter(Boolean),
      highlights_en: form.highlights_en.split('\n').map(s => s.trim()).filter(Boolean),
    };

    if (editId) {
      await fetch('/api/packs', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editId, ...payload }) });
    } else {
      await fetch('/api/packs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    }
    setLoading(false);
    setShowForm(false);
    router.refresh();
    const res = await fetch('/api/packs');
    const data = await res.json();
    setPacks(data.packs || []);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce pack ?')) return;
    await fetch('/api/packs', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    setPacks(prev => prev.filter(p => p.id !== id));
  };

  const categoryIcons: Record<string, string> = { boat: '⛵', quad: '🏍️', forest: '🌲', combo: '✨' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Packs Découverte</h1>
          <p className="text-slate-500 text-sm">{packs.length} pack{packs.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm">
          <Plus className="w-4 h-4" /> Ajouter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {packs.length === 0 ? (
          <div className="col-span-3 bg-white rounded-xl border border-slate-100 p-12 text-center text-slate-400">
            Aucun pack. Cliquez sur &ldquo;Ajouter&rdquo; pour commencer.
          </div>
        ) : packs.map(pack => (
          <div key={pack.id} className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="relative h-36">
              {pack.images[0] ? (
                <img src={pack.images[0]} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-4xl">
                  {categoryIcons[pack.category]}
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-1.5">
                <button onClick={() => openEdit(pack)} className="bg-white/90 hover:bg-white p-1.5 rounded-lg shadow-sm transition-colors">
                  <Edit2 className="w-3.5 h-3.5 text-sky-500" />
                </button>
                <button onClick={() => handleDelete(pack.id)} className="bg-white/90 hover:bg-white p-1.5 rounded-lg shadow-sm transition-colors">
                  <Trash2 className="w-3.5 h-3.5 text-red-500" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-slate-800 text-sm truncate">{pack.title_fr}</h3>
                {pack.featured && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 flex-shrink-0" />}
              </div>
              <div className="text-xs text-slate-500">{pack.duration_days}j · max {pack.max_persons} pers.</div>
              <div className="text-sky-600 font-bold mt-2">{formatPrice(pack.price_per_person)}<span className="text-slate-400 font-normal text-xs">/pers.</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">{editId ? 'Modifier' : 'Ajouter'} un pack</h2>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Photos</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.images.map((url, i) => (
                    <div key={i} className="relative">
                      <img src={url} alt="" className="w-20 h-16 object-cover rounded-lg border border-slate-200" />
                      <button onClick={() => setForm(p => ({ ...p, images: p.images.filter((_, j) => j !== i) }))}
                        className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">×</button>
                    </div>
                  ))}
                  <label className={`w-20 h-16 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-sky-400 transition-colors ${uploadingImg ? 'opacity-50' : ''}`}>
                    <Upload className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-400 mt-1">{uploadingImg ? '...' : 'Upload'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploadingImg} />
                  </label>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs text-slate-500 mb-1">Catégorie</label>
                <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value as any }))}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400">
                  {categoryOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[{ key: 'title_fr', label: 'Titre FR' }, { key: 'title_en', label: 'Titre EN' }].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs text-slate-500 mb-1">{f.label}</label>
                    <input type="text" value={form[f.key as keyof typeof form] as string}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                ))}
              </div>

              {[
                { key: 'description_fr', label: 'Description FR' },
                { key: 'description_en', label: 'Description EN' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs text-slate-500 mb-1">{f.label}</label>
                  <textarea value={form[f.key as keyof typeof form] as string} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    rows={2} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-400" />
                </div>
              ))}

              <div className="grid grid-cols-3 gap-4">
                {[
                  { key: 'price_per_person', label: 'Prix/pers. (€)' },
                  { key: 'duration_days', label: 'Durée (jours)' },
                  { key: 'max_persons', label: 'Max personnes' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs text-slate-500 mb-1">{f.label}</label>
                    <input type="number" value={form[f.key as keyof typeof form] as string}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  </div>
                ))}
              </div>

              {[
                { key: 'includes_fr', label: 'Inclus FR (1 par ligne)' },
                { key: 'includes_en', label: 'Inclus EN (1 per line)' },
                { key: 'highlights_fr', label: 'Points forts FR (1 par ligne)' },
                { key: 'highlights_en', label: 'Highlights EN (1 per line)' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs text-slate-500 mb-1">{f.label}</label>
                  <textarea value={form[f.key as keyof typeof form] as string} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    rows={3} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-400 font-mono text-xs" />
                </div>
              ))}

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))}
                  className="w-4 h-4 text-sky-500 rounded" />
                <span className="text-sm text-slate-700">Mettre en avant (featured)</span>
              </label>
            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-slate-100">
              <button onClick={() => setShowForm(false)} className="flex-1 border border-slate-200 text-slate-600 py-2.5 rounded-xl text-sm hover:bg-slate-50">Annuler</button>
              <button onClick={handleSave} disabled={loading || !form.title_fr || !form.price_per_person}
                className="flex-1 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                {loading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
