"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/registerGSAP";
import { createMotionContext, setVisibleInstantly } from "@/lib/gsap/createMotionContext";
import { TEXT_PRESETS } from "@/lib/motion/textPresets";
import { MOTION_SCROLL } from "@/lib/motion/tokens";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { SplitText } from "@/components/motion/text/SplitText";

interface CharacterRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
}

/** Use sparingly — hero/editorial moments only */
export function CharacterReveal({
  text,
  as = "span",
  className = "",
}: CharacterRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotionContext();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll("[data-split-unit]");
    if (!chars.length) return;

    if (reducedMotion) {
      setVisibleInstantly(chars);
      return;
    }

    const preset = TEXT_PRESETS.char;

    return createMotionContext(container, () => {
      gsap.fromTo(chars, preset.from, {
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
      <SplitText text={text} as={as} className={className} splitBy="chars" />
    </div>
  );
}
