import { NextResponse } from 'next/server';

export async function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /*/apartments/
Disallow: /*/packs/
Disallow: /*/admin/

Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`;

  return new NextResponse(body, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
