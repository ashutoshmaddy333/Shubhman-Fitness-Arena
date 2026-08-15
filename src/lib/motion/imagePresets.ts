import {
  MOTION_DURATION,
  MOTION_EASING,
  MOTION_OPACITY,
  MOTION_SCALE,
} from "@/lib/motion/tokens";

export const IMAGE_PRESETS = {
  reveal: {
    from: { opacity: MOTION_OPACITY.hidden, y: 32 },
    to: {
      opacity: MOTION_OPACITY.visible,
      y: 0,
      duration: MOTION_DURATION.slow,
      ease: MOTION_EASING.smooth,
    },
  },
  scale: {
    from: { scale: MOTION_SCALE.hidden, opacity: MOTION_OPACITY.hidden },
    to: {
      scale: MOTION_SCALE.visible,
      opacity: MOTION_OPACITY.visible,
      duration: MOTION_DURATION.cinematic,
      ease: MOTION_EASING.cinematic,
    },
  },
  maskUp: {
    from: { clipPath: "inset(100% 0% 0% 0%)", scale: MOTION_SCALE.subtle },
    to: {
      clipPath: "inset(0% 0% 0% 0%)",
      scale: MOTION_SCALE.visible,
      duration: MOTION_DURATION.slow,
      ease: MOTION_EASING.cinematic,
    },
  },
  maskDown: {
    from: { clipPath: "inset(0% 0% 100% 0%)", scale: MOTION_SCALE.subtle },
    to: {
      clipPath: "inset(0% 0% 0% 0%)",
      scale: MOTION_SCALE.visible,
      duration: MOTION_DURATION.slow,
      ease: MOTION_EASING.cinematic,
    },
  },
  parallax: {
    strength: 0.15,
  },
} as const;

export type ImagePreset = keyof typeof IMAGE_PRESETS;

export const CLIP_PATHS = {
  up: { from: "inset(100% 0% 0% 0%)", to: "inset(0% 0% 0% 0%)" },
  down: { from: "inset(0% 0% 100% 0%)", to: "inset(0% 0% 0% 0%)" },
  left: { from: "inset(0% 100% 0% 0%)", to: "inset(0% 0% 0% 0%)" },
  right: { from: "inset(0% 0% 0% 100%)", to: "inset(0% 0% 0% 0%)" },
} as const;
