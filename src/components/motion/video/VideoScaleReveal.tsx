"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap/registerGSAP";
import { createMotionContext, setVisibleInstantly } from "@/lib/gsap/createMotionContext";
import { VIDEO_PRESETS } from "@/lib/motion/videoPresets";
import { MOTION_SCROLL } from "@/lib/motion/tokens";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

interface VideoScaleRevealProps {
  children: ReactNode;
  className?: string;
}

export function VideoScaleReveal({ children, className = "" }: VideoScaleRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotionContext();
  const preset = VIDEO_PRESETS.scale;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      setVisibleInstantly(el);
      return;
    }

    return createMotionContext(el, () => {
      gsap.fromTo(el, preset.from, {
        ...preset.to,
        scrollTrigger: {
          trigger: el,
          start: MOTION_SCROLL.revealStart,
          toggleActions: "play none none reverse",
        },
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} data-cursor="play">
      {children}
    </div>
  );
}
