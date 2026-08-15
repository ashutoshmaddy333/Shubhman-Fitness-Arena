/** FORGE® Motion Tokens — single source of truth for all animation values */

import { FORGE_SCROLL_REVEAL } from "@/lib/motion/scrollEngine";

export const MOTION_DURATION = {
  instant: 0.01,
  fast: 0.35,
  normal: 0.6,
  slow: 0.9,
  cinematic: 1.4,
} as const;

export const MOTION_EASING = {
  standard: "power2.out",
  smooth: "power3.out",
  cinematic: "power4.inOut",
  expo: "expo.out",
  power: "power4.out",
  none: "none",
} as const;

export const MOTION_DISTANCE = {
  xs: 12,
  sm: 24,
  md: 48,
  lg: 80,
  xl: 120,
} as const;

export const MOTION_STAGGER = {
  tight: 0.04,
  normal: 0.08,
  relaxed: 0.12,
  editorial: 0.16,
} as const;

export const MOTION_OPACITY = {
  hidden: 0,
  muted: 0.4,
  visible: 1,
} as const;

export const MOTION_SCALE = {
  hidden: 0.92,
  subtle: 0.97,
  visible: 1,
  emphasis: 1.05,
} as const;

export const MOTION_BLUR = {
  hidden: 8,
  subtle: 4,
  visible: 0,
} as const;

export const MOTION_PARALLAX = {
  subtle: 0.08,
  normal: 0.15,
  strong: 0.25,
  max: 0.4,
} as const;

export const MOTION_MAGNETIC = {
  strength: 0.35,
  radius: 120,
  duration: 0.3,
  ease: "power3.out",
} as const;

export const MOTION_CURSOR = {
  followEase: 0.15,
  ringSize: { default: 10, hover: 64 },
} as const;

export const MOTION_PAGE_TRANSITION = {
  duration: 0.55,
  ease: "power4.inOut",
  overlayDuration: 0.4,
} as const;

export const MOTION_SCROLL = {
  defaultScrub: 0.28,
  heroScrub: 0.22,
  revealStart: FORGE_SCROLL_REVEAL.start,
  revealEnd: FORGE_SCROLL_REVEAL.end,
  sectionStart: FORGE_SCROLL_REVEAL.sectionStart,
  sectionEnd: FORGE_SCROLL_REVEAL.sectionEnd,
} as const;

export type MotionDuration = keyof typeof MOTION_DURATION;
export type MotionEasing = keyof typeof MOTION_EASING;
