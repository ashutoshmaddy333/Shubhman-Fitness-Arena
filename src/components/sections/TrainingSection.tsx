"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP } from "@/lib/gsap/registerGSAP";
import { createMotionContext, setVisibleInstantly } from "@/lib/gsap/createMotionContext";
import { HOMEPAGE_COPY, getSectionMeta } from "@/lib/content/homepage";
import { SECTION_IMAGES } from "@/lib/content/sectionImages";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/motion/text/RevealText";
import { ForgeImageFrame } from "@/components/ui/ForgeImageFrame";
import { useSectionProgress } from "@/hooks/useSectionProgress";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { isMobileMotionDevice, FORGE_SCROLL_REVEAL_MOBILE } from "@/lib/motion/mobileMotion";
import { MOTION_DISTANCE, MOTION_STAGGER } from "@/lib/motion/tokens";
import { FORGE_SCRUB } from "@/lib/motion/scrollEngine";

const meta = getSectionMeta("training")!;

export function TrainingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotionContext();

  useSectionProgress(sectionRef, { id: "training" });

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    if (reducedMotion) {
      setVisibleInstantly(Array.from(grid.children));
      return;
    }

    const mobile = isMobileMotionDevice();

    return createMotionContext(section, () => {
      gsap.fromTo(
        grid.children,
        { y: MOTION_DISTANCE.lg, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: MOTION_STAGGER.normal,
          ease: mobile ? "power2.out" : "none",
          scrollTrigger: mobile
            ? {
                trigger: section,
                start: FORGE_SCROLL_REVEAL_MOBILE.start,
                toggleActions: "play none none none",
                once: true,
              }
            : {
                trigger: section,
                start: "top 70%",
                end: "top 20%",
                scrub: FORGE_SCRUB.reveal,
              },
        },
      );
    });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="training"
      className="relative z-[var(--z-content)] bg-[var(--background)]/95 section-padding backdrop-blur-sm"
      aria-labelledby="training-heading"
    >
      <div className="container-forge">
        <SectionLabel number={meta.number} label={meta.label} />
        <h2
          id="training-heading"
          className="type-heading-xl text-[var(--text)] mt-6 max-w-3xl [text-wrap:balance]"
        >
          {HOMEPAGE_COPY.training.title}
        </h2>
        <RevealText className="type-body-lg text-[var(--muted)] mt-5 max-w-2xl">
          {HOMEPAGE_COPY.training.body}
        </RevealText>

        <div
          ref={gridRef}
          className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6"
        >
          {HOMEPAGE_COPY.training.categories.map((cat, index) => {
            const image = SECTION_IMAGES.training[index];
            return (
              <div
                key={cat}
                className="group border border-[var(--border)] bg-[var(--surface)] overflow-hidden min-h-[260px] sm:min-h-[280px] flex flex-col hover:border-[var(--accent)]/30 transition-colors"
              >
                <ForgeImageFrame
                  src={image.src}
                  alt={image.alt}
                  aspect={image.aspect ?? "16/10"}
                  objectPosition={image.objectPosition ?? "center center"}
                  variant={index % 2 === 0 ? "scale" : "mask"}
                  sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 25vw"
                />
                <div className="p-4 sm:p-5 flex flex-col justify-end flex-1 min-w-0">
                  <span className="type-micro text-[var(--accent)] mb-2 sm:mb-3">Category</span>
                  <span className="type-heading-md text-[var(--text)] break-words [overflow-wrap:anywhere] leading-tight group-hover:text-[var(--accent)] transition-colors">
                    {cat}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
