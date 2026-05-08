'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { Star, Anchor, Home } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnyLink = Link as any;

const PACKS = [
  {
    id: 'quad-aventure',
    icon: Star,
    tag: 'Aventure & Nature',
    title: 'Pack Quad Aventure',
    description:
      "Partez à la conquête des paysages sauvages de Sardaigne à bord d'un quad tout-terrain. Traversez des sentiers côtiers secrets, des forêts de chênes-lièges et des plages isolées accessibles uniquement hors des sentiers battus. Un guide expert vous accompagne pour une journée inoubliable.",
    price: '180 €',
    highlight: 'Guide expert inclus',
    image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800&q=80',
  },
  {
    id: 'maison-traditionnelle',
    icon: Home,
    tag: 'Authenticité & Culture',
    title: 'Pack Maison Traditionnelle',
    description:
      "Vivez comme un authentique Sarde dans une maison en pierre ancestrale, nichée au cœur d'un village perché. Petit-déjeuner maison avec produits locaux, soirée avec les habitants, et accès à des traditions séculaires rarement partagées avec les touristes.",
    price: '220 €',
    highlight: 'Nuit & petit-déjeuner',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
  },
  {
    id: 'bateau-cala-gonone',
    icon: Anchor,
    tag: 'Mer & Découverte',
    title: 'Pack Bateau Cala Gonone',
    description:
      "Embarquez depuis le port de Cala Gonone pour une croisière privée le long des falaises de calcaire du Golfo di Orosei. Snorkeling dans des eaux cristallines, déjeuner sur une plage secrète et visite des grottes marines accessibles uniquement par la mer.",
    price: '250 €',
    highlight: 'Croisière privée',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const item = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

export default function ExclusivePacks() {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Ambient gold glow */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 50% at 20% 60%, #f59e0b 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 30%, #f59e0b 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-[0.25em] mb-3 flex items-center justify-center gap-3">
            <span className="inline-block w-8 h-px bg-amber-400/60" />
            Collection Premium
            <span className="inline-block w-8 h-px bg-amber-400/60" />
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Nos Packs Exclusifs
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Des expériences soigneusement sélectionnées pour ceux qui recherchent l&apos;extraordinaire.
            Chaque pack révèle la Sardaigne dans toute son authenticité.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {PACKS.map((pack) => {
            const Icon = pack.icon;
            return (
              <motion.div
                key={pack.id}
                variants={item}
                whileHover={{
                  y: -10,
                  boxShadow: '0 0 48px rgba(251,191,36,0.18)',
                  transition: { type: 'spring', stiffness: 260, damping: 22 },
                }}
                className="group flex flex-col bg-slate-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/40 transition-colors duration-500"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pack.image}
                    alt={pack.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-amber-300 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border border-amber-400/30">
                      <Icon className="h-3 w-3" />
                      {pack.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="w-10 h-0.5 bg-amber-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors duration-300">
                    {pack.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
                    {pack.description}
                  </p>
                  <div className="flex items-center gap-2 mb-5">
                    <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 shrink-0" />
                    <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">
                      {pack.highlight}
                    </span>
                  </div>
                  <div className="w-full h-px bg-white/10 mb-5" />
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-slate-500 text-xs uppercase tracking-wider mb-0.5">À partir de</p>
                      <p className="text-2xl font-bold text-white">
                        {pack.price}
                        <span className="text-slate-500 text-sm font-normal ml-1">/ pers.</span>
                      </p>
                    </div>
                    <AnyLink
                      href="/packs"
                      className="relative overflow-hidden shrink-0 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm px-5 py-2.5 rounded-xl transition-colors shadow-lg shadow-amber-500/20"
                    >
                      <motion.span
                        className="absolute inset-0 bg-white/30"
                        initial={{ x: '-110%', skewX: '-12deg' }}
                        whileHover={{ x: '110%' }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                      />
                      <span className="relative z-10">Réserver</span>
                    </AnyLink>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer note */}
        <motion.p
          className="text-center text-slate-500 text-sm mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Tous nos packs sont personnalisables selon vos dates et préférences.{' '}
          <AnyLink href="/packs" className="text-amber-400/70 hover:text-amber-400 underline underline-offset-2 transition-colors">
            Contactez-nous
          </AnyLink>{' '}
          pour un devis sur mesure.
        </motion.p>
      </div>
    </section>
  );
}
