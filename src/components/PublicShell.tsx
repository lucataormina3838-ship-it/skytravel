'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTracker from '@/components/PageTracker';
import SmoothScroll from '@/components/ui/SmoothScroll';
import ScrollProgress from '@/components/ui/ScrollProgress';
import WelcomeStory from '@/components/ui/WelcomeStory';

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.includes('/admin');
  const isHome = pathname === '/' || pathname === '/fr' || pathname === '/en';

  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Show story only on homepage + once per session
    if (!isHome) return;
    const seen = sessionStorage.getItem('welcome-story-v1');
    if (!seen) setShowWelcome(true);
  }, [isHome]);

  const handleComplete = () => {
    setShowWelcome(false);
    sessionStorage.setItem('welcome-story-v1', '1');
  };

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <ScrollProgress />
      {showWelcome && <WelcomeStory onComplete={handleComplete} />}
      <div className="min-h-screen flex flex-col">
        <PageTracker />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
