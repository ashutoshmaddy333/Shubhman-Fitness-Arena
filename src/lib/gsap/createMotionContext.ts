"use client";

import { gsap, registerGSAP } from "@/lib/gsap/registerGSAP";

/**
 * Creates a GSAP context with automatic cleanup.
 * Returns revert function for useEffect cleanup.
 */
export function createMotionContext(
  scope: Element | string | object,
  setup: (ctx: gsap.Context) => void,
): () => void {
  registerGSAP();
  const ctx = gsap.context(setup, scope);
  return () => ctx.revert();
}

/**
 * Applies instant visibility for reduced-motion users.
 */
export function setVisibleInstantly(
  targets: gsap.TweenTarget,
  props: gsap.TweenVars = {},
): void {
  gsap.set(targets, {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    ...props,
  });
}
