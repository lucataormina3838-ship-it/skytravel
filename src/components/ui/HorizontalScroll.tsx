'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  /** How much wider than viewport (e.g. 3 means content is 3x viewport width) */
  scrollMultiplier?: number;
}

export default function HorizontalScroll({
  children,
  className = '',
  scrollMultiplier = 2.5,
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Translate horizontally based on vertical scroll progress
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${(scrollMultiplier - 1) * 100}%`]
  );

  return (
    <section
      ref={sectionRef}
      className={`relative ${className}`}
      style={{ height: `${scrollMultiplier * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div
          style={{ x }}
          className="flex gap-6 will-change-transform"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
