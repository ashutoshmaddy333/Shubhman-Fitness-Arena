"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { threeMotionStore } from "@/lib/three/threeMotionStore";

/** Subtle physical motion on procedural/cardio equipment in the world */
export function WorldEquipmentAnimations() {
  const treadmillRef = useRef<THREE.Group>(null);
  const bagRef = useRef<THREE.Group>(null);
  const { reducedMotion } = useReducedMotionContext();

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.getElapsedTime();
    const intensity = threeMotionStore.cinematic.particleIntensity.current;

    if (treadmillRef.current) {
      const belt = treadmillRef.current.getObjectByName("Belt");
      if (belt) belt.position.z = Math.sin(t * 3) * 0.015 * intensity;
    }

    if (bagRef.current) {
      bagRef.current.rotation.x = Math.sin(t * 1.2) * 0.08 * intensity;
      bagRef.current.rotation.z = Math.sin(t * 0.9) * 0.05 * intensity;
    }
  });

  return (
    <group>
      <group ref={treadmillRef} position={[4.5, 0, -7]} rotation={[0, Math.PI, 0]} visible={false} />
      <group ref={bagRef} position={[-5.5, 0, -5]} visible={false} />
    </group>
  );
}
