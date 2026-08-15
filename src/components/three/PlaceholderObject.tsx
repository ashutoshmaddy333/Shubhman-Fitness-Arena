"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { threeMotionStore } from "@/lib/three/threeMotionStore";
import { FORGE_MATERIALS } from "@/lib/three/materials/forgeMaterials";
import { isForgeDebugEnabled } from "@/lib/three/debug/forgeDebug";

/** Cinematic placeholder athlete — dark silhouette, no neon ring in production */
export function PlaceholderObject() {
  const groupRef = useRef<THREE.Group>(null);
  const { reducedMotion } = useReducedMotionContext();
  const debug = isForgeDebugEnabled();

  const bodyMaterial = useMemo(() => FORGE_MATERIALS.athlete(), []);
  const debugRingMaterial = useMemo(() => FORGE_MATERIALS.accent(), []);

  useFrame(({ clock }) => {
    if (!groupRef.current || reducedMotion) return;

    const cinematic = threeMotionStore.cinematic;
    const t = clock.getElapsedTime();
    const breath = Math.sin(t * 1.8) * 0.015;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      cinematic.athleteRotation.current,
      0.06,
    );
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, cinematic.athleteScale.current, 0.06),
    );

    const torso = groupRef.current.getObjectByName("TorsoPlaceholder");
    if (torso) {
      torso.position.y = 1.2 + breath;
      torso.scale.y = 1 + breath * 2;
    }
  });

  return (
    <group ref={groupRef} data-cursor="explore">
      <mesh material={bodyMaterial} castShadow position={[0, 1.2, 0]} name="TorsoPlaceholder">
        <capsuleGeometry args={[0.35, 0.8, 12, 20]} />
      </mesh>
      <mesh material={bodyMaterial} castShadow position={[0, 2.05, 0]}>
        <sphereGeometry args={[0.22, 20, 20]} />
      </mesh>
      <mesh
        material={bodyMaterial}
        castShadow
        position={[-0.55, 1.35, 0]}
        rotation={[0, 0, 0.3]}
      >
        <capsuleGeometry args={[0.1, 0.5, 8, 12]} />
      </mesh>
      <mesh
        material={bodyMaterial}
        castShadow
        position={[0.55, 1.35, 0]}
        rotation={[0, 0, -0.3]}
      >
        <capsuleGeometry args={[0.1, 0.5, 8, 12]} />
      </mesh>
      <mesh material={bodyMaterial} castShadow position={[-0.2, 0.45, 0]}>
        <capsuleGeometry args={[0.12, 0.6, 8, 12]} />
      </mesh>
      <mesh material={bodyMaterial} castShadow position={[0.2, 0.45, 0]}>
        <capsuleGeometry args={[0.12, 0.6, 8, 12]} />
      </mesh>
      {debug && (
        <mesh material={debugRingMaterial} position={[0, 1.2, 0.36]}>
          <torusGeometry args={[0.4, 0.012, 8, 32]} />
        </mesh>
      )}
    </group>
  );
}
