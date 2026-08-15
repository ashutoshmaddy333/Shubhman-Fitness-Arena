import type { PerformanceTier } from "@/hooks/usePerformanceTier";

export type AssetType = "character" | "equipment" | "environment" | "prop" | "hdr";

export type AnimationState = "IDLE" | "BREATHING" | "WALK" | "TRAIN" | "POSE";

export interface AssetTransform {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}

export interface AssetBounds {
  center: [number, number, number];
  size: [number, number, number];
  recommendedCameraDistance: number;
  recommendedLookAt: [number, number, number];
}

export interface BaseAssetMetadata {
  id: string;
  name: string;
  category: string;
  type: AssetType;
  available: boolean;
  path?: string;
  thumbnail?: string;
  tier: PerformanceTier;
  preload: boolean;
  preloadPriority: number;
  interactive?: boolean;
  motionId?: string;
  transform?: AssetTransform;
  bounds?: AssetBounds;
  dimensions?: [number, number, number];
  recommendedScale?: number;
}

export interface CharacterAsset extends BaseAssetMetadata {
  type: "character";
  animations?: string[];
  animationClips?: Partial<Record<AnimationState, string>>;
  defaultAnimation?: AnimationState;
}

export interface EquipmentAsset extends BaseAssetMetadata {
  type: "equipment";
  equipmentCategory:
    | "strength"
    | "free-weight"
    | "functional"
    | "cardio"
    | "recovery";
}

export interface EnvironmentAsset extends BaseAssetMetadata {
  type: "environment";
  environmentCategory:
    | "architecture"
    | "floor"
    | "wall"
    | "ceiling"
    | "fixture"
    | "branding"
    | "structural";
}

export interface PropAsset extends BaseAssetMetadata {
  type: "prop";
  instancable?: boolean;
}

export interface HDRAsset {
  id: string;
  name: string;
  type: "hdr";
  available: boolean;
  path?: string;
  category: "studio" | "gym" | "dark" | "neutral";
  preload: boolean;
  preloadPriority: number;
  intensity?: number;
}

export interface LODLevel {
  level: "LOD0" | "LOD1" | "LOD2";
  path?: string;
  distance: number;
}

export interface ModelInstanceConfig {
  assetId: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  visible?: boolean;
  castShadow?: boolean;
  receiveShadow?: boolean;
  interactive?: boolean;
  motionId?: string;
}

export type RegistryAsset =
  | CharacterAsset
  | EquipmentAsset
  | EnvironmentAsset
  | PropAsset
  | HDRAsset;
