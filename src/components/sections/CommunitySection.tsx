"use client";

import { useRef } from "react";
import { HOMEPAGE_COPY, getSectionMeta } from "@/lib/content/homepage";
import { SECTION_CONTENT_IMAGES } from "@/lib/content/sectionContentImages";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/motion/text/RevealText";
import { ForgeImageFrame } from "@/components/ui/ForgeImageFrame";
import { useSectionProgress } from "@/hooks/useSectionProgress";

const meta = getSectionMeta("community")!;

const COMMUNITY_GRID = [
  {
    ...SECTION_CONTENT_IMAGES.community.session,
    label: "Session",
    variant: "parallax" as const,
    span: "wide" as const,
  },
  {
    ...SECTION_CONTENT_IMAGES.community.training,
    label: "Training",
    variant: "mask" as const,
    span: "square" as const,
  },
  {
    ...SECTION_CONTENT_IMAGES.community.floor,
    label: "Community",
    variant: "scale" as const,
    span: "square" as const,
  },
  {
    ...SECTION_CONTENT_IMAGES.community.equipment,
    label: "Equipment",
    variant: "reveal" as const,
    span: "wide" as const,
  },
];

export function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionProgress(sectionRef, { id: "community" });

  return (
    <section
      ref={sectionRef}
      id="community"
      className="relative z-[var(--z-content)] bg-[var(--background)]/95 section-padding backdrop-blur-sm"
      aria-labelledby="community-heading"
    >
      <div className="container-forge">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel number={meta.number} label={meta.label} />
            <h2 id="community-heading" className="type-display-md text-[var(--text)] mt-6">
              {HOMEPAGE_COPY.community.title}
            </h2>
            <RevealText className="type-body-lg mt-6 max-w-lg">
              {HOMEPAGE_COPY.community.body}
            </RevealText>
          </div>

          <div className="grid grid-cols-2 gap-3 auto-rows-[minmax(0,1fr)]">
            {COMMUNITY_GRID.map((img, index) => (
              <div
                key={img.src}
                className={[
                  "relative min-h-0",
                  img.span === "wide" ? "col-span-2 aspect-[16/9]" : "aspect-square",
                ].join(" ")}
              >
                <ForgeImageFrame
                  src={img.src}
                  alt={img.alt}
                  objectPosition={img.objectPosition}
                  variant={img.variant}
                  maskDirection={index % 2 === 0 ? "up" : "right"}
                  fill
                  sizes="50vw"
                  className="border border-[var(--border)] h-full"
                />
                <span className="absolute bottom-3 left-3 type-micro text-[var(--accent)] bg-[var(--surface-glass)] backdrop-blur-sm px-2 py-1 z-10 rounded-[var(--radius-sm)]">
                  {img.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
