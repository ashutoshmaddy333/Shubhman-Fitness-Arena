"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { EnvironmentModel } from "@/components/three/environment/EnvironmentModel";
import type { EnvironmentAssetId } from "@/components/three/environment/EnvironmentModel";
import { Environment } from "@/components/three/Environment";
import { isAssetAvailable } from "@/lib/three/assets/assetAvailability";
import { threeMotionStore } from "@/lib/three/threeMotionStore";
import { getHeroEnvironmentForTier } from "@/lib/three/cinematic/heroComposition";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";

/** Hero environment — background layer, tier-limited */
export function HeroEnvironment() {
  const groupRef = useRef<THREE.Group>(null);
  const tier = usePerformanceTier();
  const envIds = getHeroEnvironmentForTier(tier);

  const hasAnyGlb = envIds.some((id) => isAssetAvailable(id));

  useFrame(() => {
    if (!groupRef.current) return;

    const reveal = Math.max(0.92, threeMotionStore.environment.current);
    groupRef.current.visible = reveal > 0.01 || !hasAnyGlb;
  });

  return (
    <group ref={groupRef}>
      {hasAnyGlb ? (
        envIds.map((id) =>
          isAssetAvailable(id) ? (
            <EnvironmentModel
              key={id}
              environmentId={id as EnvironmentAssetId}
            />
          ) : null,
        )
      ) : (
        <Environment />
      )}
    </group>
  );
}
