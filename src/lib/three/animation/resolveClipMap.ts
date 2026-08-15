import type { AnimationState } from "@/lib/three/assets/types";
import type * as THREE from "three";

const CLIP_ALIASES: Record<AnimationState, string[]> = {
  IDLE: ["idle", "Idle", "IDLE"],
  BREATHING: ["breathing", "breath", "Breathing", "idle_breathing"],
  WALK: ["walk", "walking", "Walk"],
  TRAIN: ["train", "training", "workout", "Train"],
  POSE: ["pose", "hero", "Pose"],
};

/** Map animation states to actual GLB clip names — graceful fallback */
export function resolveAnimationClipMap(
  animations: THREE.AnimationClip[],
  registryMap: Partial<Record<AnimationState, string>> = {},
): Partial<Record<AnimationState, string>> {
  if (!animations.length) return {};

  const findClip = (candidates: string[]): string | undefined => {
    for (const name of candidates) {
      const lower = name.toLowerCase();
      const exact = animations.find((a) => a.name.toLowerCase() === lower);
      if (exact) return exact.name;
      const partial = animations.find((a) =>
        a.name.toLowerCase().includes(lower),
      );
      if (partial) return partial.name;
    }
    return undefined;
  };

  const resolved: Partial<Record<AnimationState, string>> = {};

  (Object.keys(CLIP_ALIASES) as AnimationState[]).forEach((state) => {
    const registryName = registryMap[state];
    const candidates = registryName
      ? [registryName, ...CLIP_ALIASES[state]]
      : CLIP_ALIASES[state];
    const clip = findClip(candidates);
    if (clip) resolved[state] = clip;
  });

  if (!resolved.IDLE && animations[0]) {
    resolved.IDLE = animations[0].name;
  }

  return resolved;
}
