"use client";

import { HOMEPAGE_COPY, getSectionMeta } from "@/lib/content/homepage";
import { SECTION_IMAGES } from "@/lib/content/sectionImages";
import { CinematicScrollSection } from "@/components/sections/CinematicScrollSection";

const meta = getSectionMeta("details")!;

export function FacilityDetailsSection() {
  return (
    <CinematicScrollSection
      id="details"
      number={meta.number}
      label={meta.label}
      scrollHeight={meta.scrollHeight}
      title={HOMEPAGE_COPY.details.title}
      body={HOMEPAGE_COPY.details.body}
      image={{ ...SECTION_IMAGES.details, variant: "mask" }}
    />
  );
}
