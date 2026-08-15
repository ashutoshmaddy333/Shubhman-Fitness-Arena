/**
 * Deterministic asset availability — sourced from build-time manifest.
 * No runtime HEAD requests.
 */

import { ASSET_MANIFEST } from "@/lib/three/assets/manifest.generated";
import { getAssetById } from "@/lib/three/assets/registry";

let initialized = false;

export function initializeAssetAvailability(): void {
  initialized = true;
}

export function isAssetAvailabilityReady(): boolean {
  return initialized;
}

/** Check if asset file was present when manifest was generated */
export function isAssetAvailable(assetId: string): boolean {
  const manifestValue =
    ASSET_MANIFEST.assets[assetId as keyof typeof ASSET_MANIFEST.assets];
  if (manifestValue !== undefined) return manifestValue;

  const asset = getAssetById(assetId);
  return !!asset && "available" in asset && asset.available;
}

export function getAvailableAssetIds(): string[] {
  return Object.entries(ASSET_MANIFEST.assets)
    .filter(([, v]) => v)
    .map(([id]) => id);
}

export function getAssetManifest() {
  return ASSET_MANIFEST;
}

/** Hero-critical assets in preload priority order */
export const HERO_CRITICAL_ASSETS = [
  "athlete-hero",
  "gym-floor",
  "gym-walls",
  "hdr-gym-dark",
  "squat-rack",
  "barbell",
  "bench",
  "plates",
] as const;

export function isHeroAssetAvailable(
  id: (typeof HERO_CRITICAL_ASSETS)[number],
): boolean {
  return isAssetAvailable(id);
}
