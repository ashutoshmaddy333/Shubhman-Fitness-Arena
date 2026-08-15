"use client";

import { Environment } from "@react-three/drei";
import { assetRegistry } from "@/lib/three/assets/registry";
import { isAssetAvailable } from "@/lib/three/assets/assetAvailability";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";
import { getTier3DConfig } from "@/lib/three/performance/tierConfig";

export type HDREnvironmentId = keyof typeof assetRegistry.hdr;

export interface EnvironmentLightingProps {
  hdrId?: HDREnvironmentId;
  background?: boolean;
  blur?: number;
}

/** HDR environment lighting — loads only when asset is available and tier allows */
export function EnvironmentLighting({
  hdrId = "gym-dark",
  background = false,
  blur = 0.6,
}: EnvironmentLightingProps) {
  const tier = usePerformanceTier();
  const tierConfig = getTier3DConfig(tier);
  const hdr = assetRegistry.hdr[hdrId];
  const hdrAvailable = isAssetAvailable(hdr.id);

  if (!tierConfig.enableHDR || !hdrAvailable || !hdr.path) {
    return null;
  }

  return (
    <Environment
      files={hdr.path}
      background={background}
      blur={blur}
      environmentIntensity={hdr.intensity ?? 0.5}
    />
  );
}
