'use client';

import { useCallback, useEffect } from 'react';
import { INTRO_KEY } from '@/components/site/motionPref';

/**
 * LAYER 0 — Dex's "intro kayak film Marvel", without a video file.
 *
 * Seven panels of Dex's real work (his posters and his live products) flip
 * past at ~150 ms each, collapse, the name lands, the curtain lifts. ≈2.3 s.
 *
 * Rules it obeys (docs/PORTFOLIO-V4-SPEC.md §2, DEX-MOTION-LANGUAGE):
 *   · visible only when the pre-paint script set html[data-intro="1"]:
 *     first visit this session, on '/', motion allowed — so no flash for
 *     anyone else, and no intro at all with JS off
 *   · skippable by button, click anywhere, Escape/Enter/Space, wheel or touch
 *   · removes itself on animationend, with a timer as the guaranteed path
 *     (BAD-02: never trust animationend alone)
 *   · the page underneath is already rendered; nothing waits on this
 */

const PANELS = [
  { src: '/images/intro/f1.webp', word: 'DESIGNER' },
  { src: '/images/intro/f2.webp', word: 'BUILDER' },
  { src: '/images/intro/f3.webp', word: 'PRESENTER' },
  { src: '/images/intro/f4.webp', word: 'ORGANISER' },
  { src: '/images/intro/f5.webp', word: 'TEACHER' },
  { src: '/images/intro/f6.webp', word: 'CHAIR' },
  { src: '/images/intro/f7.webp', word: 'STYLENECY' },
];
const STEP_MS = 150;
const TOTAL_MS = 2450;

export default function Intro() {
  const done = useCallback(() => {
    document.documentElement.removeAttribute('data-intro');
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (root.getAttribute('data-intro') !== '1') return;
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* private mode: it may show again next visit, which is harmless */
    }

    const timer = window.setTimeout(done, TOTAL_MS);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') done();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', done, { passive: true, once: true });
    window.addEventListener('touchstart', done, { passive: true, once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', done);
      window.removeEventListener('touchstart', done);
    };
  }, [done]);

  return (
    <div
      className="intro"
      aria-hidden="true"
      onClick={done}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) done();
      }}
    >
      <div className="intro__frame">
        {PANELS.map((p, i) => (
          <div className="intro__panel" key={p.src} style={{ animationDelay: `${i * STEP_MS}ms` }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- tiny pre-sized intro frames */}
            <img src={p.src} alt="" width={400} height={500} decoding="async" loading="lazy" />
          </div>
        ))}
        {PANELS.map((p, i) => (
          <span
            className="intro__word"
            key={p.word}
            style={{ animationDelay: `${i * STEP_MS}ms`, animationDuration: i === PANELS.length - 1 ? '260ms' : `${STEP_MS}ms` }}
          >
            {p.word}
          </span>
        ))}
      </div>
      <p className="intro__name">
        <span>
          Dex Bennett
          <small>Yogyakarta · 2026</small>
        </span>
      </p>
      <button type="button" className="intro__skip" onClick={done} tabIndex={-1}>
        Skip intro
      </button>
    </div>
  );
}
