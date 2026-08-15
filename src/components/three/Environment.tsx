"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { threeMotionStore } from "@/lib/three/threeMotionStore";
import { FORGE_MATERIALS } from "@/lib/three/materials/forgeMaterials";

/** Procedural gym environment — cinematic fallback with foreground/mid/background depth */
export function Environment() {
  const floorRef = useRef<THREE.Mesh>(null);
  const wallsRef = useRef<THREE.Group>(null);
  const backgroundRef = useRef<THREE.Group>(null);
  const equipmentGroupRef = useRef<THREE.Group>(null);
  const { reducedMotion } = useReducedMotionContext();

  const [floorMaterial, wallMaterial, ceilingMaterial, equipmentMaterial, trimMaterial] =
    useMemo(
      () => [
        FORGE_MATERIALS.gymFloor(),
        FORGE_MATERIALS.gymWall(),
        FORGE_MATERIALS.gymWall(),
        FORGE_MATERIALS.equipment(),
        FORGE_MATERIALS.metal(),
      ],
      [],
    );

  useFrame(() => {
    if (reducedMotion) return;

    const envVisibility = Math.max(0.92, threeMotionStore.environment.current);
    const equipVisibility = Math.max(0.88, threeMotionStore.cinematic.equipmentReveal.current);

    if (wallsRef.current) {
      wallsRef.current.visible = true;
    }

    if (backgroundRef.current) {
      backgroundRef.current.visible = envVisibility > 0.05;
    }

    if (equipmentGroupRef.current) {
      const equipAlpha = THREE.MathUtils.smoothstep(equipVisibility, 0, 1);
      equipmentGroupRef.current.visible = equipAlpha > 0.03;
      equipmentGroupRef.current.children.forEach((child) => {
        child.scale.setScalar(Math.max(0.85, equipAlpha));
      });
    }
  });

  return (
    <group>
      <mesh
        ref={floorRef}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        material={floorMaterial}
      >
        <planeGeometry args={[32, 32]} />
      </mesh>

      <group ref={wallsRef}>
        <mesh material={wallMaterial} position={[0, 3.2, -9]} receiveShadow>
          <planeGeometry args={[24, 7]} />
        </mesh>
        <mesh
          material={wallMaterial}
          position={[-11, 3.2, -2]}
          rotation={[0, Math.PI / 2, 0]}
          receiveShadow
        >
          <planeGeometry args={[18, 7]} />
        </mesh>
        <mesh
          material={wallMaterial}
          position={[11, 3.2, -2]}
          rotation={[0, -Math.PI / 2, 0]}
          receiveShadow
        >
          <planeGeometry args={[18, 7]} />
        </mesh>
        <mesh
          material={ceilingMaterial}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 6.2, -2]}
          receiveShadow
        >
          <planeGeometry args={[24, 18]} />
        </mesh>
        <mesh material={trimMaterial} position={[-4, 1.5, -8.5]} castShadow>
          <boxGeometry args={[0.35, 3.2, 0.35]} />
        </mesh>
        <mesh material={trimMaterial} position={[4, 1.5, -8.5]} castShadow>
          <boxGeometry args={[0.35, 3.2, 0.35]} />
        </mesh>
        <mesh material={trimMaterial} position={[0, 0.08, -8.8]} receiveShadow>
          <boxGeometry args={[22, 0.12, 0.4]} />
        </mesh>
      </group>

      <group ref={backgroundRef}>
        <mesh material={wallMaterial} position={[0, 3.5, -14]} receiveShadow>
          <planeGeometry args={[28, 8]} />
        </mesh>
        <mesh material={wallMaterial} position={[-8, 2.5, -11]} rotation={[0, Math.PI / 4, 0]} receiveShadow>
          <planeGeometry args={[10, 6]} />
        </mesh>
        <mesh material={wallMaterial} position={[8, 2.5, -11]} rotation={[0, -Math.PI / 4, 0]} receiveShadow>
          <planeGeometry args={[10, 6]} />
        </mesh>
        <mesh material={trimMaterial} position={[-6, 1.2, -12]} castShadow>
          <boxGeometry args={[0.25, 2.4, 0.25]} />
        </mesh>
        <mesh material={trimMaterial} position={[6, 1.2, -12]} castShadow>
          <boxGeometry args={[0.25, 2.4, 0.25]} />
        </mesh>
      </group>

      <group ref={equipmentGroupRef} visible={false}>
        <mesh material={equipmentMaterial} position={[-2.5, 1.2, -4]} castShadow>
          <boxGeometry args={[1.6, 2.4, 1.1]} />
        </mesh>
        <mesh material={equipmentMaterial} position={[1.8, 0.45, -3]} castShadow>
          <boxGeometry args={[1.4, 0.25, 0.45]} />
        </mesh>
        <mesh material={equipmentMaterial} position={[3.5, 0.35, -5]} castShadow>
          <boxGeometry args={[1.1, 0.5, 0.6]} />
        </mesh>
      </group>
    </group>
  );
}
