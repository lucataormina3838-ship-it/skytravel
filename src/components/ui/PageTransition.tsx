'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<'idle' | 'leaving' | 'entering'>('idle');
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== currentPath) {
      setTransitionStage('leaving');
      const t1 = setTimeout(() => {
        setDisplayChildren(children);
        setCurrentPath(pathname);
        setTransitionStage('entering');
      }, 500);
      const t2 = setTimeout(() => setTransitionStage('idle'), 1100);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    } else {
      setDisplayChildren(children);
    }
  }, [pathname, children, currentPath]);

  return (
    <>
      {/* Curtain overlay */}
      <AnimatePresence>
        {transitionStage !== 'idle' && (
          <>
            <motion.div
              key="top"
              className="fixed top-0 left-0 right-0 bg-[#070b13] z-[9999] pointer-events-none"
              initial={{ height: transitionStage === 'leaving' ? '0%' : '50%' }}
              animate={{ height: transitionStage === 'leaving' ? '50%' : '0%' }}
              exit={{ height: '0%' }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
              key="bot"
              className="fixed bottom-0 left-0 right-0 bg-[#070b13] z-[9999] pointer-events-none"
              initial={{ height: transitionStage === 'leaving' ? '0%' : '50%' }}
              animate={{ height: transitionStage === 'leaving' ? '50%' : '0%' }}
              exit={{ height: '0%' }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            />
            {transitionStage === 'leaving' && (
              <motion.div
                key="logo"
                className="fixed inset-0 flex items-center justify-center z-[10000] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="text-amber-300 text-xs tracking-[0.5em] uppercase font-light">
                  Sky Travel
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      {/* Page content */}
      <motion.div
        animate={{ opacity: transitionStage === 'leaving' ? 0 : 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {displayChildren}
      </motion.div>
    </>
  );
}
