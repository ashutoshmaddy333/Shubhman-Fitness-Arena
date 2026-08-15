/** Generated gym imagery mapped to homepage sections */

import type { AnimatedImageVariant } from "@/components/motion/image/AnimatedImage";
import { SECTION_CONTENT_IMAGES } from "@/lib/content/sectionContentImages";
import { SITE_IMAGES } from "@/lib/content/siteImages";

export interface SectionImage {
  src: string;
  alt: string;
  aspect?: string;
  objectPosition?: string;
  variant?: AnimatedImageVariant;
}

export const SECTION_IMAGES = {
  athlete: {
    ...SITE_IMAGES.hero.athleteStory,
    aspect: "4/5",
    variant: "mask",
  },
  equipment: {
    ...SITE_IMAGES.gallery.kettlebells,
    aspect: "3/4",
    variant: "scale",
  },
  strength: {
    ...SITE_IMAGES.gallery.squatRack,
    aspect: "4/5",
    variant: "parallax",
  },
  performance: {
    ...SECTION_CONTENT_IMAGES.facility.cardio,
    variant: "reveal",
  },
  details: {
    ...SITE_IMAGES.gallery.plates,
    aspect: "1/1",
    variant: "mask",
  },
  facility: [
    SECTION_CONTENT_IMAGES.facility.entrance,
    SECTION_CONTENT_IMAGES.facility.strength,
    SECTION_CONTENT_IMAGES.facility.boxing,
    SECTION_CONTENT_IMAGES.facility.cardio,
    SECTION_CONTENT_IMAGES.facility.recovery,
    SECTION_CONTENT_IMAGES.facility.locker,
  ],
  training: [
    SITE_IMAGES.gallery.athleteDeadlift,
    SITE_IMAGES.gallery.training,
    SECTION_CONTENT_IMAGES.facility.boxing,
    SECTION_CONTENT_IMAGES.facility.recovery,
  ],
  coaches: [
    SITE_IMAGES.coaches.portrait,
    {
      ...SITE_IMAGES.gallery.squatRack,
      alt: "Strength coach on the floor",
      aspect: "3/4",
      objectPosition: "center 38%",
    },
    {
      ...SECTION_CONTENT_IMAGES.community.session,
      alt: "Performance coach leading session",
      aspect: "3/4",
      objectPosition: "center 25%",
    },
  ],
} as const satisfies Record<string, SectionImage | readonly SectionImage[]>;
