import type { PerformanceTier } from "@/hooks/usePerformanceTier";

/** Visual hierarchy for cinematic hero — do not overload the scene */

export type CompositionLayer = "background" | "midground" | "foreground";

export interface HeroEquipmentSlot {
  id: string;
  layer: CompositionLayer;
  position: [number, number, number];
  scale: number;
  revealFrom: number;
}

/** Priority-ordered hero equipment — athlete remains focal point */
export const HERO_EQUIPMENT_SLOTS: readonly HeroEquipmentSlot[] = [
  {
    id: "squat-rack",
    layer: "foreground",
    position: [-2, 0, -3],
    scale: 1,
    revealFrom: 0.7,
  },
  {
    id: "barbell",
    layer: "foreground",
    position: [1.5, 0.4, -2],
    scale: 1,
    revealFrom: 0.72,
  },
  {
    id: "bench",
    layer: "midground",
    position: [3, 0, -4],
    scale: 1,
    revealFrom: 0.75,
  },
  {
    id: "plates",
    layer: "foreground",
    position: [0.8, 0.12, -2.2],
    scale: 1,
    revealFrom: 0.78,
  },
  {
    id: "dumbbell",
    layer: "foreground",
    position: [-3, 0.15, -1],
    scale: 0.8,
    revealFrom: 0.8,
  },
] as const;

export const HERO_EQUIPMENT_LIMITS: Record<PerformanceTier, number> = {
  HIGH: 5,
  MEDIUM: 4,
  LOW: 2,
};

export const HERO_ENVIRONMENT_IDS = [
  "gym-floor",
  "gym-walls",
  "gym-ceiling",
  "gym-pillars",
  "gym-mirrors",
  "gym-lighting-fixtures",
] as const;

export const HERO_ENVIRONMENT_SECONDARY = [
  "gym-doors",
  "gym-windows",
] as const;

export function getHeroEquipmentForTier(
  tier: PerformanceTier,
): HeroEquipmentSlot[] {
  return HERO_EQUIPMENT_SLOTS.slice(0, HERO_EQUIPMENT_LIMITS[tier]);
}

export function getHeroEnvironmentForTier(tier: PerformanceTier): string[] {
  const primary = [...HERO_ENVIRONMENT_IDS];
  if (tier === "HIGH") {
    return [...primary, ...HERO_ENVIRONMENT_SECONDARY];
  }
  if (tier === "MEDIUM") {
    return primary.slice(0, 4);
  }
  return primary.slice(0, 2);
}
