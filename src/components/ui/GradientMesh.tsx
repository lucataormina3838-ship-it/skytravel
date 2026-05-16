'use client';

import { motion } from 'framer-motion';

interface Props {
  className?: string;
  intensity?: 'subtle' | 'normal' | 'vibrant';
}

export default function GradientMesh({ className = '', intensity = 'subtle' }: Props) {
  const opacities = {
    subtle:  { a: 0.12, b: 0.08, c: 0.06 },
    normal:  { a: 0.20, b: 0.15, c: 0.10 },
    vibrant: { a: 0.35, b: 0.25, c: 0.18 },
  }[intensity];

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Blob 1 — amber */}
      <motion.div
        className="absolute rounded-full blur-[120px]"
        style={{
          width: 600,
          height: 600,
          background: `rgba(251, 191, 36, ${opacities.a})`,
          top: '-10%',
          left: '-10%',
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 80, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Blob 2 — sky */}
      <motion.div
        className="absolute rounded-full blur-[120px]"
        style={{
          width: 700,
          height: 700,
          background: `rgba(56, 189, 248, ${opacities.b})`,
          bottom: '-20%',
          right: '-15%',
        }}
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 60, -50, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />

      {/* Blob 3 — emerald */}
      <motion.div
        className="absolute rounded-full blur-[100px]"
        style={{
          width: 500,
          height: 500,
          background: `rgba(52, 211, 153, ${opacities.c})`,
          top: '40%',
          left: '40%',
        }}
        animate={{
          x: [0, 50, -80, 0],
          y: [0, -70, 40, 0],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
      />
    </div>
  );
}
