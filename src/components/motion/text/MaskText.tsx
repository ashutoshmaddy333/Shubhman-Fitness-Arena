"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/registerGSAP";
import { createMotionContext, setVisibleInstantly } from "@/lib/gsap/createMotionContext";
import { TEXT_PRESETS } from "@/lib/motion/textPresets";
import { MOTION_SCROLL } from "@/lib/motion/tokens";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

interface MaskTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
}

export function MaskText({ text, as: Tag = "p", className = "" }: MaskTextProps) {
  const ref = useRef<HTMLElement>(null);
  const { reducedMotion } = useReducedMotionContext();
  const preset = TEXT_PRESETS.mask;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      setVisibleInstantly(el, { clipPath: "inset(0% 0% 0% 0%)" });
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
    <Tag ref={ref as React.RefObject<HTMLParagraphElement>} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{text}</span>
    </Tag>
  );
}
