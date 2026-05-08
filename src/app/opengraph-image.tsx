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
          background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 55%, #0e7490 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Cercle décoratif haut droite */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '450px', height: '450px', borderRadius: '50%',
          border: '2px solid rgba(184,134,11,0.3)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '350px', height: '350px', borderRadius: '50%',
          border: '1px solid rgba(184,134,11,0.15)',
          display: 'flex',
        }} />

        {/* Cercle bas gauche */}
        <div style={{
          position: 'absolute', bottom: '-80px', left: '-80px',
          width: '300px', height: '300px', borderRadius: '50%',
          border: '2px solid rgba(184,134,11,0.2)',
          display: 'flex',
        }} />

        {/* Badge */}
        <div style={{
          background: 'rgba(184,134,11,0.2)',
          border: '1px solid rgba(184,134,11,0.5)',
          borderRadius: '50px',
          padding: '8px 24px',
          marginBottom: '32px',
          display: 'flex',
        }}>
          <span style={{ color: '#b8860b', fontSize: '18px', fontWeight: 600, letterSpacing: '3px' }}>
            BASÉ EN FRANCE · SARDAIGNE
          </span>
        </div>

        {/* Nom de la marque */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '24px',
        }}>
          <span style={{
            fontSize: '96px',
            fontWeight: 900,
            color: 'white',
            letterSpacing: '-4px',
            lineHeight: 1,
            display: 'flex',
          }}>
            SKY
          </span>
          <span style={{
            fontSize: '96px',
            fontWeight: 900,
            color: '#b8860b',
            letterSpacing: '-4px',
            lineHeight: 1,
            display: 'flex',
          }}>
            TRAVEL
          </span>
        </div>

        {/* Ligne */}
        <div style={{
          width: '100px', height: '3px',
          background: 'linear-gradient(90deg, transparent, #b8860b, transparent)',
          marginBottom: '24px',
          display: 'flex',
        }} />

        {/* Sous-titre */}
        <div style={{
          fontSize: '28px',
          color: '#bae6fd',
          letterSpacing: '1px',
          display: 'flex',
        }}>
          Séjours & Appartements de Charme
        </div>

        {/* URL bas */}
        <div style={{
          position: 'absolute', bottom: '30px',
          fontSize: '18px', color: 'rgba(186,230,253,0.5)',
          display: 'flex',
        }}>
          skytravel-sardinia.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
