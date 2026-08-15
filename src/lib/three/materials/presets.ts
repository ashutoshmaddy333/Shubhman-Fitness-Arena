import * as THREE from "three";
import { COLORS } from "@/lib/constants/tokens";

export interface MaterialPreset {
  color?: string | number;
  metalness: number;
  roughness: number;
  emissive?: string | number;
  emissiveIntensity?: number;
  transparent?: boolean;
  opacity?: number;
}

export const MATERIAL_PRESETS = {
  metal: { metalness: 0.85, roughness: 0.25 },
  rubber: { metalness: 0.05, roughness: 0.85 },
  concrete: { metalness: 0.1, roughness: 0.9 },
  glass: { metalness: 0.0, roughness: 0.05, transparent: true, opacity: 0.4 },
  wood: { metalness: 0.0, roughness: 0.65 },
  fabric: { metalness: 0.0, roughness: 0.95 },
  skin: { metalness: 0.0, roughness: 0.55 },
  plastic: { metalness: 0.1, roughness: 0.45 },
} as const satisfies Record<string, MaterialPreset>;

export type MaterialPresetName = keyof typeof MATERIAL_PRESETS;

export function createMaterialFromPreset(
  preset: MaterialPresetName,
  overrides: Partial<MaterialPreset> = {},
): THREE.MeshStandardMaterial {
  const base = MATERIAL_PRESETS[preset] as MaterialPreset;
  return new THREE.MeshStandardMaterial({
    color: overrides.color ?? COLORS.surfaceElevated,
    metalness: overrides.metalness ?? base.metalness,
    roughness: overrides.roughness ?? base.roughness,
    emissive: overrides.emissive,
    emissiveIntensity: overrides.emissiveIntensity,
    transparent: overrides.transparent ?? base.transparent ?? false,
    opacity: overrides.opacity ?? base.opacity ?? 1,
  });
}

export function configureTexture(
  texture: THREE.Texture,
  maxAnisotropy: number,
): void {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
}

export const TEXTURE_DEFAULTS = {
  maxSizeHigh: 2048,
  maxSizeMedium: 1024,
  maxSizeLow: 512,
  defaultAnisotropy: 4,
} as const;
