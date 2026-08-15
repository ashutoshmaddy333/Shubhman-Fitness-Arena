import * as THREE from "three";
import {
  CAMERA_STATES,
  getCinematicCameraState,
  type CameraState,
} from "@/lib/three/cameraStates";
import { getPageCameraState } from "@/lib/three/cinematic/pageTimeline";
import { threeMotionStore } from "@/lib/three/threeMotionStore";

const _lookAt = new THREE.Vector3();

export interface CameraControllerState {
  position: THREE.Vector3Tuple;
  lookAt: THREE.Vector3Tuple;
  fov: number;
}

/** Resolve camera from full page progress (master journey) */
export function resolveCameraState(
  pageProgress: number,
  reducedMotion: boolean,
): CameraControllerState {
  if (reducedMotion) {
    const staticState = CAMERA_STATES.HERO_FAR;
    return {
      position: staticState.position,
      lookAt: staticState.lookAt,
      fov: staticState.fov,
    };
  }

  const state: CameraState = getPageCameraState(pageProgress);
  const override = threeMotionStore.camera.override;

  if (!override) {
    return {
      position: state.position,
      lookAt: state.lookAt,
      fov: state.fov,
    };
  }

  return {
    position: override.position ?? state.position,
    lookAt: override.lookAt ?? state.lookAt,
    fov: override.fov ?? state.fov,
  };
}

/** Apply resolved state to a Three.js perspective camera */
export function applyCameraState(
  camera: THREE.PerspectiveCamera,
  state: CameraControllerState,
  currentFov: { current: number },
  lerpFactor = 0.08,
): void {
  camera.position.set(...state.position);
  _lookAt.set(...state.lookAt);
  camera.lookAt(_lookAt);

  currentFov.current = THREE.MathUtils.lerp(
    currentFov.current,
    state.fov,
    lerpFactor,
  );
  camera.fov = currentFov.current;
  camera.updateProjectionMatrix();

  if (process.env.NODE_ENV === "development") {
    threeMotionStore.camera.debug = {
      position: [camera.position.x, camera.position.y, camera.position.z],
      lookAt: [...state.lookAt],
      fov: camera.fov,
      rotation: [camera.rotation.x, camera.rotation.y, camera.rotation.z],
    };
  }
}

export { CAMERA_STATES, getCinematicCameraState as getHeroCameraState };
