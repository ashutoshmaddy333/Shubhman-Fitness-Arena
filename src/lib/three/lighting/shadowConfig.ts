import type { PerformanceTier } from "@/hooks/usePerformanceTier";

export interface ShadowConfig {
  enabled: boolean;
  mapSize: number;
  bias: number;
  normalBias: number;
  casters: "all" | "important" | "none";
}

export const SHADOW_CONFIG: Record<PerformanceTier, ShadowConfig> = {
  HIGH: {
    enabled: true,
    mapSize: 2048,
    bias: -0.0001,
    normalBias: 0.02,
    casters: "important",
  },
  MEDIUM: {
    enabled: false,
    mapSize: 1024,
    bias: -0.0002,
    normalBias: 0.02,
    casters: "important",
  },
  LOW: {
    enabled: false,
    mapSize: 512,
    bias: 0,
    normalBias: 0,
    casters: "none",
  },
};

export const SHADOW_CASTER_CATEGORIES = new Set([
  "character",
  "equipment",
  "environment",
]);

export function shouldCastShadow(
  tier: PerformanceTier,
  category: string,
): boolean {
  const config = SHADOW_CONFIG[tier];
  if (!config.enabled || config.casters === "none") return false;
  if (config.casters === "important") {
    return SHADOW_CASTER_CATEGORIES.has(category);
  }
  return true;
}
