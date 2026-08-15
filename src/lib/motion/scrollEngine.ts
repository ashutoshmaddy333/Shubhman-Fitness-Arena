/** FORGE scroll engine — single source for Lenis + ScrollTrigger tuning */

/** Target ~90fps on ProMotion/high-refresh displays */
export const FORGE_TARGET_FPS = 90;

export const FORGE_LENIS = {
  /** Lerp tuned for high refresh — synced with GSAP native ticker */
  lerp: 0.108,
  wheelMultiplier: 0.82,
  touchMultiplier: 1.1,
  smoothWheel: true,
  syncTouch: true,
  syncTouchLerp: 0.12,
  autoRaf: false,
} as const;

/** Scrub lag in seconds — lower = tighter scroll sync at high fps */
export const FORGE_SCRUB = {
  /** Master page + hero timelines driving 3D */
  master: 0.16,
  /** Cinematic sticky sections */
  cinematic: 0.2,
  /** Image / text reveals */
  reveal: 0.22,
  /** Parallax layers — near 1:1 with scroll */
  parallax: 0.08,
  /** Micro depth on section panels */
  depth: 0.28,
} as const;

export const FORGE_SCROLL_REVEAL = {
  start: "top 92%",
  end: "top 58%",
  sectionStart: "top bottom",
  sectionEnd: "bottom top",
} as const;

/** Cinematic easing curves for scroll-scrubbed motion */
export const FORGE_SCROLL_EASE = {
  linear: "none",
  cinematic: "power2.inOut",
  editorial: "power3.out",
} as const;
