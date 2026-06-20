'use client';

import { useEffect } from 'react';

/**
 * TiltLayer — one global, event-delegated cursor-tilt engine.
 *
 * Any element marked `data-tilt` rotates toward the pointer in 3D and exposes
 * a moving specular focal point (--tilt-mx/--tilt-my) for a `.tilt-sheen` child.
 * Delegation means server-rendered cards need ZERO client code of their own —
 * they just carry the attribute. Respects reduced-motion + coarse pointers
 * (live listeners, so toggling OS settings updates without reload).
 */
export default function TiltLayer() {
  useEffect(() => {
    const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fineMQ = window.matchMedia('(pointer: fine)');
    let enabled = !reduceMQ.matches && fineMQ.matches;

    const MAX = 9; // degrees — keep in sync with --tilt-max
    let raf = 0;
    let pending: { el: HTMLElement; x: number; y: number } | null = null;
    let current: HTMLElement | null = null;

    const apply = () => {
      raf = 0;
      if (!pending) return;
      const { el, x, y } = pending;
      const r = el.getBoundingClientRect();
      const px = (x - r.left) / r.width - 0.5; // -0.5 .. 0.5
      const py = (y - r.top) / r.height - 0.5;
      el.style.setProperty('--tilt-ry', `${(px * MAX).toFixed(2)}deg`);
      el.style.setProperty('--tilt-rx', `${(-py * MAX).toFixed(2)}deg`);
      el.style.setProperty('--tilt-mx', `${((px + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty('--tilt-my', `${((py + 0.5) * 100).toFixed(1)}%`);
    };

    const reset = (el: HTMLElement) => {
      el.style.transition = ''; // hand back to CSS → slow settle
      el.style.setProperty('--tilt-active', '0');
      el.style.setProperty('--tilt-rx', '0deg');
      el.style.setProperty('--tilt-ry', '0deg');
      el.style.setProperty('--tilt-mx', '50%');
      el.style.setProperty('--tilt-my', '50%');
    };

    const onMove = (e: PointerEvent) => {
      if (!enabled || e.pointerType !== 'mouse') return;
      const el =
        (e.target as Element | null)?.closest<HTMLElement>('[data-tilt]') ?? null;
      if (el !== current) {
        if (current) reset(current);
        current = el;
        if (el) {
          el.style.setProperty('--tilt-active', '1');
          el.style.transition = 'transform 80ms linear'; // snappy follow
        }
      }
      if (!el) return;
      pending = { el, x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onOut = (e: PointerEvent) => {
      // pointer left the window entirely
      if (!e.relatedTarget && current) {
        reset(current);
        current = null;
      }
    };

    const onPref = () => {
      enabled = !reduceMQ.matches && fineMQ.matches;
      if (!enabled && current) {
        reset(current);
        current = null;
      }
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });
    reduceMQ.addEventListener('change', onPref);
    fineMQ.addEventListener('change', onPref);

    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
      reduceMQ.removeEventListener('change', onPref);
      fineMQ.removeEventListener('change', onPref);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
