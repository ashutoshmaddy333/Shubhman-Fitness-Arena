"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "@/lib/gsap/registerGSAP";
import { createMotionContext } from "@/lib/gsap/createMotionContext";
import { MOTION_PARALLAX } from "@/lib/motion/tokens";
import { FORGE_SCRUB, FORGE_SCROLL_REVEAL } from "@/lib/motion/scrollEngine";
import type { ParallaxOptions } from "@/lib/motion/types";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";

export function useParallax(
  ref: RefObject<HTMLElement | null>,
  options: ParallaxOptions = {},
) {
  const { reducedMotion } = useReducedMotionContext();
  const tier = usePerformanceTier();
  const strengthRef = useRef(options.strength ?? MOTION_PARALLAX.normal);

  useEffect(() => {
    strengthRef.current = options.strength ?? MOTION_PARALLAX.normal;
  }, [options.strength]);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || tier === "LOW") return;

    const {
      start = FORGE_SCROLL_REVEAL.sectionStart,
      end = FORGE_SCROLL_REVEAL.sectionEnd,
      axis = "y",
    } = options;

    const distance = 100 * strengthRef.current;

    return createMotionContext(el, () => {
      gsap.fromTo(
        el,
        axis === "y" ? { y: -distance / 2, force3D: true } : { x: -distance / 2, force3D: true },
        {
          ...(axis === "y" ? { y: distance / 2 } : { x: distance / 2 }),
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: FORGE_SCRUB.parallax,
          },
        },
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, reducedMotion, tier, options.start, options.end, options.axis]);
}

/** Returns a ref that tracks 0→1 scroll progress without React state */
export function useParallaxProgress(
  ref: RefObject<HTMLElement | null>,
  options: Pick<ParallaxOptions, "start" | "end"> = {},
) {
  const progressRef = useRef(0);
  const { reducedMotion } = useReducedMotionContext();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    const {
      start = FORGE_SCROLL_REVEAL.sectionStart,
      end = FORGE_SCROLL_REVEAL.sectionEnd,
    } = options;

    return createMotionContext(el, () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: FORGE_SCRUB.parallax,
          onUpdate: (self) => {
            progressRef.current = self.progress;
          },
        },
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, reducedMotion, options.start, options.end]);

  return progressRef;
}
