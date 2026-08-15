"use client";

import { useRef } from "react";
import { BRAND } from "@/lib/constants/assets";
import { HOMEPAGE_COPY } from "@/lib/content/homepage";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SplitText } from "@/components/motion/text/SplitText";
import { HeroBrand3D } from "@/components/sections/HeroBrand3D";
import { useHeroScrollTimeline } from "@/lib/gsap/useHeroScrollTimeline";
import { MOTION_DISTANCE } from "@/lib/motion/tokens";

export function HeroSection() {
  const triggerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const enterForgeRef = useRef<HTMLDivElement>(null);
  const editorialRef = useRef<HTMLParagraphElement>(null);

  useHeroScrollTimeline({
    triggerRef,
    brandRef,
    taglineRef,
    ctaRef,
    scrollHintRef,
    enterForgeRef,
    editorialRef,
  });

  return (
    <section
      ref={triggerRef}
      id="hero"
      className="relative hero-scroll-track"
      aria-label="Hero"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden max-lg:relative max-lg:h-auto max-lg:min-h-0 max-lg:items-start max-lg:overflow-hidden">
        <div className="container-forge relative z-[var(--z-content)] w-full pt-[var(--nav-height)] pb-8 lg:pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-8 lg:gap-10 xl:gap-14 items-center">
            <div className="max-w-3xl min-w-0">
              <h1
                ref={brandRef}
                className="font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.02em] uppercase text-[var(--text)] will-change-transform max-w-xl [text-wrap:balance] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]"
              >
                <span className="sr-only">{BRAND.name}. </span>
                <SplitText text={BRAND.tagline} as="span" />
              </h1>

              <p
                ref={taglineRef}
                className="type-heading-md text-[var(--text-secondary)] mt-5 max-w-md will-change-transform tracking-[0.12em] uppercase [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]"
              >
                {HOMEPAGE_COPY.hero.subtitle}
              </p>

              <p className="type-body mt-4 max-w-sm text-[var(--muted)] will-change-transform tracking-wide uppercase">
                BUILT FOR STRENGTH.
                <br />
                ENGINEERED FOR PERFORMANCE.
              </p>

              <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-6 will-change-transform">
                <MagneticButton>Start Your Journey</MagneticButton>
                <a
                  href="#facility"
                  className="type-micro tracking-[0.2em] text-[var(--muted)] uppercase transition-colors hover:text-[var(--text)]"
                >
                  Explore the Facility
                </a>
              </div>
            </div>

            <HeroBrand3D className="w-full min-w-0 lg:justify-self-end" />
          </div>

          <div
            ref={enterForgeRef}
            className="pointer-events-none absolute bottom-[18%] left-0 opacity-0 will-change-transform max-lg:hidden"
            aria-hidden="true"
          >
            <p className="type-display-md text-[var(--accent)] tracking-[0.2em]">
              {HOMEPAGE_COPY.hero.enter}
            </p>
          </div>

          <p
            ref={editorialRef}
            className="pointer-events-none absolute top-[42%] left-0 opacity-0 will-change-transform type-micro tracking-[0.35em] text-[var(--muted)] uppercase max-lg:hidden"
            aria-hidden="true"
          >
            {BRAND.values[2]}
          </p>
        </div>

        <div
          ref={scrollHintRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[var(--z-content)] hidden lg:flex flex-col items-center gap-3"
          aria-hidden="true"
        >
          <span className="type-micro text-[var(--muted)]">Scroll</span>
          <span
            className="block w-px bg-gradient-to-b from-[var(--accent)] to-transparent"
            style={{ height: MOTION_DISTANCE.sm }}
          />
        </div>
      </div>
    </section>
  );
}
