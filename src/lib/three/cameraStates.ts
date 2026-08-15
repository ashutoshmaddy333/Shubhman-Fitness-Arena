import * as THREE from "three";
import {
  CINEMATIC_TIMELINE,
  clampProgress,
  getSegmentProgress,
} from "@/lib/three/cinematic/timeline";
import type { CinematicShotName } from "@/lib/three/cinematic/timeline";
import {
  VIEWPORT_CAMERA_SCALE,
  VIEWPORT_FOV_OFFSET,
  type ViewportProfile,
} from "@/lib/three/cinematic/viewport";

export type CameraStateName =
  | "HERO_FAR"
  | "HERO_CLOSE"
  | "ATHLETE_PROFILE"
  | "ATHLETE_ORBIT"
  | "GYM_ENTRY"
  | "FINAL"
  | CinematicShotName;

export interface CameraState {
  position: THREE.Vector3Tuple;
  rotation: [number, number, number];
  fov: number;
  lookAt: THREE.Vector3Tuple;
}

/** Legacy states — preserved for reduced motion + backward compat */
export const CAMERA_STATES: Record<
  Exclude<CameraStateName, CinematicShotName>,
  CameraState
> = {
  HERO_FAR: {
    position: [0, 1.2, 12],
    rotation: [0, 0, 0],
    fov: 45,
    lookAt: [0, 1, 0],
  },
  HERO_CLOSE: {
    position: [0, 1.4, 4.5],
    rotation: [0, 0, 0],
    fov: 40,
    lookAt: [0, 1.2, 0],
  },
  ATHLETE_PROFILE: {
    position: [4, 1.5, 1],
    rotation: [0, -Math.PI / 2, 0],
    fov: 38,
    lookAt: [0, 1.2, 0],
  },
  ATHLETE_ORBIT: {
    position: [-3.5, 2, 2.5],
    rotation: [0, Math.PI / 3, 0],
    fov: 42,
    lookAt: [0, 1, 0],
  },
  GYM_ENTRY: {
    position: [0, 2, 8],
    rotation: [0, 0, 0],
    fov: 50,
    lookAt: [0, 0.5, -5],
  },
  FINAL: {
    position: [0, 1.8, 6],
    rotation: [0, 0, 0],
    fov: 48,
    lookAt: [0, 1, -2],
  },
};

/** Cinematic shot keyframes — desktop baseline */
export const CINEMATIC_CAMERA_STATES: Record<CinematicShotName, CameraState> = {
  SHOT_01_ESTABLISHING: {
    position: [0, 1.4, 14],
    rotation: [0, 0, 0],
    fov: 48,
    lookAt: [0, 0.8, 0],
  },
  SHOT_02_APPROACH: {
    position: [0, 1.3, 9],
    rotation: [0, 0, 0],
    fov: 44,
    lookAt: [0, 1, 0],
  },
  SHOT_03_ATHLETE_REVEAL: {
    position: [1.2, 1.15, 6],
    rotation: [0, -0.15, 0],
    fov: 40,
    lookAt: [0, 1.15, 0],
  },
  SHOT_04_ATHLETE_CLOSE: {
    position: [0.6, 1.35, 3.8],
    rotation: [0, -0.08, 0],
    fov: 36,
    lookAt: [0, 1.35, 0],
  },
  SHOT_05_ATHLETE_ORBIT: {
    position: [-3.2, 1.8, 2.8],
    rotation: [0, Math.PI / 3.5, 0],
    fov: 40,
    lookAt: [0, 1.2, 0],
  },
  SHOT_06_PASS_BY: {
    position: [-5, 1.6, 0.5],
    rotation: [0, Math.PI / 2.2, 0],
    fov: 44,
    lookAt: [0, 1.1, -1],
  },
  SHOT_07_GYM_REVEAL: {
    position: [-2, 2.2, 4],
    rotation: [0, 0.35, 0],
    fov: 48,
    lookAt: [0, 1, -4],
  },
  SHOT_08_GYM_ENTRY: {
    position: [0, 2, 7],
    rotation: [0, 0, 0],
    fov: 52,
    lookAt: [0, 0.8, -6],
  },
  SHOT_09_FINAL: {
    position: [0, 1.8, 6],
    rotation: [0, 0, 0],
    fov: 48,
    lookAt: [0, 1, -2],
  },
};

