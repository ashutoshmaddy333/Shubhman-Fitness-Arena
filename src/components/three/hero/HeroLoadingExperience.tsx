"use client";

import { BrandLogo } from "@/components/brand/BrandLogo";

interface HeroLoadingExperienceProps {
  visible: boolean;
  loaded?: number;
  total?: number;
}

/** Branded loading — real progress only when GLB assets exist on disk */
export function HeroLoadingExperience({
  visible,
  loaded = 0,
  total = 0,
}: HeroLoadingExperienceProps) {
  if (!visible) return null;

  const showProgress = total > 0;
  const progress = total > 0 ? Math.round((loaded / total) * 100) : 0;

  return (
    <div
      className="fixed inset-0 z-[var(--z-overlay)] flex items-center justify-center bg-[var(--background)]"
      aria-live="polite"
      aria-busy="true"
      role="status"
    >
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <BrandLogo variant="full" className="justify-center" />
        </div>
        <p className="type-micro tracking-[0.25em] text-[var(--muted)] uppercase">
          Loading the Facility
        </p>
        {showProgress && (
          <p className="type-display-sm mt-3 text-[var(--text)] tabular-nums">
            {progress}%
          </p>
        )}
        <div
          className="mx-auto mt-8 h-px w-20 bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent"
          aria-hidden="true"
        />
        {showProgress && (
          <div
            className="mx-auto mt-4 h-px w-32 overflow-hidden bg-white/10"
            aria-hidden="true"
          >
            <div
              className="h-full bg-[var(--accent)]/60 transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
