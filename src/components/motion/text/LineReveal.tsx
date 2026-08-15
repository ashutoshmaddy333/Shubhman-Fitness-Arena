"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/registerGSAP";
import { createMotionContext, setVisibleInstantly } from "@/lib/gsap/createMotionContext";
import { TEXT_PRESETS } from "@/lib/motion/textPresets";
import { MOTION_SCROLL } from "@/lib/motion/tokens";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { SplitText } from "@/components/motion/text/SplitText";

interface LineRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
}

export function LineReveal({ text, as = "p", className = "" }: LineRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotionContext();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lines = container.querySelectorAll("[data-split-unit]");
    if (!lines.length) return;

    if (reducedMotion) {
      setVisibleInstantly(lines);
      return;
    }

    const preset = TEXT_PRESETS.line;

    return createMotionContext(container, () => {
      gsap.fromTo(lines, preset.from, {
        ...preset.to,
        scrollTrigger: {
          trigger: container,
          start: MOTION_SCROLL.revealStart,
          toggleActions: "play none none reverse",
        },
      });
    });
  }, [reducedMotion, text]);

  return (
    <div ref={containerRef}>
      <SplitText text={text} as={as} className={className} splitBy="lines" />
    </div>
  );
}
