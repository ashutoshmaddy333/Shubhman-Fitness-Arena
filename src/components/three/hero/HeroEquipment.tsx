"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EquipmentModel } from "@/components/three/equipment/EquipmentModel";
import type { EquipmentId } from "@/components/three/equipment/EquipmentModel";
import { isAssetAvailable } from "@/lib/three/assets/assetAvailability";
import { threeMotionStore } from "@/lib/three/threeMotionStore";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";
import { getHeroEquipmentForTier } from "@/lib/three/cinematic/heroComposition";
import { FORGE_MATERIALS } from "@/lib/three/materials/forgeMaterials";

function ProceduralEquipment({
  id,
  position,
}: {
  id: string;
  position: [number, number, number];
}) {
  const material = useMemo(() => FORGE_MATERIALS.equipment(), []);

  switch (id) {
    case "squat-rack":
      return (
        <group position={position}>
          <mesh material={material} position={[-0.45, 1.1, 0]} castShadow>
            <boxGeometry args={[0.08, 2.2, 0.08]} />
          </mesh>
          <mesh material={material} position={[0.45, 1.1, 0]} castShadow>
            <boxGeometry args={[0.08, 2.2, 0.08]} />
          </mesh>
          <mesh material={material} position={[0, 2.1, 0]} castShadow>
            <boxGeometry args={[1.1, 0.08, 0.08]} />
          </mesh>
          <mesh material={material} position={[0, 1.4, 0]} castShadow>
            <boxGeometry args={[1.1, 0.06, 0.06]} />
          </mesh>
        </group>
      );
    case "barbell":
      return (
        <group position={position}>
          <mesh material={material} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 1.6, 12]} />
          </mesh>
          <mesh material={material} position={[-0.72, 0, 0]} castShadow>
            <cylinderGeometry args={[0.14, 0.14, 0.08, 12]} />
          </mesh>
          <mesh material={material} position={[0.72, 0, 0]} castShadow>
            <cylinderGeometry args={[0.14, 0.14, 0.08, 12]} />
          </mesh>
        </group>
      );
    case "bench":
      return (
        <group position={position}>
          <mesh material={material} position={[0, 0.42, 0]} castShadow>
            <boxGeometry args={[1.2, 0.08, 0.45]} />
          </mesh>
          <mesh material={material} position={[-0.45, 0.2, 0]} castShadow>
            <boxGeometry args={[0.08, 0.4, 0.08]} />
          </mesh>
          <mesh material={material} position={[0.45, 0.2, 0]} castShadow>
            <boxGeometry args={[0.08, 0.4, 0.08]} />
          </mesh>
        </group>
      );
    case "plates":
      return (
        <group position={position}>
          <mesh material={material} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.22, 0.06, 16]} />
          </mesh>
          <mesh material={material} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.08, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.05, 16]} />
          </mesh>
        </group>
      );
    case "dumbbell":
      return (
        <group position={position} rotation={[0, 0.4, 0]}>
          <mesh material={material} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.5, 10]} />
          </mesh>
          <mesh material={material} position={[-0.22, 0, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.12, 12]} />
          </mesh>
          <mesh material={material} position={[0.22, 0, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.12, 12]} />
          </mesh>
        </group>
      );
    default:
      return (
        <mesh material={material} position={position} castShadow>
          <boxGeometry args={[1.2, 0.3, 0.5]} />
        </mesh>
      );
  }
}

/** Hero equipment — tier-limited, priority-ordered */
export function HeroEquipment() {
  const groupRef = useRef<THREE.Group>(null);
  const { reducedMotion } = useReducedMotionContext();
  const tier = usePerformanceTier();
  const slots = getHeroEquipmentForTier(tier);

  useFrame(() => {
    if (reducedMotion || !groupRef.current) return;

    const reveal = threeMotionStore.cinematic.equipmentReveal.current;
    groupRef.current.visible = reveal > 0.03;

    groupRef.current.children.forEach((child) => {
      child.scale.setScalar(reveal);
    });
  });

  return (
    <group ref={groupRef} visible={false}>
      {slots.map((slot) => {
        const available = isAssetAvailable(slot.id);
        if (available) {
          return (
            <EquipmentModel
              key={slot.id}
              equipmentId={slot.id as EquipmentId}
              position={slot.position}
              scale={slot.scale}
              castShadow={tier !== "LOW"}
            />
          );
        }

        if (tier === "LOW") return null;

        return (
          <ProceduralEquipment
            key={slot.id}
            id={slot.id}
            position={slot.position}
          />
        );
      })}
    </group>
  );
}
