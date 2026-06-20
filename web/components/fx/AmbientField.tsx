'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

/**
 * AmbientField — one persistent WebGL particle field behind the whole shell.
 *
 * The single place real WebGL earns its cost (per the design playbook: fake
 * depth with CSS everywhere, spend GPU on ONE ambient hero layer). Tints to the
 * active hub accent, drifts slowly, parallaxes toward the pointer. Follows the
 * three.js rules: Points + BufferGeometry (one draw call), dpr capped at 1.5,
 * additive blending, depthWrite off. Unmounts entirely under reduced-motion.
 */

const HUB_COLOR: Record<string, string> = {
  '/system-core': '#64d2ff',
  '/operations': '#8b5cf6',
  '/operator-metrics': '#fb923c',
  '/archives': '#4ade80',
};

const COUNT = 1800;

function Field({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null);
  const drift = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  useFrame((state) => {
    const p = ref.current;
    if (!p) return;
    // lerp toward pointer for smooth parallax (no snap)
    drift.current.x += (state.pointer.y * 0.18 - drift.current.x) * 0.04;
    drift.current.y += (state.pointer.x * 0.18 - drift.current.y) * 0.04;
    p.rotation.x = drift.current.x;
    p.rotation.y = drift.current.y + state.clock.elapsedTime * 0.018;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color={color}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function AmbientField() {
  const reduce = useReducedMotion();
  const pathname = usePathname();

  if (reduce) return null;

  const color = HUB_COLOR[pathname ?? ''] ?? '#64d2ff';

  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <Field color={color} />
      </Canvas>
    </div>
  );
}
