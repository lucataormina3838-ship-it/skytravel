import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Plane, Mail, MapPin, Phone } from 'lucide-react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnyLink = Link as any;

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-sky-500 text-white p-1.5 rounded-lg">
                <Plane className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white">Sky Travel</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {t('tagline')} — Costa Smeralda, Alghero, Villasimius et bien plus encore.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>{t('address')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>skytravel.sardegna@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>+33 7 70 01 82 91</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('quick_links')}</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: nav('home') },
                { href: '/apartments', label: nav('apartments') },
                { href: '/packs', label: nav('packs') },
              ].map((link) => (
                <li key={link.href}>
                  <AnyLink
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-sky-400 transition-colors"
                  >
                    {link.label}
                  </AnyLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('contact_us')}</h3>
            <div className="space-y-2 text-sm text-slate-400">
              <p>Lun – Ven : 9h – 19h</p>
              <p>Sam : 10h – 17h</p>
              <p className="mt-4">Réponse sous 24h</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Sky Travel. {t('rights')}.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-slate-500 hover:text-sky-400 transition-colors">{t('privacy')}</a>
            <a href="#" className="text-slate-500 hover:text-sky-400 transition-colors">{t('terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
