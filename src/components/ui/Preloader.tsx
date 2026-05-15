'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [stage, setStage] = useState<'sky' | 'dive' | 'sea' | 'reveal'>('sky');

  useEffect(() => {
    // Stage 1: Sky view (Sardaigne from far above) — 0 to 1.4s
    const t1 = setTimeout(() => setStage('dive'),   1400);   // start diving
    const t2 = setTimeout(() => setStage('sea'),    3000);   // arrived at sea
    const t3 = setTimeout(() => setStage('reveal'), 3800);   // curtain split
    const t4 = setTimeout(() => onComplete?.(),     4800);   // remove
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  // Image scale animation — from far above (0.4) → diving (1.5) → close to sea (4)
  const imageScale =
    stage === 'sky' ? 0.45 :
    stage === 'dive' ? 1.6 :
    4.5;

  const imageY =
    stage === 'sky' ? '-15%' :
    stage === 'dive' ? '5%' :
    '20%';

  return (
    <div className="fixed inset-0 z-[99999] overflow-hidden bg-[#0a1828] pointer-events-none">

      {/* Sky gradient — top atmosphere */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#0a1828] via-[#1a3550] to-[#2563a3]"
        animate={{ opacity: stage === 'reveal' ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Stars (sky stage only) */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: stage === 'sky' ? 1 : 0 }}
        transition={{ duration: 1.2 }}
      >
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 60}%`,
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              opacity: 0.3 + (i % 5) * 0.1,
              animationDelay: `${(i % 10) * 0.2}s`,
              animationDuration: `${2 + (i % 4)}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Sardinia aerial image — zooms in dramatically */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: imageScale,
          y: imageY,
        }}
        transition={{
          duration: stage === 'sky' ? 1.4 : stage === 'dive' ? 1.6 : 0.8,
          ease: stage === 'dive' ? [0.7, 0, 0.3, 1] : [0.4, 0, 0.2, 1],
        }}
      >
        <div className="relative w-[800px] h-[800px] max-w-[80vw] max-h-[80vh]">
          <img
            src="https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=1600&q=85"
            alt="Sardaigne vue aérienne"
            className="w-full h-full object-cover rounded-full shadow-[0_0_120px_rgba(64,150,220,0.4)]"
            style={{
              filter: stage === 'sky'
                ? 'saturate(1.3) brightness(0.85) contrast(1.05)'
                : 'saturate(1.5) brightness(1.05) contrast(1.08)',
              transition: 'filter 1.6s ease-out',
            }}
          />

          {/* Atmosphere ring around globe */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: '0 0 80px 20px rgba(80,180,255,0.25), inset 0 0 80px rgba(0,0,0,0.3)',
            }}
            animate={{ opacity: stage === 'sky' ? 1 : stage === 'dive' ? 0.5 : 0 }}
            transition={{ duration: 1.2 }}
          />
        </div>
      </motion.div>

      {/* Sea overlay when arrived */}
      <motion.div
        className="absolute inset-0 bg-[#0c5577]"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === 'sea' ? 0.4 : 0 }}
        transition={{ duration: 0.6 }}
      />

      {/* Text overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        animate={{ opacity: stage === 'reveal' ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Brand label */}
        <motion.div
          className="text-amber-300/90 text-[10px] tracking-[0.5em] uppercase font-light absolute top-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Sky Travel
        </motion.div>

        {/* Big SARDAIGNE — appears when diving */}
        <motion.div
          className="absolute bottom-32"
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{
            opacity: stage === 'dive' || stage === 'sea' ? 1 : 0,
            y: stage === 'dive' || stage === 'sea' ? 0 : 30,
            filter: stage === 'dive' || stage === 'sea' ? 'blur(0px)' : 'blur(10px)',
          }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="text-white text-5xl md:text-8xl font-light tracking-[0.05em] text-center"
            style={{ fontFamily: "'Georgia', serif", textShadow: '0 4px 30px rgba(0,0,0,0.6)' }}
          >
            Sardaigne
          </h1>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-10 bg-amber-400/60" />
            <div className="w-1 h-1 rounded-full bg-amber-400" />
            <div className="h-px w-10 bg-amber-400/60" />
          </div>
          <p className="text-white/60 text-xs tracking-[0.4em] uppercase mt-3 text-center font-light">
            Méditerranée
          </p>
        </motion.div>
      </motion.div>

      {/* Curtain split reveal */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-[#0a1828] z-10"
        initial={{ height: '0vh' }}
        animate={{ height: stage === 'reveal' ? '0vh' : '0vh' }}
      />
      <motion.div
        className="absolute top-0 left-0 right-0 bg-[#070b13]"
        initial={{ height: '0vh' }}
        animate={{ height: stage === 'reveal' ? '50vh' : '0vh' }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: 'top' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-[#070b13]"
        initial={{ height: '0vh' }}
        animate={{ height: stage === 'reveal' ? '50vh' : '0vh' }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: 'bottom' }}
      />

      {/* Final fade */}
      <motion.div
        className="absolute inset-0 bg-[#070b13]"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === 'reveal' ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />
    </div>
  );
}
