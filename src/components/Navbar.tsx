'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import NextLink from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const otherLocale = locale === 'fr' ? 'en' : 'fr';
  const switchLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/apartments`, label: t('apartments') },
    { href: `/${locale}/packs`, label: t('packs') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/faq`, label: t('faq') },
  ];

  const linkColor = scrolled ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100' : 'text-white/95 hover:text-white hover:bg-white/15';
  const langColor = scrolled ? 'border-slate-300 text-slate-700 hover:border-slate-500' : 'border-white/30 text-white/90 hover:border-white/60';

  return (
    <motion.nav
      className="sticky top-0 w-full z-50 border-b"
      animate={{
        backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(0,0,0,0.12)',
        borderColor: scrolled ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.0)',
        backdropFilter: 'blur(16px)',
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <NextLink href={`/${locale}`} className="flex items-center flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Sky Travel"
              width={160}
              height={60}
              className="block"
              priority
            />
          </NextLink>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <NextLink
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${linkColor}`}
              >
                {link.label}
              </NextLink>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={switchLocalePath}
              className={`text-sm font-medium px-3 py-1.5 rounded-lg border transition-all duration-200 ${langColor}`}
            >
              {t('language')}
            </a>
            <NextLink
              href={`/${locale}/apartments`}
              className="relative overflow-hidden bg-amber-500 hover:bg-amber-400 text-white text-sm font-bold px-5 py-2 rounded-lg transition-colors shadow-md shadow-amber-500/30"
            >
              <motion.span
                className="absolute inset-0 bg-white/30"
                initial={{ x: '-110%', skewX: '-12deg' }}
                whileHover={{ x: '110%' }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
              <span className="relative z-10">{t('book')}</span>
            </NextLink>
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-slate-800' : 'text-white'}`}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-white/10 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-4 py-3 space-y-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NextLink
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-colors"
                  >
                    {link.label}
                  </NextLink>
                </motion.div>
              ))}
              <motion.div
                className="pt-2 flex gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <a
                  href={switchLocalePath}
                  className="flex-1 text-center py-2.5 border border-white/20 rounded-lg text-sm font-medium text-white/80"
                  onClick={() => setIsOpen(false)}
                >
                  {t('language')}
                </a>
                <NextLink
                  href={`/${locale}/apartments`}
                  className="flex-1 text-center bg-amber-400 text-slate-900 py-2.5 rounded-lg text-sm font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  {t('book')}
                </NextLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
