'use client';

import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useRef } from 'react';

const testimonials = [
  {
    name: 'Marie-Claire L.',
    city: 'Paris',
    rating: 5,
    text: 'Une expérience absolument magique. La villa avec piscine et vue mer dépassait toutes nos attentes. L\'équipe Sky Travel a été disponible à chaque instant. On reviendra sans hésiter !',
    trip: 'Villa Corallo · Juillet 2025',
    avatar: 'MC',
    color: 'from-sky-400 to-blue-600',
  },
  {
    name: 'Thomas B.',
    city: 'Lyon',
    rating: 5,
    text: 'L\'excursion en bateau vers Cala Luna était surréelle — des eaux turquoise à couper le souffle. Le guide francophone a tout rendu magique. Service irréprochable du début à la fin.',
    trip: 'Excursion Cala Luna · Août 2025',
    avatar: 'TB',
    color: 'from-amber-400 to-orange-500',
  },
  {
    name: 'Sophie & Julien R.',
    city: 'Marseille',
    rating: 5,
    text: 'Nous avons réservé pour notre lune de miel et c\'était parfait. Sky Travel nous a trouvé une villa introuvable ailleurs, avec un coucher de soleil inoubliable sur la mer.',
    trip: 'Villetta Blanca · Septembre 2025',
    avatar: 'SJ',
    color: 'from-emerald-400 to-teal-600',
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-32 px-4 bg-gradient-to-b from-[#fef9e8] to-white relative overflow-hidden" ref={ref}>
      {/* Sardinian sun glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">

        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block text-amber-600 text-xs font-bold tracking-[0.3em] uppercase mb-5">
            Ils nous font confiance
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Ce qu&apos;ils disent<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-cyan-800">
              de leur séjour
            </span>
          </h2>

          {/* Stars row */}
          <div className="flex items-center justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.08, type: 'spring', stiffness: 400 }}
              >
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </motion.div>
            ))}
            <span className="ml-3 text-slate-600 text-sm">5.0 · 200+ avis</span>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(({ name, city, rating, text, trip, avatar, color }, i) => (
            <motion.div
              key={i}
              className="relative p-8 rounded-3xl bg-white shadow-lg shadow-amber-100/40 border border-amber-100 hover:border-amber-300 group overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, delay: i * 0.13, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, borderColor: 'rgba(255,255,255,0.12)', transition: { duration: 0.4 } }}
            >
              {/* Hover glow */}
              <motion.div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${color} rounded-3xl`}
                style={{ opacity: 0 }}
                whileHover={{ opacity: 0.04 }}
                transition={{ duration: 0.4 }}
              />

              {/* Quote icon */}
              <Quote className="w-8 h-8 text-amber-400/30 mb-6 -scale-x-100" />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-700 leading-relaxed text-sm mb-8 italic">&ldquo;{text}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {avatar}
                </div>
                <div>
                  <div className="text-slate-900 font-semibold text-sm">{name}</div>
                  <div className="text-slate-600 text-xs">{city} · {trip}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
