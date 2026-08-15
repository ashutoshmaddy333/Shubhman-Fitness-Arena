/** Cinematic AI image backdrop — unified blue equipment theme */

import { BACKDROP_IMAGES } from "@/lib/content/backdropImages";

export const CINEMATIC_IMAGE_BACKDROP = true;

/** Full-bleed plane size — scaled dynamically in CinematicBackdropPlane */
export const BACKDROP_PLANE_BASE: [number, number] = [36, 20.25];

export interface CinematicBackdropShot {
  id: string;
  src: string;
  label: string;
  start: number;
  end: number;
  fade: number;
  z: number;
  y: number;
  size: [number, number];
  offset?: [number, number];
}

/** Each shot uses a unique blue-themed image — no reuse */
export const CINEMATIC_BACKDROP_SHOTS: readonly CinematicBackdropShot[] = [
  {
    id: "hero",
    src: BACKDROP_IMAGES.blueHero.src,
    label: "Blue hero",
    start: 0,
    end: 0.11,
    fade: 0.04,
    z: -7.8,
    y: 1.35,
    size: BACKDROP_PLANE_BASE,
  },
  {
    id: "squat",
    src: BACKDROP_IMAGES.blueSquat.src,
    label: "Squat rack",
    start: 0.09,
    end: 0.22,
    fade: 0.045,
    z: -7.5,
    y: 1.28,
    size: BACKDROP_PLANE_BASE,
  },
  {
    id: "barbell",
    src: BACKDROP_IMAGES.blueBarbell.src,
    label: "Barbell",
    start: 0.2,
    end: 0.34,
    fade: 0.045,
    z: -7.3,
    y: 1.3,
    size: BACKDROP_PLANE_BASE,
  },
  {
    id: "cable",
    src: BACKDROP_IMAGES.blueCable.src,
    label: "Cable station",
    start: 0.32,
    end: 0.46,
    fade: 0.04,
    z: -7.2,
    y: 1.25,
    size: BACKDROP_PLANE_BASE,
  },
  {
    id: "kettlebells",
    src: BACKDROP_IMAGES.blueKettlebells.src,
    label: "Kettlebells",
    start: 0.44,
    end: 0.56,
    fade: 0.04,
    z: -7.4,
    y: 1.32,
    size: BACKDROP_PLANE_BASE,
  },
  {
    id: "cardio",
    src: BACKDROP_IMAGES.blueCardio.src,
    label: "Cardio",
    start: 0.54,
    end: 0.66,
    fade: 0.045,
    z: -7.6,
    y: 1.35,
    size: BACKDROP_PLANE_BASE,
  },
  {
    id: "plates",
    src: BACKDROP_IMAGES.bluePlates.src,
    label: "Plates",
    start: 0.64,
    end: 0.76,
    fade: 0.04,
    z: -7.3,
    y: 1.28,
    size: BACKDROP_PLANE_BASE,
  },
  {
    id: "boxing",
    src: BACKDROP_IMAGES.blueBoxing.src,
    label: "Boxing",
    start: 0.74,
    end: 0.86,
    fade: 0.045,
    z: -7.2,
    y: 1.3,
    size: BACKDROP_PLANE_BASE,
  },
  {
    id: "finale",
    src: BACKDROP_IMAGES.blueAisle.src,
    label: "Finale aisle",
    start: 0.84,
    end: 1,
    fade: 0.05,
    z: -8,
    y: 1.4,
    size: BACKDROP_PLANE_BASE,
  },
] as const;

function smoothstep(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

export function getBackdropShotWeight(
  progress: number,
  shot: CinematicBackdropShot,
): number {
  const p = Math.min(1, Math.max(0, progress));
  const { start, end, fade } = shot;

  if (p < start - fade || p > end + fade) return 0;
  if (p < start) return smoothstep((p - (start - fade)) / fade);
  if (p > end) return 1 - smoothstep((p - end) / fade);
  return 1;
}

export function getCinematicImagePreloadPaths(): string[] {
  return [...new Set(CINEMATIC_BACKDROP_SHOTS.map((s) => s.src))];
}
