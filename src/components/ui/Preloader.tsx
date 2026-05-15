'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Multi-language greetings — Sardaigne / Méditerranée
const words = ['Benvenuto', 'Bienvenue', 'Welcome', 'Bienvenido', 'Hallå', 'Willkommen', 'Sardegna'];

const opacity = {
  initial: { opacity: 0 },
  enter: { opacity: 0.85, transition: { duration: 1, delay: 0.2 } },
};

const slideUp = {
  initial: { top: 0 },
  exit: { top: '-100vh', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 } },
};

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (index === words.length - 1) {
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => onComplete?.(), 1100);
      }, 900);
      return;
    }
    setTimeout(() => setIndex(index + 1), index === 0 ? 900 : 180);
  }, [index, onComplete]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath  = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve = {
    initial: { d: initialPath, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const } },
    exit:    { d: targetPath,  transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const, delay: 0.3 } },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate={isExiting ? 'exit' : 'initial'}
      className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-[#070b13] z-[99999]"
    >
      {dimension.width > 0 && (
        <>
          {/* Brand label top */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-10 left-1/2 -translate-x-1/2 text-amber-300/70 text-[10px] tracking-[0.4em] uppercase font-light"
          >
            Sky Travel · Sardaigne
          </motion.div>

          {/* Animated word */}
          <motion.p
            key={index}
            variants={opacity}
            initial="initial"
            animate="enter"
            className="flex items-center text-white text-5xl md:text-7xl absolute z-10 font-light tracking-tight"
          >
            <span className="block w-2.5 h-2.5 bg-amber-400 rounded-full mr-4 animate-pulse" />
            {words[index]}
          </motion.p>

          {/* Loader bottom */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 2.5, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent origin-left"
          />

          {/* Curved exit mask */}
          <svg className="absolute top-0 left-0 w-full h-[calc(100%+300px)]">
            <motion.path
              variants={curve}
              initial="initial"
              animate={isExiting ? 'exit' : 'initial'}
              fill="#070b13"
            />
          </svg>
        </>
      )}
    </motion.div>
  );
}
