import { getAssetById } from "./registry";

export { assetRegistry, getAssetById, getPreloadQueue, isAssetLoadable } from "./registry";
export type {
  AnimationState,
  AssetBounds,
  AssetTransform,
  AssetType,
  CharacterAsset,
  EnvironmentAsset,
  EquipmentAsset,
  HDRAsset,
  ModelInstanceConfig,
  PropAsset,
  RegistryAsset,
} from "./types";
export { ASSET_PATHS, hdrPath, modelPath } from "./paths";

export function getAssetCameraHints(assetId: string) {
  const asset = getAssetById(assetId);
  if (!asset || !("bounds" in asset)) return null;
  return asset.bounds ?? null;
}
