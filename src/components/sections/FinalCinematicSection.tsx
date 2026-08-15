"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/registerGSAP";
import { HOMEPAGE_COPY, getSectionMeta } from "@/lib/content/homepage";
import { SECTION_CONTENT_IMAGES } from "@/lib/content/sectionContentImages";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ForgeImageFrame } from "@/components/ui/ForgeImageFrame";
import { FooterContent } from "@/components/layout/FooterContent";
import { createMotionContext, setVisibleInstantly } from "@/lib/gsap/createMotionContext";
import { FORGE_SCRUB } from "@/lib/motion/scrollEngine";
import { useSectionProgress } from "@/hooks/useSectionProgress";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

const meta = getSectionMeta("final")!;
/** Slightly softer scrub — final → footer handoff */
const FINAL_SCRUB = 0.38;

export function FinalCinematicSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const finalPanelRef = useRef<HTMLDivElement>(null);
  const finalLeftRef = useRef<HTMLDivElement>(null);
  const finalRightRef = useRef<HTMLDivElement>(null);
  const footerStageRef = useRef<HTMLDivElement>(null);
  const footerDocRef = useRef<HTMLElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const { reducedMotion } = useReducedMotionContext();

  useSectionProgress(sectionRef, { id: "final" });

  useEffect(() => {
    const section = sectionRef.current;
    const scrollTrack = scrollTrackRef.current;
    const finalPanel = finalPanelRef.current;
    const finalLeft = finalLeftRef.current;
    const finalRight = finalRightRef.current;
    const footerStage = footerStageRef.current;
    const footerDoc = footerDocRef.current;
    const hint = hintRef.current;
    if (
      !section ||
      !scrollTrack ||
      !finalPanel ||
      !finalLeft ||
      !finalRight ||
      !footerStage ||
      !footerDoc
    ) {
      return;
    }

    const stageCols = footerStage.querySelectorAll("[data-footer-col]");
    const stageBottom = footerStage.querySelector("[data-footer-bottom]");
    const docCols = footerDoc.querySelectorAll("[data-footer-col]");
    const docBottom = footerDoc.querySelector("[data-footer-bottom]");

    const showDocFooter = () => {
      gsap.set(footerStage, { autoAlpha: 0, pointerEvents: "none" });
      footerDoc.classList.remove("footer-doc--dormant");
      footerDoc.classList.add("footer-doc--active");
      gsap.set(footerDoc, { autoAlpha: 1, pointerEvents: "auto" });
      gsap.set(docCols, { opacity: 1, x: 0, y: 0 });
      if (docBottom) gsap.set(docBottom, { opacity: 1, y: 0 });
      ScrollTrigger.refresh();
    };

    const showStageFooter = () => {
      footerDoc.classList.add("footer-doc--dormant");
      footerDoc.classList.remove("footer-doc--active");
      gsap.set(footerDoc, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(footerStage, { autoAlpha: 1, pointerEvents: "auto" });
      ScrollTrigger.refresh();
    };

    if (reducedMotion) {
      setVisibleInstantly(finalPanel);
      setVisibleInstantly(finalLeft);
      setVisibleInstantly(finalRight);
      gsap.set(footerStage, { autoAlpha: 0 });
      footerDoc.classList.remove("footer-doc--dormant");
      footerDoc.classList.add("footer-doc--active");
      setVisibleInstantly(footerDoc);
      setVisibleInstantly(docCols);
      setVisibleInstantly(docBottom);
      if (hint) gsap.set(hint, { opacity: 0 });
      return;
    }

    gsap.set(finalLeft, { opacity: 0, x: -48, force3D: true });
    gsap.set(finalRight, { opacity: 0, x: 48, force3D: true });
    gsap.set(finalPanel, { opacity: 1 });
    gsap.set(footerStage, { autoAlpha: 0, y: 28, pointerEvents: "none" });
    gsap.set(stageCols, { opacity: 0, y: 20, force3D: true });
    if (stageBottom) gsap.set(stageBottom, { opacity: 0, y: 16, force3D: true });
    gsap.set(footerDoc, { autoAlpha: 0, pointerEvents: "none" });
    gsap.set(docCols, { opacity: 0, y: 16 });
    if (docBottom) gsap.set(docBottom, { opacity: 0, y: 12 });
    if (hint) gsap.set(hint, { opacity: 1, y: 0 });

    return createMotionContext(section, () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollTrack,
          start: "top top",
          end: "bottom bottom",
          scrub: FINAL_SCRUB,
          invalidateOnRefresh: true,
        },
      });

      /* Entrance */
      tl.to(finalLeft, { opacity: 1, x: 0, duration: 0.14, ease: "none" }, 0);
      tl.to(finalRight, { opacity: 1, x: 0, duration: 0.14, ease: "none" }, 0.04);

      /* Hold finale on canvas */
      tl.to({}, { duration: 0.36 });

      /* Smooth crossfade — finale out, footer rises in on same viewport */
      tl.to(
        finalLeft,
        { opacity: 0, x: -56, duration: 0.28, ease: "none" },
        "crossfade",
      );
      tl.to(
        finalRight,
        { opacity: 0, x: 56, duration: 0.28, ease: "none" },
        "crossfade",
      );
      tl.to(finalPanel, { opacity: 0, duration: 0.2, ease: "none" }, "crossfade+=0.04");
      tl.to(
        footerStage,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.32,
          ease: "none",
          onStart: () => gsap.set(footerStage, { pointerEvents: "auto" }),
        },
        "crossfade+=0.06",
      );
      tl.to(
        stageCols,
        { opacity: 1, y: 0, stagger: 0.04, duration: 0.28, ease: "none" },
        "crossfade+=0.1",
      );
      if (stageBottom) {
        tl.to(
          stageBottom,
          { opacity: 1, y: 0, duration: 0.2, ease: "none" },
          "crossfade+=0.22",
        );
      }

      if (hint) {
        gsap.to(hint, {
          opacity: 0,
          y: -8,
          ease: "none",
          scrollTrigger: {
            trigger: scrollTrack,
            start: "top top",
            end: "10% top",
            scrub: FORGE_SCRUB.reveal,
          },
        });
      }

      /* Seamless swap: sticky preview → document footer */
      ScrollTrigger.create({
        trigger: scrollTrack,
        start: "bottom bottom+=1",
        end: "bottom bottom+=1",
        onEnter: showDocFooter,
        onLeaveBack: () => {
          showStageFooter();
          gsap.set(stageCols, { opacity: 1, y: 0 });
          if (stageBottom) gsap.set(stageBottom, { opacity: 1, y: 0 });
          gsap.set(docCols, { opacity: 0, y: 16 });
          if (docBottom) gsap.set(docBottom, { opacity: 0, y: 12 });
        },
      });
    });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="final"
      className="relative bg-transparent"
      aria-labelledby="final-heading"
    >
      <div
        ref={scrollTrackRef}
        className="relative cinematic-scroll-track"
        style={{ height: meta.scrollHeight }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Finale CTA */}
          <div
            ref={finalPanelRef}
            className="absolute inset-0 flex items-center will-change-transform"
          >
            <div className="container-forge w-full pt-[var(--nav-height)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                <div
                  ref={finalLeftRef}
                  data-motion="final-left"
                  className="min-w-0 will-change-transform"
                >
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
                  data-motion="final-right"
                  className="final-panel-image aspect-[4/5] max-h-[70vh] min-h-0 w-full will-change-transform"
                >
                  <ForgeImageFrame
                    src={SECTION_CONTENT_IMAGES.final.darkGrip.src}
                    alt={SECTION_CONTENT_IMAGES.final.darkGrip.alt}
                    objectPosition={SECTION_CONTENT_IMAGES.final.darkGrip.objectPosition}
                    variant="mask"
                    fill
                    sizes="(max-width:1024px) 100vw, 45vw"
                    className="h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer preview — crossfades in on same 3D canvas */}
          <div
            ref={footerStageRef}
            className="absolute inset-x-0 bottom-0 z-20 will-change-transform"
            aria-hidden="true"
          >
            <div className="footer-canvas-fade" />
            <div className="container-forge section-padding pt-0 pb-10 sm:pb-12">
              <FooterContent />
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
        </div>
      </div>

      {/* Persistent footer — expands into layout only after sticky handoff */}
      <footer
        ref={footerDocRef}
        id="footer"
        className="footer-doc footer-doc--dormant relative z-[var(--z-content)] bg-transparent"
      >
        <div className="footer-canvas-fade footer-canvas-fade--doc" aria-hidden="true" />
        <div className="container-forge pt-4 pb-0">
          <FooterContent />
        </div>
      </footer>
    </section>
  );
}
