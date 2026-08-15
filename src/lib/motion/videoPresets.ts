import {
  MOTION_DURATION,
  MOTION_EASING,
  MOTION_OPACITY,
  MOTION_SCALE,
  MOTION_PARALLAX,
} from "@/lib/motion/tokens";

/** Video motion presets — animation layer only, no media loading */
export const VIDEO_PRESETS = {
  reveal: {
    from: { opacity: MOTION_OPACITY.hidden, scale: MOTION_SCALE.subtle },
    to: {
      opacity: MOTION_OPACITY.visible,
      scale: MOTION_SCALE.visible,
      duration: MOTION_DURATION.slow,
      ease: MOTION_EASING.cinematic,
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
  parallax: {
    strength: MOTION_PARALLAX.normal,
  },
} as const;

export type VideoPreset = keyof typeof VIDEO_PRESETS;
