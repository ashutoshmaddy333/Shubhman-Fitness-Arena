export type ForgeWorldZone =
  | "entrance"
  | "strength"
  | "performance"
  | "functional"
  | "recovery"
  | "community";

export interface WorldEquipmentSlot {
  id: string;
  zone: ForgeWorldZone;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

/** Grounded equipment layout — one coherent gym world */
export const FORGE_WORLD_EQUIPMENT: readonly WorldEquipmentSlot[] = [
  { id: "squat-rack", zone: "strength", position: [-2.2, 0, -3.5], scale: 1 },
  { id: "barbell", zone: "strength", position: [1.2, 0.4, -2.8], rotation: [0, 0.3, 0] },
  { id: "plates", zone: "strength", position: [0.6, 0.12, -2.5] },
  { id: "bench", zone: "strength", position: [3.2, 0, -4.2] },
  { id: "dumbbell", zone: "strength", position: [-3.5, 0.15, -1.8], scale: 0.9 },
  { id: "kettlebell", zone: "strength", position: [-3, 0.18, -2.8], scale: 0.7 },
  { id: "incline-bench", zone: "strength", position: [4, 0, -3], scale: 0.95 },
  { id: "cable-machine", zone: "functional", position: [5.5, 0, -5], rotation: [0, -Math.PI / 2, 0] },
  { id: "lat-pulldown", zone: "functional", position: [6, 0, -3.5], rotation: [0, -Math.PI / 2, 0], scale: 0.9 },
  { id: "treadmill", zone: "performance", position: [4.5, 0, -7], rotation: [0, Math.PI, 0] },
  { id: "rower", zone: "performance", position: [2.5, 0, -7.5], rotation: [0, Math.PI, 0] },
  { id: "bike", zone: "performance", position: [0.5, 0, -7.8], rotation: [0, Math.PI, 0] },
  { id: "sled", zone: "performance", position: [-1.5, 0, -7], scale: 0.85 },
  { id: "boxing-bag", zone: "functional", position: [-5.5, 0, -5], scale: 1.1 },
  { id: "medicine-ball", zone: "functional", position: [-4.5, 0.15, -4], scale: 0.5 },
  { id: "weight-storage", zone: "strength", position: [-5, 0, -3], scale: 1 },
  { id: "resistance-band", zone: "recovery", position: [-6, 0.5, -2], scale: 0.6 },
] as const;

export const FORGE_WORLD_ENVIRONMENT = {
  floorSize: 36,
  wallDepth: -10,
  backWallDepth: -15,
  ceilingHeight: 6.5,
} as const;

export function getEquipmentForZone(
  zone: ForgeWorldZone,
): WorldEquipmentSlot[] {
  return FORGE_WORLD_EQUIPMENT.filter((e) => e.zone === zone);
}

export type ZoneVisibilityMap = Record<ForgeWorldZone, number>;

/** Zone emphasis based on page progress — strength equipment visible on load */
export function getZoneVisibility(pageProgress: number): ZoneVisibilityMap {
  const p = Math.min(1, Math.max(0, pageProgress));

  if (p < 0.14) {
    return {
      entrance: 1,
      strength: 1,
      performance: 0.72,
      functional: 0.62,
      recovery: 0.35,
      community: 0.3,
    };
  }

  return {
    entrance: p < 0.2 ? 1 : Math.max(0.35, 1 - (p - 0.2) * 2),
    strength: Math.min(1, Math.max(0.45, getSegment(p, 0.08, 0.45))),
    performance: Math.min(1, Math.max(0.25, getSegment(p, 0.32, 0.55))),
    functional: Math.min(1, Math.max(0.2, getSegment(p, 0.4, 0.65))),
    recovery: Math.min(1, Math.max(0, getSegment(p, 0.55, 0.75))),
    community: Math.min(1, Math.max(0, getSegment(p, 0.7, 0.95))),
  };
}

function getSegment(p: number, start: number, end: number): number {
  if (p <= start) return 0;
  if (p >= end) return 1;
  return (p - start) / (end - start);
}
