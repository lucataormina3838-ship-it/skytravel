'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTracker from '@/components/PageTracker';
import SmoothScroll from '@/components/ui/SmoothScroll';
import Preloader from '@/components/ui/Preloader';

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.includes('/admin');

  const [showPreloader, setShowPreloader] = useState(true);
  const [hasShownPreloader, setHasShownPreloader] = useState(false);

  useEffect(() => {
    // Only show preloader once per session
    const shown = sessionStorage.getItem('preloader-shown');
    if (shown) {
      setShowPreloader(false);
      setHasShownPreloader(true);
    }
  }, []);

  const handleComplete = () => {
    setShowPreloader(false);
    setHasShownPreloader(true);
    sessionStorage.setItem('preloader-shown', '1');
  };

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <AnimatePresence>
        {showPreloader && <Preloader onComplete={handleComplete} />}
      </AnimatePresence>
      <div className="min-h-screen flex flex-col">
        <PageTracker />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
