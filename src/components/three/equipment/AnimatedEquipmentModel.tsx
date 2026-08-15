"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCachedGLTF, cloneGLTFScene } from "@/lib/three/loader/modelCache";
import { disposeGLTFScene } from "@/lib/three/loader/dispose";
import { getAssetById } from "@/lib/three/assets/registry";
import { enhanceGymMaterials } from "@/lib/three/materials/enhanceMaterials";
import { shouldCastShadow } from "@/lib/three/lighting/shadowConfig";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import type { EquipmentId } from "@/components/three/equipment/EquipmentModel";

export interface AnimatedEquipmentModelProps {
  equipmentId: EquipmentId;
  clipName?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  castShadow?: boolean;
}

function AnimatedEquipmentGLB({
  equipmentId,
  clipName,
  position,
  rotation,
  scale = 1,
  castShadow,
}: AnimatedEquipmentModelProps) {
  const tier = usePerformanceTier();
  const { reducedMotion } = useReducedMotionContext();
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  const asset = getAssetById(equipmentId);
  const gltf = useCachedGLTF(asset?.path ?? "");
  const scene = useMemo(() => {
    const cloned = cloneGLTFScene(gltf);
    enhanceGymMaterials(cloned);
    return cloned;
  }, [gltf]);

  useEffect(() => {
    if (!gltf.animations.length) return;

    const mixer = new THREE.AnimationMixer(scene);
    const clip =
      gltf.animations.find((a) => a.name === clipName) ?? gltf.animations[0];
    if (clip) {
      mixer.clipAction(clip).setLoop(THREE.LoopRepeat, Infinity).play();
    }
    mixerRef.current = mixer;

    return () => {
      mixer.stopAllAction();
      mixerRef.current = null;
    };
  }, [gltf.animations, scene, clipName]);

  useEffect(() => () => disposeGLTFScene(scene), [scene]);

  useFrame((_, delta) => {
    if (!reducedMotion) mixerRef.current?.update(delta);
  });

  const cast = castShadow ?? shouldCastShadow(tier, "equipment");
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = cast;
      child.receiveShadow = true;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

/** Equipment GLB with embedded skeletal / transform animation clips */
export function AnimatedEquipmentModel(props: AnimatedEquipmentModelProps) {
  return (
    <Suspense fallback={null}>
      <AnimatedEquipmentGLB {...props} />
    </Suspense>
  );
}
