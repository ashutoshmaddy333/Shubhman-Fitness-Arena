"use client";

import { useRef } from "react";
import { HOMEPAGE_COPY, getSectionMeta } from "@/lib/content/homepage";
import { SECTION_CONTENT_IMAGES } from "@/lib/content/sectionContentImages";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ForgeImageFrame } from "@/components/ui/ForgeImageFrame";
import { useSectionProgress } from "@/hooks/useSectionProgress";

const meta = getSectionMeta("facility")!;

const FACILITY_GRID = [
  { ...SECTION_CONTENT_IMAGES.facility.entrance, variant: "parallax" as const, span: "wide" },
  { ...SECTION_CONTENT_IMAGES.facility.strength, variant: "scale" as const, span: "square" },
  { ...SECTION_CONTENT_IMAGES.facility.boxing, variant: "mask" as const, span: "square" },
  { ...SECTION_CONTENT_IMAGES.facility.cardio, variant: "reveal" as const, span: "square" },
  { ...SECTION_CONTENT_IMAGES.facility.recovery, variant: "parallax" as const, span: "square" },
  { ...SECTION_CONTENT_IMAGES.facility.locker, variant: "scale" as const, span: "wide" },
];

export function FacilityTourSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionProgress(sectionRef, { id: "facility" });

  return (
    <section
      ref={sectionRef}
      id="facility"
      className="relative cinematic-scroll-track"
      style={{ height: meta.scrollHeight }}
      aria-labelledby="facility-heading"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-end pb-[clamp(3rem,8vh,6rem)] max-lg:relative max-lg:h-auto max-lg:min-h-[100svh] max-lg:overflow-visible">
        <div className="container-forge w-full pt-[var(--nav-height)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <SectionLabel number={meta.number} label={meta.label} />
              <h2 id="facility-heading" className="type-display-md text-[var(--text)] mt-6">
                {HOMEPAGE_COPY.facility.title}
              </h2>

              <ol className="mt-12 flex flex-col gap-4 max-w-md" aria-label="Facility tour stages">
                {HOMEPAGE_COPY.facility.stages.map((stage, i) => (
                  <li
                    key={stage}
                    className="flex items-center gap-4 border-l-2 border-[var(--border)] pl-6 py-2 hover:border-[var(--accent)] transition-colors"
                  >
                    <span className="type-micro text-[var(--accent)]">0{i + 1}</span>
                    <span className="type-heading-md text-[var(--text)] tracking-wide">{stage}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid grid-cols-2 gap-3 auto-rows-[minmax(0,1fr)]">
              {FACILITY_GRID.map((image) => (
                <div
                  key={image.src}
                  className={[
                    "min-h-0",
                    image.span === "wide" ? "col-span-2 aspect-[16/9]" : "aspect-square",
                  ].join(" ")}
                >
                  <ForgeImageFrame
                    src={image.src}
                    alt={image.alt}
                    objectPosition={image.objectPosition ?? "center center"}
                    variant={image.variant}
                    fill
                    sizes="40vw"
                    className="border border-[var(--border)] h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