/** Viewport offsets applied to cinematic shots */
const VIEWPORT_OFFSETS: Record<
  ViewportProfile,
  Partial<Record<CinematicShotName, Partial<CameraState>>>
> = {
  desktop: {},
  tablet: {
    SHOT_04_ATHLETE_CLOSE: { position: [0.8, 1.35, 4.2], fov: 38 },
    SHOT_05_ATHLETE_ORBIT: { position: [-2.8, 1.9, 3.2], fov: 42 },
  },
  mobile: {
    SHOT_03_ATHLETE_REVEAL: { position: [0.8, 1.2, 7], fov: 42 },
    SHOT_04_ATHLETE_CLOSE: { position: [0.5, 1.3, 5], fov: 40 },
    SHOT_05_ATHLETE_ORBIT: { position: [-2.5, 2, 4], fov: 44 },
    SHOT_06_PASS_BY: { position: [-4, 1.8, 2], fov: 46 },
  },
};

export function lerpCameraState(
  from: CameraState,
  to: CameraState,
  t: number,
): CameraState {
  const easeT = t * t * (3 - 2 * t);

  const position = from.position.map((v, i) =>
    THREE.MathUtils.lerp(v, to.position[i], easeT),
  ) as THREE.Vector3Tuple;

  const rotation: [number, number, number] = [
    THREE.MathUtils.lerp(from.rotation[0], to.rotation[0], easeT),
    THREE.MathUtils.lerp(from.rotation[1], to.rotation[1], easeT),
    THREE.MathUtils.lerp(from.rotation[2], to.rotation[2], easeT),
  ];

  const lookAt = from.lookAt.map((v, i) =>
    THREE.MathUtils.lerp(v, to.lookAt[i], easeT),
  ) as THREE.Vector3Tuple;

  return {
    position,
    rotation,
    fov: THREE.MathUtils.lerp(from.fov, to.fov, easeT),
    lookAt,
  };
}

function applyViewportToState(
  state: CameraState,
  shot: CinematicShotName,
  profile: ViewportProfile,
): CameraState {
  const scale = VIEWPORT_CAMERA_SCALE[profile];
  const fovOffset = VIEWPORT_FOV_OFFSET[profile];
  const override = VIEWPORT_OFFSETS[profile][shot];

  const position: THREE.Vector3Tuple = override?.position ?? [
    state.position[0],
    state.position[1],
    state.position[2] * scale,
  ];

  return {
    position,
    rotation: override?.rotation ?? state.rotation,
    fov: (override?.fov ?? state.fov) + fovOffset,
    lookAt: override?.lookAt ?? state.lookAt,
  };
}

function getShotState(
  shot: CinematicShotName,
  profile: ViewportProfile,
): CameraState {
  return applyViewportToState(
    CINEMATIC_CAMERA_STATES[shot],
    shot,
    profile,
  );
}

/** Resolve camera from master cinematic timeline */
export function getCinematicCameraState(
  progress: number,
  profile: ViewportProfile = "desktop",
): CameraState {
  const p = clampProgress(progress);

  for (let i = 0; i < CINEMATIC_TIMELINE.length - 1; i++) {
    const current = CINEMATIC_TIMELINE[i];
    const next = CINEMATIC_TIMELINE[i + 1];

    if (p >= current.start && p < current.end) {
      const localT = getSegmentProgress(p, current.start, current.end);
      return lerpCameraState(
        getShotState(current.shot, profile),
        getShotState(next.shot, profile),
        localT,
      );
    }
  }

  return getShotState("SHOT_09_FINAL", profile);
}

/** Legacy hero camera — delegates to cinematic timeline */
export function getHeroCameraState(
  progress: number,
  profile: ViewportProfile = "desktop",
): CameraState {
  return getCinematicCameraState(progress, profile);
}
