"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap/registerGSAP";
import { createMotionContext, setVisibleInstantly } from "@/lib/gsap/createMotionContext";
import { createScrollScrubReveal } from "@/lib/gsap/scrollScrubReveal";
import { TEXT_PRESETS } from "@/lib/motion/textPresets";
import { FORGE_SCRUB, FORGE_SCROLL_REVEAL } from "@/lib/motion/scrollEngine";
import type { RevealOptions } from "@/lib/motion/types";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

interface RevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "p" | "span";
  scroll?: RevealOptions;
}

export function RevealText({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  scroll,
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotionContext();
  const preset = TEXT_PRESETS.block;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      setVisibleInstantly(el);
      return;
    }

    const start = scroll?.start ?? FORGE_SCROLL_REVEAL.start;
    const end = scroll?.once ? start : FORGE_SCROLL_REVEAL.end;

    return createMotionContext(el, () => {
      if (scroll?.once) {
        gsap.fromTo(el, preset.from, {
          ...preset.to,
          delay,
          scrollTrigger: { trigger: el, start, toggleActions: "play none none none" },
        });
        return;
      }

      createScrollScrubReveal(el, preset.from, { ...preset.to, delay }, {
        start,
        end,
        scrub: FORGE_SCRUB.reveal,
        trigger: el,
      });
    });
  }, [delay, reducedMotion, scroll?.start, scroll?.once, preset.from, preset.to]);

  return (
    <Tag ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </Tag>
  );
}
