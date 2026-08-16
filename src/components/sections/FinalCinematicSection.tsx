"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap/registerGSAP";
import { HOMEPAGE_COPY, getSectionMeta } from "@/lib/content/homepage";
import { SECTION_CONTENT_IMAGES } from "@/lib/content/sectionContentImages";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ForgeImageFrame } from "@/components/ui/ForgeImageFrame";
import { FINAL_SECTION_SCROLL } from "@/lib/gsap/scrollConfig";
import { createMotionContext, setVisibleInstantly } from "@/lib/gsap/createMotionContext";
import { FORGE_SCRUB } from "@/lib/motion/scrollEngine";
import { useSectionProgress } from "@/hooks/useSectionProgress";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { isMobileMotionDevice } from "@/lib/motion/mobileMotion";

const meta = getSectionMeta("final")!;

function FinalMobileContent() {
  return (
    <div className="lg:hidden relative z-[var(--z-content)]">
      <div className="container-forge py-10 sm:py-12">
        <SectionLabel number={meta.number} label={meta.label} />
        <h2
          id="final-heading-mobile"
          className="type-heading-xl text-[var(--text)] mt-6 max-w-xl break-words [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]"
        >
          {HOMEPAGE_COPY.final.title}
        </h2>
        <div className="mt-6 space-y-2">
          {HOMEPAGE_COPY.final.lines.map((line) => (
            <p
              key={line}
              className="type-heading-md text-[var(--text-secondary)] tracking-wide [text-shadow:0_2px_16px_rgba(0,0,0,0.75)]"
            >
              {line}
            </p>
          ))}
        </div>
        <div className="mt-8">
          <MagneticButton>{HOMEPAGE_COPY.final.cta}</MagneticButton>
        </div>
        <div className="final-panel-image mt-8 aspect-[4/5] max-h-[min(52vh,420px)] w-full relative overflow-hidden rounded-[var(--radius-md)] bg-[var(--surface-elevated)]">
          <Image
            src={SECTION_CONTENT_IMAGES.final.darkGrip.src}
            alt={SECTION_CONTENT_IMAGES.final.darkGrip.alt}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: SECTION_CONTENT_IMAGES.final.darkGrip.objectPosition }}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050608]/70 via-transparent to-[#050608]/20"
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="final-section-exit-fade" aria-hidden="true" />
    </div>
  );
}

export function FinalCinematicSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const finalPanelRef = useRef<HTMLDivElement>(null);
  const finalLeftRef = useRef<HTMLDivElement>(null);
  const finalRightRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const { reducedMotion } = useReducedMotionContext();

  useSectionProgress(sectionRef, { id: "final" });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion || isMobileMotionDevice()) {
      if (finalLeftRef.current) setVisibleInstantly(finalLeftRef.current);
      if (finalRightRef.current) setVisibleInstantly(finalRightRef.current);
      return;
    }

    const scrollTrack = scrollTrackRef.current;
    const finalPanel = finalPanelRef.current;
    const finalLeft = finalLeftRef.current;
    const finalRight = finalRightRef.current;
    const hint = hintRef.current;
    if (!scrollTrack || !finalPanel || !finalLeft || !finalRight) return;

    gsap.set(finalLeft, { opacity: 0, x: -48, force3D: true });
    gsap.set(finalRight, { opacity: 0, x: 48, force3D: true });
    gsap.set(finalPanel, { opacity: 1 });
    if (hint) gsap.set(hint, { opacity: 1, y: 0 });

    return createMotionContext(section, () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollTrack,
          start: FINAL_SECTION_SCROLL.start,
          end: FINAL_SECTION_SCROLL.end,
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
      });

      tl.to(finalLeft, { opacity: 1, x: 0, duration: 0.22, ease: "none" }, 0);
      tl.to(finalRight, { opacity: 1, x: 0, duration: 0.22, ease: "none" }, 0.06);
      tl.to({}, { duration: 0.52 });

      tl.to(finalLeft, { opacity: 0, x: -56, duration: 0.38, ease: "none" }, "exit");
      tl.to(finalRight, { opacity: 0, x: 56, duration: 0.38, ease: "none" }, "exit");

      if (hint) {
        gsap.to(hint, {
          opacity: 0,
          y: -8,
          ease: "none",
          scrollTrigger: {
            trigger: scrollTrack,
            start: "top top",
            end: "18% top",
            scrub: FORGE_SCRUB.cinematic,
          },
        });
      }
    });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="final"
      className="relative bg-transparent"
      aria-labelledby="final-heading"
    >
      <FinalMobileContent />

      <div className="hidden lg:block">
        <div
          ref={scrollTrackRef}
          className="relative cinematic-scroll-track"
          style={{ height: meta.scrollHeight }}
        >
          <div className="sticky top-0 h-screen overflow-hidden">
            <div
              ref={finalPanelRef}
              className="final-panel-wrap absolute inset-0 flex items-center will-change-transform"
            >
              <div className="container-forge w-full pt-[var(--nav-height)]">
                <div className="grid grid-cols-2 gap-14 items-center">
                  <div ref={finalLeftRef} className="min-w-0 will-change-transform">
                    <SectionLabel number={meta.number} label={meta.label} />
                    <h2
                      id="final-heading"
                      className="type-heading-xl text-[var(--text)] mt-6 max-w-xl break-words [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]"
                    >
                      {HOMEPAGE_COPY.final.title}
                    </h2>
                    <div className="mt-8 space-y-2">
                      {HOMEPAGE_COPY.final.lines.map((line) => (
                        <p
                          key={line}
                          className="type-heading-md text-[var(--text-secondary)] tracking-wide [text-shadow:0_2px_16px_rgba(0,0,0,0.75)]"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                    <div className="mt-12">
                      <MagneticButton>{HOMEPAGE_COPY.final.cta}</MagneticButton>
                    </div>
                  </div>

                  <div
                    ref={finalRightRef}
                    className="final-panel-image aspect-[4/5] max-h-[70vh] min-h-0 w-full will-change-transform"
                  >
                    <ForgeImageFrame
                      src={SECTION_CONTENT_IMAGES.final.darkGrip.src}
                      alt={SECTION_CONTENT_IMAGES.final.darkGrip.alt}
                      objectPosition={SECTION_CONTENT_IMAGES.final.darkGrip.objectPosition}
                      variant="mask"
                      fill
                      sizes="45vw"
                      className="h-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <p
              ref={hintRef}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 type-micro text-[var(--text-secondary)] [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]"
              aria-hidden="true"
            >
              <span>Scroll</span>
              <span className="footer-scroll-chevron" />
            </p>

            <div className="final-section-exit-fade pointer-events-none lg:hidden" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
