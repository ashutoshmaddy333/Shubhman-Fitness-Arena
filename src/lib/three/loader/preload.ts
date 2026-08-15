import {
  assetRegistry,
  getAssetById,
} from "@/lib/three/assets/registry";
import { isAssetAvailable } from "@/lib/three/assets/assetAvailability";
import { markModelLoaded, preloadAsset, preloadRegistryAssets } from "./modelCache";
import { getCinematicImagePreloadPaths } from "@/lib/three/cinematic/cinematicBackdrops";
import { getAllBackdropImagePaths } from "@/lib/content/backdropImages";
import { getAllSiteImagePaths, getNavImagePaths } from "@/lib/content/siteImages";
import { getAllSectionContentImagePaths } from "@/lib/content/sectionContentImages";
import { TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export type HDREnvironmentId = keyof typeof assetRegistry.hdr;

export { preloadAsset, preloadModel, preloadRegistryAssets } from "./modelCache";

/** Preload HDR environment when asset becomes available */
export function preloadEnvironment(_hdrId: HDREnvironmentId): void {
  const hdr = assetRegistry.hdr[_hdrId];
  if (!hdr.available || !hdr.path) return;
  // HDR eager preload deferred — drei Environment handles lazy load when files exist
}

export function preloadAssetById(assetId: string): void {
  if (isAssetAvailable(assetId)) {
    preloadAsset(assetId);
  }
}

/** Preload hero-critical assets that exist on disk */
export function preloadHeroAssets(): void {
  HERO_PRELOAD_IDS.forEach(preloadAssetById);
  preloadRegistryAssets();
}

/** Resolve hero GLB + cinematic image paths for loading screen */
export function getHeroPreloadPaths(): string[] {
  const glbPaths = HERO_PRELOAD_IDS.map((id) => getAssetById(id))
    .filter(
      (asset): asset is NonNullable<typeof asset> & { path: string } =>
        !!asset && "path" in asset && !!asset.path && isAssetAvailable(asset.id),
    )
    .map((asset) => asset.path);

  return [
    ...new Set([
      ...glbPaths,
      ...getCinematicImagePreloadPaths(),
      ...getAllBackdropImagePaths(),
      ...getAllSiteImagePaths(),
      ...getAllSectionContentImagePaths(),
      ...getNavImagePaths(),
    ]),
  ];
}

/** Await real GLB preload — no fake progress; resolves when all loads finish or fail */
export function preloadHeroAssetsAsync(
  onProgress?: (loaded: number, total: number) => void,
): Promise<void> {
  const paths = getHeroPreloadPaths();
  if (paths.length === 0) {
    onProgress?.(0, 0);
    return Promise.resolve();
  }

  const loader = new GLTFLoader();
  const textureLoader = new TextureLoader();
  let loaded = 0;
  const total = paths.length;

  return Promise.all(
    paths.map(
      (path) =>
        new Promise<void>((resolve) => {
          if (path.endsWith(".glb")) {
            loader.load(
              path,
              () => {
                markModelLoaded(path);
                loaded += 1;
                onProgress?.(loaded, total);
                resolve();
              },
              undefined,
              () => {
                loaded += 1;
                onProgress?.(loaded, total);
                resolve();
              },
            );
            return;
          }

          textureLoader.load(
            path,
            () => {
              loaded += 1;
              onProgress?.(loaded, total);
              resolve();
            },
            undefined,
            () => {
              loaded += 1;
              onProgress?.(loaded, total);
              resolve();
            },
          );
        }),
    ),
  ).then(() => undefined);
}

const HERO_PRELOAD_IDS = [
  "athlete-hero",
  "gym-floor",
  "gym-walls",
  "squat-rack",
  "barbell",
  "bench",
  "hdr-gym-dark",
] as const;
