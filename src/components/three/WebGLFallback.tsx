"use client";

import Image from "next/image";
import { ASSETS } from "@/lib/constants/assets";

export function WebGLFallback() {
  return (
    <div
      className="fixed inset-0 z-[var(--z-canvas)] bg-[var(--background)]"
      role="img"
      aria-label="FORGE cinematic hero — static fallback"
    >
      <Image
        src={ASSETS.images.heroFallback}
        alt=""
        fill
        priority
        className="object-cover opacity-60"
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, var(--accent-muted) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-[var(--background)]/40" />
    </div>
  );
}
