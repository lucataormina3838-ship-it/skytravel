'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

const testimonials = [
  {
    name: 'Marie L.',
    location: 'Paris',
    text: "Un séjour absolument magique en Sardaigne. Sky Travel a tout organisé à la perfection, de l'appartement aux excursions. Je recommande vivement !",
    rating: 5,
  },
  {
    name: 'Thomas R.',
    location: 'Lyon',
    text: 'La sortie en bateau était incroyable, les grottes marines sont à couper le souffle. Le guide parlait français parfaitement, très professionnel.',
    rating: 5,
  },
  {
    name: 'Sophie M.',
    location: 'Marseille',
    text: 'La nuit en forêt dans la cabane dans les arbres était une expérience unique. Le petit-déjeuner sarde au lever du soleil... inoubliable !',
    rating: 5,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

export default function TestimonialsSection() {
  const tHome = useTranslations('home');

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-sky-400 font-semibold text-sm uppercase tracking-wider mb-2">Avis clients</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{tHome('testimonials_title')}</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/25 rounded-2xl p-6 transition-colors cursor-default"
            >
              {/* Quote mark */}
              <div className="text-4xl text-amber-400/30 font-serif leading-none mb-2 select-none">&ldquo;</div>

              <div className="flex mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-5 italic">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-slate-400 text-xs">{t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
