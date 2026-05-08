import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Sky Travel – Séjours en Sardaigne';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 60%, #0e7490 100%)',
          position: 'relative',
          fontFamily: 'serif',
        }}
      >
        {/* Cercles décoratifs */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(14, 116, 144, 0.15)', display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'rgba(14, 116, 144, 0.1)', display: 'flex',
        }} />

        {/* Logo */}
        <img
          src="https://skytravel-sardinia.vercel.app/logo.png"
          width={220}
          height={120}
          style={{ objectFit: 'contain', marginBottom: '32px' }}
        />

        {/* Titre */}
        <div style={{
          fontSize: '52px', fontWeight: 'bold', color: 'white',
          letterSpacing: '-1px', marginBottom: '16px', textAlign: 'center',
          display: 'flex',
        }}>
          Séjours en Sardaigne
        </div>

        {/* Sous-titre */}
        <div style={{
          fontSize: '26px', color: '#bae6fd',
          textAlign: 'center', maxWidth: '700px',
          lineHeight: '1.4', display: 'flex',
        }}>
          Appartements & Packs Découverte — Basé en France
        </div>

        {/* Ligne décorative */}
        <div style={{
          width: '80px', height: '3px',
          background: '#b8860b', marginTop: '28px',
          borderRadius: '2px', display: 'flex',
        }} />

        {/* URL */}
        <div style={{
          position: 'absolute', bottom: '28px',
          fontSize: '18px', color: 'rgba(186, 230, 253, 0.7)',
          display: 'flex',
        }}>
          skytravel-sardinia.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
