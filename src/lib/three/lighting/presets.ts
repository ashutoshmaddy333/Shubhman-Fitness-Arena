import type { PerformanceTier } from "@/hooks/usePerformanceTier";

export type LightingPresetName =
  | "DARK"
  | "STUDIO"
  | "DRAMATIC"
  | "TRAINING"
  | "RECOVERY"
  | "HERO";

export interface LightConfig {
  color: string;
  intensity: number;
  position?: [number, number, number];
  angle?: number;
  penumbra?: number;
  distance?: number;
}

export interface LightingPreset {
  name: LightingPresetName;
  ambient: LightConfig;
  key: LightConfig & { position: [number, number, number] };
  fill?: LightConfig & { position: [number, number, number] };
  rim: LightConfig & { position: [number, number, number] };
  accent?: LightConfig & { position: [number, number, number] };
  shadowMapSize: Record<PerformanceTier, number>;
}

export const LIGHTING_PRESETS: Record<LightingPresetName, LightingPreset> = {
  DARK: {
    name: "DARK",
    ambient: { color: "#1a1a1e", intensity: 0.28 },
    key: { color: "#f0ebe3", intensity: 1.05, position: [3, 6, 5] },
    fill: { color: "#6a6a72", intensity: 0.38, position: [-2, 4, 4] },
    rim: { color: "#ece6de", intensity: 0.52, position: [-3, 5, 2] },
    shadowMapSize: { HIGH: 1024, MEDIUM: 512, LOW: 512 },
  },
  STUDIO: {
    name: "STUDIO",
    ambient: { color: "#1a1a2e", intensity: 0.2 },
    key: { color: "#ffffff", intensity: 1.0, position: [5, 8, 5] },
    fill: { color: "#888899", intensity: 0.3, position: [-4, 4, 3] },
    rim: { color: "#d7ff00", intensity: 0.25, position: [-4, 6, 2] },
    shadowMapSize: { HIGH: 2048, MEDIUM: 1024, LOW: 512 },
  },
  DRAMATIC: {
    name: "DRAMATIC",
    ambient: { color: "#0d0d12", intensity: 0.12 },
    key: { color: "#fff0dd", intensity: 1.2, position: [5, 9, 4] },
    fill: { color: "#555560", intensity: 0.2, position: [-3, 4, 5] },
    rim: { color: "#f0ebe3", intensity: 0.42, position: [-5, 5, 1] },
    shadowMapSize: { HIGH: 2048, MEDIUM: 1024, LOW: 512 },
  },
  TRAINING: {
    name: "TRAINING",
    ambient: { color: "#121218", intensity: 0.16 },
    key: { color: "#fff5e6", intensity: 1.15, position: [5, 8, 5] },
    fill: { color: "#666677", intensity: 0.28, position: [-3, 5, 4] },
    rim: { color: "#e8e4dc", intensity: 0.3, position: [-4, 6, 2] },
    shadowMapSize: { HIGH: 2048, MEDIUM: 1024, LOW: 512 },
  },
  RECOVERY: {
    name: "RECOVERY",
    ambient: { color: "#1a2030", intensity: 0.25 },
    key: { color: "#e8f0ff", intensity: 0.8, position: [3, 6, 5] },
    rim: { color: "#aaccff", intensity: 0.2, position: [-2, 4, 3] },
    shadowMapSize: { HIGH: 1024, MEDIUM: 512, LOW: 512 },
  },
  HERO: {
    name: "HERO",
    ambient: { color: "#1e1e24", intensity: 0.34 },
    key: { color: "#fff5e6", intensity: 1.35, position: [4, 7, 5] },
    fill: { color: "#707078", intensity: 0.42, position: [-3, 4, 4] },
    rim: {
      color: "#ece6de",
      intensity: 0.58,
      position: [-4, 5.5, 2],
      angle: 0.45,
      penumbra: 0.85,
      distance: 22,
    },
    accent: { color: "#d7ff00", intensity: 0.12, position: [0, 2, -3] },
    shadowMapSize: { HIGH: 2048, MEDIUM: 1024, LOW: 512 },
  },
};

export const SCENE_PRESET_MAP = {
  hero: "HERO",
  strength: "TRAINING",
  recovery: "RECOVERY",
} as const satisfies Record<string, LightingPresetName>;
