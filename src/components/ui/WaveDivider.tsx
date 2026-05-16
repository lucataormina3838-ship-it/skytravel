'use client';

import { motion } from 'framer-motion';

interface Props {
  /** Color of the top section (where the wave comes from) */
  topColor?: string;
  /** Color of the bottom section (where the wave goes to) */
  bottomColor?: string;
  /** Flip the wave vertically */
  flip?: boolean;
  /** Height of the wave in px */
  height?: number;
}

export default function WaveDivider({
  topColor = '#020617',
  bottomColor = '#080d1a',
  flip = false,
  height = 90,
}: Props) {
  return (
    <div className="relative w-full" style={{ backgroundColor: topColor, height }}>
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ height, transform: flip ? 'scaleY(-1)' : undefined }}
      >
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          d="M0,0 C150,100 350,0 600,40 C850,80 1050,20 1200,60 L1200,120 L0,120 Z"
          fill={bottomColor}
          stroke={bottomColor}
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
