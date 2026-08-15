import type {
  ThreeCameraMotion,
  ThreeLightMotion,
  ThreeMotionTarget,
} from "@/lib/motion/types";
import type { AnimationState } from "@/lib/three/assets/types";
import type { CinematicShotName } from "@/lib/three/cinematic/timeline.constants";

/** Ref-based 3D motion store — no React state, safe for useFrame */

export interface ObjectMotionEntry {
  progress: { current: number };
  target: ThreeMotionTarget;
  base: ThreeMotionTarget;
}

export interface CameraDebugState {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
  rotation: [number, number, number];
}

export const threeMotionStore = {
  /** Hero camera scroll progress (0–1) — hero typography subset */
  heroProgress: { current: 0 },

  /** Full homepage scroll progress (0–1) — master camera journey */
  pageProgress: { current: 0 },

  /** Active gym zone from page timeline */
  currentZone: { current: "entry" },

  /** Cinematic director state — driven by single scroll progress */
  cinematic: {
    progress: { current: 0 },
    currentShot: { current: "SHOT_01_ESTABLISHING" as CinematicShotName },
    athleteAnimation: { current: "BREATHING" as AnimationState },
    animationChanged: { current: false },
    athleteRotation: { current: 0 },
    athleteScale: { current: 1 },
    equipmentReveal: { current: 0.92 },
    atmosphereIntensity: { current: 0.15 },
    particleIntensity: { current: 0.25 },
  },

  /** Optional declarative camera override */
  camera: {
    override: null as ThreeCameraMotion | null,
    blend: { current: 0 },
    debug: null as CameraDebugState | null,
  },

  /** Per-object motion targets keyed by id */
  objects: new Map<string, ObjectMotionEntry>(),

  /** Global lighting modifiers */
  lighting: {
    ambient: { current: 1 },
    key: { current: 1 },
    fill: { current: 1 },
    rim: { current: 1 },
    override: null as ThreeLightMotion | null,
  },

  /** Environment visibility blend */
  environment: { current: 0.94 },

  /** Normalized scroll velocity — for parallax depth */
  scrollVelocity: { current: 0 },

  /** Renderer diagnostics — updated by ForgeDebugCollector */
  debug: {
    fps: { current: 0 },
    frameTime: { current: 0 },
    triangles: { current: 0 },
    drawCalls: { current: 0 },
    textures: { current: 0 },
    geometries: { current: 0 },
    models: { current: 0 },
    dpr: { current: 1 },
    textureMemoryMb: { current: 0 },
  },
};

export function registerObjectMotion(
  id: string,
  base: ThreeMotionTarget = {},
): ObjectMotionEntry {
  const entry: ObjectMotionEntry = {
    progress: { current: 0 },
    target: {},
    base,
  };
  threeMotionStore.objects.set(id, entry);
  return entry;
}

export function unregisterObjectMotion(id: string): void {
  threeMotionStore.objects.delete(id);
}

export function setHeroProgress(value: number): void {
  threeMotionStore.heroProgress.current = value;
}

export function setPageProgress(value: number): void {
  threeMotionStore.pageProgress.current = value;
}

export function setPageZone(zone: string): void {
  threeMotionStore.currentZone.current = zone;
}

export function applyCameraMotion(
  progress: number,
  from: ThreeCameraMotion,
  to: ThreeCameraMotion,
): ThreeCameraMotion {
  const t = progress * progress * (3 - 2 * progress);
  const lerp = (a: number, b: number) => a + (b - a) * t;

  return {
    position: from.position && to.position
      ? [
          lerp(from.position[0], to.position[0]),
          lerp(from.position[1], to.position[1]),
          lerp(from.position[2], to.position[2]),
        ]
      : undefined,
    lookAt: from.lookAt && to.lookAt
      ? [
          lerp(from.lookAt[0], to.lookAt[0]),
          lerp(from.lookAt[1], to.lookAt[1]),
          lerp(from.lookAt[2], to.lookAt[2]),
        ]
      : undefined,
    fov: from.fov !== undefined && to.fov !== undefined
      ? lerp(from.fov, to.fov)
      : undefined,
  };
}

export function blendObjectMotion(
  entry: ObjectMotionEntry,
  progress: number,
): ThreeMotionTarget {
  const t = progress;
  const result: ThreeMotionTarget = {};

  if (entry.base.scale !== undefined && entry.target.scale !== undefined) {
    result.scale = entry.base.scale + (entry.target.scale - entry.base.scale) * t;
  }

  if (entry.target.rotation) {
    result.rotation = entry.target.rotation;
  }

  return result;
}
