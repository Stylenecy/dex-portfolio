'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motionAllowed } from './motionPref';

/**
 * One IntersectionObserver for the whole page. Handles:
 *   .reveal / .lines / .draw / .wipe  → adds .is-in when they enter the view
 *   [data-count="2029"]               → counts up once, 0.9s, ends on the exact value
 *   [data-decode]                     → characters settle left→right, ≤0.8s
 *
 * Inverted on purpose: CSS hides nothing until this adds `anim` to <html>,
 * and it only does that when motion is allowed. A 2.5s failsafe reveals
 * everything if the observer never fires. Animations never change a value —
 * the final text is always the text that was server-rendered.
 */

const SEL = '.reveal, .lines, .draw, .wipe, [data-count], [data-decode]';
const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/#·';

function expoOut(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function runCount(el: HTMLElement) {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target)) return;
  const final = el.textContent ?? '';
  const dur = 900;
  const t0 = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / dur);
    el.textContent = Math.round(target * expoOut(t)).toLocaleString('en-US');
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = final;
  };
  requestAnimationFrame(step);
}

function runDecode(el: HTMLElement) {
  const final = el.textContent ?? '';
  if (!final) return;
  const dur = Math.min(800, 260 + final.length * 22);
  const t0 = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / dur);
    const settled = Math.floor(final.length * t);
    let out = final.slice(0, settled);
    for (let i = settled; i < final.length; i++) {
      const ch = final[i];
      out += ch === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    el.textContent = out;
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = final;
  };
  requestAnimationFrame(step);
}

export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(SEL));
    if (nodes.length === 0) return;
    if (!motionAllowed() || typeof IntersectionObserver === 'undefined') {
      root.classList.remove('anim');
      return; // everything stays in its final, visible state
    }

    root.classList.add('anim');
    let fired = false;

    const enter = (el: HTMLElement) => {
      el.classList.add('is-in');
      if (el.dataset.count !== undefined && !el.dataset.done) {
        el.dataset.done = '1';
        runCount(el);
      }
      if (el.dataset.decode !== undefined && !el.dataset.done) {
        el.dataset.done = '1';
        runDecode(el);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        fired = true;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            enter(entry.target as HTMLElement);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    );

    nodes.forEach((n) => io.observe(n));
    const failsafe = window.setTimeout(() => {
      if (!fired) nodes.forEach((n) => n.classList.add('is-in'));
    }, 2500);

    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
