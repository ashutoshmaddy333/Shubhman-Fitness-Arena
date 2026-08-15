import type { CameraState } from "@/lib/three/cameraStates";

/** Extended page camera keyframes — maps full homepage scroll (0–1) */
export interface PageCameraKeyframe {
  progress: number;
  state: CameraState;
  zone: string;
}

export const PAGE_CAMERA_KEYFRAMES: readonly PageCameraKeyframe[] = [
  {
    progress: 0,
    zone: "entry",
    state: {
      position: [2.8, 1.55, 7.5],
      rotation: [0, 0, 0],
      fov: 50,
      lookAt: [-0.5, 1.25, -7],
    },
  },
  {
    progress: 0.05,
    zone: "entry",
    state: {
      position: [2.2, 1.45, 6.5],
      rotation: [0, 0.04, 0],
      fov: 48,
      lookAt: [-0.3, 1.2, -7],
    },
  },
  {
    progress: 0.11,
    zone: "entry",
    state: {
      position: [0.8, 1.2, 7],
      rotation: [0, -0.12, 0],
      fov: 42,
      lookAt: [0, 1.1, 0],
    },
  },
  {
    progress: 0.19,
    zone: "athlete",
    state: {
      position: [0.5, 1.35, 4],
      rotation: [0, -0.08, 0],
      fov: 38,
      lookAt: [0, 1.25, 0],
    },
  },
  {
    progress: 0.24,
    zone: "equipment",
    state: {
      position: [1.8, 0.8, 2.5],
      rotation: [0, -0.4, 0],
      fov: 35,
      lookAt: [1.5, 0.4, -2],
    },
  },
  {
    progress: 0.28,
    zone: "equipment",
    state: {
      position: [-1.2, 1.0, 1.5],
      rotation: [0, 0.5, 0],
      fov: 38,
      lookAt: [-2, 1.2, -3],
    },
  },
  {
    progress: 0.36,
    zone: "strength",
    state: {
      position: [-3, 1.8, 3],
      rotation: [0, 0.7, 0],
      fov: 44,
      lookAt: [-2, 1, -4],
    },
  },
  {
    progress: 0.44,
    zone: "performance",
    state: {
      position: [4, 1.6, 2],
      rotation: [0, -0.8, 0],
      fov: 46,
      lookAt: [3, 0.8, -3],
    },
  },
  {
    progress: 0.58,
    zone: "facility",
    state: {
      position: [0, 2.2, 8],
      rotation: [0, 0, 0],
      fov: 50,
      lookAt: [0, 1, -6],
    },
  },
  {
    progress: 0.72,
    zone: "facility",
    state: {
      position: [-2, 1.4, 5],
      rotation: [0, 0.35, 0],
      fov: 42,
      lookAt: [0.5, 0.6, -2],
    },
  },
  {
    progress: 0.78,
    zone: "details",
    state: {
      position: [0.8, 0.6, 1.8],
      rotation: [0, -0.3, 0],
      fov: 32,
      lookAt: [0.8, 0.15, -2.2],
    },
  },
  {
    progress: 0.96,
    zone: "final",
    state: {
      position: [0, 2.5, 10],
      rotation: [0, 0, 0],
      fov: 52,
      lookAt: [0, 1, -4],
    },
  },
  {
    progress: 1,
    zone: "final",
    state: {
      position: [0, 2, 8],
      rotation: [0, 0, 0],
      fov: 50,
      lookAt: [0, 1.2, -3],
    },
  },
] as const;

export function getPageZone(progress: number): string {
  const p = Math.min(1, Math.max(0, progress));
  let zone = PAGE_CAMERA_KEYFRAMES[0].zone;
  for (const keyframe of PAGE_CAMERA_KEYFRAMES) {
    if (p >= keyframe.progress) zone = keyframe.zone;
  }
  return zone;
}

/** Map page progress to hero-equivalent cinematic progress (0–1) for director */
export function getHeroEquivalentProgress(pageProgress: number): number {
  const heroShare = 0.11;
  if (pageProgress <= heroShare) {
    return pageProgress / heroShare;
  }
  return 1;
}
