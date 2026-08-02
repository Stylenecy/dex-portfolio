'use client';

import { useEffect } from 'react';

/**
 * One IntersectionObserver for the whole page.
 *
 * The CSS keeps every `.reveal` element visible until this component adds
 * `anim` to <html>, so the page can never be left blank by a failed bundle or
 * a missing IntersectionObserver. A 2.5s failsafe also forces everything
 * visible in case the observer is installed but never fires.
 */
export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (nodes.length === 0) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') return; // leave them visible

    root.classList.add('anim');

    let fired = false;
    const showAll = () => nodes.forEach((n) => n.classList.add('is-in'));

    const io = new IntersectionObserver(
      (entries) => {
        fired = true;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    nodes.forEach((n) => io.observe(n));
    // If the observer was installed but never delivered a single callback,
    // reveal everything rather than leaving the page half empty.
    const failsafe = window.setTimeout(() => {
      if (!fired) showAll();
    }, 2500);

    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
    };
  }, []);

  return null;
}
