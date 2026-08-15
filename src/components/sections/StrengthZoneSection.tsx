"use client";

import { HOMEPAGE_COPY, getSectionMeta } from "@/lib/content/homepage";
import { SECTION_IMAGES } from "@/lib/content/sectionImages";
import { CinematicScrollSection } from "@/components/sections/CinematicScrollSection";

const meta = getSectionMeta("strength")!;

export function StrengthZoneSection() {
  return (
    <CinematicScrollSection
      id="strength"
      number={meta.number}
      label={meta.label}
      scrollHeight={meta.scrollHeight}
      title={HOMEPAGE_COPY.strength.title}
      body={HOMEPAGE_COPY.strength.body}
      image={{ ...SECTION_IMAGES.strength, variant: "parallax" }}
    />
  );
}
