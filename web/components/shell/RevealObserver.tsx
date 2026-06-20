'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * RevealObserver — drives all scroll-in motion for the hubs.
 *
 * The CSS reveal engine (.reveal → .reveal.active) was dormant: the markup
 * ships elements at opacity:0 and relies on an IntersectionObserver adding
 * `.active`. That observer never existed in the Next migration, so every
 * `.reveal` block was stuck invisible. This restores it AND wires the F3.0
 * signature moments:
 *   - `.quest-stats-v3` → `.is-revealed`  (meters fill left→right)
 *   - awakened row      → `.is-awakened`  (glitch fires ONCE, then settles)
 *
 * Re-scans on every route change because each hub is its own real route.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const SELECTOR = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));

    const fireStatBlock = (scope: ParentNode) => {
      const stats = scope.querySelector('.quest-stats-v3');
      if (stats) stats.classList.add('is-revealed');
      const awakened = scope.querySelector('.stat-row-v3.awakened-mode');
      // let the meters fill first, then detonate the awakening
      if (awakened) window.setTimeout(() => awakened.classList.add('is-awakened'), 760);
    };

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      // No motion: leave content visible as-is (do NOT arm .js-reveal hiding).
      return;
    }

    // Arm the reveal engine: hiding only kicks in now that JS is confirmed
    // alive. Done inside the effect (not SSR) so a hydration failure can never
    // leave content stuck invisible — without this class, content shows.
    document.documentElement.classList.add('js-reveal');

    const io = new IntersectionObserver(
      (entries, obs) => {
        // Cards entering together (a grid scrolling into view) cascade ~55ms
        // apart for a staggered reveal. Elements with an explicit
        // .reveal-delay-* class keep their authored delay.
        const hits = entries.filter((e) => e.isIntersecting);
        hits.forEach((entry, idx) => {
          const el = entry.target as HTMLElement;
          if (!/reveal-delay-/.test(el.className)) {
            el.style.transitionDelay = `${Math.min(idx, 10) * 55}ms`;
          }
          el.classList.add('active');
          if (el.querySelector('.quest-stats-v3')) fireStatBlock(el);
          obs.unobserve(el);
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -6% 0px' }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
