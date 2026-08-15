"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "@/lib/gsap/registerGSAP";
import { MOTION_EASING, MOTION_MAGNETIC } from "@/lib/motion/tokens";
import type { MagneticOptions } from "@/lib/motion/types";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

export function useMagnetic(
  ref: RefObject<HTMLElement | null>,
  options: MagneticOptions = {},
) {
  const { reducedMotion } = useReducedMotionContext();
  const isTouch = useIsTouchDevice();

  const config = useRef({
    strength: options.strength ?? MOTION_MAGNETIC.strength,
    radius: options.radius ?? MOTION_MAGNETIC.radius,
    duration: options.duration ?? MOTION_MAGNETIC.duration,
    ease: options.ease ?? MOTION_EASING.smooth,
  });

  useEffect(() => {
    config.current = {
      strength: options.strength ?? MOTION_MAGNETIC.strength,
      radius: options.radius ?? MOTION_MAGNETIC.radius,
      duration: options.duration ?? MOTION_MAGNETIC.duration,
      ease: options.ease ?? MOTION_EASING.smooth,
    };
  }, [options.strength, options.radius, options.duration, options.ease]);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || isTouch) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist > config.current.radius) {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: config.current.duration,
          ease: config.current.ease,
          overwrite: true,
        });
        return;
      }

      gsap.to(el, {
        x: dx * config.current.strength,
        y: dy * config.current.strength,
        duration: config.current.duration,
        ease: config.current.ease,
        overwrite: true,
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: config.current.duration,
        ease: config.current.ease,
        overwrite: true,
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [ref, reducedMotion, isTouch]);
}
