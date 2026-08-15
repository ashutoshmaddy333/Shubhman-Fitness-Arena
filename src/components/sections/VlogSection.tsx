"use client";

import Link from "next/link";
import { useRef } from "react";
import { VLOG_ENTRIES } from "@/lib/content/vlog";
import { HOMEPAGE_COPY, getSectionMeta } from "@/lib/content/homepage";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ForgeImageFrame } from "@/components/ui/ForgeImageFrame";
import { HoverMotion } from "@/components/motion/HoverMotion";
import { useSectionProgress } from "@/hooks/useSectionProgress";

const meta = getSectionMeta("vlog")!;

const VLOG_FRAMING: Record<string, { aspect: string; objectPosition: string }> = {
  "/images/vlog/vlog-training-log.png": { aspect: "16/10", objectPosition: "center 30%" },
  "/images/gallery/gallery-gym-interior.png": { aspect: "16/10", objectPosition: "center center" },
  "/images/community/community-session.png": { aspect: "16/10", objectPosition: "center 28%" },
  "/images/gallery/gallery-training.png": { aspect: "16/10", objectPosition: "center 35%" },
  "/images/gallery/gallery-plates.png": { aspect: "16/10", objectPosition: "center center" },
};

export function VlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionProgress(sectionRef, { id: "vlog" });

  return (
    <section
      ref={sectionRef}
      id="vlog"
      className="relative z-[var(--z-content)] bg-[var(--background)] section-padding"
      aria-labelledby="vlog-heading"
    >
      <div className="container-forge">
        <SectionLabel number={meta.number} label={meta.label} />
        <h2 id="vlog-heading" className="type-display-md text-[var(--text)] mt-6">
          {HOMEPAGE_COPY.vlog.title}
        </h2>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VLOG_ENTRIES.map((entry, index) => {
            const frame = VLOG_FRAMING[entry.image] ?? {
              aspect: "16/10",
              objectPosition: "center center",
            };

            return (
              <HoverMotion key={entry.slug} preset="lift">
                <Link
                  href={`/vlog/${entry.slug}`}
                  className="group block border border-[var(--border)] overflow-hidden bg-[var(--surface)]"
                  data-interactive
                >
                  <div className="relative">
                    <ForgeImageFrame
                      src={entry.image}
                      alt={entry.title}
                      aspect={frame.aspect}
                      objectPosition={frame.objectPosition}
                      variant={index % 2 === 0 ? "mask" : "parallax"}
                      maskDirection={index % 3 === 0 ? "left" : "up"}
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                    <span className="absolute bottom-4 left-4 type-micro text-[var(--accent)] bg-black/50 px-2 py-1 z-10">
                      {entry.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="type-micro text-[var(--muted)]">
                      {entry.date} · {entry.readTime}
                    </p>
                    <h3 className="type-heading-md text-[var(--text)] mt-2 group-hover:text-[var(--accent)] transition-colors">
                      {entry.title}
                    </h3>
                    <p className="type-body-sm text-[var(--muted)] mt-3">{entry.excerpt}</p>
                  </div>
                </Link>
              </HoverMotion>
            );
          })}
        </div>
      </div>
    </section>
  );
}
