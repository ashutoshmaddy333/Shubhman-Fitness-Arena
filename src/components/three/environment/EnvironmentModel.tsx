"use client";

import type { ReactNode } from "react";
import { ModelInstance } from "@/components/three/loader/ModelInstance";
import {
  assetRegistry,
} from "@/lib/three/assets/registry";
import { isAssetAvailable } from "@/lib/three/assets/assetAvailability";
import type { ModelInstanceConfig } from "@/lib/three/assets/types";

export type EnvironmentAssetId = keyof typeof assetRegistry.environments;

export interface EnvironmentModelProps extends Omit<ModelInstanceConfig, "assetId"> {
  environmentId: EnvironmentAssetId;
  fallback?: ReactNode;
}

/** Modular environment piece — not the full gym */
export function EnvironmentModel({
  environmentId,
  fallback = null,
  ...config
}: EnvironmentModelProps) {
  const asset = assetRegistry.environments[environmentId];
  const available = isAssetAvailable(asset.id);

  if (!available) {
    return <>{fallback}</>;
  }

  return (
    <ModelInstance
      assetId={asset.id}
      fallback={fallback}
      receiveShadow
      castShadow={false}
      {...config}
    />
  );
}

export function getEnvironmentBounds(environmentId: EnvironmentAssetId) {
  const asset = assetRegistry.environments[environmentId];
  return "bounds" in asset ? asset.bounds : undefined;
}
