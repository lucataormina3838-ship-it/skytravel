import nodemailer from 'nodemailer';
import { Booking } from './types';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// ─── 1. Devis pro → CLIENT (avec photos) ────────────────────────────────────
export async function sendDevisToClient(
  booking: Booking,
  images: string[] = [],
  locale: string = 'fr'
) {
  const isFr = locale !== 'en';
  const nights = Math.ceil(
    (new Date(booking.end_date).getTime() - new Date(booking.start_date).getTime()) / (1000 * 60 * 60 * 24)
  );
  const pricePerNight = nights > 0 ? Math.round(booking.total_price / nights) : 0;
  const acompte = booking.total_price * 0.3;
  const solde = booking.total_price * 0.7;
  const ref = booking.id.slice(0, 8).toUpperCase();

  const fmt = (n: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);
  const fmtDate = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  const heroImg = images[0] || '';
  const galleryImgs = images.slice(1, 4);

  const subject = isFr
    ? `Sky Travel – Votre devis #${ref} · ${booking.item_title}`
    : `Sky Travel – Your quote #${ref} · ${booking.item_title}`;

  const html = `
<!DOCTYPE html>
<html lang="${isFr ? 'fr' : 'en'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Devis Sky Travel</title>
</head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">

  <div style="max-width:620px;margin:32px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.12);">

    <!-- HEADER -->
    <div style="background:linear-gradient(135deg,#0369a1 0%,#0ea5e9 60%,#38bdf8 100%);padding:36px 32px 28px;text-align:center;position:relative;">
      <div style="font-size:13px;color:rgba(255,255,255,0.7);letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">SKY TRAVEL · SARDAIGNE</div>
      <div style="font-size:32px;font-weight:800;color:white;letter-spacing:-1px;">Votre Devis</div>
      <div style="margin-top:10px;display:inline-block;background:rgba(255,255,255,0.18);border-radius:20px;padding:5px 18px;font-size:13px;color:white;font-weight:600;">Réf. #${ref}</div>
    </div>

    ${heroImg ? `
    <!-- HERO IMAGE -->
    <div style="width:100%;height:260px;overflow:hidden;">
      <img src="${heroImg}" alt="${booking.item_title}" style="width:100%;height:100%;object-fit:cover;display:block;">
    </div>` : ''}

    <!-- PROPERTY NAME -->
    <div style="background:#f8fafc;padding:20px 32px;border-bottom:1px solid #e2e8f0;">
      <div style="font-size:22px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">${booking.item_title}</div>
      <div style="font-size:14px;color:#64748b;margin-top:4px;">📍 Sardaigne, Italie</div>
    </div>

    ${galleryImgs.length > 0 ? `
    <!-- GALLERY -->
    <div style="padding:16px 32px 0;display:flex;gap:8px;">
      ${galleryImgs.map(img => `
      <div style="flex:1;height:90px;border-radius:8px;overflow:hidden;">
        <img src="${img}" alt="" style="width:100%;height:100%;object-fit:cover;display:block;">
      </div>`).join('')}
    </div>` : ''}

    <div style="padding:28px 32px;">

      <!-- GREETING -->
      <p style="font-size:17px;color:#1e293b;margin:0 0 8px;">Bonjour <strong>${booking.customer_name}</strong>,</p>
      <p style="font-size:14px;color:#64748b;margin:0 0 24px;line-height:1.6;">Suite à votre demande de réservation, veuillez trouver ci-dessous votre devis personnalisé. Ce devis est <strong>valable 48 heures</strong>.</p>

      <!-- SÉJOUR -->
      <div style="background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;margin-bottom:20px;">
        <div style="background:#0ea5e9;padding:12px 20px;">
          <span style="color:white;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">📅 Détails du séjour</span>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:12px 20px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;">Arrivée</td>
            <td style="padding:12px 20px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-weight:600;font-size:14px;text-align:right;">${fmtDate(booking.start_date)}</td>
          </tr>
          <tr>
            <td style="padding:12px 20px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;">Départ</td>
            <td style="padding:12px 20px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-weight:600;font-size:14px;text-align:right;">${fmtDate(booking.end_date)}</td>
          </tr>
          <tr>
            <td style="padding:12px 20px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;">Durée</td>
            <td style="padding:12px 20px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-weight:600;font-size:14px;text-align:right;">${nights} nuit${nights > 1 ? 's' : ''}</td>
          </tr>
          <tr>
            <td style="padding:12px 20px;color:#64748b;font-size:14px;">Voyageurs</td>
            <td style="padding:12px 20px;color:#0f172a;font-weight:600;font-size:14px;text-align:right;">${booking.guests} personne${booking.guests > 1 ? 's' : ''}</td>
          </tr>
        </table>
      </div>

      <!-- TARIF -->
      <div style="background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;margin-bottom:20px;">
        <div style="background:#0f172a;padding:12px 20px;">
          <span style="color:white;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">💶 Récapitulatif tarifaire</span>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:12px 20px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:14px;">${nights} nuit${nights > 1 ? 's' : ''} × ${pricePerNight} €</td>
            <td style="padding:12px 20px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-weight:600;font-size:14px;text-align:right;">${fmt(booking.total_price)}</td>
          </tr>
          <tr style="background:#eff6ff;">
            <td style="padding:14px 20px;color:#0f172a;font-size:16px;font-weight:700;">Total TTC</td>
            <td style="padding:14px 20px;color:#0ea5e9;font-size:20px;font-weight:800;text-align:right;">${fmt(booking.total_price)}</td>
          </tr>
        </table>
      </div>

      <!-- PAIEMENT -->
      <div style="background:#f0fdf4;border-radius:12px;border:1px solid #bbf7d0;overflow:hidden;margin-bottom:24px;">
        <div style="background:#059669;padding:12px 20px;">
          <span style="color:white;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">🏦 Paiement par virement bancaire</span>
        </div>
        <div style="padding:20px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <div style="color:#0f172a;font-size:16px;font-weight:700;">Montant total à régler</div>
            <div style="color:#059669;font-size:24px;font-weight:800;">${fmt(booking.total_price)}</div>
          </div>
          <div style="background:white;border:1px solid #d1fae5;border-radius:8px;padding:14px 16px;">
            <div style="color:#065f46;font-size:13px;line-height:1.7;">
              📩 <strong>Notre RIB vous sera transmis par email séparé.</strong><br>
              Merci d'effectuer le virement dès réception pour confirmer votre réservation.<br>
              <span style="color:#6b7280;">Référence à indiquer : <strong>#${booking.id.slice(0, 8).toUpperCase()}</strong></span>
            </div>
          </div>
        </div>
      </div>

      <!-- VALIDITÉ -->
      <div style="background:#fffbeb;border:1px solid #fcd34d;border-radius:10px;padding:14px 20px;margin-bottom:24px;display:flex;align-items:center;gap:10px;">
        <span style="font-size:20px;">⏳</span>
        <div>
          <div style="color:#92400e;font-weight:700;font-size:14px;">Devis valable 48 heures</div>
          <div style="color:#b45309;font-size:13px;margin-top:2px;">Pour confirmer, répondez simplement à cet email ou contactez-nous.</div>
        </div>
      </div>

      <!-- CTA -->
      <div style="text-align:center;margin-bottom:8px;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/api/confirm-booking?id=${booking.id}"
           style="display:inline-block;background:linear-gradient(135deg,#059669,#10b981);color:white;text-decoration:none;padding:14px 36px;border-radius:50px;font-size:16px;font-weight:700;letter-spacing:-0.3px;">
          ✅ Confirmer ma réservation
        </a>
      </div>
      <p style="text-align:center;color:#94a3b8;font-size:12px;margin-top:8px;">En cliquant, vous confirmez votre réservation et notre équipe vous enverra le RIB.</p>

    </div>

    <!-- FOOTER -->
    <div style="background:#0f172a;padding:24px 32px;text-align:center;">
      <div style="color:white;font-size:16px;font-weight:700;margin-bottom:4px;">Sky Travel · Francophones en Sardaigne</div>
      <div style="color:#94a3b8;font-size:13px;margin-bottom:12px;">Spécialiste séjours en Sardaigne pour francophones</div>
      <div style="display:flex;justify-content:center;gap:20px;flex-wrap:wrap;">
        <a href="mailto:skytravel.sardegna@gmail.com" style="color:#38bdf8;font-size:13px;text-decoration:none;">📧 skytravel.sardegna@gmail.com</a>
        <a href="tel:+33770018291" style="color:#38bdf8;font-size:13px;text-decoration:none;">📞 +33 7 70 01 82 91</a>
      </div>
      <div style="margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);color:#475569;font-size:11px;">
        Cet email est un devis officiel Sky Travel · Réf. #${ref}
      </div>
    </div>

  </div>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"Sky Travel" <${process.env.GMAIL_USER}>`,
      to: booking.customer_email,
      replyTo: process.env.GMAIL_USER,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Devis email error:', error);
    return { success: false, error };
  }
}

