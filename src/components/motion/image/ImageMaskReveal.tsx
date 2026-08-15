"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createMotionContext, setVisibleInstantly } from "@/lib/gsap/createMotionContext";
import { createScrollScrubReveal } from "@/lib/gsap/scrollScrubReveal";
import { CLIP_PATHS, IMAGE_PRESETS } from "@/lib/motion/imagePresets";
import { FORGE_SCRUB } from "@/lib/motion/scrollEngine";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

interface ImageMaskRevealProps {
  children: ReactNode;
  className?: string;
  direction?: keyof typeof CLIP_PATHS;
}

export function ImageMaskReveal({
  children,
  className = "",
  direction = "up",
}: ImageMaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotionContext();
  const clip = CLIP_PATHS[direction];
  const preset = IMAGE_PRESETS.maskUp;

  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    if (reducedMotion) {
      setVisibleInstantly(el, { clipPath: clip.to });
      setVisibleInstantly(inner);
      return;
    }

    return createMotionContext(el, () => {
      createScrollScrubReveal(
        el,
        { clipPath: clip.from, scale: preset.from.scale },
        { clipPath: clip.to, scale: preset.to.scale },
        { scrub: FORGE_SCRUB.reveal, trigger: el },
      );

      createScrollScrubReveal(
        inner,
        { y: "8%", scale: 1.12 },
        { y: "0%", scale: 1 },
        { scrub: FORGE_SCRUB.parallax, trigger: el },
      );
    });
  }, [reducedMotion, clip.from, clip.to, preset.from.scale, preset.to.scale]);

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
