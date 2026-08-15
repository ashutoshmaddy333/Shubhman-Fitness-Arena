"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";
import { threeMotionStore } from "@/lib/three/threeMotionStore";
import { PARTICLE_COUNTS } from "@/lib/constants/tokens";

const DUST_COLOR = "#6a6560";

/** Atmospheric dust — subtle, not star-like particles */
export function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { reducedMotion } = useReducedMotionContext();
  const tier = usePerformanceTier();

  const count =
    tier === "HIGH"
      ? PARTICLE_COUNTS.HIGH
      : tier === "MEDIUM"
        ? PARTICLE_COUNTS.MEDIUM
        : PARTICLE_COUNTS.LOW;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = 0.5 + Math.random() * 4.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
      velocities[i] = 0.0008 + Math.random() * 0.0015;
    }

    return { positions, velocities };
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current || reducedMotion || count === 0) return;

    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const intensity = threeMotionStore.cinematic.particleIntensity.current;
    const density = THREE.MathUtils.lerp(0.15, 0.7, intensity);

    for (let i = 0; i < count; i++) {
      let y = posAttr.getY(i) + velocities[i] * delta * 40 * density;
      if (y > 5.5) y = 0.4 + Math.random() * 0.5;
      posAttr.setY(i, y);
    }

    posAttr.needsUpdate = true;

    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.opacity = THREE.MathUtils.lerp(0.04, 0.14, intensity);
    material.size = THREE.MathUtils.lerp(0.008, 0.018, intensity);
  });

  if (count === 0) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color={DUST_COLOR}
        transparent
        opacity={0.08}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
