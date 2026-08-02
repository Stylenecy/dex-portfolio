import { ImageResponse } from 'next/og';

export const alt = 'Dex Bennett — builds software people actually use';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/* No external font fetch on purpose: the card renders from system fonts so the
   build never depends on a third-party request. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0b0d',
          padding: '72px',
          color: '#f4f6f8',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 24, color: '#8b94a2', letterSpacing: 4 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: '#6ee7a8' }} />
          YOGYAKARTA · INFORMATION SYSTEMS
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>
            DEX BENNETT
          </div>
          <div style={{ fontSize: 34, color: '#b4bcc8', lineHeight: 1.35, maxWidth: 950 }}>
            Software for the people software usually skips — elderly mentors, church volunteers,
            high-school students.
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 24, color: '#67d3f5', letterSpacing: 2 }}>
          dex-portfolio.vercel.app
        </div>
      </div>
    ),
    size,
  );
}
