"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { createMotionContext, setVisibleInstantly } from "@/lib/gsap/createMotionContext";
import { createScrollScrubReveal } from "@/lib/gsap/scrollScrubReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ForgeImageFrame } from "@/components/ui/ForgeImageFrame";
import type { SectionImage } from "@/lib/content/sectionImages";
import { CINEMATIC_SECTION_SCROLL } from "@/lib/gsap/scrollConfig";
import { FORGE_SCRUB } from "@/lib/motion/scrollEngine";
import { useSectionProgress } from "@/hooks/useSectionProgress";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";

interface CinematicScrollSectionProps {
  id: string;
  number: string;
  label: string;
  scrollHeight: string;
  title: string;
  body?: string;
  image?: SectionImage;
  children?: ReactNode;
  className?: string;
}

/** Sticky cinematic scroll track — content overlays fixed 3D canvas */
export function CinematicScrollSection({
  id,
  number,
  label,
  scrollHeight,
  title,
  body,
  image,
  children,
  className = "",
}: CinematicScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imagePanelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { reducedMotion } = useReducedMotionContext();

  useSectionProgress(sectionRef, { id });

  useEffect(() => {
    const section = sectionRef.current;
    const panel = imagePanelRef.current;
    const title = titleRef.current;
    if (!section) return;

    if (reducedMotion) {
      if (panel) setVisibleInstantly(panel);
      if (title) setVisibleInstantly(title);
      return;
    }

    return createMotionContext(section, () => {
      if (panel) {
        createScrollScrubReveal(
          panel,
          {
            rotateY: -10,
            scale: 0.88,
            y: 48,
            transformPerspective: 900,
            transformOrigin: "center center",
          },
          {
            rotateY: 0,
            scale: 1,
            y: 0,
          },
          {
            trigger: section,
            start: CINEMATIC_SECTION_SCROLL.start,
            end: CINEMATIC_SECTION_SCROLL.end,
            scrub: FORGE_SCRUB.depth,
          },
        );
      }

      if (title) {
        createScrollScrubReveal(
          title,
          { y: 56, opacity: 0.35, letterSpacing: "0.04em" },
          { y: 0, opacity: 1, letterSpacing: "0.02em" },
          {
            trigger: section,
            start: CINEMATIC_SECTION_SCROLL.start,
            end: "center center",
            scrub: FORGE_SCRUB.cinematic,
          },
        );
      }
    });
  }, [reducedMotion, image]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative cinematic-scroll-track ${className}`}
      style={{ height: scrollHeight }}
      aria-labelledby={`${id}-heading`}
    >
      <div className="sticky top-0 h-screen flex items-end pb-[clamp(3rem,8vh,6rem)] pointer-events-none">
        <div className="container-forge relative w-full pt-[var(--nav-height)] pointer-events-auto">
          {image && (
            <div
              ref={imagePanelRef}
              className="hidden lg:block absolute right-0 top-[14%] w-[min(40vw,440px)] will-change-transform"
              aria-hidden="true"
              style={{ perspective: "900px" }}
            >
              <ForgeImageFrame
                src={image.src}
                alt={image.alt}
                aspect={image.aspect ?? "4/5"}
                objectPosition={image.objectPosition ?? "center center"}
                variant={image.variant ?? "parallax"}
                sizes="440px"
                className="border border-[var(--border)] shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
              />
            </div>
          )}
          <div className="max-w-3xl">
            <SectionLabel number={number} label={label} />
            <h2
              ref={titleRef}
              id={`${id}-heading`}
              className="type-display-md text-[var(--text)] mt-6 will-change-transform"
            >
              {title}
            </h2>
            {body && (
              <p className="type-body-lg text-[var(--muted)] mt-6 max-w-xl">{body}</p>
            )}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
