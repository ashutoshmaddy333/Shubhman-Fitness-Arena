import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { getPreloadQueue, getAssetById } from "@/lib/three/assets/registry";

const loadedPaths = new Set<string>();

export function markModelLoaded(path: string): void {
  loadedPaths.add(path);
}

export function isModelCached(path: string): boolean {
  return loadedPaths.has(path);
}

export function getLoadedModelPaths(): string[] {
  return Array.from(loadedPaths);
}

export function preloadModel(path: string): void {
  if (loadedPaths.has(path)) return;
  useGLTF.preload(path);
  loadedPaths.add(path);
}

export function preloadModels(paths: string[]): void {
  paths.forEach(preloadModel);
}

export function preloadAsset(assetId: string): void {
  const asset = getAssetById(assetId);
  if (asset && "path" in asset && asset.path && asset.available) {
    preloadModel(asset.path);
  }
}

export function preloadRegistryAssets(): void {
  preloadModels(getPreloadQueue());
}

export function cloneGLTFScene(gltf: GLTF): THREE.Group {
  return gltf.scene.clone(true) as THREE.Group;
}

export function useCachedGLTF(path: string): GLTF {
  const gltf = useGLTF(path);
  markModelLoaded(path);
  return gltf;
}
