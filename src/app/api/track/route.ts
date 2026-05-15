import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const { page } = await req.json();
    if (page?.includes('/admin')) return NextResponse.json({ ok: true });

    // Valider que page est une vraie URL interne (commence par /)
    if (!page || typeof page !== 'string' || !page.startsWith('/') || page.length > 200) {
      return NextResponse.json({ ok: true }); // Silencieux — ne pas révéler la validation
    }

    const supabase = await createAdminClient();
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';

    // Rate limit : max 60 vues/IP/heure (protège les stats)
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })
      .eq('country', ip) // On réutilise le champ country pour stocker l'IP temporairement
      .gte('created_at', since);
    if ((count || 0) >= 60) return NextResponse.json({ ok: true });

    const country = req.headers.get('x-vercel-ip-country') || null;
    const referrer = req.headers.get('referer') || null;

    await supabase.from('page_views').insert({ page, referrer, country });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = await createAdminClient();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const [{ count: total }, { count: todayCount }, { count: weekCount }, { count: monthCount }, { data: pages }, { data: recent }] = await Promise.all([
      supabase.from('page_views').select('*', { count: 'exact', head: true }),
      supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', today),
      supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', weekAgo),
      supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', monthAgo),
      supabase.from('page_views').select('page').gte('created_at', monthAgo),
      supabase.from('page_views').select('created_at').gte('created_at', weekAgo).order('created_at', { ascending: true }),
    ]);

    // Pages les plus visitées
    const pageCounts: Record<string, number> = {};
    pages?.forEach(v => { pageCounts[v.page] = (pageCounts[v.page] || 0) + 1; });
    const topPages = Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([page, count]) => ({ page, count }));

    // Visites par jour (7 derniers jours)
    const dailyCounts: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const key = d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' });
      dailyCounts[key] = 0;
    }
    recent?.forEach(v => {
      const d = new Date(v.created_at);
      const key = d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' });
      if (dailyCounts[key] !== undefined) dailyCounts[key]++;
    });

    return NextResponse.json({ total, todayCount, weekCount, monthCount, topPages, dailyCounts });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
