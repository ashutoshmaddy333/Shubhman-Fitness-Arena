"use client";

import { gsap } from "@/lib/gsap/registerGSAP";
import {
  FORGE_SCRUB,
  FORGE_SCROLL_EASE,
  FORGE_SCROLL_REVEAL,
} from "@/lib/motion/scrollEngine";
import {
  FORGE_SCROLL_REVEAL_MOBILE,
  isMobileMotionDevice,
} from "@/lib/motion/mobileMotion";

export interface ScrollScrubRevealOptions {
  trigger?: Element;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  ease?: string;
  invalidateOnRefresh?: boolean;
}

/** GPU-accelerated scroll-scrubbed reveal — 60fps linked to Lenis */
export function createScrollScrubReveal(
  target: gsap.TweenTarget,
  from: gsap.TweenVars,
  to: gsap.TweenVars,
  options: ScrollScrubRevealOptions = {},
): gsap.core.Tween {
  const el = Array.isArray(target) ? target[0] : target;
  const trigger =
    options.trigger ?? (el instanceof Element ? el : undefined);

  const mobile = isMobileMotionDevice();

  if (mobile) {
    return gsap.fromTo(target, from, {
      ...to,
      ease: options.ease ?? FORGE_SCROLL_EASE.cinematic,
      force3D: true,
      scrollTrigger: {
        trigger: trigger ?? el,
        start: options.start ?? FORGE_SCROLL_REVEAL_MOBILE.start,
        toggleActions: "play none none none",
        once: true,
        invalidateOnRefresh: options.invalidateOnRefresh ?? true,
      },
    });
  }

  return gsap.fromTo(target, from, {
    ...to,
    ease: options.ease ?? FORGE_SCROLL_EASE.linear,
    force3D: true,
    scrollTrigger: {
      trigger: trigger ?? el,
      start: options.start ?? FORGE_SCROLL_REVEAL.start,
      end: options.end ?? FORGE_SCROLL_REVEAL.end,
      scrub: options.scrub ?? FORGE_SCRUB.reveal,
      invalidateOnRefresh: options.invalidateOnRefresh ?? true,
    },
  });
}
