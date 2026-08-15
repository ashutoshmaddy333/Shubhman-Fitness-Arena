"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCachedGLTF, cloneGLTFScene } from "@/lib/three/loader/modelCache";
import { disposeGLTFScene } from "@/lib/three/loader/dispose";
import { enhanceGymMaterials } from "@/lib/three/materials/enhanceMaterials";
import {
  getAssetById,
  isAssetLoadable,
} from "@/lib/three/assets/registry";
import { isAssetAvailable } from "@/lib/three/assets/assetAvailability";
import type { BaseAssetMetadata, ModelInstanceConfig } from "@/lib/three/assets/types";
import { shouldCastShadow } from "@/lib/three/lighting/shadowConfig";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";
import {
  applyMotionToObject,
  useThreeObjectMotion,
} from "@/hooks/useThreeObjectMotion";
import { blendObjectMotion } from "@/lib/three/threeMotionStore";

interface LoadedModelProps {
  path: string;
  config: ModelInstanceConfig;
  category: string;
}

function LoadedModel({ path, config, category }: LoadedModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const tier = usePerformanceTier();
  const motionEntry = useThreeObjectMotion(
    config.motionId ?? config.assetId,
    {},
  );

  const gltf = useCachedGLTF(path);
  const scene = useMemo(() => {
    const cloned = cloneGLTFScene(gltf);
    enhanceGymMaterials(cloned);
    return cloned;
  }, [gltf]);

  useEffect(() => () => disposeGLTFScene(scene), [scene]);

  useEffect(() => {
    if (groupRef.current) applyTransform(groupRef.current, config);
  }, [config]);

  useFrame(() => {
    const group = groupRef.current;
    const entry = motionEntry.current;
    if (!group || !entry) return;
    applyMotionToObject(group, blendObjectMotion(entry, entry.progress.current));
  });

  const cast = config.castShadow ?? shouldCastShadow(tier, category);
  const receive = config.receiveShadow ?? true;

  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = cast;
      child.receiveShadow = receive;
    }
  });

  return (
    <group
      ref={groupRef}
      visible={config.visible ?? true}
      data-cursor={config.interactive ? "explore" : undefined}
    >
      <primitive object={scene} />
    </group>
  );
}

function applyTransform(object: THREE.Object3D, config: ModelInstanceConfig) {
  if (config.position) object.position.set(...config.position);
  if (config.rotation) object.rotation.set(...config.rotation);
  if (config.scale !== undefined) {
    if (typeof config.scale === "number") object.scale.setScalar(config.scale);
    else object.scale.set(...config.scale);
  }
}

export interface ModelLoaderProps extends ModelInstanceConfig {
  fallback?: React.ReactNode;
}

export function ModelLoader({ assetId, fallback = null, ...cfg }: ModelLoaderProps) {
  const asset = getAssetById(assetId);
  const available =
    isAssetAvailable(assetId) || (asset && isAssetLoadable(asset));
  if (!available || !asset || asset.type === "hdr" || !asset.path) {
    return <>{fallback}</>;
  }

  const modelAsset = asset as BaseAssetMetadata & { path: string };

  const config: ModelInstanceConfig = {
    assetId,
    ...cfg,
    motionId: cfg.motionId ?? modelAsset.motionId,
    interactive: cfg.interactive ?? modelAsset.interactive,
  };

  return (
    <Suspense fallback={null}>
      <LoadedModel
        path={modelAsset.path}
        config={config}
        category={modelAsset.category}
      />
    </Suspense>
  );
}
