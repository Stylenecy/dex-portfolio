'use client';

import { useSyncExternalStore } from 'react';
import { setMotion } from './motionPref';

/* html[data-motion] is written before paint and only changes through a reload,
   so there is nothing to subscribe to. The server snapshot is null, which
   renders the neutral label until hydration fills in the truth. */
const subscribe = () => () => {};
const read = () => document.documentElement.getAttribute('data-motion');

/** Footer switch for animations — overrides the OS setting either way. */
export default function MotionToggle() {
  const state = useSyncExternalStore(subscribe, read, () => null);
  const on = state === 'on';

  return (
    <button
      type="button"
      className="mtoggle"
      aria-pressed={state === null ? undefined : on}
      onClick={() => setMotion(!on)}
    >
      <span className="mtoggle__dot" aria-hidden="true" />
      {state === null ? 'Motion' : on ? 'Motion on' : 'Motion off'}
    </button>
  );
}
