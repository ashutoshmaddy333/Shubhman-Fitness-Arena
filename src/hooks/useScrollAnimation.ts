"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/registerGSAP";
import { createMotionContext, setVisibleInstantly } from "@/lib/gsap/createMotionContext";
import { MOTION_SCROLL } from "@/lib/motion/tokens";
import type { RevealOptions, ScrollTriggerCallback } from "@/lib/motion/types";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

interface ScrollAnimationConfig {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  scroll?: RevealOptions;
  onUpdate?: ScrollTriggerCallback;
}

export function useScrollAnimation(
  ref: React.RefObject<HTMLElement | null>,
  config: ScrollAnimationConfig,
) {
  const { reducedMotion } = useReducedMotionContext();
  const configRef = useRef(config);
  configRef.current = config;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cfg = configRef.current;

    if (reducedMotion) {
      setVisibleInstantly(el, cfg.to);
      return;
    }

    const {
      start = MOTION_SCROLL.revealStart,
      end,
      scrub,
      toggleActions = "play none none reverse",
      once = false,
    } = cfg.scroll ?? {};

    return createMotionContext(el, () => {
      gsap.fromTo(el, cfg.from, {
        ...cfg.to,
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub,
          toggleActions: once ? "play none none none" : toggleActions,
          onUpdate: cfg.onUpdate,
        },
      });
    });
  }, [ref, reducedMotion]);
}
