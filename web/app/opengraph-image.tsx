import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Dex Bennett — creative technologist, Yogyakarta';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/* Rendered at build time from files in the repo: no external font or image
   request. Colours mirror styles/v5/tokens.css (house neutrals + one cyan). */
export default async function OgImage() {
  const photo = await readFile(join(process.cwd(), 'app/og-dex.png'));
  const src = `data:image/png;base64,${photo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: 'linear-gradient(90deg, #0c0d0d 0%, #0c0d0d 48%, #10262e 100%)',
          color: '#e6eaea',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={470} height={612} alt="" style={{ position: 'absolute', right: 70, bottom: 0 }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '64px 72px',
            width: 760,
            height: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, letterSpacing: 4, color: '#64d2ff' }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, background: '#64d2ff' }} />
            (00) OPERATOR PROFILE · YOGYAKARTA
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 132, fontWeight: 800, letterSpacing: -7, lineHeight: 0.9 }}>DEX</div>
            <div style={{ fontSize: 132, fontWeight: 800, letterSpacing: -7, lineHeight: 0.9 }}>BENNETT</div>
            <div style={{ marginTop: 28, fontSize: 30, color: '#b9c1c1', lineHeight: 1.35 }}>
              Designs systems, builds them, and pitches them.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 22, fontSize: 21, color: '#9aa3a3', letterSpacing: 1 }}>
            <span style={{ color: '#64d2ff' }}>Track winner · Mantle</span>
            <span>2nd · BMC #12 Intl</span>
            <span>1st · KSE national</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
