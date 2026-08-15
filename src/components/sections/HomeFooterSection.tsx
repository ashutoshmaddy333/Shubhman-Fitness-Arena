"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap/registerGSAP";
import { BACKDROP_IMAGES } from "@/lib/content/backdropImages";
import { FooterContent } from "@/components/layout/FooterContent";
import { createMotionContext, setVisibleInstantly } from "@/lib/gsap/createMotionContext";
import { createScrollScrubReveal } from "@/lib/gsap/scrollScrubReveal";
import { FORGE_SCRUB } from "@/lib/motion/scrollEngine";
import { useSectionProgress } from "@/hooks/useSectionProgress";
import { useReducedMotionContext } from "@/components/providers/ReducedMotionProvider";
import { isMobileMotionDevice } from "@/lib/motion/mobileMotion";

/** Home footer — separate section with cinematic backdrop + scroll reveal */
export function HomeFooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bgInnerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotionContext();

  useSectionProgress(sectionRef, { id: "footer" });

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const bgInner = bgInnerRef.current;
    const content = contentRef.current;
    if (!section || !bg || !bgInner || !content) return;

    const cols = content.querySelectorAll("[data-footer-col]");
    const bottom = content.querySelector("[data-footer-bottom]");

    if (reducedMotion) {
      setVisibleInstantly(bg);
      setVisibleInstantly(bgInner);
      setVisibleInstantly(content);
      gsap.set(cols, { opacity: 1, y: 0 });
      if (bottom) gsap.set(bottom, { opacity: 1, y: 0 });
      return;
    }

    const mobile = isMobileMotionDevice();

    return createMotionContext(section, () => {
      createScrollScrubReveal(
        bg,
        { opacity: 0.35 },
        { opacity: 1 },
        {
          trigger: section,
          start: mobile ? "top 98%" : "top bottom",
          end: mobile ? "top 80%" : "top 60%",
          scrub: mobile ? false : FORGE_SCRUB.cinematic,
        },
      );

      createScrollScrubReveal(
        bgInner,
        { scale: 1.12, y: "4%" },
        { scale: 1, y: "0%" },
        {
          trigger: section,
          start: mobile ? "top 98%" : "top bottom",
          end: mobile ? "top 72%" : "top 40%",
          scrub: mobile ? false : FORGE_SCRUB.parallax,
        },
      );

      gsap.fromTo(
        cols,
        { opacity: 0, y: mobile ? 22 : 32 },
        {
          opacity: 1,
          y: 0,
          stagger: mobile ? 0.07 : 0.05,
          duration: mobile ? 0.65 : 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: content,
            start: mobile ? "top 94%" : "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );

      if (bottom) {
        gsap.fromTo(
          bottom,
          { opacity: 0, y: mobile ? 14 : 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
            delay: mobile ? 0.18 : 0.12,
            scrollTrigger: {
              trigger: content,
              start: mobile ? "top 90%" : "top 82%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      }
    });
  }, [reducedMotion]);

  return (
    <footer
      ref={sectionRef}
      id="footer"
      className="footer-section relative z-[var(--z-content)]"
      aria-label="Site footer"
    >
      <div ref={bgRef} className="footer-section__bg" aria-hidden="true">
        <div ref={bgInnerRef} className="footer-section__bg-inner">
          <Image
            src={BACKDROP_IMAGES.blueBench.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: BACKDROP_IMAGES.blueBench.objectPosition }}
          />
        </div>
        <div className="footer-section__bg-blend" />
        <div className="footer-section__bg-overlay" />
      </div>

      <div
        ref={contentRef}
        className="footer-section__content container-forge px-[var(--space-inline)] pt-12 sm:pt-16 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
      >
        <FooterContent />
      </div>
    </footer>
  );
}
