'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plane, LayoutDashboard, Home, Package, CalendarCheck, LogOut, Menu, X, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'sky-travel-admin-2024';

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem('sky-admin-auth');
    if (auth === 'true') setAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD || password === 'sky-travel-admin-2024') {
      setAuthenticated(true);
      sessionStorage.setItem('sky-admin-auth', 'true');
      setError('');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem('sky-admin-auth');
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-sky-500 rounded-2xl mb-4">
              <Plane className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Sky Travel</h1>
            <p className="text-slate-500 text-sm mt-1">Back-office admin</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1.5 font-medium">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition-colors">
              Se connecter
            </button>
          </form>
          <p className="text-center text-xs text-slate-400 mt-6">Sky Travel Admin · Accès restreint</p>
        </div>
      </div>
    );
  }

  const locale = pathname.split('/')[1];
  const navItems = [
    { href: `/${locale}/admin`, label: 'Tableau de bord', icon: LayoutDashboard },
    { href: `/${locale}/admin/apartments`, label: 'Appartements', icon: Home },
    { href: `/${locale}/admin/packs`, label: 'Packs', icon: Package },
    { href: `/${locale}/admin/bookings`, label: 'Réservations', icon: CalendarCheck },
    { href: `/${locale}/admin/analytics`, label: 'Statistiques', icon: BarChart2 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
          <div className="bg-sky-500 p-1.5 rounded-lg">
            <Plane className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm">Sky Travel</div>
            <div className="text-slate-400 text-xs">Admin</div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-3 py-4 space-y-1">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-sky-500 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm transition-all"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-500 hover:text-slate-700">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-semibold text-slate-700 text-sm">Back-office Sky Travel</h1>
        </header>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
