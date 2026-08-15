"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EquipmentModel } from "@/components/three/equipment/EquipmentModel";
import { AnimatedEquipmentModel } from "@/components/three/equipment/AnimatedEquipmentModel";
import type { EquipmentId } from "@/components/three/equipment/EquipmentModel";
import { isAssetAvailable } from "@/lib/three/assets/assetAvailability";
import { threeMotionStore } from "@/lib/three/threeMotionStore";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";
import { FORGE_MATERIALS } from "@/lib/three/materials/forgeMaterials";
import {
  FORGE_WORLD_EQUIPMENT,
  getZoneVisibility,
  type WorldEquipmentSlot,
} from "@/lib/three/world/forgeWorldZones";

function ProceduralWorldEquipment({
  id,
  position,
  rotation = [0, 0, 0],
  scale = 1,
}: WorldEquipmentSlot) {
  const material = useMemo(() => FORGE_MATERIALS.equipment(), []);
  const rubber = useMemo(() => FORGE_MATERIALS.rubber(), []);

  const props = {
    material,
    castShadow: true,
    receiveShadow: true,
  };

  switch (id) {
    case "squat-rack":
      return (
        <group position={position} rotation={rotation} scale={scale}>
          <mesh {...props} position={[-0.45, 1.1, 0]}><boxGeometry args={[0.08, 2.2, 0.08]} /></mesh>
          <mesh {...props} position={[0.45, 1.1, 0]}><boxGeometry args={[0.08, 2.2, 0.08]} /></mesh>
          <mesh {...props} position={[0, 2.1, 0]}><boxGeometry args={[1.1, 0.08, 0.08]} /></mesh>
          <mesh {...props} position={[0, 1.4, 0]}><boxGeometry args={[1.1, 0.06, 0.06]} /></mesh>
        </group>
      );
    case "barbell":
      return (
        <group position={position} rotation={rotation} scale={scale}>
          <mesh {...props} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.04, 0.04, 1.6, 12]} /></mesh>
          <mesh {...props} position={[-0.72, 0, 0]}><cylinderGeometry args={[0.14, 0.14, 0.08, 12]} /></mesh>
          <mesh {...props} position={[0.72, 0, 0]}><cylinderGeometry args={[0.14, 0.14, 0.08, 12]} /></mesh>
        </group>
      );
    case "plates":
      return (
        <group position={position} rotation={rotation} scale={scale}>
          <mesh {...props} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.22, 0.22, 0.06, 16]} /></mesh>
        </group>
      );
    case "bench":
    case "incline-bench":
      return (
        <group position={position} rotation={rotation} scale={scale}>
          <mesh {...props} position={[0, 0.42, 0]}><boxGeometry args={[1.2, 0.08, 0.45]} /></mesh>
          <mesh {...props} position={[-0.45, 0.2, 0]}><boxGeometry args={[0.08, 0.4, 0.08]} /></mesh>
          <mesh {...props} position={[0.45, 0.2, 0]}><boxGeometry args={[0.08, 0.4, 0.08]} /></mesh>
        </group>
      );
    case "dumbbell":
      return (
        <group position={position} rotation={rotation} scale={scale}>
          <mesh {...props} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.025, 0.025, 0.5, 10]} /></mesh>
          <mesh {...props} position={[-0.22, 0, 0]}><cylinderGeometry args={[0.08, 0.08, 0.12, 12]} /></mesh>
          <mesh {...props} position={[0.22, 0, 0]}><cylinderGeometry args={[0.08, 0.08, 0.12, 12]} /></mesh>
        </group>
      );
    case "kettlebell":
      return (
        <group position={position} rotation={rotation} scale={scale}>
          <mesh {...props} position={[0, 0.12, 0]}><sphereGeometry args={[0.12, 12, 12]} /></mesh>
          <mesh {...props} position={[0, 0.28, 0]}><torusGeometry args={[0.06, 0.015, 8, 16]} /></mesh>
        </group>
      );
    case "cable-machine":
    case "lat-pulldown":
      return (
        <group position={position} rotation={rotation} scale={scale}>
          <mesh {...props} position={[0, 1.2, 0]}><boxGeometry args={[0.6, 2.4, 0.5]} /></mesh>
          <mesh {...props} position={[0, 2.2, 0.15]}><boxGeometry args={[0.8, 0.08, 0.08]} /></mesh>
        </group>
      );
    case "treadmill":
      return (
        <group position={position} rotation={rotation} scale={scale}>
          <mesh {...props} position={[0, 0.5, 0]}><boxGeometry args={[0.8, 0.08, 1.8]} /></mesh>
          <mesh material={rubber} position={[0, 0.56, 0]} receiveShadow><boxGeometry args={[0.7, 0.02, 1.5]} /></mesh>
        </group>
      );
    case "rower":
      return (
        <group position={position} rotation={rotation} scale={scale}>
          <mesh {...props} position={[0, 0.35, 0]}><boxGeometry args={[0.5, 0.15, 1.6]} /></mesh>
        </group>
      );
    case "bike":
      return (
        <group position={position} rotation={rotation} scale={scale}>
          <mesh {...props} position={[0, 0.55, 0]}><boxGeometry args={[0.4, 0.6, 1]} /></mesh>
        </group>
      );
    case "sled":
      return (
        <group position={position} rotation={rotation} scale={scale}>
          <mesh {...props} position={[0, 0.35, 0]}><boxGeometry args={[0.7, 0.4, 1.2]} /></mesh>
        </group>
      );
    case "boxing-bag":
      return (
        <group position={position} rotation={rotation} scale={scale}>
          <mesh material={rubber} castShadow position={[0, 1.2, 0]}><cylinderGeometry args={[0.18, 0.22, 2.2, 12]} /></mesh>
        </group>
      );
    case "medicine-ball":
      return (
        <mesh material={rubber} position={position} castShadow scale={scale}><sphereGeometry args={[0.14, 12, 12]} /></mesh>
      );
    case "weight-storage":
      return (
        <group position={position} rotation={rotation} scale={scale}>
          <mesh {...props} position={[0, 0.8, 0]}><boxGeometry args={[1.2, 1.6, 0.4]} /></mesh>
        </group>
      );
    default:
      return (
        <mesh {...props} position={position} scale={scale}><boxGeometry args={[0.8, 0.4, 0.8]} /></mesh>
      );
  }
}

