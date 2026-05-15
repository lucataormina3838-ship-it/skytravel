'use client';

import { motion } from 'framer-motion';

const items = [
  '✦ Sardaigne Authentique',
  '✦ Villas Privées',
  '✦ Eaux Turquoise',
  '✦ Guide Francophone',
  '✦ Réservation Directe',
  '✦ Cala Luna',
  '✦ Cala Mariolu',
  '✦ Costa Smeralda',
  '✦ Golfe de Orosei',
  '✦ Expérience Exclusive',
];

export default function InfiniteMarquee({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap py-4 bg-slate-950 border-y border-white/5">
      <motion.div
        className="inline-flex gap-10"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-sm font-medium tracking-[0.2em] text-white/40 uppercase inline-block"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
