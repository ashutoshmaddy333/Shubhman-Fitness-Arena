"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  registerObjectMotion,
  unregisterObjectMotion,
  type ObjectMotionEntry,
} from "@/lib/three/threeMotionStore";
import type { ThreeMotionTarget } from "@/lib/motion/types";

/**
 * Registers a 3D object for scroll-driven motion.
 * Returns entry ref for useFrame updates — no React state.
 */
export function useThreeObjectMotion(
  id: string,
  base: ThreeMotionTarget = {},
): React.MutableRefObject<ObjectMotionEntry | null> {
  const entryRef = useRef<ObjectMotionEntry | null>(null);

  useEffect(() => {
    entryRef.current = registerObjectMotion(id, base);
    return () => {
      unregisterObjectMotion(id);
      entryRef.current = null;
    };
    // base is intentionally stable — pass memoized object from caller
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return entryRef;
}

/** Apply blended motion target to a Three.js object in useFrame */
export function applyMotionToObject(
  object: THREE.Object3D,
  target: ThreeMotionTarget,
): void {
  if (target.position) object.position.set(...target.position);
  if (target.rotation) object.rotation.set(...target.rotation);
  if (target.scale !== undefined) object.scale.setScalar(target.scale);
}
