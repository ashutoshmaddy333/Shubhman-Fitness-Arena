import {
  MOTION_BLUR,
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_EASING,
  MOTION_OPACITY,
  MOTION_SCALE,
  MOTION_STAGGER,
} from "@/lib/motion/tokens";

export const TEXT_PRESETS = {
  block: {
    from: {
      y: MOTION_DISTANCE.md,
      opacity: MOTION_OPACITY.hidden,
      filter: `blur(${MOTION_BLUR.subtle}px)`,
    },
    to: {
      y: 0,
      opacity: MOTION_OPACITY.visible,
      filter: `blur(${MOTION_BLUR.visible}px)`,
      duration: MOTION_DURATION.slow,
      ease: MOTION_EASING.smooth,
    },
  },
  line: {
    from: {
      y: MOTION_DISTANCE.sm,
      opacity: MOTION_OPACITY.hidden,
    },
    to: {
      y: 0,
      opacity: MOTION_OPACITY.visible,
      duration: MOTION_DURATION.normal,
      ease: MOTION_EASING.smooth,
      stagger: MOTION_STAGGER.normal,
    },
  },
  word: {
    from: {
      y: MOTION_DISTANCE.xs,
      opacity: MOTION_OPACITY.hidden,
    },
    to: {
      y: 0,
      opacity: MOTION_OPACITY.visible,
      duration: MOTION_DURATION.normal,
      ease: MOTION_EASING.expo,
      stagger: MOTION_STAGGER.tight,
    },
  },
  char: {
    from: {
      y: MOTION_DISTANCE.xs,
      opacity: MOTION_OPACITY.hidden,
      scale: MOTION_SCALE.subtle,
    },
    to: {
      y: 0,
      opacity: MOTION_OPACITY.visible,
      scale: MOTION_SCALE.visible,
      duration: MOTION_DURATION.fast,
      ease: MOTION_EASING.expo,
      stagger: MOTION_STAGGER.tight,
    },
  },
  mask: {
    from: {
      clipPath: "inset(100% 0% 0% 0%)",
      opacity: MOTION_OPACITY.hidden,
    },
    to: {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: MOTION_OPACITY.visible,
      duration: MOTION_DURATION.slow,
      ease: MOTION_EASING.cinematic,
    },
  },
} as const;

export type TextPreset = keyof typeof TEXT_PRESETS;
