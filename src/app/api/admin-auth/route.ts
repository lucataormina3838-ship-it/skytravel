import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  const supabase = await createAdminClient();

  // Bloquer si plus de 5 tentatives en 15 minutes depuis cette IP
  const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from('auth_attempts')
    .select('*', { count: 'exact', head: true })
    .eq('ip', ip)
    .gte('created_at', since);

  if ((count || 0) >= 5) {
    return NextResponse.json({ ok: false, error: 'Trop de tentatives. Réessayez dans 15 minutes.' }, { status: 429 });
  }

  const { password } = await req.json();
  const correct = process.env.ADMIN_PASSWORD || process.env.ADMIN_SECRET;

  if (!correct || password !== correct) {
    // Enregistrer la tentative échouée
    await supabase.from('auth_attempts').insert({ ip });
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
