'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Link } from '@/i18n/navigation';

/* ── Cinematic opening overlay ── */
const overlayV = {
  initial: { opacity: 1 },
  animate: { opacity: 0, transition: { duration: 1.2, delay: 0.1, ease: 'easeOut' } },
};

/* ── Title: word-by-word clip reveal ── */
const titleCont = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } },
};
const wordV = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

/* ── Secondary elements ── */
const secondaryCont = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 1.3 } },
};
const fadeBlur = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

interface Stat { value: string; label: string }
interface Props {
  badge: string;
  title: string;
  subtitle: string;
  ctaApartments: string;
  ctaPacks: string;
  stats: Stat[];
}

export default function HeroSection({ badge, title, subtitle, ctaApartments, ctaPacks, stats }: Props) {
  const words = title.split(' ');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">

      {/* Video + Ken Burns slow zoom */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 8, ease: 'easeOut' }}
      >
        <video
          autoPlay muted loop playsInline
          poster="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1920&q=85"
          className="w-full h-full object-cover scale-105"
          style={{ filter: 'brightness(1.05)' }}
        >
          <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/1739011/1739011-hd_1920_1080_24fps.mp4" type="video/mp4" />
        </video>
        {/* Layered gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/10 to-slate-900/65" />
      </motion.div>

      {/* Dissolve overlay */}
      <motion.div
        className="absolute inset-0 bg-slate-950 pointer-events-none z-10"
        variants={overlayV}
        initial="initial"
        animate="animate"
      />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">

        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 text-sm mb-10 text-white/90 tracking-wide uppercase"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <MapPin className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
          {badge}
        </motion.div>

        {/* Title — word-by-word reveal */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-7 leading-[1.05] tracking-tight"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 8px 32px rgba(0,0,0,0.6)' }}
          variants={titleCont}
          initial="hidden"
          animate="show"
        >
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.24em]">
              <motion.span className="inline-block" variants={wordV}>{w}</motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-9"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.2 }}
        >
          <motion.div
            className="h-px bg-gradient-to-r from-transparent to-amber-300/80"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.9, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="relative w-2 h-2 rounded-full bg-amber-300"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 1.4, type: 'spring', stiffness: 400 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-amber-300/50"
              animate={{ scale: [1, 2.8], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 2 }}
            />
          </motion.div>
          <motion.div
            className="h-px bg-gradient-to-l from-transparent to-amber-300/80"
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.9, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        {/* Subtitle + CTAs + scroll indicator */}
        <motion.div variants={secondaryCont} initial="hidden" animate="show">

          <motion.p
            variants={fadeBlur}
            className="text-xl md:text-2xl text-white/72 mb-12 max-w-2xl mx-auto leading-relaxed font-light tracking-wide"
            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.95), 0 4px 16px rgba(0,0,0,0.7)' }}
          >
            {subtitle}
          </motion.p>

          <motion.div variants={fadeBlur} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/apartments"
              className="relative overflow-hidden bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-10 py-4 rounded-xl text-base tracking-wide transition-colors duration-300 shadow-[0_8px_32px_rgba(251,191,36,0.30)]"
            >
              <motion.span
                className="absolute inset-0 bg-white/30"
                initial={{ x: '-110%', skewX: '-15deg' }}
                whileHover={{ x: '110%' }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
              />
              <span className="relative z-10">{ctaApartments}</span>
            </Link>
            <Link
              href="/packs"
              className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 hover:border-white/50 text-white font-semibold px-10 py-4 rounded-xl text-base tracking-wide transition-all duration-300"
            >
              {ctaPacks}
            </Link>
          </motion.div>


        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 bg-black/25 backdrop-blur-md border-t border-white/10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-4xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.0 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-2xl font-bold text-amber-300 tabular-nums">{stat.value}</div>
              <div className="text-[11px] text-white/55 uppercase tracking-widest mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
