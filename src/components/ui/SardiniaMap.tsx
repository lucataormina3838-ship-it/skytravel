'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Location {
  id: string;
  name: string;
  /** SVG coordinates (within 400x600 viewBox) */
  x: number;
  y: number;
  description?: string;
}

const LOCATIONS: Location[] = [
  { id: 'stintino',   name: 'La Pelosa',       x: 80,  y: 80,  description: 'Plage cristalline' },
  { id: 'alghero',    name: 'Alghero',         x: 60,  y: 200, description: 'Ville catalane' },
  { id: 'orosei',     name: 'Cala Mariolu',    x: 320, y: 330, description: 'Top 3 mondial' },
  { id: 'baunei',     name: 'Cala Goloritzé',  x: 330, y: 380, description: 'Site UNESCO' },
  { id: 'villasimius', name: 'Villasimius',    x: 240, y: 530, description: 'Parc marin' },
];

export default function SardiniaMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <svg viewBox="0 0 400 600" className="w-full h-auto">

        {/* Sardinia simplified outline */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          d="M 130 50
             Q 80 60, 70 110
             Q 50 160, 60 220
             Q 50 280, 70 340
             Q 100 400, 130 460
             Q 180 520, 240 550
             Q 290 555, 310 510
             Q 340 450, 350 380
             Q 360 310, 340 240
             Q 320 170, 290 110
             Q 250 60, 200 50
             Q 165 45, 130 50 Z"
          fill="rgba(251, 191, 36, 0.05)"
          stroke="rgba(251, 191, 36, 0.6)"
          strokeWidth="1.5"
        />

        {/* Inner glow */}
        <motion.path
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1.5 }}
          d="M 130 50 Q 80 60, 70 110 Q 50 160, 60 220 Q 50 280, 70 340 Q 100 400, 130 460 Q 180 520, 240 550 Q 290 555, 310 510 Q 340 450, 350 380 Q 360 310, 340 240 Q 320 170, 290 110 Q 250 60, 200 50 Q 165 45, 130 50 Z"
          fill="url(#mapGlow)"
        />

        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(251,191,36,0.3)" />
            <stop offset="100%" stopColor="rgba(251,191,36,0)" />
          </radialGradient>
        </defs>

        {/* Location pins */}
        {LOCATIONS.map((loc, i) => (
          <g
            key={loc.id}
            onMouseEnter={() => setHovered(loc.id)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Pulse ring */}
            <motion.circle
              cx={loc.x}
              cy={loc.y}
              r="6"
              fill="rgba(251,191,36,0.3)"
              animate={{ r: [6, 16], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
            {/* Main dot */}
            <motion.circle
              cx={loc.x}
              cy={loc.y}
              r="5"
              fill="#fbbf24"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 2 + i * 0.15, type: 'spring' }}
            />
            {/* Label */}
            <motion.g
              animate={{ opacity: hovered === loc.id ? 1 : 0.7 }}
            >
              <rect
                x={loc.x + 12}
                y={loc.y - 14}
                width={loc.name.length * 7 + 16}
                height="22"
                rx="4"
                fill="rgba(2,6,23,0.85)"
                stroke="rgba(251,191,36,0.3)"
              />
              <text
                x={loc.x + 20}
                y={loc.y + 1}
                fill="white"
                fontSize="11"
                fontFamily="system-ui, sans-serif"
                fontWeight="600"
              >
                {loc.name}
              </text>
            </motion.g>
          </g>
        ))}
      </svg>

      {/* Tooltip details on hover */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur border border-amber-400/30 rounded-xl px-5 py-3 text-center"
        >
          <div className="text-amber-400 font-bold text-sm">
            {LOCATIONS.find(l => l.id === hovered)?.name}
          </div>
          <div className="text-slate-400 text-xs mt-0.5">
            {LOCATIONS.find(l => l.id === hovered)?.description}
          </div>
        </motion.div>
      )}
    </div>
  );
}
