"use client";

import { HOMEPAGE_COPY, getSectionMeta } from "@/lib/content/homepage";
import { SECTION_IMAGES } from "@/lib/content/sectionImages";
import { CinematicScrollSection } from "@/components/sections/CinematicScrollSection";

const meta = getSectionMeta("athlete")!;

export function AthleteSection() {
  return (
    <CinematicScrollSection
      id="athlete"
      number={meta.number}
      label={meta.label}
      scrollHeight={meta.scrollHeight}
      title={HOMEPAGE_COPY.athlete.title}
      body={HOMEPAGE_COPY.athlete.body}
      image={{ ...SECTION_IMAGES.athlete, variant: "mask" }}
    />
  );
}
