'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

/**
 * PageTransition — per-route enter choreography for the hub shell.
 *
 * Keyed on pathname so each hub remounts and plays a content cross-dissolve
 * (fade + rise + de-blur) on navigation. Pairs with the per-card reveal
 * cascade (RevealObserver) for the layered "OS booting a new view" feel.
 * Enter-only (no AnimatePresence) — reliable inside an App Router layout where
 * children swap synchronously. Honors reduced-motion.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: 'opacity, transform, filter' }}
    >
      {children}
    </motion.div>
  );
}
