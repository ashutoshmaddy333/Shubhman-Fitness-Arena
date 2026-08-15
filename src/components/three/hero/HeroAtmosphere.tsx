"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { threeMotionStore } from "@/lib/three/threeMotionStore";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { COLORS } from "@/lib/constants/tokens";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";

/** Subtle fog + haze driven by cinematic progress */
export function HeroAtmosphere() {
  const fogRef = useRef<THREE.Fog>(null);
  const { reducedMotion } = useReducedMotionContext();
  const tier = usePerformanceTier();

  useFrame((state) => {
    if (reducedMotion || tier === "LOW") return;

    const intensity = threeMotionStore.cinematic.atmosphereIntensity.current;
    const scene = state.scene;

    if (!scene.fog) {
      scene.fog = new THREE.Fog(COLORS.background, 8, 22);
    }

    const fog = scene.fog as THREE.Fog;
    fog.near = THREE.MathUtils.lerp(10, 6, intensity);
    fog.far = THREE.MathUtils.lerp(18, 24, intensity);
    fogRef.current = fog;
  });

  return null;
}
