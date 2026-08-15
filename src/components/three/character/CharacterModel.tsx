"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { assetRegistry } from "@/lib/three/assets/registry";
import { ModelErrorBoundary } from "@/components/three/loader/ModelErrorBoundary";
import { PlaceholderObject } from "@/components/three/PlaceholderObject";
import { CharacterAnimationController } from "@/lib/three/animation/CharacterAnimationController";
import { resolveAnimationClipMap } from "@/lib/three/animation/resolveClipMap";
import { useCachedGLTF, cloneGLTFScene } from "@/lib/three/loader/modelCache";
import { disposeGLTFScene } from "@/lib/three/loader/dispose";
import { enhanceGymMaterials } from "@/lib/three/materials/enhanceMaterials";
import type { AnimationState } from "@/lib/three/assets/types";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import {
  applyMotionToObject,
  useThreeObjectMotion,
} from "@/hooks/useThreeObjectMotion";
import { blendObjectMotion, threeMotionStore } from "@/lib/three/threeMotionStore";
import { consumeAnimationChange } from "@/lib/three/cinematic/director";
import { isAssetAvailable } from "@/lib/three/assets/assetAvailability";

const ASSET_ID = "athlete-hero";
const characterAsset = assetRegistry.characters[ASSET_ID];

interface CharacterGLBProps {
  animationState?: AnimationState;
}

function CharacterGLB({ animationState }: CharacterGLBProps) {
  const groupRef = useRef<THREE.Group>(null);
  const controllerRef = useRef<CharacterAnimationController | null>(null);
  const lastAnimRef = useRef<AnimationState>("IDLE");
  const { reducedMotion } = useReducedMotionContext();
  const motionEntry = useThreeObjectMotion(characterAsset.motionId ?? ASSET_ID, {});

  const gltf = useCachedGLTF(characterAsset.path!);
  const scene = useMemo(() => {
    const cloned = cloneGLTFScene(gltf);
    enhanceGymMaterials(cloned);
    return cloned;
  }, [gltf]);

  useEffect(() => {
    if (!gltf.animations.length) return;

    const clipMap = resolveAnimationClipMap(
      gltf.animations,
      characterAsset.animationClips ?? {},
    );

    controllerRef.current = new CharacterAnimationController(
      scene,
      gltf.animations,
      clipMap,
    );
    controllerRef.current.play(characterAsset.defaultAnimation ?? "BREATHING");

    return () => {
      controllerRef.current?.dispose();
      controllerRef.current = null;
    };
  }, [gltf.animations, scene]);

  useEffect(() => {
    if (animationState) {
      controllerRef.current?.play(animationState);
      lastAnimRef.current = animationState;
    }
  }, [animationState]);

  useEffect(() => () => disposeGLTFScene(scene), [scene]);

  useFrame((_, delta) => {
    if (reducedMotion) return;

    controllerRef.current?.update(delta);

    if (!animationState && consumeAnimationChange()) {
      const next = threeMotionStore.cinematic.athleteAnimation.current;
      if (next !== lastAnimRef.current) {
        controllerRef.current?.play(next);
        lastAnimRef.current =
          controllerRef.current?.getCurrentState() ?? lastAnimRef.current;
      }
    }

    const group = groupRef.current;
    const entry = motionEntry.current;
    if (!group || !entry) return;

    applyMotionToObject(group, blendObjectMotion(entry, entry.progress.current));
  });

  return (
    <group ref={groupRef} data-cursor="explore">
      <primitive object={scene} />
    </group>
  );
}

export interface CharacterModelProps {
  animationState?: AnimationState;
  /** When true, animation is driven by cinematic director */
  cinematic?: boolean;
}

export function CharacterModel({
  animationState,
  cinematic = false,
}: CharacterModelProps) {
  const available = isAssetAvailable(ASSET_ID);

  if (!available || !characterAsset.path) {
    return <PlaceholderObject />;
  }

  return (
    <ModelErrorBoundary fallback={<PlaceholderObject />}>
      <Suspense fallback={<PlaceholderObject />}>
        <CharacterGLB animationState={cinematic ? undefined : animationState} />
      </Suspense>
    </ModelErrorBoundary>
  );
}

export function getCharacterBounds() {
  return characterAsset.bounds;
}
