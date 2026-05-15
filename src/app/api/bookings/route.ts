import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { sendDevisToClient, sendAdminNotification } from '@/lib/email';


// ─── Génère toutes les dates entre start et end (exclu) ─────────────────────
function getDatesInRange(start: string, end: string): string[] {
  const dates: string[] = [];
  const current = new Date(start);
  const last = new Date(end);
  while (current < last) {
    dates.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      booking_type,
      item_id,
      item_title,
      start_date,
      end_date,
      guests,
      customer_name,
      customer_email,
      customer_phone,
      message,
      total_price,
      locale = 'fr',
    } = body;

    if (!booking_type || !item_id || !start_date || !end_date || !customer_name || !customer_email || !customer_phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validations de sécurité côté serveur
    if (!['apartment', 'pack'].includes(booking_type)) {
      return NextResponse.json({ error: 'Invalid booking type' }, { status: 400 });
    }
    const priceNum = Number(total_price);
    if (isNaN(priceNum) || priceNum <= 0 || priceNum > 50000) {
      return NextResponse.json({ error: 'Invalid price' }, { status: 400 });
    }
    const guestsNum = Number(guests);
    if (isNaN(guestsNum) || guestsNum < 1 || guestsNum > 20) {
      return NextResponse.json({ error: 'Invalid guests count' }, { status: 400 });
    }
    const start = new Date(start_date);
    const end = new Date(end_date);
    const now = new Date();
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end || start < now) {
      return NextResponse.json({ error: 'Invalid dates' }, { status: 400 });
    }
    const nights = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    if (nights > 90) {
      return NextResponse.json({ error: 'Stay too long' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer_email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const supabase = await createAdminClient();

    // Rate limiting via Supabase — max 3 réservations par email dans les dernières 24h
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('customer_email', customer_email)
      .gte('created_at', since);
    if ((count || 0) >= 3) {
      return NextResponse.json({ error: 'Limite de réservations atteinte. Contactez-nous par email.' }, { status: 429 });
    }

    // 1. Vérifier qu'aucune date n'est déjà bloquée (anti double-réservation)
    const dates = getDatesInRange(start_date, end_date);
    const { data: existing } = await supabase
      .from('blocked_dates')
      .select('blocked_date')
      .eq('item_id', item_id)
      .in('blocked_date', dates);

    if (existing && existing.length > 0) {
      return NextResponse.json({
        error: 'Ces dates ne sont plus disponibles. Veuillez choisir d\'autres dates.',
        conflict: true,
      }, { status: 409 });
    }

    // 2. Créer la réservation
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        booking_type,
        item_id,
        item_title,
        start_date,
        end_date,
        guests: Number(guests),
        customer_name,
        customer_email,
        customer_phone,
        message: message || null,
        total_price: Number(total_price),
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 3. Bloquer immédiatement toutes les dates sur le calendrier
    const blockedRows = dates.map(date => ({
      item_id,
      item_type: booking_type,
      blocked_date: date,
    }));
    await supabase.from('blocked_dates').insert(blockedRows);

    // 4. Récupérer les photos du bien pour le devis
    let itemImages: string[] = [];
    if (booking_type === 'apartment') {
      const { data: apt } = await supabase.from('apartments').select('images').eq('id', item_id).single();
      itemImages = apt?.images?.slice(0, 4) ?? [];
    } else {
      const { data: pack } = await supabase.from('packs').select('images').eq('id', item_id).single();
      itemImages = pack?.images?.slice(0, 4) ?? [];
    }

    // 5. Envoyer les emails
    await Promise.all([
      sendDevisToClient(booking, itemImages, locale),  // → client (devis pro avec photos)
      sendAdminNotification(booking),                   // → skytravel.sardegna@gmail.com
    ]);

    return NextResponse.json({ success: true, booking });
  } catch (err) {
    console.error('Booking error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Protéger l'accès — vérifier le secret admin
  const secret = req.headers.get('x-admin-secret');
  if (secret !== (process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const supabase = await createAdminClient();
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ bookings: data });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const secret = req.headers.get('x-admin-secret');
  if (secret !== (process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { id, status } = await req.json();
    const supabase = await createAdminClient();

    // Récupérer la réservation avant modification
    const { data: booking } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();

    // Mettre à jour le statut
    const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Si annulation → débloquer les dates automatiquement
    if (status === 'cancelled' && booking) {
      const dates = getDatesInRange(booking.start_date, booking.end_date);
      await supabase
        .from('blocked_dates')
        .delete()
        .eq('item_id', booking.item_id)
        .in('blocked_date', dates);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
