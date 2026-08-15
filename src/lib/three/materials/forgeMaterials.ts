import { COLORS } from "@/lib/constants/tokens";
import { createMaterialFromPreset } from "@/lib/three/materials/presets";

/** Dark matte silhouette — cinematic placeholder athlete */
export const ForgeAthleteSilhouette = () =>
  createMaterialFromPreset("skin", {
    color: "#2a2a30",
    roughness: 0.72,
    metalness: 0.08,
  });

/** Dark rubber gym floor */
export const ForgeGymFloor = () =>
  createMaterialFromPreset("rubber", {
    color: "#161618",
    roughness: 0.88,
    metalness: 0.04,
  });

/** Painted concrete walls */
export const ForgeGymWall = () =>
  createMaterialFromPreset("concrete", {
    color: "#222228",
    roughness: 0.84,
    metalness: 0.06,
  });

/** Brushed dark metal equipment */
export const ForgeEquipmentMetal = () =>
  createMaterialFromPreset("metal", {
    color: "#2a2a32",
    roughness: 0.42,
    metalness: 0.82,
  });

export const ForgeMetal = () =>
  createMaterialFromPreset("metal", {
    color: COLORS.surfaceElevated,
    metalness: 0.7,
    roughness: 0.35,
  });

export const ForgeRubber = () =>
  createMaterialFromPreset("rubber", { color: "#1a1a1a" });

export const ForgeConcrete = () =>
  createMaterialFromPreset("concrete", { color: COLORS.surface });

export const ForgeGlass = () =>
  createMaterialFromPreset("glass", { color: "#888888", opacity: 0.25 });

export const ForgeFabric = () =>
  createMaterialFromPreset("fabric", { color: "#2a2a2a" });

/** Dev-only accent marker */
export const ForgeAccent = () =>
  createMaterialFromPreset("metal", {
    color: COLORS.accent,
    emissive: COLORS.accent,
    emissiveIntensity: 0.15,
    metalness: 0.8,
    roughness: 0.2,
  });

export const FORGE_MATERIALS = {
  athlete: ForgeAthleteSilhouette,
  gymFloor: ForgeGymFloor,
  gymWall: ForgeGymWall,
  equipment: ForgeEquipmentMetal,
  metal: ForgeMetal,
  rubber: ForgeRubber,
  concrete: ForgeConcrete,
  glass: ForgeGlass,
  fabric: ForgeFabric,
  accent: ForgeAccent,
} as const;
