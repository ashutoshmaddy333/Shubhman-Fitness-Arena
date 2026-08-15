/** Centralized asset path constants */

export const ASSET_PATHS = {
  models: {
    characters: "/models/characters",
    equipment: "/models/equipment",
    environment: "/models/environment",
    props: "/models/props",
  },
  textures: {
    characters: "/textures/characters",
    equipment: "/textures/equipment",
    environment: "/textures/environment",
    props: "/textures/props",
  },
  hdr: {
    studio: "/hdr/studio",
    gym: "/hdr/gym",
    dark: "/hdr/dark",
  },
  animations: "/animations",
  images: {
    fallback: "/images/placeholders",
  },
} as const;

export function modelPath(
  category: keyof typeof ASSET_PATHS.models,
  file: string,
) {
  return `${ASSET_PATHS.models[category]}/${file}`;
}

export function hdrPath(category: keyof typeof ASSET_PATHS.hdr, file: string) {
  return `${ASSET_PATHS.hdr[category]}/${file}`;
}
