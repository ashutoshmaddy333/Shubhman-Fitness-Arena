/** DOM section imagery ONLY — never used in 3D scroll backdrop */

export interface SiteImage {
  src: string;
  alt: string;
  aspect?: string;
  objectPosition?: string;
}

export const SITE_IMAGES = {
  gallery: {
    gymInterior: {
      src: "/images/gallery/gallery-gym-interior.png",
      alt: "Premium gym interior wide shot",
      aspect: "16/10",
      objectPosition: "center center",
    },
    squatRack: {
      src: "/images/gallery/gallery-squat-rack.png",
      alt: "Squat rack in dramatic light",
      aspect: "16/10",
      objectPosition: "center 38%",
    },
    barbell: {
      src: "/images/gallery/gallery-barbell.png",
      alt: "Barbell knurling detail",
      aspect: "16/10",
      objectPosition: "center center",
    },
    plates: {
      src: "/images/gallery/gallery-plates.png",
      alt: "Olympic weight plates",
      aspect: "1/1",
      objectPosition: "center center",
    },
    training: {
      src: "/images/gallery/gallery-training.png",
      alt: "Training floor perspective",
      aspect: "16/10",
      objectPosition: "center 32%",
    },
    kettlebells: {
      src: "/images/gallery/gallery-kettlebells.png",
      alt: "Kettlebells and dumbbells detail",
      aspect: "16/10",
      objectPosition: "center 45%",
    },
    athleteDeadlift: {
      src: "/images/gallery/gallery-athlete-deadlift.png",
      alt: "Athlete deadlifting on platform",
      aspect: "16/10",
      objectPosition: "center 40%",
    },
    chalkGrip: {
      src: "/images/gallery/gallery-chalk-grip.png",
      alt: "Chalk-covered hands on barbell",
      aspect: "16/10",
      objectPosition: "center center",
    },
  },
  zones: {
    cardio: {
      src: "/images/zones/zone-cardio.png",
      alt: "Cardio zone with treadmills and bikes",
      aspect: "16/10",
      objectPosition: "center center",
    },
    boxing: {
      src: "/images/zones/zone-boxing.png",
      alt: "Boxing area with heavy bags",
      aspect: "16/10",
      objectPosition: "center 35%",
    },
    recovery: {
      src: "/images/zones/zone-recovery.png",
      alt: "Recovery and mobility zone",
      aspect: "16/10",
      objectPosition: "center center",
    },
    locker: {
      src: "/images/zones/zone-locker.png",
      alt: "Premium locker room corridor",
      aspect: "16/10",
      objectPosition: "center center",
    },
  },
  facility: {
    wide: {
      src: "/images/facility/facility-wide.png",
      alt: "Full facility aerial view",
      aspect: "16/10",
      objectPosition: "center center",
    },
  },
  membership: {
    lounge: {
      src: "/images/membership/membership-lounge.png",
      alt: "Premium membership lounge",
      aspect: "16/10",
      objectPosition: "center center",
    },
  },
  coaches: {
    portrait: {
      src: "/images/coaches/coach-portrait.png",
      alt: "Head coach portrait",
      aspect: "3/4",
      objectPosition: "center 25%",
    },
  },
  hero: {
    athleteStory: {
      src: "/images/hero/hero-athlete-story.png",
      alt: "Athlete story — deadlift",
      aspect: "16/10",
      objectPosition: "center 40%",
    },
    dawnGym: {
      src: "/images/hero/hero-dawn-gym.png",
      alt: "Gym at dawn with golden light",
      aspect: "16/10",
      objectPosition: "center center",
    },
  },
  community: {
    session: {
      src: "/images/community/community-session.png",
      alt: "Group training session",
      aspect: "16/10",
      objectPosition: "center 28%",
    },
  },
  vlog: {
    trainingLog: {
      src: "/images/vlog/vlog-training-log.png",
      alt: "Training log vlog",
      aspect: "16/10",
      objectPosition: "center 30%",
    },
    coaching: {
      src: "/images/vlog/vlog-coaching.png",
      alt: "Coaching and nutrition",
      aspect: "16/10",
      objectPosition: "center center",
    },
  },
} as const;

function collectImagePaths(obj: unknown): string[] {
  if (!obj || typeof obj !== "object") return [];
  if ("src" in (obj as SiteImage) && typeof (obj as SiteImage).src === "string") {
    return [(obj as SiteImage).src];
  }
  return Object.values(obj as Record<string, unknown>).flatMap(collectImagePaths);
}

/** Flat list for texture preload */
export function getAllSiteImagePaths(): string[] {
  return [...new Set(collectImagePaths(SITE_IMAGES))];
}

/** Nav thumbnail paths */
export function getNavImagePaths(): string[] {
  return [
    "/images/nav/nav-story.png",
    "/images/nav/nav-training.png",
    "/images/nav/nav-facility.png",
    "/images/nav/nav-coaches.png",
    "/images/nav/nav-membership.png",
    "/images/nav/nav-vlog.png",
    "/images/nav/nav-gallery.png",
    "/images/nav/nav-community.png",
  ];
}
