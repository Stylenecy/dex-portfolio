'use client';

import { setMotion, writeChoice } from './motionPref';

/**
 * Shown only when html[data-motion-hint="1"] (set before paint): the device
 * asks for reduced motion and nobody has chosen yet. One tap turns the motion
 * on (and remembers it); "Keep off" records the choice so it never nags again.
 */
export default function MotionHint() {
  return (
    <div className="mhint" role="region" aria-label="Animation setting">
      <span>Animations are off on this device</span>
      <button type="button" onClick={() => setMotion(true)}>Turn on</button>
      <button
        type="button"
        onClick={() => {
          writeChoice('off');
          document.documentElement.removeAttribute('data-motion-hint');
        }}
      >
        Keep off
      </button>
    </div>
  );
}
