'use client';

import { motion } from 'framer-motion';
import SardiniaMap from '@/components/ui/SardiniaMap';
import SplitText from '@/components/ui/SplitText';
import GradientMesh from '@/components/ui/GradientMesh';

export default function MapSection() {
  return (
    <section className="relative py-32 px-4 bg-[#080d1a] overflow-hidden">
      <GradientMesh intensity="subtle" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Map */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <SardiniaMap />
            </motion.div>
          </div>

          {/* Right — Text */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block text-amber-400 text-xs font-bold tracking-[0.3em] uppercase mb-5"
            >
              Explorez la Sardaigne
            </motion.span>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <SplitText text="L'île aux" by="char" stagger={0.04} />
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                <SplitText text="mille couleurs" by="char" stagger={0.04} delay={0.3} />
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-slate-400 text-lg leading-relaxed mb-8"
            >
              De Stintino au nord à Villasimius au sud, découvrez les plages les plus mythiques
              et les coins secrets accessibles uniquement en bateau.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Nord', value: '2 villas', loc: 'Costa Paradiso' },
                { label: 'Centre', value: '4 villas', loc: 'Orosei' },
                { label: 'Sud', value: '2 villas', loc: 'Villasimius' },
                { label: 'Excursions', value: '3 packs', loc: 'Bateau · Quad' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 hover:border-amber-400/30 transition-colors"
                >
                  <div className="text-amber-400 text-xs font-bold tracking-wider uppercase mb-1">
                    {item.label}
                  </div>
                  <div className="text-white text-xl font-bold mb-0.5">{item.value}</div>
                  <div className="text-slate-500 text-xs">{item.loc}</div>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
