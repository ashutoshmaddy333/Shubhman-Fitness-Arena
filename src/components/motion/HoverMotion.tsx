"use client";

import { useRef, type ReactNode } from "react";
import { useHoverMotion } from "@/hooks/useHoverMotion";
import { HOVER_PRESETS, type HoverPreset } from "@/lib/motion/hoverPresets";

interface HoverMotionProps {
  children: ReactNode;
  className?: string;
  preset?: HoverPreset;
  cursor?: "hover" | "view" | "play" | "external";
}

export function HoverMotion({
  children,
  className = "",
  preset = "lift",
  cursor = "hover",
}: HoverMotionProps) {
  const ref = useRef<HTMLDivElement>(null);
  useHoverMotion(ref, preset);

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      data-interactive
      data-hover={preset}
      data-cursor={cursor}
    >
      {children}
    </div>
  );
}

export { HOVER_PRESETS };
