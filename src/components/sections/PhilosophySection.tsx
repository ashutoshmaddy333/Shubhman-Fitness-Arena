"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP } from "@/lib/gsap/registerGSAP";
import { createMotionContext } from "@/lib/gsap/createMotionContext";
import { PHILOSOPHY_SCROLL } from "@/lib/gsap/scrollConfig";
import { TEXT_PRESETS } from "@/lib/motion/textPresets";
import { MOTION_DISTANCE, MOTION_STAGGER } from "@/lib/motion/tokens";
import { BRAND } from "@/lib/constants/assets";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/motion/text/RevealText";
import { Button } from "@/components/ui/Button";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { useSectionProgress } from "@/hooks/useSectionProgress";
import { setVisibleInstantly } from "@/lib/gsap/createMotionContext";

const VALUES = BRAND.values;

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLUListElement>(null);
  const { reducedMotion } = useReducedMotionContext();

  useSectionProgress(sectionRef, { id: "philosophy" });

  useEffect(() => {
    registerGSAP();

    const section = sectionRef.current;
    const content = contentRef.current;
    const values = valuesRef.current;
    if (!section || !content) return;

    if (reducedMotion) {
      setVisibleInstantly([content, ...(values ? Array.from(values.children) : [])]);
      return;
    }

    const preset = TEXT_PRESETS.block;

    return createMotionContext(section, () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: PHILOSOPHY_SCROLL.content.start,
          end: PHILOSOPHY_SCROLL.content.end,
          scrub: 1,
        },
      });

      tl.fromTo(
        content,
        { y: MOTION_DISTANCE.lg, opacity: preset.from.opacity },
        { y: 0, opacity: 1, ease: preset.to.ease },
        0,
      );

      if (values) {
        const items = values.querySelectorAll("li");
        tl.fromTo(
          items,
          { y: MOTION_DISTANCE.sm, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: MOTION_STAGGER.normal,
            ease: preset.to.ease,
          },
          0.2,
        );
      }
    });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative z-[var(--z-content)] bg-[var(--background)] section-padding"
      aria-labelledby="philosophy-heading"
    >
      <div ref={contentRef} className="container-forge">
        <SectionLabel number="03" label={BRAND.philosophy.label} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <h2
              id="philosophy-heading"
              className="type-display-md text-[var(--text)] mt-6"
            >
              {BRAND.philosophy.headline}
              <br />
              {BRAND.philosophy.headlineLine2}
            </h2>

            <RevealText className="mt-8 type-body-lg text-[var(--muted)] max-w-xl">
              {BRAND.philosophy.body}
            </RevealText>

            <RevealText className="mt-6 type-body-lg text-[var(--muted)] max-w-xl type-serif">
              {BRAND.philosophy.editorial}
            </RevealText>

            <div className="mt-10">
              <Button variant="secondary" href="/story" data-cursor="external">
                Read Our Story
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ul ref={valuesRef} className="space-y-6" aria-label="Core values">
              {VALUES.map((value, index) => (
                <li
                  key={value}
                  className="group border-b border-[var(--border)] pb-6 flex items-baseline justify-between gap-4"
                >
                  <span className="type-micro text-[var(--muted)] shrink-0">
                    0{index + 1}
                  </span>
                  <span className="type-heading-xl text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-300 text-right">
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
