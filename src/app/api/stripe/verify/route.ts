import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createAdminClient } from '@/lib/supabase/server';
import { sendBookingConfirmation, sendAdminNotification } from '@/lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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
    const { session_id } = await req.json();
    if (!session_id) return NextResponse.json({ error: 'session_id manquant' }, { status: 400 });

    // Récupérer la session Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Paiement non complété' }, { status: 400 });
    }

    const supabase = await createAdminClient();

    // Vérifier que cette session n'a pas déjà été traitée
    const { data: existingBooking } = await supabase
      .from('bookings')
      .select('id')
      .eq('stripe_session_id', session_id)
      .single();

    if (existingBooking) {
      return NextResponse.json({ success: true, already_processed: true });
    }

    const meta = session.metadata!;
    const dates = getDatesInRange(meta.start_date, meta.end_date);

    // Créer la réservation
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        booking_type: meta.booking_type,
        item_id: meta.item_id,
        item_title: meta.item_title,
        start_date: meta.start_date,
        end_date: meta.end_date,
        guests: Number(meta.guests),
        customer_name: meta.customer_name,
        customer_email: meta.customer_email,
        customer_phone: meta.customer_phone,
        message: meta.message || null,
        total_price: Number(meta.total_price),
        status: 'confirmed', // Payé = confirmé directement
        stripe_session_id: session_id,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Bloquer les dates
    const blockedRows = dates.map(date => ({
      item_id: meta.item_id,
      item_type: meta.booking_type,
      blocked_date: date,
    }));
    await supabase.from('blocked_dates').insert(blockedRows);

    // Envoyer les emails
    await Promise.all([
      sendBookingConfirmation(booking, meta.locale || 'fr'),
      sendAdminNotification(booking),
    ]);

    return NextResponse.json({ success: true, booking });
  } catch (err) {
    console.error('Verify error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
