"use client";

import { HOMEPAGE_COPY, getSectionMeta } from "@/lib/content/homepage";
import { SECTION_IMAGES } from "@/lib/content/sectionImages";
import { CinematicScrollSection } from "@/components/sections/CinematicScrollSection";

const meta = getSectionMeta("performance")!;

export function PerformanceZoneSection() {
  return (
    <CinematicScrollSection
      id="performance"
      number={meta.number}
      label={meta.label}
      scrollHeight={meta.scrollHeight}
      title={HOMEPAGE_COPY.performance.title}
      body={HOMEPAGE_COPY.performance.body}
      image={{ ...SECTION_IMAGES.performance, variant: "reveal" }}
    />
  );
}
