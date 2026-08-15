import type { PerformanceTier } from "@/hooks/usePerformanceTier";

export interface LODConfig {
  LOD0: { distance: number };
  LOD1: { distance: number };
  LOD2: { distance: number };
}

export const DEFAULT_LOD_DISTANCES: LODConfig = {
  LOD0: { distance: 0 },
  LOD1: { distance: 8 },
  LOD2: { distance: 16 },
};

export const LOD_MIN_RADIUS = 0.5;

export function selectLODLevel(
  distance: number,
  tier: PerformanceTier,
  config: LODConfig = DEFAULT_LOD_DISTANCES,
): "LOD0" | "LOD1" | "LOD2" {
  const bias = tier === "HIGH" ? 0 : tier === "MEDIUM" ? 2 : 4;
  const d = distance - bias;

  if (d < config.LOD1.distance) return "LOD0";
  if (d < config.LOD2.distance) return "LOD1";
  return "LOD2";
}
