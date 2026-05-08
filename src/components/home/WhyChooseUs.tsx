'use client';

import { motion } from 'framer-motion';
import { Award, Shield, Headphones } from 'lucide-react';
import { useTranslations } from 'next-intl';

const cards = [
  {
    Icon: Award,
    title: 'Sélection premium',
    desc: "Chaque appartement est personnellement inspecté et sélectionné pour garantir qualité et authenticité.",
  },
  {
    Icon: Shield,
    title: 'Réservation sécurisée',
    desc: "Vos données et paiements sont sécurisés. Annulation flexible pour votre tranquillité d'esprit.",
  },
  {
    Icon: Headphones,
    title: 'Support francophone',
    desc: "Notre équipe francophone est disponible 7j/7 avant et pendant votre séjour en Sardaigne.",
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

export default function WhyChooseUs() {
  const tHome = useTranslations('home');

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-sky-500 font-semibold text-sm uppercase tracking-wider mb-2">Nos valeurs</div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{tHome('why_title')}</h2>
          <p className="text-slate-500 text-lg">{tHome('why_subtitle')}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {cards.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
              className="text-center p-8 rounded-2xl bg-slate-50 hover:bg-sky-50 transition-colors group cursor-default"
            >
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-100 group-hover:bg-sky-200 transition-colors mb-6"
                whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
              >
                <Icon className="w-8 h-8 text-sky-500" />
              </motion.div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
              <p className="text-slate-500 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
