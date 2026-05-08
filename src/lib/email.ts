import nodemailer from 'nodemailer';
import { Booking } from './types';

// ─── Transporter ────────────────────────────────────────────────────────────


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// ─── 1. Email confirmation → CLIENT ─────────────────────────────────────────
export async function sendBookingConfirmation(booking: Booking, locale: string = 'fr') {
  const isFr = locale === 'fr';

  const subject = isFr
    ? `Sky Travel – Demande de réservation #${booking.id.slice(0, 8).toUpperCase()}`
    : `Sky Travel – Booking Request #${booking.id.slice(0, 8).toUpperCase()}`;

  const html = isFr
    ? generateFrenchEmailHtml(booking)
    : generateEnglishEmailHtml(booking);

  try {
    await transporter.sendMail({
      from: `"Sky Travel" <${process.env.GMAIL_USER}>`,
      to: booking.customer_email,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}

function generateFrenchEmailHtml(booking: Booking): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f7f9; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #0ea5e9, #0284c7); padding: 40px 30px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 28px; letter-spacing: -0.5px; }
    .header p { color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px; }
    .body { padding: 36px 30px; }
    .greeting { font-size: 18px; color: #1e293b; margin-bottom: 20px; }
    .card { background: #f8fafc; border-radius: 10px; padding: 24px; margin: 24px 0; border-left: 4px solid #0ea5e9; }
    .card h3 { color: #0ea5e9; margin: 0 0 16px; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
    .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding-bottom: 10px; border-bottom: 1px solid #e2e8f0; }
    .detail-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    .detail-label { color: #64748b; font-size: 14px; }
    .detail-value { color: #1e293b; font-weight: 600; font-size: 14px; }
    .status-badge { display: inline-block; background: #fef3c7; color: #d97706; border-radius: 20px; padding: 4px 14px; font-size: 13px; font-weight: 600; }
    .footer { background: #f8fafc; padding: 24px 30px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer p { color: #64748b; font-size: 13px; margin: 4px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Sky Travel</h1>
      <p>Sardaigne · France</p>
    </div>
    <div class="body">
      <p class="greeting">Bonjour <strong>${booking.customer_name}</strong>,</p>
      <p style="color:#475569">Votre demande de réservation a bien été reçue ! Notre équipe va étudier votre demande et vous enverra un devis personnalisé sous 24h.</p>

      <div class="card">
        <h3>Détails de la réservation</h3>
        <div class="detail-row">
          <span class="detail-label">Référence</span>
          <span class="detail-value">#${booking.id.slice(0, 8).toUpperCase()}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Prestation</span>
          <span class="detail-value">${booking.item_title}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Type</span>
          <span class="detail-value">${booking.booking_type === 'apartment' ? 'Appartement' : 'Pack Découverte'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Arrivée</span>
          <span class="detail-value">${new Date(booking.start_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Départ</span>
          <span class="detail-value">${new Date(booking.end_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Voyageurs</span>
          <span class="detail-value">${booking.guests} personne(s)</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Statut</span>
          <span class="detail-value"><span class="status-badge">Demande reçue</span></span>
        </div>
      </div>

      <div style="background:#f8fafc;border-radius:10px;padding:20px;margin-top:8px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="color:#1e293b;font-size:16px;font-weight:600;">Montant estimé</span>
          <span style="color:#0ea5e9;font-size:22px;font-weight:700;">${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(booking.total_price)}</span>
        </div>
        <p style="color:#94a3b8;font-size:12px;margin:6px 0 0;">Un devis définitif vous sera envoyé sous 24h.</p>
      </div>

      <p style="color:#475569;margin-top:24px;">Notre équipe vous contactera sous 24h avec un devis personnalisé et les modalités de paiement.</p>
      <p style="color:#64748b;font-size:14px;">Des questions ? 📧 skytravel.sardegna@gmail.com</p>
    </div>
    <div class="footer">
      <p><strong>Sky Travel</strong></p>
      <p>France · Séjours en Sardaigne</p>
      <p style="margin-top:12px;font-size:12px;color:#94a3b8;">Cet email a été envoyé automatiquement, merci de ne pas y répondre directement.</p>
    </div>
  </div>
</body>
</html>`;
}

function generateEnglishEmailHtml(booking: Booking): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f7f9; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #0ea5e9, #0284c7); padding: 40px 30px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 28px; }
    .header p { color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px; }
    .body { padding: 36px 30px; }
    .card { background: #f8fafc; border-radius: 10px; padding: 24px; margin: 24px 0; border-left: 4px solid #0ea5e9; }
    .card h3 { color: #0ea5e9; margin: 0 0 16px; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
    .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding-bottom: 10px; border-bottom: 1px solid #e2e8f0; }
    .detail-row:last-child { border-bottom: none; }
    .detail-label { color: #64748b; font-size: 14px; }
    .detail-value { color: #1e293b; font-weight: 600; font-size: 14px; }
    .status-badge { display: inline-block; background: #fef3c7; color: #d97706; border-radius: 20px; padding: 4px 14px; font-size: 13px; font-weight: 600; }
    .footer { background: #f8fafc; padding: 24px 30px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer p { color: #64748b; font-size: 13px; margin: 4px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Sky Travel</h1>
      <p>Sardinia · France</p>
    </div>
    <div class="body">
      <p style="font-size:18px;color:#1e293b;">Hello <strong>${booking.customer_name}</strong>,</p>
      <p style="color:#475569">Your booking request has been received! Our team will review it and send you a personalised quote within 24 hours.</p>

      <div class="card">
        <h3>Booking Details</h3>
        <div class="detail-row">
          <span class="detail-label">Reference</span>
          <span class="detail-value">#${booking.id.slice(0, 8).toUpperCase()}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Accommodation</span>
          <span class="detail-value">${booking.item_title}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Type</span>
          <span class="detail-value">${booking.booking_type === 'apartment' ? 'Apartment' : 'Discovery Pack'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Check-in</span>
          <span class="detail-value">${new Date(booking.start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Check-out</span>
          <span class="detail-value">${new Date(booking.end_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Guests</span>
          <span class="detail-value">${booking.guests} guest(s)</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Status</span>
          <span class="detail-value"><span class="status-badge">Request received</span></span>
        </div>
      </div>

      <div style="background:#f8fafc;border-radius:10px;padding:20px;margin-top:8px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="color:#1e293b;font-size:16px;font-weight:600;">Total amount</span>
          <span style="color:#0ea5e9;font-size:22px;font-weight:700;">${new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' }).format(booking.total_price)}</span>
        </div>
      </div>

      <p style="color:#475569;margin-top:24px;">Our team will contact you within 24 hours with a personalised quote and payment details.</p>
      <p style="color:#64748b;font-size:14px;">Questions? 📧 skytravel.sardegna@gmail.com</p>
    </div>
    <div class="footer">
      <p><strong>Sky Travel</strong> · France · Stays in Sardinia</p>
    </div>
  </div>
</body>
</html>`;
}

// ─── 2. Email notification → ADMIN (toi) ────────────────────────────────────
export async function sendAdminNotification(booking: Booking) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER;
  const nights = Math.ceil(
    (new Date(booking.end_date).getTime() - new Date(booking.start_date).getTime()) / (1000 * 60 * 60 * 24)
  );
  const pricePerNight = nights > 0 ? (booking.total_price / nights).toFixed(0) : '—';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f1f5f9; margin: 0; padding: 0; }
    .container { max-width: 650px; margin: 30px auto; background: white; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.10); }
    .header { background: linear-gradient(135deg, #1e293b, #0f172a); padding: 30px; text-align: center; }
    .header h1 { color: #38bdf8; margin: 0; font-size: 22px; }
    .header p { color: #94a3b8; margin: 6px 0 0; font-size: 13px; }
    .alert { background: #fef9c3; border-left: 5px solid #eab308; padding: 16px 24px; font-size: 15px; color: #713f12; font-weight: 600; }
    .section { padding: 24px 30px; }
    .section h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin: 0 0 14px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .field { background: #f8fafc; border-radius: 8px; padding: 12px 16px; }
    .field .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; margin-bottom: 4px; }
    .field .value { font-size: 15px; font-weight: 600; color: #1e293b; }
    .field.highlight .value { color: #0ea5e9; font-size: 18px; }
    .divider { height: 1px; background: #e2e8f0; margin: 0 30px; }
    .quote-box { margin: 24px 30px 30px; border: 2px dashed #0ea5e9; border-radius: 12px; padding: 24px; }
    .quote-box h2 { color: #0ea5e9; margin: 0 0 16px; font-size: 15px; }
    .quote-box pre { background: #f8fafc; border-radius: 8px; padding: 16px; font-family: inherit; font-size: 13px; line-height: 1.7; color: #334155; white-space: pre-wrap; margin: 0; }
    .footer { background: #f8fafc; padding: 18px 30px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer p { color: #94a3b8; font-size: 12px; margin: 2px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🛫 Sky Travel – Nouvelle réservation</h1>
      <p>Référence : #${booking.id.slice(0, 8).toUpperCase()}</p>
    </div>

    <div class="alert">
      🔔 Nouvelle demande reçue — répondez sous 24h au client
    </div>

    <div class="section">
      <h2>👤 Informations client</h2>
      <div class="grid">
        <div class="field"><div class="label">Nom</div><div class="value">${booking.customer_name}</div></div>
        <div class="field"><div class="label">Email</div><div class="value">${booking.customer_email}</div></div>
        <div class="field"><div class="label">Téléphone</div><div class="value">${booking.customer_phone}</div></div>
        <div class="field"><div class="label">Voyageurs</div><div class="value">${booking.guests} personne(s)</div></div>
      </div>
      ${booking.message ? `<div class="field" style="margin-top:12px"><div class="label">Message</div><div class="value" style="font-weight:400;color:#475569">${booking.message}</div></div>` : ''}
    </div>

    <div class="divider"></div>

    <div class="section">
      <h2>🏠 Détails du séjour</h2>
      <div class="grid">
        <div class="field"><div class="label">Bien</div><div class="value">${booking.item_title}</div></div>
        <div class="field"><div class="label">Type</div><div class="value">${booking.booking_type === 'apartment' ? 'Appartement' : 'Pack Découverte'}</div></div>
        <div class="field"><div class="label">Arrivée</div><div class="value">${new Date(booking.start_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</div></div>
        <div class="field"><div class="label">Départ</div><div class="value">${new Date(booking.end_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</div></div>
        <div class="field"><div class="label">Durée</div><div class="value">${nights} nuit(s)</div></div>
        <div class="field highlight"><div class="label">Montant total</div><div class="value">${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(booking.total_price)}</div></div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="quote-box">
      <h2>📄 Modèle de devis — à copier/envoyer à ${booking.customer_email}</h2>
      <pre>Objet : Sky Travel – Devis pour votre séjour en Sardaigne

Bonjour ${booking.customer_name},

Suite à votre demande (réf. #${booking.id.slice(0, 8).toUpperCase()}),
voici votre devis personnalisé :

🏠 Bien : ${booking.item_title}
📅 Arrivée : ${new Date(booking.start_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
📅 Départ : ${new Date(booking.end_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
👥 Voyageurs : ${booking.guests} personne(s)
🌙 Durée : ${nights} nuit(s) × ${pricePerNight}€ = ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(booking.total_price)}

💳 Modalités de paiement :
  • Acompte 30% à la réservation : ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(booking.total_price * 0.3)}
  • Solde 30 jours avant arrivée : ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(booking.total_price * 0.7)}

Ce devis est valable 48h.
Pour confirmer, répondez simplement à cet email.

À très bientôt en Sardaigne,
Sky Travel
📧 skytravel.sardegna@gmail.com
📞 +33 7 70 01 82 91</pre>
    </div>

    <div class="footer">
      <p>Sky Travel · Back-office admin</p>
      <p>Reçu le ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
    </div>
  </div>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from: `"Sky Travel" <${process.env.GMAIL_USER}>`,
      to: adminEmail,
      subject: `🛫 Nouvelle réservation – ${booking.item_title} | ${booking.customer_name} | ${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(booking.total_price)}`,
      html,
      replyTo: booking.customer_email,
    });
    return { success: true };
  } catch (error) {
    console.error('Admin email error:', error);
    return { success: false, error };
  }
}
