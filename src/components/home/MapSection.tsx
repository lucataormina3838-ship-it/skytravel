'use client';

import { motion } from 'framer-motion';
import SardiniaMap from '@/components/ui/SardiniaMap';
import SplitText from '@/components/ui/SplitText';
import GradientMesh from '@/components/ui/GradientMesh';

export default function MapSection() {
  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-[#e0f7ff] via-white to-[#fef9e8] overflow-hidden">
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-cyan-200/40 rounded-full blur-3xl pointer-events-none" />

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
              className="inline-block text-cyan-700 text-xs font-bold tracking-[0.3em] uppercase mb-5"
            >
              Explorez la Sardaigne
            </motion.span>

            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              <SplitText text="L'île aux" by="char" stagger={0.04} />
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">
                <SplitText text="mille couleurs" by="char" stagger={0.04} delay={0.3} />
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-slate-700 text-lg leading-relaxed mb-8"
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
                  className="bg-white/80 backdrop-blur border border-cyan-200/50 rounded-2xl p-4 hover:border-amber-400 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="text-cyan-700 text-xs font-bold tracking-wider uppercase mb-1">
                    {item.label}
                  </div>
                  <div className="text-slate-900 text-xl font-bold mb-0.5">{item.value}</div>
                  <div className="text-slate-600 text-xs">{item.loc}</div>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
