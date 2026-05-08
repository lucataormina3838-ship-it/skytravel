'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Star, Upload, X, Image as ImageIcon, GripVertical, CalendarOff, ChevronLeft, ChevronRight, Lock, Unlock } from 'lucide-react';
import { Apartment } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface Props { initialApartments: Apartment[]; }

// ── Composant modale calendrier ──────────────────────────────────────────────
interface ModalProps {
  apt: Apartment | null;
  blockedDates: string[];
  calMonth: Date;
  blockLoading: boolean;
  today: string;
  onClose: () => void;
  onToggleDate: (d: string) => void;
  onBlockRange: (s: string, e: string) => void;
  onUnblockAll: () => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  fmt: (y: number, m: number, d: number) => string;
  getCalDays: (month: Date) => { year: number; m: number; firstDay: number; daysInMonth: number };
}

function BlockedDatesModal({ apt, blockedDates, calMonth, blockLoading, today, onClose, onToggleDate, onBlockRange, onUnblockAll, onPrevMonth, onNextMonth, fmt, getCalDays }: ModalProps) {
  if (!apt) return null;
  const { year, m, firstDay, daysInMonth } = getCalDays(calMonth);
  const monthName = calMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  const days = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <CalendarOff className="w-5 h-5 text-orange-500" />
              Gérer les disponibilités
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 truncate max-w-xs">{apt.title_fr}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex gap-4 px-6 pt-4 text-xs">
          <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded bg-green-100 border border-green-300" /> Disponible</div>
          <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded bg-red-100 border border-red-300" /> Bloqué</div>
          <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded bg-slate-100 border border-slate-200" /> Passé</div>
        </div>

        <div className="flex items-center justify-between px-6 py-3">
          <button onClick={onPrevMonth} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-semibold text-slate-800 capitalize">{monthName}</span>
          <button onClick={onNextMonth} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 pb-2">
          <div className="grid grid-cols-7 gap-1 mb-1">
            {days.map(d => <div key={d} className="text-center text-xs text-slate-400 font-medium py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = fmt(year, m, day);
              const isBlocked = blockedDates.includes(dateStr);
              const isPast = dateStr < today;
              return (
                <button
                  key={day}
                  onClick={() => !isPast && onToggleDate(dateStr)}
                  disabled={blockLoading || isPast}
                  className={`aspect-square rounded-lg text-sm font-medium transition-all flex items-center justify-center
                    ${isPast ? 'text-slate-300 bg-slate-50 cursor-not-allowed' :
                    isBlocked ? 'bg-red-100 text-red-700 hover:bg-red-200 border border-red-300' :
                    'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'}`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100">
          <p className="text-xs text-slate-500 font-medium mb-2">Actions rapides</p>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => onBlockRange(fmt(year, m, 1), new Date(year, m + 1, 1).toISOString().split('T')[0])}
              disabled={blockLoading}
              className="flex items-center gap-1.5 text-xs bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-lg font-medium transition-colors"
            >
              <Lock className="w-3.5 h-3.5" /> Bloquer tout le mois
            </button>
            <button
              onClick={onUnblockAll}
              disabled={blockLoading || blockedDates.length === 0}
              className="flex items-center gap-1.5 text-xs bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 px-3 py-1.5 rounded-lg font-medium transition-colors disabled:opacity-40"
            >
              <Unlock className="w-3.5 h-3.5" /> Tout débloquer
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            {blockedDates.length} date{blockedDates.length !== 1 ? 's' : ''} bloquée{blockedDates.length !== 1 ? 's' : ''} au total
          </p>
        </div>
      </div>
    </div>
  );
}

const emptyForm = {
  title_fr: '', title_en: '',
  description_fr: '', description_en: '',
  price_per_night: '', max_guests: '', bedrooms: '', bathrooms: '', area_sqm: '',
  location: 'Sardaigne',
  amenities: '',
  images: [] as string[],
  featured: false,
};

export default function ApartmentManager({ initialApartments }: Props) {
  const [apartments, setApartments] = useState(initialApartments);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [loading, setLoading] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const router = useRouter();
  const dragItem = useRef<number | null>(null);

  // ── Gestion des dates bloquées ───────────────────────────────────────────
  const [blockedModal, setBlockedModal] = useState<Apartment | null>(null);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [calMonth, setCalMonth] = useState(() => new Date());
  const [blockLoading, setBlockLoading] = useState(false);

  const openBlockedModal = async (apt: Apartment) => {
    setBlockedModal(apt);
    setCalMonth(new Date());
    const res = await fetch(`/api/blocked-dates?item_id=${apt.id}`);
    const data = await res.json();
    setBlockedDates(data.dates || []);
  };

  const toggleDate = async (dateStr: string) => {
    if (!blockedModal) return;
    setBlockLoading(true);
    const isBlocked = blockedDates.includes(dateStr);
    if (isBlocked) {
      await fetch('/api/blocked-dates', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: blockedModal.id, date: dateStr }),
      });
      setBlockedDates(prev => prev.filter(d => d !== dateStr));
    } else {
      await fetch('/api/blocked-dates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: blockedModal.id, item_type: 'apartment', date: dateStr }),
      });
      setBlockedDates(prev => [...prev, dateStr]);
    }
    setBlockLoading(false);
  };

  const blockRange = async (start: string, end: string) => {
    if (!blockedModal) return;
    setBlockLoading(true);
    await fetch('/api/blocked-dates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_id: blockedModal.id, item_type: 'apartment', start, end }),
    });
    const res = await fetch(`/api/blocked-dates?item_id=${blockedModal.id}`);
    const data = await res.json();
    setBlockedDates(data.dates || []);
    setBlockLoading(false);
  };

  const unblockAll = async () => {
    if (!blockedModal || !confirm('Débloquer toutes les dates de ce bien ?')) return;
    setBlockLoading(true);
    await fetch('/api/blocked-dates', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_id: blockedModal.id, all: true }),
    });
    setBlockedDates([]);
    setBlockLoading(false);
  };

  // Génère les jours du mois
  const getCalDays = (month: Date) => {
    const year = month.getFullYear();
    const m = month.getMonth();
    const firstDay = new Date(year, m, 1).getDay();
    const daysInMonth = new Date(year, m + 1, 0).getDate();
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    return { year, m, firstDay: offset, daysInMonth };
  };

  const fmt = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const today = new Date().toISOString().split('T')[0];

  const openCreate = () => { setForm({ ...emptyForm }); setEditId(null); setShowForm(true); };
  const openEdit = (apt: Apartment) => {
    setForm({
      title_fr: apt.title_fr, title_en: apt.title_en,
      description_fr: apt.description_fr, description_en: apt.description_en,
      price_per_night: String(apt.price_per_night), max_guests: String(apt.max_guests),
      bedrooms: String(apt.bedrooms), bathrooms: String(apt.bathrooms), area_sqm: String(apt.area_sqm || ''),
      location: apt.location, amenities: apt.amenities.join(', '),
      images: apt.images, featured: apt.featured,
    });
    setEditId(apt.id);
    setShowForm(true);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadingImg(true);
    for (const file of files) {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'apartments');
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) setForm(prev => ({ ...prev, images: [...prev.images, data.url] }));
    }
    setUploadingImg(false);
    e.target.value = '';
  };

  const removeImage = (idx: number) => setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));

  const onDragStart = (idx: number) => {
    dragItem.current = idx;
    setDragIdx(idx);
  };

  const onDragEnter = (idx: number) => {
    setDragOverIdx(idx);
  };

  const onDragEnd = () => {
    if (dragItem.current !== null && dragOverIdx !== null && dragItem.current !== dragOverIdx) {
      setForm(prev => {
        const imgs = [...prev.images];
        const [moved] = imgs.splice(dragItem.current!, 1);
        imgs.splice(dragOverIdx, 0, moved);
        return { ...prev, images: imgs };
      });
    }
    dragItem.current = null;
    setDragIdx(null);
    setDragOverIdx(null);
  };

  const handleSave = async () => {
    setLoading(true);
    const payload = {
      ...form,
      price_per_night: Number(form.price_per_night),
      max_guests: Number(form.max_guests),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      area_sqm: Number(form.area_sqm) || null,
      amenities: form.amenities.split(',').map(s => s.trim()).filter(Boolean),
    };

    if (editId) {
      await fetch('/api/apartments', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editId, ...payload }) });
    } else {
      await fetch('/api/apartments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    }
    setLoading(false);
    setShowForm(false);
    router.refresh();
    const res = await fetch('/api/apartments');
    const data = await res.json();
    setApartments(data.apartments || []);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet appartement ?')) return;
    await fetch('/api/apartments', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    setApartments(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Appartements</h1>
          <p className="text-slate-500 text-sm">{apartments.length} appartement{apartments.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm">
          <Plus className="w-4 h-4" /> Ajouter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Photo', 'Titre (FR)', 'Localisation', 'Prix/nuit', 'Capacité', 'Featured', 'Disponibilité', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {apartments.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-slate-400">Aucun appartement. Cliquez sur &ldquo;Ajouter&rdquo; pour commencer.</td></tr>
              ) : apartments.map(apt => (
                <tr key={apt.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    {apt.images[0] ? (
                      <img src={apt.images[0]} alt="" className="w-12 h-10 object-cover rounded-lg" />
                    ) : (
                      <div className="w-12 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-slate-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800 max-w-[180px] truncate">{apt.title_fr}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{apt.location}</td>
                  <td className="px-4 py-3 font-semibold text-slate-700">{formatPrice(apt.price_per_night)}</td>
                  <td className="px-4 py-3 text-slate-600">{apt.max_guests} pers.</td>
                  <td className="px-4 py-3">
                    {apt.featured ? <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => openBlockedModal(apt)}
                      className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-600 transition-colors"
                    >
                      <CalendarOff className="w-3.5 h-3.5" />
                      Bloquer dates
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(apt)} className="p-1.5 text-sky-500 hover:bg-sky-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(apt.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Modale blocage de dates ── */}
      <BlockedDatesModal
        apt={blockedModal}
        blockedDates={blockedDates}
        calMonth={calMonth}
        blockLoading={blockLoading}
        today={today}
        onClose={() => setBlockedModal(null)}
        onToggleDate={toggleDate}
        onBlockRange={blockRange}
        onUnblockAll={unblockAll}
        onPrevMonth={() => setCalMonth(d => new Date(d.getFullYear(), d.getMonth() - 1))}
        onNextMonth={() => setCalMonth(d => new Date(d.getFullYear(), d.getMonth() + 1))}
        fmt={fmt}
        getCalDays={getCalDays}
      />

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">{editId ? 'Modifier' : 'Ajouter'} un appartement</h2>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">

              {/* ── Photos ── */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-slate-700">Photos</label>
                  {form.images.length > 0 && (
                    <span className="text-xs text-slate-400">Glisser pour réorganiser · 1ère = photo principale</span>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 mb-3">
                  {form.images.map((url, i) => (
                    <div
                      key={url + i}
                      draggable
                      onDragStart={() => onDragStart(i)}
                      onDragEnter={() => onDragEnter(i)}
                      onDragEnd={onDragEnd}
                      onDragOver={e => e.preventDefault()}
                      className={`relative group cursor-grab active:cursor-grabbing transition-all ${
                        dragIdx === i ? 'opacity-40 scale-95' : ''
                      } ${
                        dragOverIdx === i && dragIdx !== i ? 'ring-2 ring-sky-400 ring-offset-2 rounded-xl' : ''
                      }`}
                    >
                      <img
                        src={url}
                        alt=""
                        className="w-28 h-20 object-cover rounded-xl border border-slate-200"
                      />
                      {i === 0 && (
                        <span className="absolute bottom-1 left-1 bg-sky-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md leading-none">
                          Principale
                        </span>
                      )}
                      <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 rounded p-0.5">
                        <GripVertical className="w-3 h-3 text-slate-500" />
                      </div>
                      <button
                        onClick={() => removeImage(i)}
                        className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 shadow"
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  {/* Upload zone */}
                  <label className={`w-28 h-20 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-sky-400 hover:bg-sky-50 transition-colors ${uploadingImg ? 'opacity-50 pointer-events-none' : ''}`}>
                    <Upload className="w-5 h-5 text-slate-400" />
                    <span className="text-xs text-slate-400 mt-1 text-center leading-tight">
                      {uploadingImg ? 'Upload...' : 'Ajouter\nphoto(s)'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleUpload}
                      disabled={uploadingImg}
                    />
                  </label>
                </div>

                {form.images.length === 0 && (
                  <p className="text-xs text-slate-400">Aucune photo. Ajoutez au moins une photo.</p>
                )}
              </div>

              {/* ── Titres ── */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: 'title_fr', label: 'Titre FR' },
                  { key: 'title_en', label: 'Titre EN' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs text-slate-500 mb-1">{f.label}</label>
                    <input
                      type="text"
                      value={form[f.key as keyof typeof form] as string}
                      onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>
                ))}
              </div>

              {/* ── Descriptions ── */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Description FR</label>
                  <textarea
                    value={form.description_fr}
                    onChange={e => setForm(p => ({ ...p, description_fr: e.target.value }))}
                    rows={4}
                    placeholder="Décrivez l'appartement en français..."
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Description EN</label>
                  <textarea
                    value={form.description_en}
                    onChange={e => setForm(p => ({ ...p, description_en: e.target.value }))}
                    rows={4}
                    placeholder="Describe the apartment in English..."
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
                  />
                </div>
              </div>

              {/* ── Chiffres ── */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { key: 'price_per_night', label: 'Prix/nuit (€)' },
                  { key: 'max_guests', label: 'Max voyageurs' },
                  { key: 'bedrooms', label: 'Chambres' },
                  { key: 'bathrooms', label: 'Sdb' },
                  { key: 'area_sqm', label: 'Surface (m²)' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs text-slate-500 mb-1">{f.label}</label>
                    <input
                      type="number"
                      value={form[f.key as keyof typeof form] as string}
                      onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>
                ))}
              </div>

              {/* ── Localisation ── */}
              <div>
                <label className="block text-xs text-slate-500 mb-1">Localisation</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              {/* ── Équipements ── */}
              <div>
                <label className="block text-xs text-slate-500 mb-1">Équipements (séparés par des virgules)</label>
                <input
                  type="text"
                  value={form.amenities}
                  onChange={e => setForm(p => ({ ...p, amenities: e.target.value }))}
                  placeholder="WiFi, Piscine, Climatisation..."
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              {/* ── Featured ── */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))}
                  className="w-4 h-4 text-sky-500 rounded focus:ring-sky-400"
                />
                <span className="text-sm text-slate-700">Mettre en avant (featured)</span>
              </label>
            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-slate-100">
              <button onClick={() => setShowForm(false)} className="flex-1 border border-slate-200 text-slate-600 py-2.5 rounded-xl text-sm hover:bg-slate-50">
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={loading || !form.title_fr || !form.price_per_night}
                className="flex-1 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
              >
                {loading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
