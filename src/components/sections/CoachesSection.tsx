"use client";

import { useRef } from "react";
import { COACH_PROFILES } from "@/lib/content/coaches";
import { HOMEPAGE_COPY, getSectionMeta } from "@/lib/content/homepage";
import { SECTION_IMAGES } from "@/lib/content/sectionImages";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/motion/text/RevealText";
import { ForgeImageFrame } from "@/components/ui/ForgeImageFrame";
import { useSectionProgress } from "@/hooks/useSectionProgress";

const meta = getSectionMeta("coaches")!;

export function CoachesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionProgress(sectionRef, { id: "coaches" });

  return (
    <section
      ref={sectionRef}
      id="coaches"
      className="relative z-[var(--z-content)] bg-[var(--background)]/95 section-padding backdrop-blur-sm"
      aria-labelledby="coaches-heading"
    >
      <div className="container-forge">
        <SectionLabel number={meta.number} label={meta.label} />
        <h2 id="coaches-heading" className="type-display-md text-[var(--text)] mt-6">
          {HOMEPAGE_COPY.coaches.title}
        </h2>
        <RevealText className="type-body-lg text-[var(--muted)] mt-6 max-w-2xl">
          {HOMEPAGE_COPY.coaches.body}
        </RevealText>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {COACH_PROFILES.map((coach, index) => {
            const image = SECTION_IMAGES.coaches[index];
            return (
              <article
                key={coach.id}
                className="group forge-card overflow-hidden"
              >
                <ForgeImageFrame
                  src={image.src}
                  alt={`${coach.name} — ${coach.role}`}
                  aspect={image.aspect ?? "3/4"}
                  objectPosition={image.objectPosition ?? "center 30%"}
                  variant={index === 1 ? "mask" : "parallax"}
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                <div className="p-6 bg-[var(--surface)]">
                  <p className="type-micro text-[var(--accent)]">{coach.role}</p>
                  <h3 className="type-heading-md text-[var(--text)] mt-2">{coach.name}</h3>
                  <p className="type-caption text-[var(--muted)] mt-2">{coach.specialization}</p>
                  <p className="type-caption text-[var(--muted)] mt-1">{coach.experience}</p>
                  <p className="type-body-sm text-[var(--muted)] mt-4 italic type-serif">
                    {coach.philosophy}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
