"use client";

const BRAND_LINES = [
  { text: "Shubhman", tier: "primary" as const, motion: "from-left" as const },
  { text: "Fitness", tier: "mid" as const, motion: "from-right" as const },
  { text: "Arena", tier: "deep" as const, motion: "from-up" as const },
] as const;

interface HeroBrand3DProps {
  className?: string;
}

export function HeroBrand3D({ className = "" }: HeroBrand3DProps) {
  return (
    <div className={["hero-brand-3d", className].join(" ")} aria-hidden="true">
      <div className="hero-brand-3d__stack">
        {BRAND_LINES.map((line) => (
          <p
            key={line.text}
            className={[
              "hero-brand-3d__line",
              `hero-brand-3d__line--${line.tier}`,
              `hero-brand-3d__line--${line.motion}`,
            ].join(" ")}
          >
            {line.text}
          </p>
        ))}
      </div>
      <p className="hero-brand-3d__tag hero-brand-3d__tag--from-down">
        Premium Performance Training
      </p>
    </div>
  );
}
