'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

const TITLE = 'SARDAIGNE';

export default function Preloader({ onComplete }: PreloaderProps) {
  const [stage, setStage] = useState<'enter' | 'hold' | 'split'>('enter');

  useEffect(() => {
    const t1 = setTimeout(() => setStage('hold'), 1100);   // text done revealing
    const t2 = setTimeout(() => setStage('split'), 2200);  // curtain split
    const t3 = setTimeout(() => onComplete?.(), 3300);     // hide
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] pointer-events-none">

        {/* Top curtain */}
        <motion.div
          className="absolute top-0 left-0 right-0 bg-[#070b13] origin-top"
          initial={{ height: '50vh' }}
          animate={{ height: stage === 'split' ? '0vh' : '50vh' }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Bottom curtain */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-[#070b13] origin-bottom"
          initial={{ height: '50vh' }}
          animate={{ height: stage === 'split' ? '0vh' : '50vh' }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Center content */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          animate={{ opacity: stage === 'split' ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        >

          {/* Brand label */}
          <motion.div
            className="text-amber-300/80 text-[10px] tracking-[0.5em] uppercase font-light mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Sky Travel · Présente
          </motion.div>

          {/* Big title — letter by letter clip reveal */}
          <div className="flex items-baseline overflow-hidden">
            {TITLE.split('').map((letter, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <motion.span
                  className="inline-block text-white text-6xl md:text-9xl font-light tracking-[0.05em]"
                  style={{ fontFamily: "'Georgia', serif" }}
                  initial={{ y: '110%' }}
                  animate={{ y: stage === 'split' ? '-110%' : '0%' }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.05 + 0.3,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  {letter}
                </motion.span>
              </span>
            ))}
          </div>

          {/* Subtitle line + dot + line */}
          <motion.div
            className="flex items-center gap-4 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.div
              className="h-px bg-amber-400/70"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <motion.div
              className="h-px bg-amber-400/70"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.div
            className="text-white/50 text-xs tracking-[0.3em] uppercase mt-5 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            L&apos;île des Méditerranéens
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
