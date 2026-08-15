"use client";

import { useEffect } from "react";
import { gsap, registerGSAP } from "@/lib/gsap/registerGSAP";
import { HERO_SCROLL } from "@/lib/gsap/scrollConfig";
import { MOTION_DISTANCE } from "@/lib/motion/tokens";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { isMobileMotionDevice } from "@/lib/motion/mobileMotion";

interface UseHeroScrollTimelineOptions {
  triggerRef: React.RefObject<HTMLElement | null>;
  brandRef: React.RefObject<HTMLElement | null>;
  taglineRef: React.RefObject<HTMLElement | null>;
  ctaRef: React.RefObject<HTMLElement | null>;
  scrollHintRef: React.RefObject<HTMLElement | null>;
  enterForgeRef: React.RefObject<HTMLElement | null>;
  editorialRef: React.RefObject<HTMLElement | null>;
}

/** Single master ScrollTrigger — typography + cinematic progress */
export function useHeroScrollTimeline({
  triggerRef,
  brandRef,
  taglineRef,
  ctaRef,
  scrollHintRef,
  enterForgeRef,
  editorialRef,
}: UseHeroScrollTimelineOptions) {
  const { setHeroProgress } = useScrollProgress();
  const { reducedMotion } = useReducedMotionContext();

  useEffect(() => {
    registerGSAP();

    const trigger = triggerRef.current;
    if (!trigger) return;

    if (reducedMotion || isMobileMotionDevice()) {
      setHeroProgress(0);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: HERO_SCROLL.start,
          end: HERO_SCROLL.end,
          scrub: HERO_SCROLL.scrub,
          onUpdate: (self) => setHeroProgress(self.progress),
        },
      });

      if (scrollHintRef.current) {
        tl.fromTo(
          scrollHintRef.current,
          { opacity: 1 },
          { opacity: 0, ease: "none" },
          0.06,
        );
      }

      // 0–15%: FORGE® + BECOME MORE fully visible (default state)

      // 15–30%: text begins leaving
      if (brandRef.current) {
        tl.fromTo(
          brandRef.current,
          { y: 0, opacity: 1, force3D: true },
          { y: -MOTION_DISTANCE.md, opacity: 0.5, ease: "none", force3D: true },
          0.15,
        );
      }

      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current,
          { y: 0, opacity: 1 },
          { y: -MOTION_DISTANCE.lg, opacity: 0.35, ease: "none" },
          0.18,
        );
      }

      // 30–45%: BECOME MORE disappears, athlete dominates
      if (taglineRef.current) {
        tl.to(
          taglineRef.current,
          { y: -MOTION_DISTANCE.xl, opacity: 0, ease: "none" },
          0.3,
        );
      }

      if (brandRef.current) {
        tl.to(
          brandRef.current,
          { y: -MOTION_DISTANCE.xl, opacity: 0.08, ease: "none" },
          0.32,
        );
      }

      // 45–65%: minimal typography — CTA fades
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { y: 0, opacity: 1 },
          { y: MOTION_DISTANCE.sm, opacity: 0, ease: "none" },
          0.45,
        );
      }

      // 65–80%: small editorial label
      if (editorialRef.current) {
        tl.fromTo(
          editorialRef.current,
          { y: MOTION_DISTANCE.sm, opacity: 0 },
          { y: 0, opacity: 0.85, ease: "none" },
          0.65,
        );
        tl.to(
          editorialRef.current,
          { y: -MOTION_DISTANCE.sm, opacity: 0, ease: "none" },
          0.8,
        );
      }

      // 80–95%: ENTER THE FORGE
      if (enterForgeRef.current) {
        tl.fromTo(
          enterForgeRef.current,
          { y: MOTION_DISTANCE.md, opacity: 0 },
          { y: 0, opacity: 1, ease: "none" },
          0.8,
        );
        tl.to(
          enterForgeRef.current,
          { y: -MOTION_DISTANCE.sm, opacity: 0, ease: "none" },
          0.97,
        );
      }
    }, trigger);

    return () => ctx.revert();
  }, [
    triggerRef,
    brandRef,
    taglineRef,
    ctaRef,
    scrollHintRef,
    enterForgeRef,
    editorialRef,
    setHeroProgress,
    reducedMotion,
  ]);
}
