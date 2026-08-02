'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/navigation';

/* Cinematic System-Boot preloader. Composition lineage = the "Moneta" loader
   (radial blooms, twinkle field, dashed orbit, glowing core, curved 0-100 arc,
   bouncing dots), fully rebranded to DEX // OPERATOR: near-black void, cyan
   flare, inline-recreated ornaments (no external assets), live boot log. */

const VOID = '#08080a';
const ENTER_ROUTE = '/operator-metrics';

/* ---- curved 0-100 number arc (canvas), ported + recolored cyan ---------- */
const A_W = 560;
const A_H = 72;
const A_R = 320;
const A_CX = A_W / 2;
const A_CY = 340;
const A_STEP = Math.PI / 16;
const A_FONT = '300 17px "Geist Mono", monospace';
const A_VIS = 5;

function NumberArc({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animatedRef = useRef(0);
  const targetRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  const draw = (value: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    if (canvas.width !== A_W * ratio) {
      canvas.width = A_W * ratio;
      canvas.height = A_H * ratio;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(ratio, ratio);
    ctx.clearRect(0, 0, A_W, A_H);
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, A_W, A_H);
    ctx.clip();
    ctx.font = A_FONT;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let n = 0; n <= 100; n += 1) {
      const distance = n - value;
      const abs = Math.abs(distance);
      if (abs > A_VIS) continue;
      const angle = -Math.PI / 2 + distance * A_STEP;
      const x = A_CX + Math.cos(angle) * A_R;
      const y = A_CY + Math.sin(angle) * A_R;
      if (x < -80 || x > A_W + 80 || y < -20 || y > A_H + 20) continue;
      const fade = Math.pow(1 - abs / A_VIS, 2.2);
      const opacity = Math.max(0, 0.95 * fade);
      const focal = Math.max(0, 1 - abs / 1.2);
      const scale = 1 + focal * 0.4;
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      if (focal > 0.05) {
        ctx.shadowColor = `rgba(100, 210, 255, ${focal})`;
        ctx.shadowBlur = 20 * focal;
      }
      ctx.fillStyle =
        focal > 0.45
          ? `rgba(180, 235, 255, ${opacity})`
          : `rgba(236, 240, 248, ${opacity})`;
      ctx.fillText(String(n), 0, 0);
      ctx.restore();
    }
    ctx.restore();
  };

  useEffect(() => {
    targetRef.current = progress;
    if (frameRef.current !== null) return;
    const tick = () => {
      const cur = animatedRef.current;
      const target = targetRef.current;
      const delta = target - cur;
      if (Math.abs(delta) < 0.001) {
        animatedRef.current = target;
        draw(target);
        frameRef.current = null;
        return;
      }
      animatedRef.current = cur + delta * 0.045;
      draw(animatedRef.current);
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [progress]);

  useEffect(() => {
    draw(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mask =
    'radial-gradient(ellipse 55% 100% at 50% 50%, black 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.4) 65%, transparent 100%)';

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 96,
        transform: 'translateX(-50%)',
        width: A_W,
        height: A_H,
        zIndex: 5,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%', WebkitMaskImage: mask, maskImage: mask }}
      />
    </div>
  );
}

/* ---- boot log copy keyed to progress ------------------------------------ */
function bootLine(p: number): string {
  if (p >= 100) return 'SYSTEM READY';
  if (p >= 82) return 'CALIBRATING INTERFACE';
  if (p >= 64) return 'SYNCING ARENA RECORDS';
  if (p >= 44) return 'LOADING OPERATOR PROFILE';
  if (p >= 22) return 'MOUNTING MODULES';
  return 'INITIALIZING KERNEL';
}

export default function Preloader() {
  const router = useRouter();
  const reduce = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scale, setScale] = useState(1);
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [timestamp, setTimestamp] = useState('');

  const particles = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => ({
        top: ((i * 41) % 100) + (Math.random() * 6 - 3),
        left: ((i * 67) % 100) + (Math.random() * 6 - 3),
        dur: 3 + Math.random() * 4,
        delay: Math.random() * 4,
        base: 0.08 + Math.random() * 0.18,
      })),
    [],
  );

  useEffect(() => setMounted(true), []);

  // responsive scale for the central visual cluster (~920×780 design box)
  useEffect(() => {
    const update = () =>
      setScale(Math.min(window.innerWidth / 940, window.innerHeight / 800, 1));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // live clock
  useEffect(() => {
    const update = () =>
      setTimestamp(new Date().toLocaleTimeString('en-US', { hour12: false }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // chunked, non-linear realistic progress driver (Moneta lineage)
  useEffect(() => {
    if (reduce) {
      setProgress(100);
      setReady(true);
      return;
    }
    let cancelled = false;
    let current = 0;
    const segments: { to: number; delay: number; duration: number }[] = [];
    let acc = 0;
    while (acc < 100) {
      const r = Math.random();
      let chunk: number;
      if (r < 0.15) chunk = 1 + Math.random() * 3;
      else if (r < 0.85) chunk = 4 + Math.random() * 12;
      else chunk = 14 + Math.random() * 18;
      acc = Math.min(100, acc + chunk);
      segments.push({ to: acc, delay: 40 + Math.random() * 200, duration: 130 + Math.random() * 360 });
    }
    const run = (i: number) => {
      if (cancelled) return;
      if (i >= segments.length) {
        if (!cancelled) setReady(true);
        return;
      }
      const seg = segments[i];
      setTimeout(() => {
        if (cancelled) return;
        const from = current;
        const start = performance.now();
        const step = (t: number) => {
          if (cancelled) return;
          const k = Math.min(1, (t - start) / seg.duration);
          const eased = 1 - Math.pow(1 - k, 2);
          current = from + (seg.to - from) * eased;
          setProgress(current);
          if (k < 1) requestAnimationFrame(step);
          else {
            current = seg.to;
            setProgress(seg.to);
            run(i + 1);
          }
        };
        requestAnimationFrame(step);
      }, seg.delay);
    };
    run(0);
    return () => {
      cancelled = true;
    };
  }, [reduce]);

  // once ready: auto-advance after a short rest (click ENTER to go sooner)
  useEffect(() => {
    if (!ready || reduce) return;
    const id = setTimeout(() => enter(), 2200);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, reduce]);

  function enter() {
    if (exiting) return;
    setExiting(true);
    const go = () => router.push(ENTER_ROUTE);
    if (reduce) {
      go();
      return;
    }
    setTimeout(go, 760); // matches exit sweep duration
  }

  // click anywhere fast-forwards: if loading, jump to ready; if ready, enter
  function handleClick() {
    if (ready) enter();
    else {
      setProgress(100);
      setReady(true);
    }
  }

  const line = bootLine(progress);

  return (
    <motion.div
      id="dex-preloader"
      onClick={handleClick}
      role="dialog"
      aria-modal="true"
      aria-label="System initialization"
      initial={false}
      animate={
        exiting
          ? { opacity: 0, scale: 1.05, filter: 'blur(8px)' }
          : { opacity: 1, scale: 1, filter: 'blur(0px)' }
      }
      transition={{ duration: 0.76, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: VOID,
        overflow: 'hidden',
        cursor: 'pointer',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {/* corner brackets — Dex's signature motif, pinned to viewport */}
      {(['tl', 'tr', 'bl', 'br'] as const).map((c) => (
        <span key={c} className={`pl-bracket pl-bracket--${c}`} aria-hidden="true" />
      ))}

      {/* top status bar */}
      <header className="pl-topbar" aria-hidden="true">
        <span className="pl-topbar__badge">
          <span className="pl-topbar__dot" /> OPERATOR ONLINE
        </span>
        <span className="pl-topbar__right">
          // SYSTEM BOOT <span className="pl-topbar__sep">·</span> {mounted ? timestamp : '--:--:--'}
        </span>
      </header>

      {/* central scaled cluster */}
      <div
        className="pl-stage"
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        {/* radial blooms */}
        <div className="pl-bloom pl-bloom--inner" aria-hidden="true" />
        <div className="pl-bloom pl-bloom--outer" aria-hidden="true" />

        {/* twinkle field */}
        {mounted && !reduce && (
          <div className="pl-particles" aria-hidden="true">
            {particles.map((p, i) => (
              <motion.span
                key={i}
                style={{ top: `${p.top}%`, left: `${p.left}%` }}
                animate={{ opacity: [p.base * 0.4, p.base * 1.6, p.base * 0.4] }}
                transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>
        )}

        {/* concentric rings */}
        <svg className="pl-rings" viewBox="0 0 700 700" aria-hidden="true">
          {[120, 200, 280, 345].map((r, i) => (
            <circle key={r} cx="350" cy="350" r={r} style={{ opacity: 0.16 - i * 0.025 }} />
          ))}
          <circle cx="350" cy="350" r="345" className="pl-rings__tick" strokeDasharray="2 18" />
        </svg>

        {/* glowing core */}
        <motion.div
          className="pl-core"
          aria-hidden="true"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={
            reduce
              ? { scale: 1, opacity: 0.9 }
              : { scale: [1, 1.04, 1], opacity: 0.9 }
          }
          transition={
            reduce
              ? { duration: 0.4 }
              : { scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 1.2 } }
          }
        />

        {/* dashed orbit line with front-fade mask (Moneta path) */}
        {mounted && !reduce && (
          <div className="pl-orbit" aria-hidden="true">
            <svg viewBox="0 0 1044 356" preserveAspectRatio="none">
              <defs>
                <linearGradient id="plLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(100,210,255,0)" />
                  <stop offset="50%" stopColor="rgba(150,225,255,0.95)" />
                  <stop offset="100%" stopColor="rgba(100,210,255,0)" />
                </linearGradient>
                <linearGradient id="plFadeGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                  <stop offset="0%" stopColor="#000" />
                  <stop offset="40%" stopColor="#000" />
                  <stop offset="58%" stopColor="#fff" />
                  <stop offset="100%" stopColor="#fff" />
                </linearGradient>
                <mask id="plFadeMask" maskUnits="userSpaceOnUse" x="-200" y="-200" width="1444" height="800">
                  <rect x="-200" y="-200" width="1444" height="800" fill="url(#plFadeGrad)" />
                </mask>
              </defs>
              <g mask="url(#plFadeMask)">
                <motion.path
                  d="M1042.76 35.8838C1058.87 95.0224 838.678 206.483 550.956 284.839C263.235 363.194 16.9353 378.772 0.830078 319.634C-15.2752 260.495 204.913 149.034 492.634 70.6789C780.355 -7.67647 1026.66 -23.2548 1042.76 35.8838Z"
                  fill="none"
                  stroke="url(#plLineGrad)"
                  strokeWidth={1}
                  strokeLinecap="round"
                  pathLength={1}
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: [0, -1.45] }}
                  transition={{ duration: 5, delay: 1.4, repeat: Infinity, ease: 'linear' }}
                  style={{ strokeDasharray: '0.45 1', filter: 'drop-shadow(0 0 4px rgba(100,210,255,0.6))' }}
                />
              </g>
            </svg>
          </div>
        )}

        {/* emblem + wordmark */}
        <div className="pl-id">
          <motion.svg
            className="pl-emblem"
            viewBox="0 0 48 48"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            aria-hidden="true"
          >
            <motion.path
              d="M24 3 L43 14 V34 L24 45 L5 34 V14 Z"
              fill="none"
              stroke="var(--cyan)"
              strokeWidth={1.4}
              pathLength={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.path
              d="M24 14 L33 19 V29 L24 34 L15 29 V19 Z"
              fill="rgba(100,210,255,0.10)"
              stroke="var(--cyan)"
              strokeWidth={1}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7, ease: 'backOut' }}
              style={{ transformOrigin: 'center' }}
            />
          </motion.svg>

          <motion.div
            className="pl-wordmark"
            initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          >
            DEX BENNETT
          </motion.div>
          <div className="pl-subline">OPERATOR // SYSTEM OS</div>
        </div>

        {/* number arc */}
        <NumberArc progress={progress} />

        {/* bouncing dots */}
        {!reduce && (
          <div className="pl-dots" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                animate={{ y: [-6, 0, -6] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.16 }}
              />
            ))}
          </div>
        )}
      </div>

      {/* boot log + enter prompt */}
      <footer className="pl-footer">
        <div className="pl-log" aria-live="polite">
          <span className="pl-log__caret">›</span> {line}
          <span className="pl-log__pct">{Math.round(progress)}%</span>
        </div>
        <button
          type="button"
          className={`pl-enter ${ready ? 'is-ready' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          aria-label={ready ? 'Enter the system' : 'Skip boot'}
        >
          <span>{ready ? 'INITIALIZE SYSTEM' : 'SKIP'}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </footer>
    </motion.div>
  );
}
