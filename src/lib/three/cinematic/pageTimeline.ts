import {
  PAGE_CAMERA_KEYFRAMES,
  getPageZone,
  getHeroEquivalentProgress,
} from "@/lib/three/cinematic/pageTimeline.constants";
import { lerpCameraState } from "@/lib/three/cameraStates";
import type { CameraState } from "@/lib/three/cameraStates";
import { clampProgress } from "@/lib/three/cinematic/timeline.constants";
import type { AnimationState } from "@/lib/three/assets/types";

/** Minimum visibility on first viewport — gym must read immediately */
const BASE_ENV_REVEAL = 0.94;
const BASE_EQUIP_REVEAL = 0.92;

export { getPageZone, getHeroEquivalentProgress };

export function getPageCameraState(progress: number): CameraState {
  const p = clampProgress(progress);
  const frames = PAGE_CAMERA_KEYFRAMES;

  for (let i = 0; i < frames.length - 1; i++) {
    const current = frames[i];
    const next = frames[i + 1];

    if (p >= current.progress && p < next.progress) {
      const range = next.progress - current.progress;
      const t = range > 0 ? (p - current.progress) / range : 0;
      return lerpCameraState(current.state, next.state, t);
    }
  }

  return frames[frames.length - 1].state;
}

/** Lighting preset blend across full page journey */
export function getPageLightingBlend(progress: number): {
  from: "DARK" | "HERO" | "DRAMATIC" | "TRAINING" | "STUDIO";
  to: "DARK" | "HERO" | "DRAMATIC" | "TRAINING" | "STUDIO";
  blend: number;
} {
  const p = clampProgress(progress);

  if (p < 0.11) return { from: "HERO", to: "HERO", blend: 1 };
  if (p < 0.28) return { from: "HERO", to: "DRAMATIC", blend: (p - 0.11) / 0.17 };
  if (p < 0.44) return { from: "DRAMATIC", to: "TRAINING", blend: (p - 0.28) / 0.16 };
  if (p < 0.72) return { from: "TRAINING", to: "STUDIO", blend: (p - 0.44) / 0.28 };
  if (p < 0.96) return { from: "STUDIO", to: "HERO", blend: (p - 0.72) / 0.24 };
  return { from: "HERO", to: "TRAINING", blend: (p - 0.96) / 0.04 };
}

export function getPageEnvironmentReveal(progress: number): number {
  const p = clampProgress(progress);
  if (p < 0.06) {
    return BASE_ENV_REVEAL + (p / 0.06) * (1 - BASE_ENV_REVEAL);
  }
  return 1;
}

export function getPageEquipmentReveal(progress: number): number {
  const p = clampProgress(progress);
  if (p < 0.08) {
    return BASE_EQUIP_REVEAL + (p / 0.08) * (1 - BASE_EQUIP_REVEAL);
  }
  return 1;
}

/** Page-scroll athlete choreography — visible motion from first viewport */
export function getPageAthleteAnimationState(progress: number): AnimationState {
  const p = clampProgress(progress);

  if (p < 0.1) return "BREATHING";
  if (p < 0.2) return "IDLE";
  if (p < 0.32) return "WALK";
  if (p < 0.48) return "TRAIN";
  if (p < 0.58) return "POSE";
  if (p < 0.82) return "BREATHING";
  return "IDLE";
}
