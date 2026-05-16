'use client';

import { motion, Variants } from 'framer-motion';

interface Props {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
  by?: 'word' | 'char';
  triggerOnce?: boolean;
}

export default function SplitText({
  text,
  className = '',
  stagger = 0.03,
  delay = 0,
  duration = 0.8,
  by = 'word',
  triggerOnce = true,
}: Props) {
  const units = by === 'word' ? text.split(' ') : text.split('');

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const item: Variants = {
    hidden: { y: '110%' },
    show: {
      y: '0%',
      transition: { duration, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: triggerOnce, margin: '-50px' }}
    >
      {units.map((unit, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: by === 'word' ? '0.25em' : 0 }}
        >
          <motion.span className="inline-block" variants={item}>
            {unit === ' ' ? ' ' : unit}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
