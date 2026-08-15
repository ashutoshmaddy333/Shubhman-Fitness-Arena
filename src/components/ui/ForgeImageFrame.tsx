"use client";

import { AnimatedImage, type AnimatedImageVariant } from "@/components/motion/image/AnimatedImage";

export interface ForgeImageFrameProps {
  src: string;
  alt: string;
  aspect?: string;
  objectPosition?: string;
  variant?: AnimatedImageVariant;
  sizes?: string;
  priority?: boolean;
  className?: string;
  maskDirection?: "up" | "down" | "left" | "right";
  /** Fill parent container — parent controls size via aspect/grid */
  fill?: boolean;
}

export function ForgeImageFrame({
  src,
  alt,
  aspect = "4/5",
  objectPosition = "center center",
  variant = "parallax",
  sizes = "100vw",
  priority = false,
  className = "",
  maskDirection = "up",
  fill = false,
}: ForgeImageFrameProps) {
  return (
    <div
      className={[
        "relative overflow-hidden bg-[var(--surface-elevated)] rounded-[var(--radius-md)]",
        fill ? "h-full w-full" : "w-full",
        className,
      ].join(" ")}
      style={fill ? undefined : { aspectRatio: aspect }}
    >
      <AnimatedImage
        src={src}
        alt={alt}
        variant={variant}
        maskDirection={maskDirection}
        sizes={sizes}
        priority={priority}
        objectPosition={objectPosition}
        className="absolute inset-0 h-full w-full"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050608]/70 via-transparent to-[#050608]/20"
        aria-hidden="true"
      />
    </div>
  );
}
