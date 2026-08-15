"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { threeMotionStore } from "@/lib/three/threeMotionStore";
import { COLORS } from "@/lib/constants/tokens";

/** Practical gym ceiling + rack accent lights — readable hero equipment */
export function ForgeGymFillLights() {
  const { reducedMotion } = useReducedMotionContext();
  const rackRef = useRef<THREE.PointLight>(null);
  const floorRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const env = threeMotionStore.environment.current;
    const base = 0.55 + env * 0.45;

    if (rackRef.current) {
      rackRef.current.intensity = base * 1.4;
    }
    if (floorRef.current) {
      floorRef.current.intensity = base * 0.9;
    }

    if (reducedMotion || !rackRef.current) return;

    const flicker = 1 + Math.sin(clock.getElapsedTime() * 2.4) * 0.03;
    rackRef.current.intensity *= flicker;
  });

  return (
    <>
      <pointLight
        ref={rackRef}
        position={[-2.2, 3.8, -3.2]}
        intensity={1.8}
        color="#fff4e8"
        distance={14}
        decay={2}
      />
      <pointLight
        position={[1.5, 3.5, -2.5]}
        intensity={1.2}
        color="#f0ebe3"
        distance={12}
        decay={2}
      />
      <pointLight
        ref={floorRef}
        position={[0, 1.2, 2]}
        intensity={0.65}
        color="#888890"
        distance={10}
        decay={2}
      />
      <spotLight
        position={[0, 5.5, 4]}
        angle={0.55}
        penumbra={0.85}
        intensity={0.85}
        color="#ffffff"
        distance={22}
        castShadow={false}
      />
      <pointLight
        position={[0, 2.5, -6]}
        intensity={0.35}
        color={COLORS.accent}
        distance={8}
        decay={2}
      />
    </>
  );
}
