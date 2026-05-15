import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const supabase = await createAdminClient();

  // Récupérer la réservation
  const { data: booking, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !booking) {
    return NextResponse.redirect(
      new URL(`/fr/confirmation?status=error`, req.url)
    );
  }

  const fmt = (n: number) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);
  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  const ref = booking.id.slice(0, 8).toUpperCase();

  // Envoyer email de confirmation à Sky Travel
  try {
    await transporter.sendMail({
      from: `"Sky Travel" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
      replyTo: booking.customer_email,
      subject: `✅ CONFIRMATION – ${booking.item_title} | ${booking.customer_name} | ${fmt(booking.total_price)}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8">
<style>
  body{font-family:'Segoe UI',Arial,sans-serif;background:#f0fdf4;margin:0;padding:0}
  .c{max-width:600px;margin:30px auto;background:white;border-radius:14px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10)}
  .h{background:linear-gradient(135deg,#059669,#10b981);padding:30px;text-align:center}
  .h h1{color:white;margin:0;font-size:24px}
  .h p{color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:14px}
  .s{padding:24px 30px}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .f{background:#f8fafc;border-radius:8px;padding:12px 16px}
  .f .l{font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#94a3b8;margin-bottom:4px}
  .f .v{font-size:15px;font-weight:600;color:#1e293b}
  .f.hi .v{color:#059669;font-size:18px}
  .foot{background:#f8fafc;padding:18px 30px;text-align:center;border-top:1px solid #e2e8f0}
  .foot p{color:#94a3b8;font-size:12px;margin:2px 0}
</style>
</head>
<body>
<div class="c">
  <div class="h">
    <h1>✅ Le client a confirmé sa réservation !</h1>
    <p>Réf. #${ref} · Envoyez maintenant votre RIB</p>
  </div>
  <div class="s">
    <div class="grid">
      <div class="f"><div class="l">Client</div><div class="v">${booking.customer_name}</div></div>
      <div class="f"><div class="l">Email</div><div class="v">${booking.customer_email}</div></div>
      <div class="f"><div class="l">Téléphone</div><div class="v">${booking.customer_phone}</div></div>
      <div class="f"><div class="l">Voyageurs</div><div class="v">${booking.guests} personne(s)</div></div>
      <div class="f"><div class="l">Bien</div><div class="v">${booking.item_title}</div></div>
      <div class="f"><div class="l">Arrivée</div><div class="v">${fmtDate(booking.start_date)}</div></div>
      <div class="f"><div class="l">Départ</div><div class="v">${fmtDate(booking.end_date)}</div></div>
      <div class="f hi"><div class="l">Total</div><div class="v">${fmt(booking.total_price)}</div></div>
    </div>
    <div style="margin-top:16px;background:#fef9c3;border-left:4px solid #eab308;border-radius:8px;padding:14px 18px;">
      <div style="color:#713f12;font-weight:700;font-size:14px;">⚡ Action requise</div>
      <div style="color:#92400e;font-size:13px;margin-top:4px;">Répondez à <strong>${booking.customer_email}</strong> avec votre RIB pour finaliser la réservation.</div>
    </div>
  </div>
  <div class="foot">
    <p>Sky Travel · Confirmation automatique</p>
    <p>Reçu le ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
  </div>
</div>
</body>
</html>`,
    });
  } catch (e) {
    console.error('Confirm email error:', e);
  }

  // Rediriger vers page de succès
  return NextResponse.redirect(
    new URL(`/fr/confirmation?status=ok&ref=${ref}&name=${encodeURIComponent(booking.customer_name)}`, req.url)
  );
}