const ANIMATED_EQUIPMENT: Partial<Record<EquipmentId, string>> = {
  treadmill: "belt",
  "boxing-bag": "swing",
};

function applyEquipmentMicroMotion(
  child: THREE.Object3D,
  slotId: string,
  t: number,
  baseRotation: [number, number, number],
  basePosition: [number, number, number],
): void {
  switch (slotId) {
    case "barbell":
      child.rotation.set(
        baseRotation[0],
        baseRotation[1],
        baseRotation[2] + Math.sin(t * 0.7) * 0.012,
      );
      break;
    case "plates":
      child.rotation.y = baseRotation[1] + Math.sin(t * 1.1) * 0.025;
      break;
    case "kettlebell":
      child.rotation.x = baseRotation[0] + Math.sin(t * 1.4) * 0.08;
      break;
    case "cable-machine":
      child.position.set(
        basePosition[0],
        basePosition[1] + Math.sin(t * 1.6) * 0.015,
        basePosition[2],
      );
      break;
    case "medicine-ball":
      child.rotation.z = baseRotation[2] + Math.sin(t * 0.9) * 0.04;
      break;
    case "boxing-bag":
      child.rotation.z = baseRotation[2] + Math.sin(t * 0.85) * 0.04;
      break;
    default:
      child.rotation.set(...baseRotation);
  }
}

const REGISTRY_IDS = new Set([
  "squat-rack", "barbell", "bench", "plates", "dumbbell", "kettlebell",
  "cable-machine", "treadmill", "rower", "bike", "sled", "boxing-bag",
]);

/** Full gym equipment world — grounded, tier-limited */
export function ForgeWorldEquipment() {
  const groupRef = useRef<THREE.Group>(null);
  const { reducedMotion } = useReducedMotionContext();
  const tier = usePerformanceTier();

  const slots = useMemo(() => {
    if (tier === "LOW") return FORGE_WORLD_EQUIPMENT.slice(0, 6);
    if (tier === "MEDIUM") return FORGE_WORLD_EQUIPMENT.slice(0, 11);
    return FORGE_WORLD_EQUIPMENT;
  }, [tier]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const pageProgress = threeMotionStore.pageProgress.current;
    const reveal = threeMotionStore.cinematic.equipmentReveal.current;
    const zones = getZoneVisibility(pageProgress);
    const t = clock.getElapsedTime();

    groupRef.current.children.forEach((child) => {
      const zone = child.userData.zone as keyof typeof zones;
      const slotId = child.userData.slotId as string;
      const baseRotation = child.userData.baseRotation as [number, number, number];
      const basePosition = child.userData.basePosition as [number, number, number];
      const zoneVis = zones[zone] ?? 1;
      const s = reveal * zoneVis;
      child.visible = s > 0.04;
      child.scale.setScalar(s);

      if (!reducedMotion && baseRotation) {
        applyEquipmentMicroMotion(child, slotId, t, baseRotation, basePosition);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {slots.map((slot) => {
        const registryId = REGISTRY_IDS.has(slot.id) ? slot.id : null;
        const available = registryId ? isAssetAvailable(registryId) : false;
        const baseRotation = slot.rotation ?? [0, 0, 0];

        if (available && registryId) {
          const animatedClip = ANIMATED_EQUIPMENT[registryId as EquipmentId];

          return (
            <group
              key={slot.id}
              userData={{
                zone: slot.zone,
                slotId: slot.id,
                baseRotation,
                basePosition: slot.position,
              }}
              position={slot.position}
              rotation={baseRotation}
              scale={slot.scale ?? 1}
            >
              {animatedClip ? (
                <AnimatedEquipmentModel
                  equipmentId={registryId as EquipmentId}
                  clipName={animatedClip}
                  castShadow={tier !== "LOW"}
                />
              ) : (
                <EquipmentModel
                  equipmentId={registryId as EquipmentId}
                  position={[0, 0, 0]}
                  castShadow={tier !== "LOW"}
                />
              )}
            </group>
          );
        }

        return (
          <group
            key={slot.id}
            userData={{
              zone: slot.zone,
              slotId: slot.id,
              baseRotation,
              basePosition: slot.position,
            }}
            position={slot.position}
            rotation={baseRotation}
            scale={slot.scale ?? 1}
          >
            <ProceduralWorldEquipment {...slot} position={[0, 0, 0]} rotation={[0, 0, 0]} />
          </group>
        );
      })}
    </group>
  );
}
