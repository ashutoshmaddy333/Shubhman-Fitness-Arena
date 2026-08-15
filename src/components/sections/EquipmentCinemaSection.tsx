"use client";

import { HOMEPAGE_COPY, getSectionMeta } from "@/lib/content/homepage";
import { SECTION_IMAGES } from "@/lib/content/sectionImages";
import { CinematicScrollSection } from "@/components/sections/CinematicScrollSection";

const meta = getSectionMeta("equipment")!;

export function EquipmentCinemaSection() {
  return (
    <CinematicScrollSection
      id="equipment"
      number={meta.number}
      label={meta.label}
      scrollHeight={meta.scrollHeight}
      title={HOMEPAGE_COPY.equipment.title}
      body={HOMEPAGE_COPY.equipment.body}
      image={{ ...SECTION_IMAGES.equipment, variant: "scale" }}
    />
  );
}
