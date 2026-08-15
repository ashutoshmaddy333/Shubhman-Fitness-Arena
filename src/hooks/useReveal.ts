"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap/registerGSAP";
import { createMotionContext, setVisibleInstantly } from "@/lib/gsap/createMotionContext";
import {
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_EASING,
  MOTION_OPACITY,
  MOTION_SCROLL,
} from "@/lib/motion/tokens";
import type { RevealOptions } from "@/lib/motion/types";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

const DEFAULTS: Required<
  Pick<RevealOptions, "y" | "opacity" | "duration" | "ease" | "start" | "toggleActions">
> = {
  y: MOTION_DISTANCE.md,
  opacity: MOTION_OPACITY.hidden,
  duration: MOTION_DURATION.slow,
  ease: MOTION_EASING.smooth,
  start: MOTION_SCROLL.revealStart,
  toggleActions: "play none none reverse",
};

export function useReveal(
  ref: RefObject<HTMLElement | null>,
  options: RevealOptions = {},
) {
  const { reducedMotion } = useReducedMotionContext();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      setVisibleInstantly(el);
      return;
    }

    const {
      y = DEFAULTS.y,
      x = 0,
      opacity = DEFAULTS.opacity,
      scale = 1,
      blur = 0,
      duration = DEFAULTS.duration,
      delay = 0,
      stagger = 0,
      ease = DEFAULTS.ease,
      start = DEFAULTS.start,
      end,
      scrub,
      toggleActions = DEFAULTS.toggleActions,
      once = false,
    } = options;

    return createMotionContext(el, () => {
      gsap.fromTo(
        el,
        {
          y,
          x,
          opacity,
          scale,
          filter: blur ? `blur(${blur}px)` : "blur(0px)",
        },
        {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration,
          delay,
          stagger,
          ease,
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub,
            toggleActions: once ? "play none none none" : toggleActions,
          },
        },
      );
    });
  }, [ref, reducedMotion, options]);
}
