/**
 * MOTION PREFERENCE — the OS setting by default, with an explicit override.
 *
 * Why: Dex's own Windows has "Animation effects" off, so every browser on his
 * machine reports prefers-reduced-motion. Honouring that blindly made an
 * earlier version of this site look dead on his laptop (BAD-03). The default
 * stays correct for everyone else; the Motion button lets anyone opt in.
 *
 * The pre-paint script in app/layout.tsx reads the same keys — change both
 * together or the page and the script will disagree.
 */
export const MOTION_KEY = 'dex-motion';
export const INTRO_KEY = 'dex-intro-seen';

export type MotionChoice = 'on' | 'off' | 'system';

export function readChoice(): MotionChoice {
  try {
    const v = localStorage.getItem(MOTION_KEY);
    if (v === 'on' || v === 'off') return v;
  } catch {
    /* storage blocked — the system setting applies */
  }
  return 'system';
}

export function writeChoice(v: MotionChoice) {
  try {
    if (v === 'system') localStorage.removeItem(MOTION_KEY);
    else localStorage.setItem(MOTION_KEY, v);
  } catch {
    /* nothing to do */
  }
}

/** The single question every animated piece asks. */
export function motionAllowed(): boolean {
  const attr = document.documentElement.getAttribute('data-motion');
  if (attr === 'on') return true;
  if (attr === 'off') return false;
  const choice = readChoice();
  if (choice === 'on') return true;
  if (choice === 'off') return false;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Flip the preference and apply it immediately. */
export function setMotion(on: boolean) {
  writeChoice(on ? 'on' : 'off');
  const root = document.documentElement;
  root.setAttribute('data-motion', on ? 'on' : 'off');
  root.removeAttribute('data-motion-hint');
  // Reveals and counters decide at mount; a reload is the honest way to re-decide.
  window.location.reload();
}
