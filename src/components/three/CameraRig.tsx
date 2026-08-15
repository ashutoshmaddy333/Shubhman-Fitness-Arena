"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  applyCameraState,
  resolveCameraState,
} from "@/lib/three/cameraController";
import { updateCinematicDirector } from "@/lib/three/cinematic/director";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

export function CameraRig() {
  const { camera } = useThree();
  const { pageProgress } = useScrollProgress();
  const { reducedMotion } = useReducedMotionContext();
  const currentFov = useRef(45);

  useFrame(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    const progress = pageProgress.current;
    updateCinematicDirector(progress);

    const state = resolveCameraState(progress, reducedMotion);
    applyCameraState(
      camera,
      state,
      currentFov,
      reducedMotion ? 1 : 0.2,
    );
  });

  return null;
}
