"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "@/lib/gsap/registerGSAP";
import { createMotionContext } from "@/lib/gsap/createMotionContext";
import { FORGE_SCRUB, FORGE_SCROLL_REVEAL } from "@/lib/motion/scrollEngine";
import type { SectionProgressOptions } from "@/lib/motion/types";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { useScrollProgressRegistry } from "@/hooks/useScrollProgress";

let sectionIdCounter = 0;

/**
 * Returns a ref tracking section scroll progress (0→1).
 * No React state updates — safe for 3D useFrame loops.
 */
export function useSectionProgress(
  ref: RefObject<HTMLElement | null>,
  options: SectionProgressOptions = {},
) {
  const progressRef = useRef(0);
  const { reducedMotion } = useReducedMotionContext();
  const { registerSection, unregisterSection } = useScrollProgressRegistry();

  const sectionId = useRef(options.id ?? `section-${++sectionIdCounter}`);

  useEffect(() => {
    const id = sectionId.current;
    registerSection(id, progressRef);
    return () => unregisterSection(id);
  }, [registerSection, unregisterSection]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      progressRef.current = 0;
      return;
    }

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
