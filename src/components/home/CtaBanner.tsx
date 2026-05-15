'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { useRef } from 'react';
import { ArrowRight, Phone } from 'lucide-react';

export default function CtaBanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.0, 1.08]);

  return (
    <section ref={ref} className="relative py-40 px-4 overflow-hidden bg-slate-950">

      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <img
          src="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1920&q=85"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950/90" />
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-amber-400/30"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        style={{ y }}
      >
        <motion.span
          className="inline-block text-amber-400 text-xs font-bold tracking-[0.3em] uppercase mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Prêt pour l&apos;aventure ?
        </motion.span>

        <motion.h2
          className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.05] tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ textShadow: '0 4px 24px rgba(0,0,0,0.8)' }}
        >
          Votre été en<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
            Sardaigne
          </span><br />
          vous attend
        </motion.h2>

        <motion.p
          className="text-slate-300 text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Villas avec piscine, excursions exclusives, service francophone. Réservez maintenant avant que les meilleures dates partent.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/apartments"
            className="group relative inline-flex items-center justify-center gap-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-10 py-5 rounded-2xl text-base tracking-wide transition-all duration-300 shadow-[0_8px_40px_rgba(251,191,36,0.35)] hover:shadow-[0_12px_50px_rgba(251,191,36,0.5)] overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 bg-white/25"
              initial={{ x: '-110%', skewX: '-15deg' }}
              whileHover={{ x: '110%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
            <span className="relative z-10">Voir les villas</span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          <a
            href="tel:+33770018291"
            className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-semibold px-10 py-5 rounded-2xl text-base tracking-wide transition-all duration-300"
          >
            <Phone className="w-4 h-4" />
            +33 7 70 01 82 91
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {['✓ Annulation flexible', '✓ Réponse sous 2h', '✓ Paiement sécurisé'].map((item, i) => (
            <span key={i} className="text-slate-400 text-sm flex items-center gap-2">
              {item}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
