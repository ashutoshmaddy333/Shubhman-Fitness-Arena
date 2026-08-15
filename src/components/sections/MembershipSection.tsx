"use client";

import { useRef } from "react";
import { MEMBERSHIP_TIERS } from "@/lib/content/membership";
import { HOMEPAGE_COPY, getSectionMeta } from "@/lib/content/homepage";
import { SITE_IMAGES } from "@/lib/content/siteImages";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/motion/text/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ForgeImageFrame } from "@/components/ui/ForgeImageFrame";
import { useSectionProgress } from "@/hooks/useSectionProgress";

const meta = getSectionMeta("membership")!;

export function MembershipSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionProgress(sectionRef, { id: "membership" });

  return (
    <section
      ref={sectionRef}
      id="membership"
      className="relative z-[var(--z-content)] bg-[var(--background)] section-padding"
      aria-labelledby="membership-heading"
    >
      <div className="container-forge">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionLabel number={meta.number} label={meta.label} />
            <h2 id="membership-heading" className="type-display-md text-[var(--text)] mt-6 max-w-3xl">
              {HOMEPAGE_COPY.membership.title}
            </h2>
            <RevealText className="type-body-lg text-[var(--muted)] mt-6 max-w-2xl">
              {HOMEPAGE_COPY.membership.body}
            </RevealText>
          </div>

          <ForgeImageFrame
            src={SITE_IMAGES.membership.lounge.src}
            alt={SITE_IMAGES.membership.lounge.alt}
            aspect={SITE_IMAGES.membership.lounge.aspect ?? "16/10"}
            objectPosition={SITE_IMAGES.membership.lounge.objectPosition}
            variant="scale"
            sizes="(max-width:1024px) 100vw, 45vw"
            className="border border-[var(--border)]"
          />
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {MEMBERSHIP_TIERS.map((tier) => (
            <article
              key={tier.id}
              className={`forge-card p-8 flex flex-col ${
                tier.highlighted
                  ? "border-[var(--accent)] bg-[var(--surface-elevated)] shadow-[inset_0_1px_0_var(--accent-muted)]"
                  : ""
              }`}
            >
              <h3 className="type-heading-lg text-[var(--text)]">{tier.name}</h3>
              <p className="type-display-md text-[var(--text)] mt-4">{tier.price}</p>
              <p className="type-micro text-[var(--muted)]">per {tier.period}</p>
              <ul className="mt-8 space-y-3 flex-1" role="list">
                {tier.features.map((f) => (
                  <li key={f} className="type-body-sm text-[var(--muted)] flex gap-2">
                    <span className="text-[var(--accent)]">—</span>
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <MagneticButton>Start Your Journey</MagneticButton>
        </div>
      </div>
    </section>
  );
}
