"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "@/lib/gsap/registerGSAP";
import { HOVER_PRESETS, type HoverPreset } from "@/lib/motion/hoverPresets";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

export function useHoverMotion(
  ref: RefObject<HTMLElement | null>,
  preset: HoverPreset = "lift",
) {
  const { reducedMotion } = useReducedMotionContext();
  const isTouch = useIsTouchDevice();
  const presetRef = useRef(preset);

  useEffect(() => {
    presetRef.current = preset;
  }, [preset]);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion || isTouch) return;

    const onEnter = () => {
      gsap.to(el, { ...HOVER_PRESETS[presetRef.current], overwrite: true });
    };

    const onLeave = () => {
      gsap.to(el, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: HOVER_PRESETS[presetRef.current].duration,
        ease: HOVER_PRESETS[presetRef.current].ease,
        overwrite: true,
      });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      gsap.set(el, { y: 0, scale: 1, opacity: 1 });
    };
  }, [ref, reducedMotion, isTouch]);
}
