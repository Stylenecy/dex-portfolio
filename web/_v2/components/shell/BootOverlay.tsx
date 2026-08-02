'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BootOverlay() {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [timestamp, setTimestamp] = useState('');
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimestamp(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  function handleEnter() {
    if (exiting) return;
    setExiting(true);

    const go = () => router.push('/operator-metrics');
    const el = overlayRef.current;

    // BAD-02: one-shot exit uses @keyframes + animationend, not transition.
    if (el) {
      let done = false;
      const fire = () => {
        if (done) return;
        done = true;
        go();
      };
      el.addEventListener(
        'animationend',
        (e) => {
          if (e.animationName === 'lp-exit-sweep') fire();
        },
        { once: true },
      );
      // Fallback in case animationend misfires (animation duration + buffer).
      setTimeout(fire, 950);
    } else {
      setTimeout(go, 600);
    }
  }

  return (
    <div
      id="lp-overlay"
      ref={overlayRef}
      className={exiting ? 'lp-exit' : undefined}
      role="dialog"
      aria-modal="true"
      aria-label="System Initialization Screen"
    >
      <div className="lp-vignette" aria-hidden="true" />
      <div className="lp-boot-bar" aria-hidden="true" />

      <header className="lp-topbar">
        <div className="lp-badge">
          <span className="lp-badge__dot" aria-hidden="true" />
          <span>OPERATOR ONLINE</span>
        </div>
        <div className="lp-topbar__right" aria-hidden="true">
          <span>// SYSTEM BOOT</span>
          <span className="lp-topbar__sep">·</span>
          <span className="lp-timestamp">{timestamp}</span>
        </div>
      </header>

      <main className="lp-hero">
        <div className="lp-name-block">
          <span className="lp-name__tag" aria-hidden="true">// CODENAME</span>
          <div className="lp-name-line">
            <span className="lp-name__word">DEX</span>
          </div>
          <div className="lp-name-line lp-name-line--bennett">
            <span className="lp-name__word">BENNETT</span>
          </div>
        </div>

        <div className="lp-descriptor">
          <span className="lp-descriptor__role">Creative Technologist</span>
          <div className="lp-descriptor__divider" aria-hidden="true" />
          <p className="lp-descriptor__tagline">
            I build systems that<br />
            don&apos;t just function —<br />
            but feel alive.
          </p>
        </div>
      </main>

      <footer className="lp-footer">
        <div className="lp-footer__meta" aria-hidden="true">
          <span>UKDW</span>
          <span>IS · SEM 6</span>
          <span>Yogyakarta</span>
        </div>
        <button
          className="lp-enter-btn"
          type="button"
          aria-label="Initialize and enter the system"
          onClick={handleEnter}
        >
          <span>INITIALIZE SYSTEM</span>
          <svg className="lp-enter-btn__arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </footer>
    </div>
  );
}
