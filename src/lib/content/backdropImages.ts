/** 3D scroll backdrop ONLY — blue cinematic equipment theme */

export interface BackdropImage {
  src: string;
  alt: string;
  objectPosition?: string;
}

export const BACKDROP_IMAGES = {
  blueHero: {
    src: "/images/backdrop/backdrop-blue-hero.png",
    alt: "Blue hero gym backdrop",
    objectPosition: "center center",
  },
  blueSquat: {
    src: "/images/backdrop/backdrop-blue-squat.png",
    alt: "Blue squat rack backdrop",
    objectPosition: "center center",
  },
  blueBarbell: {
    src: "/images/backdrop/backdrop-blue-barbell.png",
    alt: "Blue barbell backdrop",
    objectPosition: "center center",
  },
  blueKettlebells: {
    src: "/images/backdrop/backdrop-blue-kettlebells.png",
    alt: "Blue kettlebells backdrop",
    objectPosition: "center center",
  },
  blueCardio: {
    src: "/images/backdrop/backdrop-blue-cardio.png",
    alt: "Blue cardio backdrop",
    objectPosition: "center center",
  },
  blueCable: {
    src: "/images/backdrop/backdrop-cable-machine.png",
    alt: "Blue cable machine backdrop",
    objectPosition: "center center",
  },
  bluePlates: {
    src: "/images/backdrop/backdrop-blue-plates.png",
    alt: "Blue plates wall backdrop",
    objectPosition: "center center",
  },
  blueBoxing: {
    src: "/images/backdrop/backdrop-blue-boxing.png",
    alt: "Blue boxing backdrop",
    objectPosition: "center 35%",
  },
  blueAisle: {
    src: "/images/backdrop/backdrop-blue-aisle.png",
    alt: "Blue gym aisle backdrop",
    objectPosition: "center center",
  },
  blueBench: {
    src: "/images/backdrop/backdrop-bench-press.png",
    alt: "Blue bench press backdrop",
    objectPosition: "center center",
  },
} as const;

export function getAllBackdropImagePaths(): string[] {
  return Object.values(BACKDROP_IMAGES).map((img) => img.src);
}
