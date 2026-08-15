"use client";

import { useRef } from "react";
import { GALLERY_ITEMS } from "@/lib/content/gallery";
import { HOMEPAGE_COPY, getSectionMeta } from "@/lib/content/homepage";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GalleryCarousel } from "@/components/sections/GalleryCarousel";
import { useSectionProgress } from "@/hooks/useSectionProgress";

const meta = getSectionMeta("gallery")!;

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionProgress(sectionRef, { id: "gallery" });

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative z-[var(--z-content)] bg-[var(--surface)] section-padding"
      aria-labelledby="gallery-heading"
    >
      <div className="container-forge">
        <SectionLabel number={meta.number} label={meta.label} />
        <h2
          id="gallery-heading"
          className="type-heading-xl text-[var(--text)] mt-6 max-w-2xl [text-wrap:balance]"
        >
          {HOMEPAGE_COPY.gallery.title}
        </h2>

        <div className="mt-12 md:mt-16">
          <GalleryCarousel items={GALLERY_ITEMS} />
        </div>
      </div>
    </section>
  );
}
