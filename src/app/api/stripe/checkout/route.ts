import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createAdminClient } from '@/lib/supabase/server';

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
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
    }

    // Vérifier disponibilité avant de créer la session de paiement
    const supabase = await createAdminClient();
    const dates = getDatesInRange(start_date, end_date);
    const { data: existing } = await supabase
      .from('blocked_dates')
      .select('blocked_date')
      .eq('item_id', item_id)
      .in('blocked_date', dates);

    if (existing && existing.length > 0) {
      return NextResponse.json({ error: 'Ces dates ne sont plus disponibles.', conflict: true }, { status: 409 });
    }

    const nights = dates.length;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skytravel-sardinia.vercel.app';

    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: customer_email,
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: item_title,
              description: `${nights} nuit${nights > 1 ? 's' : ''} · ${new Date(start_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} → ${new Date(end_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} · ${guests} voyageur${guests > 1 ? 's' : ''}`,
              images: [],
            },
            unit_amount: Math.round(total_price * 100), // en centimes
          },
          quantity: 1,
        },
      ],
      metadata: {
        booking_type,
        item_id,
        item_title,
        start_date,
        end_date,
        guests: String(guests),
        customer_name,
        customer_email,
        customer_phone,
        message: message || '',
        total_price: String(total_price),
        locale,
      },
      success_url: `${siteUrl}/${locale}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/${locale}/apartments/${item_id}`,
      locale: locale === 'fr' ? 'fr' : 'en',
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: 'Erreur lors de la création du paiement' }, { status: 500 });
  }
}
