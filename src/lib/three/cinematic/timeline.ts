import type { LightingPresetName } from "@/lib/three/lighting/presets";
import {
  CINEMATIC_TIMELINE,
  clampProgress,
  getSegmentProgress,
  lerp,
  type CinematicShotRange,
} from "@/lib/three/cinematic/timeline.constants";

export type {
  CinematicShotName,
  CinematicShotRange,
  CinematicEventName,
} from "@/lib/three/cinematic/timeline.constants";

export {
  CINEMATIC_TIMELINE,
  CINEMATIC_EVENT_THRESHOLDS,
  getAthleteAnimationState,
} from "@/lib/three/cinematic/timeline.constants";

export function getCurrentShot(progress: number): CinematicShotRange {
  const p = clampProgress(progress);
  const shot =
    CINEMATIC_TIMELINE.find((s) => p >= s.start && p < s.end) ??
    CINEMATIC_TIMELINE[CINEMATIC_TIMELINE.length - 1];
  return shot;
}

export function getShotLocalProgress(progress: number): number {
  const p = clampProgress(progress);
  const shot = getCurrentShot(p);
  const range = shot.end - shot.start;
  if (range <= 0) return 0;
  return clampProgress((p - shot.start) / range);
}

export { getSegmentProgress, clampProgress };

/** Lighting preset blend targets across cinematic progress */
export function getLightingBlend(progress: number): {
  from: LightingPresetName;
  to: LightingPresetName;
  blend: number;
} {
  const p = clampProgress(progress);

  if (p < 0.25) {
    return { from: "DARK", to: "HERO", blend: p / 0.25 };
  }
  if (p < 0.7) {
    return { from: "HERO", to: "DRAMATIC", blend: (p - 0.25) / 0.45 };
  }
  return { from: "DRAMATIC", to: "TRAINING", blend: (p - 0.7) / 0.3 };
}

/** Environment visibility 0→1 */
export function getEnvironmentReveal(progress: number): number {
  return getSegmentProgress(progress, 0.05, 0.92);
}

/** Equipment visibility 0→1 */
export function getEquipmentReveal(progress: number): number {
  return getSegmentProgress(progress, 0.7, 0.95);
}

/** Athlete rotation target (radians) for placeholder / subtle motion */
export function getAthleteRotation(progress: number): number {
  const p = clampProgress(progress);
  if (p < 0.5) return 0;
  if (p < 0.7) return getSegmentProgress(p, 0.5, 0.7) * Math.PI * 0.35;
  if (p < 0.82) return Math.PI * 0.35;
  return lerp(
    Math.PI * 0.35,
    Math.PI * 0.15,
    getSegmentProgress(p, 0.82, 1),
  );
}

/** Athlete scale for cinematic emphasis */
export function getAthleteScale(progress: number): number {
  const p = clampProgress(progress);
  if (p < 0.25) return lerp(0.85, 0.95, p / 0.25);
  if (p < 0.55) return lerp(0.95, 1.05, (p - 0.25) / 0.3);
  return lerp(1.05, 1.0, (p - 0.55) / 0.45);
}

/** Atmosphere intensity */
export function getAtmosphereIntensity(progress: number): number {
  return getSegmentProgress(progress, 0.15, 0.85) * 0.8;
}

/** Particle density multiplier */
export function getParticleIntensity(progress: number): number {
  return lerp(0.2, 1, getSegmentProgress(progress, 0.1, 0.75));
}
