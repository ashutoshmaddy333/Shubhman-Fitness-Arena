import { MOTION_DURATION } from "@/lib/motion/tokens";

export const HOVER_PRESETS = {
  lift: {
    y: -4,
    duration: MOTION_DURATION.fast,
    ease: "power2.out",
  },
  scale: {
    scale: 1.02,
    duration: MOTION_DURATION.fast,
    ease: "power2.out",
  },
  glow: {
    opacity: 0.85,
    duration: MOTION_DURATION.fast,
    ease: "power2.out",
  },
  underline: {
    scaleX: 1,
    duration: MOTION_DURATION.fast,
    ease: "power2.out",
  },
  image: {
    scale: 1.04,
    duration: MOTION_DURATION.normal,
    ease: "power3.out",
  },
  card: {
    y: -6,
    scale: 1.01,
    duration: MOTION_DURATION.normal,
    ease: "power3.out",
  },
} as const;

export type HoverPreset = keyof typeof HOVER_PRESETS;

/** Data attributes for cursor + hover integration */
export const CURSOR_ATTR = "data-cursor";
export const INTERACTIVE_ATTR = "data-interactive";
export const HOVER_ATTR = "data-hover";

export const CURSOR_MODES = {
  default: "default",
  hover: "hover",
  view: "view",
  play: "play",
  drag: "drag",
  external: "external",
  explore: "explore",
} as const;
