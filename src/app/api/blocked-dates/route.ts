import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

// GET — liste les dates bloquées d'un bien
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const item_id = searchParams.get('item_id');
  if (!item_id) return NextResponse.json({ dates: [] });

  const supabase = await createAdminClient();
  const { data } = await supabase
    .from('blocked_dates')
    .select('blocked_date')
    .eq('item_id', item_id)
    .order('blocked_date');

  return NextResponse.json({ dates: (data || []).map(d => d.blocked_date) });
}

// POST — bloque une date ou une plage
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { item_id, item_type = 'apartment', date, start, end } = body;
  if (!item_id) return NextResponse.json({ error: 'Missing item_id' }, { status: 400 });

  const supabase = await createAdminClient();

  if (date) {
    // Bloquer une seule date
    await supabase.from('blocked_dates').upsert({
      item_id, item_type, blocked_date: date,
    }, { onConflict: 'item_id,item_type,blocked_date' });
  } else if (start && end) {
    // Bloquer une plage de dates
    const dates: { item_id: string; item_type: string; blocked_date: string }[] = [];
    const current = new Date(start);
    const last = new Date(end);
    while (current < last) {
      dates.push({
        item_id,
        item_type,
        blocked_date: current.toISOString().split('T')[0],
      });
      current.setDate(current.getDate() + 1);
    }
    if (dates.length > 0) {
      await supabase.from('blocked_dates').upsert(dates, {
        onConflict: 'item_id,item_type,blocked_date',
      });
    }
  }

  return NextResponse.json({ success: true });
}

// DELETE — débloque une date ou toutes les dates
export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { item_id, date, all } = body;
  if (!item_id) return NextResponse.json({ error: 'Missing item_id' }, { status: 400 });

  const supabase = await createAdminClient();

  if (all) {
    // Débloquer toutes les dates du bien
    await supabase.from('blocked_dates').delete().eq('item_id', item_id);
  } else if (date) {
    // Débloquer une seule date
    await supabase.from('blocked_dates').delete()
      .eq('item_id', item_id)
      .eq('blocked_date', date);
  }

  return NextResponse.json({ success: true });
}
