"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FORGE_TARGET_FPS } from "@/lib/motion/scrollEngine";

let registered = false;

export function registerGSAP(): void {
  if (registered || typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  });

  /** Native refresh rate (90/120Hz) instead of capped 60fps */
  gsap.ticker.fps(-1);
  gsap.ticker.lagSmoothing(FORGE_TARGET_FPS * 5, FORGE_TARGET_FPS / 4);

  registered = true;
}

export { gsap, ScrollTrigger };
