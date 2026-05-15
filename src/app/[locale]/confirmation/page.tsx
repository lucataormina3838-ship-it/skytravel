'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ConfirmationContent() {
  const params = useSearchParams();
  const status = params.get('status');
  const ref = params.get('ref');
  const name = params.get('name');

  if (status === 'ok') {
    return (
      <div style={{ minHeight: '100vh', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: "'Segoe UI', Arial, sans-serif" }}>
        <div style={{ maxWidth: '520px', width: '100%', background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', textAlign: 'center' }}>
          <div style={{ background: 'linear-gradient(135deg, #059669, #10b981)', padding: '40px 32px' }}>
            <div style={{ fontSize: '56px', marginBottom: '12px' }}>✅</div>
            <div style={{ color: 'white', fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px' }}>Confirmation envoyée !</div>
            <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginTop: '8px' }}>Merci {name}</div>
          </div>
          <div style={{ padding: '32px' }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
              <div style={{ color: '#065f46', fontSize: '15px', lineHeight: 1.7 }}>
                Votre confirmation a bien été reçue.<br />
                Notre équipe va vous envoyer <strong>le RIB pour le virement</strong> dans les plus brefs délais.<br />
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>Réf. #{ref}</span>
              </div>
            </div>
            <div style={{ color: '#64748b', fontSize: '13px' }}>
              Des questions ? Contactez-nous :<br />
              <a href="mailto:skytravel.sardegna@gmail.com" style={{ color: '#0ea5e9', fontWeight: 600 }}>skytravel.sardegna@gmail.com</a>
              {' · '}
              <a href="tel:+33770018291" style={{ color: '#0ea5e9', fontWeight: 600 }}>+33 7 70 01 82 91</a>
            </div>
          </div>
          <div style={{ background: '#0f172a', padding: '20px', color: '#94a3b8', fontSize: '13px' }}>
            Sky Travel · Séjours en Sardaigne
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <div style={{ maxWidth: '480px', textAlign: 'center', background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>❌</div>
        <div style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Lien invalide</div>
        <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Ce lien est incorrect ou a expiré. Contactez-nous directement.</div>
        <a href="mailto:skytravel.sardegna@gmail.com" style={{ display: 'inline-block', background: '#0ea5e9', color: 'white', padding: '12px 28px', borderRadius: '50px', textDecoration: 'none', fontWeight: 700 }}>
          Nous contacter
        </a>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#f0fdf4' }} />}>
      <ConfirmationContent />
    </Suspense>
  );
}
