'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Slide {
  image: string;
  headline: string;
  highlight: string;
  subtitle: string;
}

const SLIDES: Slide[] = [
  {
    image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1600&q=85&auto=format&fit=crop',
    headline: 'Imagine te réveiller',
    highlight: 'ici',
    subtitle: 'Sardaigne · Méditerranée',
  },
  {
    image: 'https://images.unsplash.com/photo-1605538883669-825200433431?w=1600&q=85&auto=format&fit=crop',
    headline: 'Dans ta villa',
    highlight: 'privée',
    subtitle: 'Piscine · Vue mer · dès 98€/nuit',
  },
  {
    image: 'https://images.unsplash.com/photo-1502301197179-65228ab57f78?w=1600&q=85&auto=format&fit=crop',
    headline: 'À 2 heures',
    highlight: 'de chez toi',
    subtitle: 'Vol direct Paris–Cagliari',
  },
];

const SLIDE_DURATION = 2800; // ms per slide

interface Props {
  onComplete: () => void;
}

export default function WelcomeStory({ onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Auto-advance
  useEffect(() => {
    if (isExiting) return;
    const timer = setTimeout(() => {
      if (currentIndex < SLIDES.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        handleComplete();
      }
    }, SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [currentIndex, isExiting]);

  const handleComplete = () => {
    setIsExiting(true);
    setTimeout(onComplete, 600);
  };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => handleComplete();

  const slide = SLIDES[currentIndex];

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          onClick={handleNext}
        >
          {/* Progress bars (Instagram-style) */}
          <div className="absolute top-0 left-0 right-0 z-30 flex gap-1 p-3">
            {SLIDES.map((_, i) => (
              <div
                key={i}
                className="flex-1 h-[3px] bg-white/25 rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: i < currentIndex ? '100%' : '0%' }}
                  animate={{
                    width: i < currentIndex ? '100%' : i === currentIndex ? '100%' : '0%',
                  }}
                  transition={{
                    duration: i === currentIndex ? SLIDE_DURATION / 1000 : 0,
                    ease: 'linear',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Brand label */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 text-amber-300/90 text-[10px] tracking-[0.5em] uppercase font-light pointer-events-none">
            Sky Travel · Sardaigne
          </div>

          {/* Skip button */}
          <button
            onClick={(e) => { e.stopPropagation(); handleSkip(); }}
            className="absolute top-6 right-6 z-30 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Passer l'intro"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Slides */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Background image with subtle Ken Burns */}
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
                initial={{ scale: 1.0 }}
                animate={{ scale: 1.08 }}
                transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
              />

              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />

              {/* Text content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 px-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-2xl"
                >
                  <h2
                    className="text-white text-5xl md:text-7xl font-light leading-[1.05] tracking-tight mb-3"
                    style={{
                      fontFamily: "'Georgia', serif",
                      textShadow: '0 4px 30px rgba(0,0,0,0.6)',
                    }}
                  >
                    {slide.headline}
                    <br />
                    <span className="font-bold text-amber-300 italic">
                      {slide.highlight}
                    </span>
                  </h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="text-white/80 text-sm tracking-[0.3em] uppercase font-light"
                  >
                    {slide.subtitle}
                  </motion.p>
                </motion.div>
              </div>

              {/* Tap hint at bottom */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-widest uppercase font-light pointer-events-none"
              >
                {currentIndex < SLIDES.length - 1 ? 'Tape pour continuer' : 'Découvrir le site →'}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
