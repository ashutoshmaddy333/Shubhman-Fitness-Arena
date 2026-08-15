export const ASSETS = {
  models: {
    athlete: "/models/athlete.glb",
    dumbbell: "/models/dumbbell.glb",
    barbell: "/models/barbell.glb",
  },
  images: {
    heroFallback: "/images/placeholders/hero-fallback.svg",
    philosophy: "/images/placeholders/philosophy.svg",
  },
  hdr: {
    studio: "/hdr/studio.hdr",
  },
  logo: {
    mark: "/logo/sfa-mark.svg",
  },
} as const;

export const BRAND = {
  name: "Shubhman Fitness Arena",
  tagline: "BECOME MORE.",
  secondary: ["TRAIN.", "PERFORM.", "RECOVER.", "REPEAT."],
  philosophy: {
    label: "Philosophy",
    headline: "WE DON'T CHASE MOTIVATION.",
    headlineLine2: "WE BUILD DISCIPLINE.",
    body: "We don't believe in shortcuts. We believe in discipline, intelligent training, recovery and community.",
    editorial:
      "Discipline is the foundation. Recovery is part of the work. Community is the force multiplier.",
  },
  values: ["STRENGTH", "PERFORMANCE", "DISCIPLINE", "COMMUNITY"] as const,
} as const;
