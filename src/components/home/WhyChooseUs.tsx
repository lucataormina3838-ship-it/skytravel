'use client';

import { motion } from 'framer-motion';
import { Award, Shield, Headphones, MapPin, Star, Users } from 'lucide-react';
import { useRef } from 'react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import GradientMesh from '@/components/ui/GradientMesh';
import SplitText from '@/components/ui/SplitText';

const stats = [
  { value: 200, suffix: '+', label: 'Clients satisfaits', icon: Users },
  { value: 8,   suffix: '',   label: 'Villas exclusives',  icon: MapPin },
  { value: 5,   suffix: '.0', label: 'Note moyenne',       icon: Star },
  { value: 3,   suffix: ' ans', label: "D'expérience",     icon: Award },
];

const features = [
  {
    Icon: Award,
    title: 'Sélection Premium',
    desc: "Chaque villa est personnellement inspectée. Nous ne proposons que des biens d'exception avec vue mer ou piscine privée.",
    color: 'from-amber-400/20 to-amber-600/5',
    border: 'border-amber-400/20',
    iconBg: 'bg-amber-400/10',
    iconColor: 'text-amber-400',
    accent: 'from-amber-400 to-amber-600',
  },
  {
    Icon: Shield,
    title: 'Réservation Sécurisée',
    desc: 'Paiement sécurisé, annulation flexible. Contrat clair, prix affiché = prix payé. Zéro mauvaise surprise.',
    color: 'from-sky-400/20 to-sky-600/5',
    border: 'border-sky-400/20',
    iconBg: 'bg-sky-400/10',
    iconColor: 'text-sky-400',
    accent: 'from-sky-400 to-sky-600',
  },
  {
    Icon: Headphones,
    title: 'Support 7j/7',
    desc: 'Sardes de naissance, francophones de cœur. Disponibles avant, pendant et après votre séjour en Sardaigne.',
    color: 'from-emerald-400/20 to-emerald-600/5',
    border: 'border-emerald-400/20',
    iconBg: 'bg-emerald-400/10',
    iconColor: 'text-emerald-400',
    accent: 'from-emerald-400 to-emerald-600',
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);

  return (
    <section className="py-32 px-4 bg-slate-950 relative overflow-hidden" ref={ref}>
      {/* Animated gradient mesh background */}
      <GradientMesh intensity="subtle" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-sky-500/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">

        {/* Section label + title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block text-amber-400 text-xs font-bold tracking-[0.3em] uppercase mb-5">
            Pourquoi nous choisir
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <SplitText text="L'excellence" by="char" stagger={0.04} duration={0.7} />
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
              <SplitText text="à chaque étape" by="char" stagger={0.04} duration={0.7} delay={0.4} />
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            De la sélection des villas à votre retour, nous sommes là pour que votre séjour en Sardaigne soit inoubliable.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-24">
          {stats.map(({ value, suffix, label, icon: Icon }, i) => (
            <motion.div
              key={i}
              className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-amber-400/25 transition-all duration-500 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
            >
              <Icon className="w-5 h-5 text-white/20 mx-auto mb-3 group-hover:text-amber-400 transition-colors duration-300" />
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 tabular-nums">
                <AnimatedCounter to={value} suffix={suffix} />
              </div>
              <div className="text-slate-500 text-xs uppercase tracking-widest mt-1">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(({ Icon, title, desc, color, border, iconBg, iconColor, accent }, i) => (
            <motion.div
              key={i}
              className={`relative p-8 rounded-3xl bg-gradient-to-br ${color} border ${border} group overflow-hidden cursor-pointer`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/[0.02] to-transparent" />

              <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>

              {/* Animated bottom border */}
              <motion.div
                className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r ${accent} rounded-full`}
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
