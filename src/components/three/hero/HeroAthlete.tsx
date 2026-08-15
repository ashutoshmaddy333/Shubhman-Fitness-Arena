"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CharacterModel } from "@/components/three/character/CharacterModel";
import { threeMotionStore } from "@/lib/three/threeMotionStore";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

/** Hero athlete — cinematic scroll drives animation + transform */
export function HeroAthlete() {
  const { reducedMotion } = useReducedMotionContext();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (reducedMotion) return;

    const cinematic = threeMotionStore.cinematic;
    const group = groupRef.current;
    if (!group) return;

    group.rotation.y = THREE.MathUtils.lerp(
      group.rotation.y,
      cinematic.athleteRotation.current,
      0.06,
    );
    group.scale.setScalar(
      THREE.MathUtils.lerp(group.scale.x, cinematic.athleteScale.current, 0.06),
    );
  });

  return (
    <group ref={groupRef}>
      <CharacterModel cinematic />
    </group>
  );
}
