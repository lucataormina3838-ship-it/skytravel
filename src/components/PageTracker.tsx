'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname?.includes('/admin')) return;
    // Ne pas comptabiliser les visites de l'admin
    if (sessionStorage.getItem('sky-admin-auth') === 'true') return;
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: pathname }),
    }).catch(() => {});
  }, [pathname]);
  return null;
}
