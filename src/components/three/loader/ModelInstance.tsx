"use client";

import { ModelErrorBoundary } from "@/components/three/loader/ModelErrorBoundary";
import {
  ModelLoader,
  type ModelLoaderProps,
} from "@/components/three/loader/ModelLoader";
import { getAssetById } from "@/lib/three/assets/registry";
import type { AssetTransform } from "@/lib/three/assets/types";

export interface ModelInstanceProps extends Omit<ModelLoaderProps, "assetId"> {
  assetId: string;
  fallback?: React.ReactNode;
}

/** Reusable model instance with error boundary + registry defaults */
export function ModelInstance({
  assetId,
  fallback = null,
  position,
  rotation,
  scale,
  visible,
  castShadow,
  receiveShadow,
  interactive,
  motionId,
}: ModelInstanceProps) {
  const asset = getAssetById(assetId);
  const transform = (asset && "transform" in asset ? asset.transform : {}) as AssetTransform;

  const resolvedPosition = position ?? transform.position;
  const resolvedRotation = rotation ?? transform.rotation;
  const resolvedScale = scale ?? transform.scale;

  return (
    <ModelErrorBoundary fallback={fallback}>
      <ModelLoader
        assetId={assetId}
        fallback={fallback}
        position={resolvedPosition}
        rotation={resolvedRotation}
        scale={resolvedScale}
        visible={visible}
        castShadow={castShadow}
        receiveShadow={receiveShadow}
        interactive={interactive}
        motionId={motionId}
      />
    </ModelErrorBoundary>
  );
}
