"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createMotionContext, setVisibleInstantly } from "@/lib/gsap/createMotionContext";
import { createScrollScrubReveal } from "@/lib/gsap/scrollScrubReveal";
import { IMAGE_PRESETS } from "@/lib/motion/imagePresets";
import { FORGE_SCRUB } from "@/lib/motion/scrollEngine";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

interface ImageScaleRevealProps {
  children: ReactNode;
  className?: string;
}

export function ImageScaleReveal({ children, className = "" }: ImageScaleRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotionContext();
  const preset = IMAGE_PRESETS.scale;

  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    if (reducedMotion) {
      setVisibleInstantly(el);
      setVisibleInstantly(inner);
      return;
    }

    return createMotionContext(el, () => {
      createScrollScrubReveal(el, preset.from, preset.to, {
        scrub: FORGE_SCRUB.reveal,
        trigger: el,
      });

      createScrollScrubReveal(
        inner,
        { y: "6%", scale: 1.08 },
        { y: "0%", scale: 1 },
        { scrub: FORGE_SCRUB.parallax, trigger: el },
      );
    });
  }, [reducedMotion, preset.from, preset.to]);

  return (
    <div
      ref={ref}
      className={`overflow-hidden will-change-transform ${className}`}
      data-cursor="view"
    >
      <div ref={innerRef} className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
