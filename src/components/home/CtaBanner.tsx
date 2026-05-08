'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';

export default function CtaBanner() {
  return (
    <section className="py-16 px-4 bg-sky-500 overflow-hidden relative">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-400/40 to-sky-600/40 pointer-events-none" />

      <motion.div
        className="relative max-w-3xl mx-auto text-center text-white"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt pour la Sardaigne ?</h2>
        <p className="text-sky-100 text-lg mb-8">Réservez dès maintenant votre séjour de rêve. Notre équipe vous accompagne à chaque étape.</p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/apartments"
            className="relative overflow-hidden bg-white text-sky-600 font-bold px-8 py-4 rounded-xl hover:bg-sky-50 transition-colors text-lg"
          >
            <motion.span
              className="absolute inset-0 bg-sky-100/60"
              initial={{ x: '-110%', skewX: '-12deg' }}
              whileHover={{ x: '110%' }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
            />
            <span className="relative z-10">Choisir un appartement</span>
          </Link>
          <Link
            href="/packs"
            className="border-2 border-white/50 hover:border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-lg"
          >
            Voir les packs
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