// Alias pour rétrocompatibilité
export const sendBookingConfirmation = sendDevisToClient;

// ─── 2. Email notification → ADMIN ──────────────────────────────────────────
export async function sendAdminNotification(booking: Booking) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER;
  const nights = Math.ceil(
    (new Date(booking.end_date).getTime() - new Date(booking.start_date).getTime()) / (1000 * 60 * 60 * 24)
  );
  const fmt = (n: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);
  const fmtDate = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8">
<style>
  body{font-family:'Segoe UI',Arial,sans-serif;background:#f1f5f9;margin:0;padding:0}
  .c{max-width:650px;margin:30px auto;background:white;border-radius:14px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10)}
  .h{background:linear-gradient(135deg,#1e293b,#0f172a);padding:30px;text-align:center}
  .h h1{color:#38bdf8;margin:0;font-size:22px}
  .h p{color:#94a3b8;margin:6px 0 0;font-size:13px}
  .alert{background:#fef9c3;border-left:5px solid #eab308;padding:16px 24px;font-size:15px;color:#713f12;font-weight:600}
  .s{padding:24px 30px}
  .s h2{font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin:0 0 12px}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .f{background:#f8fafc;border-radius:8px;padding:12px 16px}
  .f .l{font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#94a3b8;margin-bottom:4px}
  .f .v{font-size:15px;font-weight:600;color:#1e293b}
  .f.hi .v{color:#0ea5e9;font-size:18px}
  .div{height:1px;background:#e2e8f0;margin:0 30px}
  .foot{background:#f8fafc;padding:18px 30px;text-align:center;border-top:1px solid #e2e8f0}
  .foot p{color:#94a3b8;font-size:12px;margin:2px 0}
</style>
</head>
<body>
  <div class="c">
    <div class="h">
      <h1>🛫 Nouvelle réservation</h1>
      <p>Réf. #${booking.id.slice(0, 8).toUpperCase()} · Devis envoyé automatiquement au client</p>
    </div>
    <div class="alert">🔔 Devis envoyé à ${booking.customer_email} — attendez sa confirmation</div>
    <div class="s">
      <h2>👤 Client</h2>
      <div class="grid">
        <div class="f"><div class="l">Nom</div><div class="v">${booking.customer_name}</div></div>
        <div class="f"><div class="l">Email</div><div class="v">${booking.customer_email}</div></div>
        <div class="f"><div class="l">Téléphone</div><div class="v">${booking.customer_phone}</div></div>
        <div class="f"><div class="l">Voyageurs</div><div class="v">${booking.guests} personne(s)</div></div>
      </div>
      ${booking.message ? `<div class="f" style="margin-top:10px"><div class="l">Message</div><div class="v" style="font-weight:400;color:#475569">${booking.message}</div></div>` : ''}
    </div>
    <div class="div"></div>
    <div class="s">
      <h2>🏠 Séjour</h2>
      <div class="grid">
        <div class="f"><div class="l">Bien</div><div class="v">${booking.item_title}</div></div>
        <div class="f"><div class="l">Type</div><div class="v">${booking.booking_type === 'apartment' ? 'Appartement' : 'Pack'}</div></div>
        <div class="f"><div class="l">Arrivée</div><div class="v">${fmtDate(booking.start_date)}</div></div>
        <div class="f"><div class="l">Départ</div><div class="v">${fmtDate(booking.end_date)}</div></div>
        <div class="f"><div class="l">Durée</div><div class="v">${nights} nuit(s)</div></div>
        <div class="f hi"><div class="l">Total</div><div class="v">${fmt(booking.total_price)}</div></div>
      </div>
    </div>
    <div class="div"></div>
    <div class="s">
      <h2>💳 Paiement attendu</h2>
      <div class="grid">
        <div class="f"><div class="l">Acompte 30%</div><div class="v" style="color:#059669">${fmt(booking.total_price * 0.3)}</div></div>
        <div class="f"><div class="l">Solde 70%</div><div class="v">${fmt(booking.total_price * 0.7)}</div></div>
      </div>
    </div>
    <div class="foot">
      <p>Sky Travel · Back-office</p>
      <p>Reçu le ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
    </div>
  </div>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"Sky Travel" <${process.env.GMAIL_USER}>`,
      to: adminEmail,
      replyTo: booking.customer_email,
      subject: `🛫 Réservation – ${booking.item_title} | ${booking.customer_name} | ${fmt(booking.total_price)}`,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Admin email error:', error);
    return { success: false, error };
  }
}
