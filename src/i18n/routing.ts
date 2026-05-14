import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  pathnames: {
    '/': '/',
    '/apartments': '/apartments',
    '/apartments/[id]': '/apartments/[id]',
    '/packs': '/packs',
    '/packs/[id]': '/packs/[id]',
    '/about': '/about',
    '/faq': '/faq',
    '/contact': '/contact',
    '/privacy': '/privacy',
    '/cgv': '/cgv',
    '/mentions-legales': '/mentions-legales',
    '/admin': '/admin',
    '/admin/apartments': '/admin/apartments',
    '/admin/packs': '/admin/packs',
    '/admin/bookings': '/admin/bookings',
    '/admin/analytics': '/admin/analytics',
    '/admin/sources': '/admin/sources',
    '/payment/success': '/payment/success',
  }
});
