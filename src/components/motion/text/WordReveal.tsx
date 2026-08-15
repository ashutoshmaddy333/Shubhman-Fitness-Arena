"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/registerGSAP";
import { createMotionContext, setVisibleInstantly } from "@/lib/gsap/createMotionContext";
import { TEXT_PRESETS } from "@/lib/motion/textPresets";
import { MOTION_SCROLL } from "@/lib/motion/tokens";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { SplitText } from "@/components/motion/text/SplitText";

interface WordRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
}

export function WordReveal({ text, as = "span", className = "" }: WordRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotionContext();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll("[data-split-unit]");
    if (!words.length) return;

    if (reducedMotion) {
      setVisibleInstantly(words);
      return;
    }

    const preset = TEXT_PRESETS.word;

    return createMotionContext(container, () => {
      gsap.fromTo(words, preset.from, {
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
      <SplitText text={text} as={as} className={className} splitBy="words" />
    </div>
  );
}
