"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap/registerGSAP";
import { createMotionContext, setVisibleInstantly } from "@/lib/gsap/createMotionContext";
import { VIDEO_PRESETS } from "@/lib/motion/videoPresets";
import { MOTION_SCROLL } from "@/lib/motion/tokens";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

interface VideoRevealProps {
  children: ReactNode;
  className?: string;
}

/** Animation layer only — does not load video assets */
export function VideoReveal({ children, className = "" }: VideoRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotionContext();
  const preset = VIDEO_PRESETS.reveal;

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
