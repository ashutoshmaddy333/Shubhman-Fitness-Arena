import type { PerformanceTier } from "@/hooks/usePerformanceTier";

/** 3D rendering settings per performance tier */

export interface Tier3DConfig {
  dpr: number | [number, number];
  shadows: boolean;
  shadowMapSize: number;
  antialias: boolean;
  maxAnisotropy: number;
  textureMaxSize: number;
  particleMultiplier: number;
  geometryDetail: "high" | "medium" | "low";
  enableHDR: boolean;
  enableInstancing: boolean;
  lodBias: number;
}

export const TIER_3D_CONFIG: Record<PerformanceTier, Tier3DConfig> = {
  HIGH: {
    dpr: [1, 1.5],
    shadows: true,
    shadowMapSize: 2048,
    antialias: true,
    maxAnisotropy: 8,
    textureMaxSize: 2048,
    particleMultiplier: 1,
    geometryDetail: "high",
    enableHDR: true,
    enableInstancing: true,
    lodBias: 0,
  },
  MEDIUM: {
    dpr: [1, 1.25],
    shadows: false,
    shadowMapSize: 1024,
    antialias: false,
    maxAnisotropy: 4,
    textureMaxSize: 1024,
    particleMultiplier: 0.5,
    geometryDetail: "medium",
    enableHDR: true,
    enableInstancing: true,
    lodBias: 1,
  },
  LOW: {
    dpr: 1,
    shadows: false,
    shadowMapSize: 512,
    antialias: false,
    maxAnisotropy: 2,
    textureMaxSize: 512,
    particleMultiplier: 0,
    geometryDetail: "low",
    enableHDR: false,
    enableInstancing: false,
    lodBias: 2,
  },
};

export function getTier3DConfig(tier: PerformanceTier): Tier3DConfig {
  return TIER_3D_CONFIG[tier];
}

export function getEffectiveTier(
  tier: PerformanceTier,
  reducedMotion: boolean,
): PerformanceTier {
  if (reducedMotion && tier === "HIGH") return "MEDIUM";
  return tier;
}
