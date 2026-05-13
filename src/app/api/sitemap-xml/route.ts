import { NextResponse } from 'next/server';

const BASE = 'https://skytravel-sardinia.vercel.app';

const URLS = [
  { loc: `${BASE}/fr`, priority: '1.0', cf: 'weekly' },
  { loc: `${BASE}/en`, priority: '1.0', cf: 'weekly' },
  { loc: `${BASE}/fr/apartments`, priority: '0.9', cf: 'weekly' },
  { loc: `${BASE}/en/apartments`, priority: '0.9', cf: 'weekly' },
  { loc: `${BASE}/fr/packs`, priority: '0.9', cf: 'weekly' },
  { loc: `${BASE}/en/packs`, priority: '0.9', cf: 'weekly' },
  { loc: `${BASE}/fr/guide/location-vacances-sardaigne`, priority: '0.8', cf: 'monthly' },
  { loc: `${BASE}/en/guide/location-vacances-sardaigne`, priority: '0.8', cf: 'monthly' },
  { loc: `${BASE}/fr/guide/excursion-bateau-cala-luna`, priority: '0.8', cf: 'monthly' },
  { loc: `${BASE}/en/guide/excursion-bateau-cala-luna`, priority: '0.8', cf: 'monthly' },
  { loc: `${BASE}/fr/guide/que-faire-cala-gonone`, priority: '0.7', cf: 'monthly' },
  { loc: `${BASE}/en/guide/que-faire-cala-gonone`, priority: '0.7', cf: 'monthly' },
  { loc: `${BASE}/fr/faq`, priority: '0.7', cf: 'monthly' },
  { loc: `${BASE}/en/faq`, priority: '0.7', cf: 'monthly' },
  { loc: `${BASE}/fr/about`, priority: '0.7', cf: 'monthly' },
  { loc: `${BASE}/en/about`, priority: '0.7', cf: 'monthly' },
  { loc: `${BASE}/fr/contact`, priority: '0.6', cf: 'monthly' },
  { loc: `${BASE}/en/contact`, priority: '0.6', cf: 'monthly' },
  ...['f58a99a6-ed0f-4e41-bf3d-d182a98a276a','233b42ed-59d6-4579-acc8-aa0c01229b2c',
      '5d27803c-93d5-42fd-a444-5520140f1e4e','c0f0c936-a023-45d3-b7f7-a9789a47f298',
      '8223e796-0a9f-4b4d-b5bb-593e0e98c9a6','bb6ac2c7-5bec-48ff-b35e-4dbb5ab4a96b',
      '7c7a4460-ad51-43ee-81d1-36ff19f7e059','6359ca73-81b8-4006-9a02-5593664d0e88',
  ].flatMap(id => [
    { loc: `${BASE}/fr/apartments/${id}`, priority: '0.85', cf: 'weekly' },
    { loc: `${BASE}/en/apartments/${id}`, priority: '0.85', cf: 'weekly' },
  ]),
  ...['ac7d584d-ba98-489e-81d1-c986e4f392f1','1db3f238-6ac7-4465-a843-767cc84c67f2',
      '20683a70-3cd3-440e-ae30-8b03df0acb0a',
  ].flatMap(id => [
    { loc: `${BASE}/fr/packs/${id}`, priority: '0.8', cf: 'weekly' },
    { loc: `${BASE}/en/packs/${id}`, priority: '0.8', cf: 'weekly' },
  ]),
];

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${URLS.map(u => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.cf}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
