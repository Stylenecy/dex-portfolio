'use client';

import { useEffect } from 'react';
import { motionAllowed } from '@/components/site/motionPref';

/**
 * Writes scroll progress through the hero as two CSS variables on the hero:
 *   --p  0 → 1 across the pinned hero (camera head → belly, scan line)
 *   --q  0 → 1 over the last 45% (the gradient eats the figure)
 * Scroll back up and both run backwards — one image, no second asset.
 *
 * Cheap by construction: one passive scroll listener, attached only while the
 * hero is on screen, one rAF per frame at most, and only transform/opacity/
 * mask change in CSS. Motion off → nothing runs; --p stays 0 (still frame).
 */
export default function HeroScan({ targetId }: { targetId: string }) {
  useEffect(() => {
    const hero = document.getElementById(targetId);
    if (!hero || !motionAllowed()) return;

    let raf = 0;
    let attached = false;

    const update = () => {
      raf = 0;
      const rect = hero.getBoundingClientRect();
      // Desktop: the stage is pinned, so the story must finish exactly when
      // the pin releases. Mobile: no pin, so it runs while the hero leaves.
      const pinned = hero.offsetHeight - window.innerHeight;
      const travel = pinned > 200 ? pinned : Math.max(1, hero.offsetHeight);
      const p = Math.min(1, Math.max(0, -rect.top / travel));
      const q = Math.min(1, Math.max(0, (p - 0.55) / 0.45));
      hero.style.setProperty('--p', p.toFixed(4));
      hero.style.setProperty('--q', q.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !attached) {
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        attached = true;
        update();
      } else if (!entry.isIntersecting && attached) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        attached = false;
      }
    });
    io.observe(hero);

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [targetId]);

  return null;
}
