"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createMotionContext, setVisibleInstantly } from "@/lib/gsap/createMotionContext";
import { createScrollScrubReveal } from "@/lib/gsap/scrollScrubReveal";
import { IMAGE_PRESETS } from "@/lib/motion/imagePresets";
import { FORGE_SCRUB } from "@/lib/motion/scrollEngine";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
}

export function ImageReveal({ children, className = "" }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotionContext();
  const preset = IMAGE_PRESETS.reveal;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      setVisibleInstantly(el);
      return;
    }

    return createMotionContext(el, () => {
      createScrollScrubReveal(el, preset.from, preset.to, {
        scrub: FORGE_SCRUB.reveal,
        trigger: el,
      });
    });
  }, [reducedMotion, preset.from, preset.to]);

  return (
    <div
      ref={ref}
      className={`overflow-hidden will-change-transform ${className}`}
      data-cursor="view"
    >
      {children}
    </div>
  );
}
