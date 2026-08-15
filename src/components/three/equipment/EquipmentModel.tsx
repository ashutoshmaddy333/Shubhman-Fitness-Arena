"use client";

import type { ReactNode } from "react";
import { ModelInstance } from "@/components/three/loader/ModelInstance";
import {
  assetRegistry,
} from "@/lib/three/assets/registry";
import { isAssetAvailable } from "@/lib/three/assets/assetAvailability";
import type { ModelInstanceConfig } from "@/lib/three/assets/types";

export type EquipmentId = keyof typeof assetRegistry.equipment;

export interface EquipmentModelProps extends Omit<ModelInstanceConfig, "assetId"> {
  equipmentId: EquipmentId;
  fallback?: ReactNode;
}

/** Equipment model with registry lookup + fallback */
export function EquipmentModel({
  equipmentId,
  fallback = null,
  ...config
}: EquipmentModelProps) {
  const asset = assetRegistry.equipment[equipmentId];
  const available = isAssetAvailable(asset.id);

  if (!available) {
    return <>{fallback}</>;
  }

  return (
    <ModelInstance
      assetId={asset.id}
      fallback={fallback}
      {...config}
    />
  );
}

export function getEquipmentBounds(equipmentId: EquipmentId) {
  const asset = assetRegistry.equipment[equipmentId];
  return "bounds" in asset ? asset.bounds : undefined;
}
