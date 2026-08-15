/** DOM section imagery ONLY — blue editorial theme, never used in 3D backdrop */

import type { SiteImage } from "@/lib/content/siteImages";

export const SECTION_CONTENT_IMAGES = {
  facility: {
    entrance: {
      src: "/images/sections/section-facility-entrance.png",
      alt: "Facility entrance",
      aspect: "16/9",
      objectPosition: "center center",
    },
    strength: {
      src: "/images/sections/section-facility-strength.png",
      alt: "Strength floor",
      aspect: "1/1",
      objectPosition: "center center",
    },
    boxing: {
      src: "/images/sections/section-facility-boxing.png",
      alt: "Functional training",
      aspect: "1/1",
      objectPosition: "center center",
    },
    cardio: {
      src: "/images/sections/section-facility-cardio.png",
      alt: "Performance area",
      aspect: "1/1",
      objectPosition: "center center",
    },
    recovery: {
      src: "/images/sections/section-facility-recovery.png",
      alt: "Recovery zone",
      aspect: "1/1",
      objectPosition: "center center",
    },
    locker: {
      src: "/images/sections/section-facility-locker.png",
      alt: "Locker corridor",
      aspect: "16/9",
      objectPosition: "center center",
    },
  },
  community: {
    session: {
      src: "/images/sections/section-community-session.png",
      alt: "Group training session",
      aspect: "16/9",
      objectPosition: "center 30%",
    },
    training: {
      src: "/images/sections/section-community-training.png",
      alt: "Partner training",
      aspect: "1/1",
      objectPosition: "center center",
    },
    floor: {
      src: "/images/sections/section-community-floor.png",
      alt: "Community floor",
      aspect: "1/1",
      objectPosition: "center center",
    },
    equipment: {
      src: "/images/sections/section-community-equipment.png",
      alt: "Equipment detail",
      aspect: "1/1",
      objectPosition: "center center",
    },
  },
  /** Dark editorial — final section panel on blue canvas */
  final: {
    darkGrip: {
      src: "/images/sections/section-final-dark.png",
      alt: "Chalk-covered hands on barbell under blue gym light",
      aspect: "4/5",
      objectPosition: "center 42%",
    },
  },
} as const satisfies Record<string, Record<string, SiteImage>>;

function collectPaths(obj: unknown): string[] {
  if (!obj || typeof obj !== "object") return [];
  if ("src" in (obj as SiteImage)) return [(obj as SiteImage).src];
  return Object.values(obj as Record<string, unknown>).flatMap(collectPaths);
}

export function getAllSectionContentImagePaths(): string[] {
  return [...new Set(collectPaths(SECTION_CONTENT_IMAGES))];
}
